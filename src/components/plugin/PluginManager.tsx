import { useState, useEffect } from 'react';
import { useAppStore } from '../../store';
import { getTranslation } from '../../i18n';
import { Plugin } from '../../types/plugin';
import { pluginRegistry } from '../../services/plugin/PluginRegistry';
import { pluginLoader } from '../../services/plugin/PluginLoader';

export function PluginManager() {
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const [activePlugins, setActivePlugins] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlugin, setSelectedPlugin] = useState<Plugin | null>(null);
  const [filter, setFilter] = useState<'all' | 'assessment' | 'training' | 'ui' | 'core'>('all');
  const locale = useAppStore((state) => state.locale);
  const i18n = getTranslation(locale);

  useEffect(() => {
    loadPlugins();
  }, []);

  const loadPlugins = () => {
    const allPlugins = pluginRegistry.getAllPlugins();
    const activeIds = pluginRegistry.getActivePlugins().map(p => p.id);
    
    setPlugins(allPlugins);
    setActivePlugins(activeIds);
    setLoading(false);
  };

  const handleTogglePlugin = async (pluginId: string) => {
    const isActive = activePlugins.includes(pluginId);
    
    if (isActive) {
      const success = pluginRegistry.deactivatePlugin(pluginId);
      if (success) {
        await pluginLoader.unloadPlugin(pluginId);
      }
    } else {
      const success = pluginRegistry.activatePlugin(pluginId);
      if (success) {
        await pluginLoader.loadPlugin(pluginId);
      }
    }
    
    loadPlugins();
  };

  const handleUninstall = (pluginId: string) => {
    if (window.confirm(i18n.common.confirm)) {
      pluginRegistry.unregisterPlugin(pluginId);
      loadPlugins();
      if (selectedPlugin?.id === pluginId) {
        setSelectedPlugin(null);
      }
    }
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      assessment: 'bg-blue-100 text-blue-800 border-blue-200',
      training: 'bg-green-100 text-green-800 border-green-200',
      ui: 'bg-purple-100 text-purple-800 border-purple-200',
      core: 'bg-slate-100 text-slate-800 border-slate-200'
    };
    return colors[type] || 'bg-slate-100 text-slate-800 border-slate-200';
  };

  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      assessment: '📊',
      training: '💪',
      ui: '🎨',
      core: '⚙️'
    };
    return icons[type] || '📦';
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      assessment: locale === 'zh' ? '测评' : 'Assessment',
      training: locale === 'zh' ? '训练' : 'Training',
      ui: locale === 'zh' ? '界面' : 'UI',
      core: locale === 'zh' ? '核心' : 'Core'
    };
    return labels[type] || type;
  };

  const stats = pluginRegistry.getStats();

  const filteredPlugins = filter === 'all' 
    ? plugins 
    : plugins.filter(p => p.type === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">{locale === 'zh' ? '加载插件系统...' : 'Loading plugins...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">
          🧩 {locale === 'zh' ? '插件管理中心' : 'Plugin Manager'}
        </h1>
        <p className="text-slate-600 text-lg">
          {locale === 'zh' ? '管理系统插件，扩展功能模块' : 'Manage system plugins and extend functionality'}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 text-center">
          <div className="text-3xl mb-2">📦</div>
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-slate-500">{locale === 'zh' ? '总插件数' : 'Total'}</div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 text-center">
          <div className="text-3xl mb-2">✅</div>
          <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          <div className="text-sm text-slate-500">{locale === 'zh' ? '已激活' : 'Active'}</div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 text-center">
          <div className="text-3xl mb-2">⏸️</div>
          <div className="text-2xl font-bold text-yellow-600">{stats.total - stats.active}</div>
          <div className="text-sm text-slate-500">{locale === 'zh' ? '未激活' : 'Inactive'}</div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 text-center">
          <div className="text-3xl mb-2">📂</div>
          <div className="text-2xl font-bold text-purple-600">{Object.keys(stats.byType).length}</div>
          <div className="text-sm text-slate-500">{locale === 'zh' ? '类型数' : 'Types'}</div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {(['all', 'assessment', 'training', 'ui', 'core'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              filter === type
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {type === 'all' ? (locale === 'zh' ? '全部' : 'All') : getTypeIcon(type)} {getTypeLabel(type)}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredPlugins.map(plugin => (
          <div
            key={plugin.id}
            className={`bg-white rounded-2xl p-6 border-2 transition-all hover:shadow-lg cursor-pointer ${
              activePlugins.includes(plugin.id)
                ? 'border-green-200 hover:border-green-400'
                : 'border-slate-200 hover:border-blue-300'
            } ${selectedPlugin?.id === plugin.id ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => setSelectedPlugin(plugin)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{getTypeIcon(plugin.type)}</span>
                <div>
                  <h3 className="font-bold text-slate-800">{plugin.name}</h3>
                  <p className="text-xs text-slate-500">v{plugin.version} • {plugin.author}</p>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getTypeColor(plugin.type)}`}>
                {getTypeLabel(plugin.type)}
              </span>
            </div>

            <p className="text-sm text-slate-600 mb-4 line-clamp-2">{plugin.description}</p>

            {plugin.dependencies.length > 0 && (
              <div className="mb-3">
                <span className="text-xs text-slate-500">{locale === 'zh' ? '依赖：' : 'Deps: '}</span>
                {plugin.dependencies.map(dep => (
                  <span key={dep} className="inline-block px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs mr-1">
                    {dep}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${activePlugins.includes(plugin.id) ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                <span className="text-xs text-slate-500">
                  {activePlugins.includes(plugin.id) 
                    ? (locale === 'zh' ? '已激活' : 'Active') 
                    : (locale === 'zh' ? '未激活' : 'Inactive')}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); handleTogglePlugin(plugin.id); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activePlugins.includes(plugin.id)
                      ? 'bg-red-50 text-red-700 hover:bg-red-100'
                      : 'bg-green-50 text-green-700 hover:bg-green-100'
                  }`}
                >
                  {activePlugins.includes(plugin.id) 
                    ? (locale === 'zh' ? '停用' : 'Deactivate') 
                    : (locale === 'zh' ? '启用' : 'Activate')}
                </button>
                {!plugin.autoLoad && (
                  <button
                    onClick={(e) => { e.stopPropagation(); handleUninstall(plugin.id); }}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    {locale === 'zh' ? '卸载' : 'Uninstall'}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPlugins.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-200">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">
            {locale === 'zh' ? '暂无插件' : 'No Plugins'}
          </h3>
          <p className="text-slate-500">
            {locale === 'zh' ? '该分类下没有插件' : 'No plugins in this category'}
          </p>
        </div>
      )}

      {selectedPlugin && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-800">{selectedPlugin.name}</h2>
            <button
              onClick={() => setSelectedPlugin(null)}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
            >
              ✕
            </button>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-50 rounded-xl p-3">
                <span className="text-slate-500">{locale === 'zh' ? '版本' : 'Version'}</span>
                <p className="font-medium text-slate-800">{selectedPlugin.version}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <span className="text-slate-500">{locale === 'zh' ? '作者' : 'Author'}</span>
                <p className="font-medium text-slate-800">{selectedPlugin.author}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <span className="text-slate-500">{locale === 'zh' ? '类型' : 'Type'}</span>
                <p className="font-medium text-slate-800">{getTypeLabel(selectedPlugin.type)}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <span className="text-slate-500">{locale === 'zh' ? '状态' : 'Status'}</span>
                <p className={`font-medium ${activePlugins.includes(selectedPlugin.id) ? 'text-green-600' : 'text-slate-500'}`}>
                  {activePlugins.includes(selectedPlugin.id) 
                    ? (locale === 'zh' ? '已激活' : 'Active') 
                    : (locale === 'zh' ? '未激活' : 'Inactive')}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 mb-2">{locale === 'zh' ? '描述' : 'Description'}</h3>
              <p className="text-slate-600 text-sm">{selectedPlugin.description}</p>
            </div>

            {selectedPlugin.permissions.length > 0 && (
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">{locale === 'zh' ? '权限' : 'Permissions'}</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPlugin.permissions.map(perm => (
                    <span key={perm} className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium border border-amber-200">
                      🔒 {perm}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedPlugin.dependencies.length > 0 && (
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">{locale === 'zh' ? '依赖' : 'Dependencies'}</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPlugin.dependencies.map(dep => (
                    <span key={dep} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-200">
                      📎 {dep}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
