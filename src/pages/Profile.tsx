import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { getTranslation } from '../i18n';
import { authService } from '../services/auth';

export const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, initializeAuth, locale } = useAppStore();
  const i18n = getTranslation(locale);

  // 表单状态
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 密码修改状态
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // 初始化
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [isAuthenticated, user, navigate]);

  // 退出时清理
  useEffect(() => {
    return () => {
      setSuccess(null);
      setError(null);
      setPasswordError(null);
      setPasswordSuccess(null);
    };
  }, []);

  // 保存个人资料
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await authService.updateProfile({
        username,
        email
      });

      if (result.success && result.user) {
        setSuccess(i18n.profile.profileUpdated);
        setEditMode(false);
        initializeAuth(); // 刷新用户信息
      } else {
        setError(result.error || i18n.common.error);
      }
    } catch {
      setError(i18n.common.error);
    } finally {
      setLoading(false);
    }
  };

  // 修改密码
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordError(null);
    setPasswordSuccess(null);

    // 验证
    if (!currentPassword) {
      setPasswordError(i18n.auth.passwordRequired);
      setPasswordLoading(false);
      return;
    }
    if (!newPassword) {
      setPasswordError(i18n.auth.passwordRequired);
      setPasswordLoading(false);
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError(i18n.auth.passwordRequired);
      setPasswordLoading(false);
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordError(i18n.auth.passwordsDoNotMatch);
      setPasswordLoading(false);
      return;
    }

    try {
      const result = await authService.changePassword(currentPassword, newPassword);

      if (result.success) {
        setPasswordSuccess(i18n.profile.passwordChanged);
        setShowPasswordForm(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      } else {
        setPasswordError(result.error || i18n.common.error);
      }
    } catch {
      setPasswordError(i18n.common.error);
    } finally {
      setPasswordLoading(false);
    }
  };

  // 格式化日期
  const formatDate = (date: Date | string) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!isAuthenticated) {
    return null; // 会被导航重定向
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* 导航返回 */}
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-slate-600 hover:text-blue-600 transition-colors"
          >
            ← {i18n.common.back}
          </Link>
        </div>

        {/* 页面标题 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-center gap-4 mb-6">
            {user?.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.username} 
                className="w-20 h-20 rounded-full"
              />
            ) : (
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl">
                {user?.username?.[0]?.toUpperCase() || 'U'}
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                {user?.username}
              </h1>
              <p className="text-slate-500">{user?.email}</p>
            </div>
            {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {i18n.profile.editProfile}
              </button>
            )}
          </div>

          {/* 成功/错误提示 */}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
              {success}
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {editMode ? (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {i18n.auth.username}
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {i18n.auth.email}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                >
                  {loading ? i18n.common.loading : i18n.profile.saveChanges}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditMode(false);
                    if (user) {
                      setUsername(user.username);
                      setEmail(user.email);
                    }
                  }}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
                >
                  {i18n.common.cancel}
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-500">{i18n.profile.memberSince}:</span>
                <p className="font-medium text-slate-800">{formatDate(user?.createdAt || '')}</p>
              </div>
              {user?.lastLoginAt && (
                <div>
                  <span className="text-slate-500">{i18n.profile.lastLogin}</span>
                  <p className="font-medium text-slate-800">{formatDate(user.lastLoginAt)}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 修改密码 */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {!showPasswordForm ? (
            <div>
              <h2 className="text-lg font-semibold text-slate-800 mb-4">{i18n.profile.changePassword}</h2>
              <button
                onClick={() => setShowPasswordForm(true)}
                className="w-full px-4 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {i18n.profile.changePassword}
              </button>
            </div>
          ) : (
            <form onSubmit={handleChangePassword} className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-800">{i18n.profile.changePassword}</h2>
              
              {passwordSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                  {passwordSuccess}
                </div>
              )}
              {passwordError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {passwordError}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {i18n.profile.currentPassword}
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {i18n.profile.newPassword}
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {i18n.profile.confirmNewPassword}
                </label>
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                >
                  {passwordLoading ? i18n.common.loading : i18n.profile.saveChanges}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordForm(false);
                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmNewPassword('');
                    setPasswordError(null);
                    setPasswordSuccess(null);
                  }}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
                >
                  {i18n.common.cancel}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
