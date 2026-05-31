import {
  Plugin,
  PluginConfig,
  PluginRegistry,
  PluginManifest,
  PluginEvent,
  PluginError,
  PluginAPI
} from '../../types/plugin';
import { storage } from '../../lib/utils';

const PLUGIN_REGISTRY_KEY = 'plugin_registry';
const PLUGIN_STATES_KEY = 'plugin_states';

export class PluginRegistryManager {
  private registry: PluginRegistry;
  private manifest: PluginManifest;
  private eventListeners: Map<string, Set<(event: PluginEvent) => void>>;
  private errors: PluginError[];

  constructor() {
    this.registry = this.loadRegistry();
    this.manifest = this.loadManifest();
    this.eventListeners = new Map();
    this.errors = [];
  }

  private loadRegistry(): PluginRegistry {
    try {
      const saved = storage.get<PluginRegistry>(PLUGIN_REGISTRY_KEY, null);
      if (saved) {
        return {
          ...saved,
          plugins: new Map(Object.entries(saved.plugins || {})),
          activePlugins: new Set(saved.activePlugins || [])
        };
      }
    } catch (e) {
      console.warn('Failed to load plugin registry, using default');
    }

    return {
      plugins: new Map(),
      activePlugins: new Set(),
      pluginStates: new Map()
    };
  }

  private saveRegistry(): void {
    try {
      const toSave = {
        ...this.registry,
        plugins: Object.fromEntries(this.registry.plugins.entries()),
        activePlugins: Array.from(this.registry.activePlugins)
      };
      storage.set(PLUGIN_REGISTRY_KEY, toSave);
    } catch (e) {
      console.error('Failed to save plugin registry:', e);
    }
  }

  private loadManifest(): PluginManifest {
    return {
      version: '1.0.0',
      plugins: [],
      globalSettings: {
        autoLoadDefaults: true,
        sandboxMode: false,
        strictPermissions: false
      },
      theme: null
    };
  }

  registerPlugin(plugin: Plugin): boolean {
    if (this.registry.plugins.has(plugin.id)) {
      const existing = this.registry.plugins.get(plugin.id)!;
      if (existing.version === plugin.version && existing.name === plugin.name) {
        return true;
      }
      this.registry.plugins.set(plugin.id, plugin);
      this.saveRegistry();
      return true;
    }

    this.registry.plugins.set(plugin.id, plugin);
    this.saveRegistry();
    this.emitEvent({
      type: 'install',
      pluginId: plugin.id,
      data: plugin,
      timestamp: Date.now()
    });

    if (plugin.autoLoad && this.manifest.globalSettings.autoLoadDefaults) {
      this.activatePlugin(plugin.id);
    }

    return true;
  }

  unregisterPlugin(pluginId: string): boolean {
    const plugin = this.registry.plugins.get(pluginId);
    if (!plugin) {
      return false;
    }

    if (this.registry.activePlugins.has(pluginId)) {
      this.deactivatePlugin(pluginId);
    }

    this.registry.plugins.delete(pluginId);
    this.saveRegistry();
    this.emitEvent({
      type: 'uninstall',
      pluginId,
      timestamp: Date.now()
    });

    return true;
  }

  activatePlugin(pluginId: string): boolean {
    const plugin = this.registry.plugins.get(pluginId);
    if (!plugin) {
      return false;
    }

    if (this.registry.activePlugins.has(pluginId)) {
      return true;
    }

    try {
      if (plugin.onActivate) {
        plugin.onActivate();
      }

      this.registry.activePlugins.add(pluginId);
      this.saveRegistry();
      this.emitEvent({
        type: 'activate',
        pluginId,
        timestamp: Date.now()
      });

      return true;
    } catch (error) {
      this.addError({
        pluginId,
        code: 'ACTIVATION_FAILED',
        message: error instanceof Error ? error.message : 'Activation failed',
        details: error,
        timestamp: Date.now()
      });
      return false;
    }
  }

  deactivatePlugin(pluginId: string): boolean {
    if (!this.registry.activePlugins.has(pluginId)) {
      return true;
    }

    const plugin = this.registry.plugins.get(pluginId);
    if (plugin?.onDeactivate) {
      try {
        plugin.onDeactivate();
      } catch (error) {
        this.addError({
          pluginId,
          code: 'DEACTIVATION_FAILED',
          message: error instanceof Error ? error.message : 'Deactivation failed',
          details: error,
          timestamp: Date.now()
        });
      }
    }

    this.registry.activePlugins.delete(pluginId);
    this.saveRegistry();
    this.emitEvent({
      type: 'deactivate',
      pluginId,
      timestamp: Date.now()
    });

    return true;
  }

  getPlugin(pluginId: string): Plugin | undefined {
    return this.registry.plugins.get(pluginId);
  }

  getAllPlugins(): Plugin[] {
    return Array.from(this.registry.plugins.values());
  }

  getActivePlugins(): Plugin[] {
    return Array.from(this.registry.activePlugins)
      .map(id => this.registry.plugins.get(id))
      .filter((p): p is Plugin => p !== undefined);
  }

  isPluginActive(pluginId: string): boolean {
    return this.registry.activePlugins.has(pluginId);
  }

  updatePluginState(pluginId: string, state: any): void {
    this.registry.pluginStates.set(pluginId, state);
    try {
      const states = Object.fromEntries(this.registry.pluginStates.entries());
      storage.set(PLUGIN_STATES_KEY, states);
    } catch (e) {
      console.error('Failed to save plugin states:', e);
    }
  }

  getPluginState(pluginId: string): any {
    return this.registry.pluginStates.get(pluginId);
  }

  addEventListener(eventType: PluginEvent['type'], callback: (event: PluginEvent) => void): void {
    if (!this.eventListeners.has(eventType)) {
      this.eventListeners.set(eventType, new Set());
    }
    this.eventListeners.get(eventType)!.add(callback);
  }

  removeEventListener(eventType: PluginEvent['type'], callback: (event: PluginEvent) => void): void {
    if (this.eventListeners.has(eventType)) {
      this.eventListeners.get(eventType)!.delete(callback);
    }
  }

  private emitEvent(event: PluginEvent): void {
    if (this.eventListeners.has(event.type)) {
      this.eventListeners.get(event.type)!.forEach(callback => {
        try {
          callback(event);
        } catch (error) {
          console.error(`Error in ${event.type} listener:`, error);
        }
      });
    }
  }

  private addError(error: PluginError): void {
    this.errors.push(error);
    console.error(`Plugin Error [${error.code}]:`, error);
  }

  getErrors(): PluginError[] {
    return [...this.errors];
  }

  clearErrors(): void {
    this.errors = [];
  }

  getManifest(): PluginManifest {
    return { ...this.manifest };
  }

  getStats(): {
    total: number;
    active: number;
    byType: Record<string, number>;
  } {
    const stats = {
      total: this.registry.plugins.size,
      active: this.registry.activePlugins.size,
      byType: {} as Record<string, number>
    };

    this.registry.plugins.forEach(plugin => {
      stats.byType[plugin.type] = (stats.byType[plugin.type] || 0) + 1;
    });

    return stats;
  }
}

export const pluginRegistry = new PluginRegistryManager();
