import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppStore } from '../store';
import { getTranslation } from '../i18n';
import { LanguageSwitcher } from './LanguageSwitcher';
import { cn } from '../lib/utils';

export function Sidebar() {
  const location = useLocation();
  const { isSidebarOpen, setSidebarOpen, locale, user, isAuthenticated, logout } = useAppStore();
  const i18n = getTranslation(locale);

  const handleLogout = () => {
    logout();
    setSidebarOpen(false);
  };

  // 动态导航项配置
  const navItems = [
    { id: 'home', label: i18n.nav.home, href: '/', icon: '🏠' },
    { id: 'assessments', label: i18n.nav.assessments, href: '/assessments', icon: '📝' },
    { id: 'training', label: i18n.nav.training, href: '/training', icon: '💪' },
    { id: 'dashboard', label: i18n.nav.dashboard, href: '/dashboard', icon: '📊' },
    { id: 'history', label: i18n.nav.history, href: '/history', icon: '📚' },
    { id: 'plugins', label: i18n.nav.plugins || 'Plugins', href: '/plugins', icon: '🧩' },
    { id: 'settings', label: i18n.nav.settings, href: '/settings', icon: '⚙️' },
    { id: 'about', label: i18n.nav.about, href: '/about', icon: 'ℹ️' }
  ];

  // 点击外部区域关闭侧边栏
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSidebarOpen]);

  // 路由变化时关闭侧边栏
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname, setSidebarOpen]);

  // ESC键关闭侧边栏
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSidebarOpen]);

  return (
    <>
      {/* 遮罩层 */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 侧边栏 */}
      <aside
        className={cn(
          'fixed top-0 right-0 h-full w-full sm:w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out',
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* 侧边栏头部 */}
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-xl">
                  🧠
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">{i18n.app.name}</h2>
                  <p className="text-sm text-slate-500">{i18n.app.tagline}</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          {/* 用户区域 */}
          <div className="p-6 border-b border-slate-100">
            {isAuthenticated && user ? (
              // 已登录状态
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                <div className="flex items-center gap-4">
                  <img
                    src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=4F46E5&color=fff&size=128`}
                    alt={user.username}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{user.username}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  <Link
                    to="/profile"
                    className="w-full px-4 py-2 bg-white text-slate-700 rounded-lg hover:bg-slate-100 transition-colors text-sm font-medium text-center block"
                  >
                    {i18n.nav.profile}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                  >
                    {i18n.auth.logout}
                  </button>
                </div>
              </div>
            ) : (
              // 未登录状态
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center text-2xl">
                    👤
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700">
                      {i18n.settings.guestMode}
                    </p>
                    <p className="text-xs text-slate-500">
                      {i18n.settings.loginForMore}
                    </p>
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  <Link
                    to="/login"
                    className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-colors text-sm font-medium text-center block"
                  >
                    {i18n.auth.login}
                  </Link>
                  <Link
                    to="/register"
                    className="w-full px-4 py-2 bg-white text-slate-700 rounded-lg hover:bg-slate-100 transition-colors text-sm font-medium text-center block"
                  >
                    {i18n.auth.register}
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* 语言切换器 */}
          <div className="px-6 pt-4">
            <LanguageSwitcher />
          </div>

          {/* 导航菜单 */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.id}
                    to={item.href}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl transition-all group',
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-blue-600'
                    )}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* 底部信息 */}
          <div className="p-6 border-t border-slate-200">
            <div className="text-center text-sm text-slate-500">
              <p>{i18n.app.copyright}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

// 汉堡菜单按钮组件
export function MenuButton() {
  const { toggleSidebar } = useAppStore();
  
  return (
    <button
      onClick={toggleSidebar}
      className="p-2 text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors md:hidden"
      aria-label="Toggle menu"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  );
}
