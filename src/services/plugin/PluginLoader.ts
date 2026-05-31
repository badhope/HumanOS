import {
  Plugin,
  PluginConfig,
  PluginAPI
} from '../../types/plugin';
import { pluginRegistry } from './PluginRegistry';
import { hookManager } from './HookSystem';
import { storage } from '../../lib/utils';

const PLUGIN_CACHE_KEY = 'plugin_cache';

export class PluginLoader {
  private loadedPlugins: Map<string, Plugin> = new Map();
  private pluginCache: Map<string, any> = new Map();
  private initializationPromise: Promise<void> | null = null;

  constructor() {
    this.loadPluginCache();
  }

  async initialize(): Promise<void> {
    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    this.initializationPromise = (async () => {
      await this.loadBuiltInPlugins();
    })();

    return this.initializationPromise;
  }

  private async loadBuiltInPlugins(): Promise<void> {
    const builtInPlugins = this.getBuiltInPlugins();
    
    for (const pluginConfig of builtInPlugins) {
      try {
        const plugin = await this.createPluginInstance(pluginConfig);
        if (plugin) {
          pluginRegistry.registerPlugin(plugin);
        }
      } catch (error) {
        console.error(`Failed to load plugin ${pluginConfig.id}:`, error);
      }
    }
  }

  private getBuiltInPlugins(): PluginConfig[] {
    return [
      {
        id: 'big-five-personality',
        name: 'Big Five Personality Assessment',
        description: 'Standard Big Five personality test with 60 questions covering Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism dimensions.',
        version: '2.0.0',
        author: 'MindMirror Team',
        type: 'assessment',
        dependencies: [],
        permissions: ['read_data', 'write_data'],
        enabled: true,
        autoLoad: true,
        metadata: {
          questionCount: 60,
          estimatedTime: '15min',
          dimensions: ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism']
        }
      },
      {
        id: 'stress-test',
        name: 'Comprehensive Stress Assessment',
        description: 'Extended PSS-based stress assessment with 30 questions covering perceived stress, coping ability, work stress, relationship stress, health stress, financial stress, physiological and emotional responses.',
        version: '2.0.0',
        author: 'MindMirror Team',
        type: 'assessment',
        dependencies: [],
        permissions: ['read_data', 'write_data'],
        enabled: true,
        autoLoad: true,
        metadata: {
          questionCount: 30,
          estimatedTime: '10min',
          dimensions: ['perceivedStress', 'coping', 'workStress', 'relationshipStress', 'healthStress', 'financeStress', 'physiological', 'emotional']
        }
      },
      {
        id: 'gad7-anxiety',
        name: 'Comprehensive Anxiety Assessment',
        description: 'Extended GAD-7 anxiety assessment with 28 questions covering excessive worry, motor tension, irritability, fear, physical symptoms, cognitive symptoms, and social functioning impact.',
        version: '2.0.0',
        author: 'MindMirror Team',
        type: 'assessment',
        dependencies: [],
        permissions: ['read_data', 'write_data'],
        enabled: true,
        autoLoad: true,
        metadata: {
          questionCount: 28,
          estimatedTime: '8min',
          dimensions: ['worries', 'tension', 'irritability', 'fear', 'physical', 'cognitive', 'social']
        }
      },
      {
        id: 'mindfulness-training',
        name: 'Mindfulness & Relaxation Training',
        description: 'Comprehensive mindfulness and relaxation training module including 4-7-8 breathing, body scan meditation, stress management, gratitude journaling, progressive muscle relaxation, and anxiety coping techniques.',
        version: '2.0.0',
        author: 'MindMirror Team',
        type: 'training',
        dependencies: [],
        permissions: ['read_data'],
        enabled: true,
        autoLoad: true,
        metadata: {
          courses: 6,
          categories: ['breathing', 'meditation', 'stress', 'gratitude', 'relaxation', 'anxiety']
        }
      },
      {
        id: 'theme-system',
        name: 'Theme & UI System',
        description: 'UI theme management, style customization, and visual consistency controls. Supports light/dark mode and custom accent colors.',
        version: '2.0.0',
        author: 'MindMirror Team',
        type: 'ui',
        dependencies: [],
        permissions: ['read_config', 'write_config'],
        enabled: true,
        autoLoad: true,
        metadata: {
          themes: ['light', 'dark', 'auto'],
          customizable: true
        }
      },
      {
        id: 'data-analytics',
        name: 'Data Analytics Engine',
        description: 'Core data analytics engine providing trend analysis, pattern recognition, and personalized insights based on assessment history and training progress.',
        version: '1.0.0',
        author: 'MindMirror Team',
        type: 'core',
        dependencies: ['big-five-personality', 'stress-test', 'gad7-anxiety'],
        permissions: ['read_data', 'read_config'],
        enabled: true,
        autoLoad: true,
        metadata: {
          capabilities: ['trend_analysis', 'pattern_recognition', 'insight_generation']
        }
      }
    ];
  }

  private async createPluginInstance(config: PluginConfig): Promise<Plugin | null> {
    const api = this.createPluginAPI(config);

    const plugin: Plugin = {
      ...config,
      onInstall: async () => {
        api.log(`Plugin installed: ${config.name}`);
        this.registerPluginHooks(config, api);
      },
      onUninstall: async () => {
        api.log(`Plugin uninstalled: ${config.name}`);
        this.unregisterPluginHooks(config);
      },
      onActivate: async () => {
        api.log(`Plugin activated: ${config.name}`);
        this.registerPluginHooks(config, api);
      },
      onDeactivate: async () => {
        api.log(`Plugin deactivated: ${config.name}`);
        this.unregisterPluginHooks(config);
      },
      onLoad: async () => {
        api.log(`Plugin loaded: ${config.name}`);
      },
      onReady: async () => {
        api.log(`Plugin ready: ${config.name}`);
      },
      assessments: config.type === 'assessment' ? this.createAssessmentExports(config) : undefined,
      trainings: config.type === 'training' ? this.createTrainingExports(config) : undefined,
      uiComponents: config.type === 'ui' ? this.createUIExports(config) : undefined,
      hooks: this.createPluginHookMap(config),
      services: this.createPluginServices(config, api)
    };

    return plugin;
  }

  private registerPluginHooks(config: PluginConfig, api: PluginAPI): void {
    switch (config.id) {
      case 'big-five-personality':
        hookManager.registerHook('beforeAssessment', (data: any) => {
          if (data.assessmentId === 'big-five') {
            return { ...data, pluginEnhanced: true, source: 'big-five-plugin' };
          }
          return data;
        });
        hookManager.registerHook('afterAssessment', (result: any) => {
          if (result.assessmentId === 'big-five') {
            return { ...result, pluginProcessed: true };
          }
          return result;
        });
        break;

      case 'stress-test':
        hookManager.registerHook('beforeAssessment', (data: any) => {
          if (data.assessmentId === 'stress-test') {
            return { ...data, pluginEnhanced: true, source: 'stress-plugin' };
          }
          return data;
        });
        hookManager.registerHook('onCalculate', (answers: any) => {
          return { ...answers, extendedScoring: true };
        });
        break;

      case 'gad7-anxiety':
        hookManager.registerHook('beforeAssessment', (data: any) => {
          if (data.assessmentId === 'anxiety-gad7') {
            return { ...data, pluginEnhanced: true, source: 'anxiety-plugin' };
          }
          return data;
        });
        hookManager.registerHook('onCalculate', (answers: any) => {
          return { ...answers, dimensionAnalysis: true };
        });
        break;

      case 'mindfulness-training':
        hookManager.registerHook('beforeRender', (context: any) => {
          if (context.page === 'training') {
            return { ...context, trainingPluginActive: true };
          }
          return context;
        });
        break;

      case 'theme-system':
        hookManager.registerHook('beforeRender', (context: any) => {
          const theme = storage.get('theme', 'light');
          return { ...context, theme };
        });
        break;

      case 'data-analytics':
        hookManager.registerHook('afterAssessment', (result: any) => {
          return { ...result, analyticsProcessed: true };
        });
        hookManager.registerHook('onGenerateReport', (data: any) => {
          return { ...data, analyticsIncluded: true };
        });
        break;
    }
  }

  private unregisterPluginHooks(config: PluginConfig): void {
    // Hooks are managed by the hookManager and will be cleaned up on their own
    // when plugins are deactivated. For now, we just log.
  }

  private createAssessmentExports(config: PluginConfig): Record<string, any> {
    switch (config.id) {
      case 'big-five-personality':
        return {
          scoringEngine: 'bigFiveScoring',
          dimensions: ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'],
          questionCount: 60
        };
      case 'stress-test':
        return {
          scoringEngine: 'stressTestScoring',
          dimensions: ['perceivedStress', 'coping', 'workStress', 'relationshipStress', 'healthStress', 'financeStress', 'physiological', 'emotional'],
          questionCount: 30
        };
      case 'gad7-anxiety':
        return {
          scoringEngine: 'anxietyGad7Scoring',
          dimensions: ['worries', 'tension', 'irritability', 'fear', 'physical', 'cognitive', 'social'],
          questionCount: 28
        };
      default:
        return {};
    }
  }

  private createTrainingExports(config: PluginConfig): Record<string, any> {
    return {
      courses: ['4-7-8-breathing', 'body-scan', 'stress-management', 'gratitude-journal', 'muscle-relaxation', 'anxiety-coping'],
      categories: ['breathing', 'meditation', 'stress', 'gratitude', 'relaxation', 'anxiety'],
      totalCourses: 6
    };
  }

  private createUIExports(config: PluginConfig): Record<string, any> {
    return {
      themes: ['light', 'dark', 'auto'],
      customizable: true,
      currentTheme: storage.get('theme', 'light')
    };
  }

  private createPluginHookMap(config: PluginConfig): Record<string, any> {
    const hooks: Record<string, any> = {};
    
    if (config.type === 'assessment') {
      hooks.beforeAssessment = (data: any) => ({ ...data, pluginId: config.id });
      hooks.afterAssessment = (result: any) => ({ ...result, processedBy: config.id });
      hooks.onCalculate = (answers: any) => answers;
      hooks.onGenerateReport = (data: any) => ({ ...data, reportPlugin: config.id });
    }
    
    if (config.type === 'training') {
      hooks.beforeRender = (context: any) => context;
    }
    
    if (config.type === 'ui') {
      hooks.beforeRender = (context: any) => ({ ...context, themePlugin: config.id });
    }
    
    return hooks;
  }

  private createPluginServices(config: PluginConfig, api: PluginAPI): Record<string, any> {
    const services: Record<string, any> = {};

    switch (config.id) {
      case 'big-five-personality':
        services.scoring = {
          name: 'bigFiveScoring',
          calculate: (answers: any, questions: any) => {
            api.log('Calculating Big Five scores');
            return { answers, questions, engine: 'bigFive' };
          }
        };
        break;

      case 'stress-test':
        services.scoring = {
          name: 'stressTestScoring',
          calculate: (answers: any, questions: any) => {
            api.log('Calculating stress test scores');
            return { answers, questions, engine: 'stressTest' };
          }
        };
        break;

      case 'gad7-anxiety':
        services.scoring = {
          name: 'anxietyGad7Scoring',
          calculate: (answers: any, questions: any) => {
            api.log('Calculating GAD-7 scores');
            return { answers, questions, engine: 'gad7' };
          }
        };
        break;

      case 'data-analytics':
        services.analytics = {
          name: 'dataAnalytics',
          analyzeTrends: (history: any[]) => {
            api.log('Analyzing trends');
            return { trendCount: history.length, analyzed: true };
          },
          generateInsights: (data: any) => {
            api.log('Generating insights');
            return { insights: [], generated: true };
          }
        };
        break;
    }

    return services;
  }

  private createPluginAPI(config: PluginConfig): PluginAPI {
    return {
      getConfig: () => ({ ...config }),
      getState: () => pluginRegistry.getPluginState(config.id),
      setState: (state: any) => {
        pluginRegistry.updatePluginState(config.id, state);
      },
      log: (message: string, level = 'info') => {
        const prefix = `[Plugin:${config.id}]`;
        switch (level) {
          case 'error': console.error(prefix, message); break;
          case 'warn': console.warn(prefix, message); break;
          case 'debug': console.debug(prefix, message); break;
          default: console.log(prefix, message);
        }
      },
      getService: (name: string) => {
        const activePlugins = pluginRegistry.getActivePlugins();
        for (const plugin of activePlugins) {
          if (plugin.services && plugin.services[name]) {
            return plugin.services[name];
          }
        }
        return null;
      },
      registerComponent: (name: string, component: any) => {
        const plugin = pluginRegistry.getPlugin(config.id);
        if (plugin) {
          if (!plugin.uiComponents) plugin.uiComponents = {};
          plugin.uiComponents[name] = component;
        }
      },
      registerHook: (name: string, hook: any) => {
        hookManager.registerHook(name, hook);
      },
      registerService: (name: string, service: any) => {
        const plugin = pluginRegistry.getPlugin(config.id);
        if (plugin) {
          if (!plugin.services) plugin.services = {};
          plugin.services[name] = service;
        }
      }
    };
  }

  async loadPlugin(pluginId: string): Promise<Plugin | null> {
    const cached = this.loadedPlugins.get(pluginId);
    if (cached) {
      return cached;
    }

    const plugin = pluginRegistry.getPlugin(pluginId);
    if (!plugin) {
      return null;
    }

    if (plugin.onLoad) {
      try {
        await plugin.onLoad();
      } catch (error) {
        console.error(`Error in onLoad for ${pluginId}:`, error);
      }
    }

    if (plugin.onReady) {
      try {
        await plugin.onReady();
      } catch (error) {
        console.error(`Error in onReady for ${pluginId}:`, error);
      }
    }

    this.loadedPlugins.set(pluginId, plugin);
    return plugin;
  }

  async unloadPlugin(pluginId: string): Promise<void> {
    if (this.loadedPlugins.has(pluginId)) {
      this.loadedPlugins.delete(pluginId);
    }
  }

  getLoadedPlugins(): Plugin[] {
    return Array.from(this.loadedPlugins.values());
  }

  isLoaded(pluginId: string): boolean {
    return this.loadedPlugins.has(pluginId);
  }

  private loadPluginCache(): void {
    try {
      const cached = storage.get(PLUGIN_CACHE_KEY, null);
      if (cached && typeof cached === 'object') {
        this.pluginCache = new Map(Object.entries(cached));
      }
    } catch (e) {
      console.warn('Failed to load plugin cache');
    }
  }

  private savePluginCache(): void {
    try {
      const toSave = Object.fromEntries(this.pluginCache.entries());
      storage.set(PLUGIN_CACHE_KEY, toSave);
    } catch (e) {
      console.error('Failed to save plugin cache');
    }
  }

  setCache(key: string, value: any): void {
    this.pluginCache.set(key, value);
    this.savePluginCache();
  }

  getCache(key: string): any {
    return this.pluginCache.get(key);
  }

  clearCache(): void {
    this.pluginCache.clear();
    this.savePluginCache();
  }

  async loadAllPlugins(): Promise<void> {
    const allPlugins = pluginRegistry.getAllPlugins();
    for (const plugin of allPlugins) {
      if (pluginRegistry.isPluginActive(plugin.id)) {
        await this.loadPlugin(plugin.id);
      }
    }
  }
}

export const pluginLoader = new PluginLoader();
