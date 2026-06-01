import { PluginHooks } from '../../types/plugin';
import { pluginRegistry } from './PluginRegistry';

export class HookManager {
  private hooks: Map<string, Set<(data: any) => any>>;
  private pluginHooks: Map<string, Array<{ hookName: string; callback: (data: any) => any }>>;
  private globalHooks: PluginHooks;

  constructor() {
    this.hooks = new Map();
    this.pluginHooks = new Map();
    this.globalHooks = {};
  }

  registerHook(hookName: string, callback: (data: any) => any, pluginId?: string): void {
    if (!this.hooks.has(hookName)) {
      this.hooks.set(hookName, new Set());
    }
    this.hooks.get(hookName)!.add(callback);

    if (pluginId) {
      if (!this.pluginHooks.has(pluginId)) {
        this.pluginHooks.set(pluginId, []);
      }
      this.pluginHooks.get(pluginId)!.push({ hookName, callback });
    }
  }

  unregisterHook(hookName: string, callback: (data: any) => any): void {
    if (this.hooks.has(hookName)) {
      this.hooks.get(hookName)!.delete(callback);
      if (this.hooks.get(hookName)!.size === 0) {
        this.hooks.delete(hookName);
      }
    }
  }

  unregisterPluginHooks(pluginId: string): void {
    const entries = this.pluginHooks.get(pluginId);
    if (!entries) return;

    entries.forEach(({ hookName, callback }) => {
      this.unregisterHook(hookName, callback);
    });

    this.pluginHooks.delete(pluginId);
  }

  async executeHook<T>(hookName: string, data: T): Promise<T> {
    if (!this.hooks.has(hookName)) {
      return data;
    }

    let result = data;

    for (const callback of this.hooks.get(hookName)!) {
      try {
        const hookResult = await callback(result);
        if (hookResult !== undefined) {
          result = hookResult;
        }
      } catch (error) {
        console.error(`Error executing hook ${hookName}:`, error);
      }
    }

    return result;
  }

  async executeHooksInOrder<T>(hookNames: string[], data: T): Promise<T> {
    let result = data;
    for (const hookName of hookNames) {
      result = await this.executeHook(hookName, result);
    }
    return result;
  }

  async executePluginHooks<T>(hookName: keyof PluginHooks, data: T): Promise<T> {
    let result = data;
    const activePlugins = pluginRegistry.getActivePlugins();

    for (const plugin of activePlugins) {
      const hook = plugin[hookName];
      if (typeof hook === 'function') {
        try {
          const hookResult = await hook(result);
          if (hookResult !== undefined) {
            result = hookResult;
          }
        } catch (error) {
          console.error(`Error in plugin hook ${plugin.id}.${String(hookName)}:`, error);
        }
      }
    }

    return result;
  }

  clearAllHooks(): void {
    this.hooks.clear();
  }

  getRegisteredHooks(): string[] {
    return Array.from(this.hooks.keys());
  }

  getHookCount(hookName: string): number {
    return this.hooks.get(hookName)?.size || 0;
  }
}

export const hookManager = new HookManager();

export class PluginCore {
  private hookManager: HookManager;

  constructor(hookManager: HookManager) {
    this.hookManager = hookManager;
  }

  async beforeAssessment(data: any): Promise<any> {
    return this.hookManager.executePluginHooks('beforeAssessment', data);
  }

  async afterAssessment(result: any): Promise<any> {
    return this.hookManager.executePluginHooks('afterAssessment', result);
  }

  async beforeRender(context: any): Promise<any> {
    return this.hookManager.executePluginHooks('beforeRender', context);
  }

  async afterRender(result: any): Promise<any> {
    return this.hookManager.executePluginHooks('afterRender', result);
  }

  async onCalculate(answers: any): Promise<any> {
    return this.hookManager.executePluginHooks('onCalculate', answers);
  }

  async onGenerateReport(data: any): Promise<any> {
    return this.hookManager.executePluginHooks('onGenerateReport', data);
  }

  async onSave(data: any): Promise<void> {
    await this.hookManager.executePluginHooks('onSave', data);
  }

  async onLoad(data: any): Promise<any> {
    return this.hookManager.executePluginHooks('onLoad', data);
  }
}

export const pluginCore = new PluginCore(hookManager);
