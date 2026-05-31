import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { getTranslation } from '../i18n';
import type { RegisterData } from '../types/auth';

export const Register = () => {
  const navigate = useNavigate();
  const { register, authLoading, authError, isAuthenticated, clearAuthError, locale } = useAppStore();
  const i18n = getTranslation(locale);

  const [formData, setFormData] = useState<RegisterData>({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [touched, setTouched] = useState<Partial<Record<keyof RegisterData, boolean>>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [termsTouched, setTermsTouched] = useState(false);

  // 验证错误
  const getErrors = () => {
    const errors: Partial<RegisterData> & { terms?: string } = {};
    
    if (touched.email) {
      if (!formData.email) {
        errors.email = i18n.auth.emailRequired;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
      }
    }
    
    if (touched.username) {
      if (!formData.username) {
        errors.username = i18n.auth.usernameRequired;
      } else if (formData.username.length < 3) {
        errors.username = 'Username must be at least 3 characters';
      } else if (formData.username.length > 20) {
        errors.username = 'Username must be less than 20 characters';
      } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
        errors.username = 'Username can only contain letters, numbers, and underscores';
      }
    }
    
    if (touched.password) {
      if (!formData.password) {
        errors.password = i18n.auth.passwordRequired;
      } else if (formData.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
      } else if (formData.password.length > 50) {
        errors.password = 'Password must be less than 50 characters';
      }
    }
    
    if (touched.confirmPassword) {
      if (!formData.confirmPassword) {
        errors.confirmPassword = i18n.auth.confirmPasswordRequired;
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = i18n.auth.passwordsDoNotMatch;
      }
    }

    if (termsTouched && !agreedTerms) {
      errors.terms = i18n.auth.termsRequired;
    }
    
    return errors;
  };

  const errors = getErrors();
  const isValid = Object.keys(errors).length === 0 && agreedTerms;

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      clearAuthError();
      setShowSuccess(false);
    };
  }, [clearAuthError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, username: true, password: true, confirmPassword: true });
    setTermsTouched(true);
    
    if (!isValid) {
      return;
    }

    const success = await register(formData);
    if (success) {
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
  };

  const handleChange = (field: keyof RegisterData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
    setTouched({ ...touched, [field]: true });
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
            {i18n.auth.createAccount}
          </h1>
          <p className="text-slate-600">
            {i18n.auth.registerSubtitle}
          </p>
        </div>

        {/* 成功提示 */}
        {showSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-4 text-center">
            {i18n.auth.success} {i18n.auth.registerSuccess}
          </div>
        )}

        {/* 注册表单 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 错误提示 */}
            {authError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {authError}
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
                value={formData.email}
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

            {/* 用户名输入 */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-2">
                {i18n.auth.username}
              </label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={handleChange('username')}
                onBlur={() => setTouched({ ...touched, username: true })}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.username ? 'border-red-500 bg-red-50' : 'border-slate-300 hover:border-slate-400'
                }`}
                placeholder="johndoe"
                autoComplete="username"
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username}</p>
              )}
              {touched.username && !errors.username && (
                <p className="mt-1 text-xs text-slate-500">
                  3-20 characters, letters, numbers, and underscores only
                </p>
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
                value={formData.password}
                onChange={handleChange('password')}
                onBlur={() => setTouched({ ...touched, password: true })}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.password ? 'border-red-500 bg-red-50' : 'border-slate-300 hover:border-slate-400'
                }`}
                placeholder="••••••••"
                autoComplete="new-password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
              {touched.password && !errors.password && (
                <p className="mt-1 text-xs text-slate-500">
                  At least 6 characters
                </p>
              )}
            </div>

            {/* 确认密码输入 */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">
                {i18n.auth.confirmPassword}
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange('confirmPassword')}
                onBlur={() => setTouched({ ...touched, confirmPassword: true })}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-slate-300 hover:border-slate-400'
                }`}
                placeholder="••••••••"
                autoComplete="new-password"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            {/* 服务条款 */}
            <div className="flex items-start gap-2">
              <input
                id="terms"
                type="checkbox"
                checked={agreedTerms}
                onChange={(e) => {
                  setAgreedTerms(e.target.checked);
                  setTermsTouched(true);
                }}
                className="mt-1 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="terms" className="text-sm text-slate-700">
                {i18n.auth.agreeTerms}{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors.terms && (
              <p className="text-sm text-red-600">{errors.terms}</p>
            )}

            {/* 提交按钮 */}
            <button
              type="submit"
              disabled={authLoading || !isValid}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {authLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {i18n.auth.registering}
                </>
              ) : (
                i18n.auth.register
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

            {/* 社交注册按钮 */}
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

          {/* 登录链接 */}
          <div className="mt-6 text-center">
            <p className="text-slate-600">
              {i18n.auth.hasAccount}{' '}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                {i18n.auth.loginHere}
              </Link>
            </p>
          </div>
        </div>

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
