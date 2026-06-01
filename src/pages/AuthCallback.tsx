import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { authService } from '../services/auth';

export const AuthCallback = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppStore();
  const [error, setError] = useState<string | null>(null);
  const processed = useRef(false);

  useEffect(() => {
    if (processed.current) return;
    processed.current = true;

    const handleCallback = async () => {
      try {
        const response = await authService.handleOAuthCallback();
        if (response.success && response.user) {
          navigate('/', { replace: true });
        } else {
          setError(response.error || 'OAuth login failed');
          setTimeout(() => navigate('/login', { replace: true }), 3000);
        }
      } catch {
        setError('Failed to complete OAuth login');
        setTimeout(() => navigate('/login', { replace: true }), 3000);
      }
    };

    handleCallback();
  }, [navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
      <div className="text-center">
        {error ? (
          <div className="max-w-md">
            <div className="text-4xl mb-4">❌</div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Login Failed</h1>
            <p className="text-slate-600 mb-4">{error}</p>
            <p className="text-sm text-slate-500">Redirecting to login page...</p>
          </div>
        ) : (
          <div>
            <div className="w-16 h-16 mx-auto mb-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Completing Login</h1>
            <p className="text-slate-600">Please wait while we finish authenticating...</p>
          </div>
        )}
      </div>
    </div>
  );
};