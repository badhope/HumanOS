import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { getTranslation } from '../i18n';
import type { AuthCredentials } from '../types/auth';
import { authService } from '../services/auth';

export const Login = () => {
  const navigate = useNavigate();
  const { login, authLoading, authError, isAuthenticated, clearAuthError, locale } = useAppStore();
  const i18n = getTranslation(locale);

  const [credentials, setCredentials] = useState<AuthCredentials>({
    email: '',
    password: ''
  });

  const [touched, setTouched] = useState<Partial<Record<keyof AuthCredentials, boolean>>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // 验证错误
  const getErrors = () => {
    const errors: Partial<AuthCredentials> = {};
    if (touched.email && !credentials.email) {
      errors.email = i18n.auth.emailRequired;
    } else if (touched.email && credentials.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) {
      errors.email = i18n.auth.passwordRequired + ' (invalid format)';
    }
    if (touched.password && !credentials.password) {
      errors.password = i18n.auth.passwordRequired;
    }
    return errors;
  };

  const errors = getErrors();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      clearAuthError();
      setLocalError(null);
      setShowSuccess(false);
    };
  }, [clearAuthError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    setLocalError(null);
    
    if (Object.keys(errors).length > 0) {
      return;
    }

    const success = await login(credentials);
    if (success) {
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) {
      setLocalError(i18n.auth.emailRequired);
      return;
    }
    // 模拟发送重置链接
    setForgotSent(true);
  };

  const handleChange = (field: keyof AuthCredentials) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCredentials({ ...credentials, [field]: e.target.value });
    setTouched({ ...touched, [field]: true });
    if (localError) {
      setLocalError(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* 头部 */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-2xl">
              🧠
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              MindMirror
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            {i18n.auth.welcomeBack}
          </h1>
          <p className="text-slate-600">
            {i18n.auth.loginSubtitle}
          </p>
        </div>

        {/* 成功提示 */}
        {showSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-4 text-center">
            {i18n.auth.success} {i18n.auth.loginSuccess}
          </div>
        )}

        {/* 忘记密码模态框 */}
        {showForgotPassword ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-4">
              {i18n.auth.forgotPasswordTitle}
            </h2>
            <p className="text-slate-600 mb-6">
              {i18n.auth.forgotPasswordDesc}
            </p>

            {forgotSent ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">📧</div>
                <p className="text-green-700 font-medium">
                  {i18n.auth.resetLinkSent}
                </p>
                <button
                  onClick={() => {
                    setShowForgotPassword(false);
                    setForgotEmail('');
                    setForgotSent(false);
                  }}
                  className="mt-6 text-blue-600 hover:text-blue-700 font-medium"
                >
                  {i18n.auth.backToLogin}
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label htmlFor="forgotEmail" className="block text-sm font-medium text-slate-700 mb-2">
                  {i18n.auth.email}
                </label>
                <input
                  id="forgotEmail"
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="name@example.com"
                />
              </div>
              {localError && (
                <div className="text-red-600 text-sm">{localError}</div>
              )}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPassword(false);
                    setForgotEmail('');
                    setLocalError(null);
                  }}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50"
                >
                  {i18n.common.cancel}
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
                >
                  {i18n.auth.sendResetLink}
                </button>
              </div>
            </form>
            )}
          </div>
        ) : (
          /* 登录表单 */
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* 错误提示 */}
              {(authError || localError) && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  {authError || localError}
                </div>
              )}

              {/* 邮箱输入 */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  {i18n.auth.email}
                </label>
                <input
                  id="email"
                  type="email"
                  value={credentials.email}
                  onChange={handleChange('email')}
                  onBlur={() => setTouched({ ...touched, email: true })}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.email ? 'border-red-500 bg-red-50' : 'border-slate-300 hover:border-slate-400'
                  }`}
                  placeholder="name@example.com"
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* 密码输入 */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                  {i18n.auth.password}
                </label>
                <input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={handleChange('password')}
                  onBlur={() => setTouched({ ...touched, password: true })}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.password ? 'border-red-500 bg-red-50' : 'border-slate-300 hover:border-slate-400'
                  }`}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* 忘记密码链接 */}
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  {i18n.auth.forgotPassword}
                </button>
              </div>

              {/* 提交按钮 */}
              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {authLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {i18n.auth.loggingIn}
                  </>
                ) : (
                  i18n.auth.login
                )}
              </button>

              {/* 分隔线 */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-slate-500">
                    {i18n.auth.orContinueWith}
                  </span>
                </div>
              </div>

              {/* 社交登录按钮 */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <span className="text-xl">🔵</span>
                  <span className="text-sm font-medium text-slate-700">Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <span className="text-xl">⚫</span>
                  <span className="text-sm font-medium text-slate-700">GitHub</span>
                </button>
              </div>
            </form>

            {/* 注册链接 */}
            <div className="mt-6 text-center">
              <p className="text-slate-600">
                {i18n.auth.noAccount}{' '}
                <Link
                  to="/register"
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  {i18n.auth.signUpHere}
                </Link>
              </p>
            </div>
          </div>
        )}

        {/* 返回首页 */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-slate-600 hover:text-slate-700 text-sm font-medium"
          >
            ← {i18n.common.back} {i18n.nav.home}
          </Link>
        </div>
      </div>
    </div>
  );
};
