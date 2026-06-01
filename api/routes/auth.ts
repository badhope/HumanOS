import { Router, type Request, type Response } from 'express';
import { createSupabaseClient, isSupabaseConfigured } from '../utils/supabase.js';

const router = Router();

interface RegisterRequest {
  email: string;
  password: string;
  username: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

router.post('/register', async (req: Request<{}, {}, RegisterRequest>, res: Response): Promise<void> => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    res.status(400).json({
      success: false,
      error: 'email, password, and username are required',
    });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({
      success: false,
      error: 'Invalid email format',
    });
    return;
  }

  if (password.length < 6) {
    res.status(400).json({
      success: false,
      error: 'Password must be at least 6 characters',
    });
    return;
  }

  if (username.length < 3) {
    res.status(400).json({
      success: false,
      error: 'Username must be at least 3 characters',
    });
    return;
  }

  if (!isSupabaseConfigured()) {
    res.status(503).json({
      success: false,
      error: 'Supabase backend not configured',
    });
    return;
  }

  const supabase = createSupabaseClient();

  try {
    const { data: authData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username, display_name: username },
      },
    });

    if (error) {
      if (error.message.includes('already registered') || error.message.includes('already exists')) {
        res.status(409).json({
          success: false,
          error: 'This email is already registered',
        });
        return;
      }
      res.status(400).json({
        success: false,
        error: error.message,
      });
      return;
    }

    res.json({
      success: true,
      user: authData.user
        ? {
            id: authData.user.id,
            email: authData.user.email,
            username,
            created_at: authData.user.created_at,
          }
        : null,
      session: authData.session
        ? {
            access_token: authData.session.access_token,
            expires_in: authData.session.expires_in,
          }
        : null,
      message: authData.session
        ? 'Registration successful'
        : 'Check your email to confirm your account',
    });
  } catch {
    res.status(500).json({
      success: false,
      error: 'Internal server error during registration',
    });
  }
});

router.post('/login', async (req: Request<{}, {}, LoginRequest>, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      success: false,
      error: 'email and password are required',
    });
    return;
  }

  if (!isSupabaseConfigured()) {
    res.status(503).json({
      success: false,
      error: 'Supabase backend not configured',
    });
    return;
  }

  const supabase = createSupabaseClient();

  try {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes('Invalid login')) {
        res.status(401).json({
          success: false,
          error: 'Incorrect email or password',
        });
        return;
      }
      res.status(400).json({
        success: false,
        error: error.message,
      });
      return;
    }

    if (!authData.user || !authData.session) {
      res.status(401).json({
        success: false,
        error: 'Login failed. Please try again.',
      });
      return;
    }

    const username = (authData.user.user_metadata?.username as string) ||
                     (authData.user.user_metadata?.display_name as string) ||
                     email.split('@')[0];

    res.json({
      success: true,
      user: {
        id: authData.user.id,
        email: authData.user.email,
        username,
        avatar_url: authData.user.user_metadata?.avatar_url ||
                    authData.user.user_metadata?.picture,
        created_at: authData.user.created_at,
        last_sign_in_at: authData.user.last_sign_in_at,
      },
      session: {
        access_token: authData.session.access_token,
        expires_in: authData.session.expires_in,
      },
    });
  } catch {
    res.status(500).json({
      success: false,
      error: 'Internal server error during login',
    });
  }
});

router.post('/logout', async (req: Request, res: Response): Promise<void> => {
  const authorization = req.headers.authorization;
  const token = authorization?.startsWith('Bearer ') ? authorization.slice(7) : null;

  if (!isSupabaseConfigured()) {
    res.status(503).json({
      success: false,
      error: 'Supabase backend not configured',
    });
    return;
  }

  try {
    const supabase = createSupabaseClient();

    if (token) {
      await supabase.auth.signOut();
    }

    res.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch {
    res.status(500).json({
      success: false,
      error: 'Internal server error during logout',
    });
  }
});

router.get('/me', async (req: Request, res: Response): Promise<void> => {
  const authorization = req.headers.authorization;
  const token = authorization?.startsWith('Bearer ') ? authorization.slice(7) : null;

  if (!token) {
    res.status(401).json({
      success: false,
      error: 'No token provided',
    });
    return;
  }

  if (!isSupabaseConfigured()) {
    res.status(503).json({
      success: false,
      error: 'Supabase backend not configured',
    });
    return;
  }

  const supabase = createSupabaseClient();

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      res.status(401).json({
        success: false,
        error: 'Invalid or expired token',
      });
      return;
    }

    const username = (user.user_metadata?.username as string) ||
                     (user.user_metadata?.display_name as string) ||
                     (user.email?.split('@')[0] || 'user');

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        username,
        avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture,
        created_at: user.created_at,
        last_sign_in_at: user.last_sign_in_at,
        provider: user.app_metadata?.provider,
      },
    });
  } catch {
    res.status(500).json({
      success: false,
      error: 'Internal server error getting user',
    });
  }
});

export default router;