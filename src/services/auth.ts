import type { User, AuthCredentials, RegisterData, AuthResponse, ValidationError } from '../types/auth';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const STORAGE_KEY_USER = 'mindmirror_user';
const STORAGE_KEY_TOKEN = 'mindmirror_token';
const API_DELAY = 500;

function generateTokenFallback(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return 'token_' + Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('') + Date.now().toString(36);
}

function generateUserIdFallback(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return 'user_' + Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

async function hashPasswordFallback(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'mindmirror_salt_2024');
  if (crypto.subtle) {
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
  const hex = window.btoa(String.fromCharCode(...Array.from(data)));
  let hash = 0;
  for (let i = 0; i < hex.length; i++) {
    hash = ((hash << 5) - hash) + hex.charCodeAt(i);
    hash |= 0;
  }
  return 'sha256_' + Math.abs(hash).toString(16).padStart(16, '0');
}

function mapSupabaseUserToUser(supabaseUser: {
  id: string;
  email?: string;
  user_metadata?: Record<string, unknown>;
  app_metadata?: Record<string, unknown>;
  created_at?: string;
  last_sign_in_at?: string;
  identities?: Array<{ provider: string }>;
}): User {
  const provider = supabaseUser.app_metadata?.provider as string || 'email';
  return {
    id: supabaseUser.id,
    email: supabaseUser.email || '',
    username: (supabaseUser.user_metadata?.username as string) ||
              (supabaseUser.user_metadata?.full_name as string) ||
              (supabaseUser.email?.split('@')[0] || 'user'),
    avatar: supabaseUser.user_metadata?.avatar_url as string ||
            supabaseUser.user_metadata?.picture as string,
    createdAt: supabaseUser.created_at ? new Date(supabaseUser.created_at) : new Date(),
    lastLoginAt: supabaseUser.last_sign_in_at ? new Date(supabaseUser.last_sign_in_at) : new Date(),
    provider: provider as 'email' | 'google' | 'github',
  };
}

export class AuthService {
  private static instance: AuthService;

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private delay(ms: number = API_DELAY): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  validateEmail(email: string): string | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return null;
  }

  validateUsername(username: string): string | null {
    if (!username) return 'Username is required';
    if (username.length < 3) return 'Username must be at least 3 characters';
    if (username.length > 20) return 'Username must be less than 20 characters';
    if (!/^[a-zA-Z0-9_]+$/.test(username)) return 'Username can only contain letters, numbers, and underscores';
    return null;
  }

  validatePassword(password: string): string | null {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    if (password.length > 50) return 'Password must be less than 50 characters';
    return null;
  }

  validateRegisterData(data: RegisterData): ValidationError[] {
    const errors: ValidationError[] = [];
    const emailError = this.validateEmail(data.email);
    if (emailError) errors.push({ field: 'email', message: emailError });
    const usernameError = this.validateUsername(data.username);
    if (usernameError) errors.push({ field: 'username', message: usernameError });
    const passwordError = this.validatePassword(data.password);
    if (passwordError) errors.push({ field: 'password', message: passwordError });
    if (data.password !== data.confirmPassword) {
      errors.push({ field: 'confirmPassword', message: 'Passwords do not match' });
    }
    return errors;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const errors = this.validateRegisterData(data);
    if (errors.length > 0) {
      return { success: false, error: errors[0].message };
    }

    if (isSupabaseConfigured()) {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: { username: data.username, display_name: data.username },
        },
      });

      if (error) {
        if (error.message?.includes('already registered') || error.message?.includes('already exists')) {
          return { success: false, error: 'This email is already registered' };
        }
        return { success: false, error: error.message };
      }

      if (authData.user) {
        const user = mapSupabaseUserToUser(authData.user);
        user.username = data.username;

        if (authData.session?.access_token) {
          localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
          localStorage.setItem(STORAGE_KEY_TOKEN, authData.session.access_token);
        }

        return { success: true, user, token: authData.session?.access_token };
      }

      return { success: true, user: undefined, token: undefined, error: 'Check your email to confirm your account' };
    }

    return this.registerFallback(data);
  }

  private async registerFallback(data: RegisterData): Promise<AuthResponse> {
    await this.delay();

    const existingUsers = this.getStoredUsers();
    if (existingUsers.some(u => u.email === data.email)) {
      return { success: false, error: 'This email is already registered' };
    }
    if (existingUsers.some(u => u.username === data.username)) {
      return { success: false, error: 'This username is already taken' };
    }

    const passwordHash = await hashPasswordFallback(data.password);
    const newUser: User = {
      id: generateUserIdFallback(),
      email: data.email,
      username: data.username,
      avatar: this.generateAvatar(data.username),
      createdAt: new Date(),
      lastLoginAt: new Date(),
      provider: 'email',
    };

    existingUsers.push(newUser);
    localStorage.setItem('mindmirror_users', JSON.stringify(existingUsers));
    localStorage.setItem(`mindmirror_password_${newUser.id}`, passwordHash);

    const token = generateTokenFallback();
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));
    localStorage.setItem(STORAGE_KEY_TOKEN, token);

    return { success: true, user: newUser, token };
  }

  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    const emailError = this.validateEmail(credentials.email);
    if (emailError) return { success: false, error: emailError };
    const passwordError = this.validatePassword(credentials.password);
    if (passwordError) return { success: false, error: passwordError };

    if (isSupabaseConfigured()) {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        if (error.message?.includes('Invalid login')) {
          return { success: false, error: 'Incorrect email or password' };
        }
        return { success: false, error: error.message };
      }

      if (authData.user && authData.session) {
        const user = mapSupabaseUserToUser(authData.user);
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
        localStorage.setItem(STORAGE_KEY_TOKEN, authData.session.access_token);
        return { success: true, user, token: authData.session.access_token };
      }

      return { success: false, error: 'Login failed. Please try again.' };
    }

    return this.loginFallback(credentials);
  }

  private async loginFallback(credentials: AuthCredentials): Promise<AuthResponse> {
    await this.delay();

    const users = this.getStoredUsers();
    const user = users.find(u => u.email === credentials.email);
    if (!user) return { success: false, error: 'No account found with this email' };

    const hashKey = `mindmirror_password_${user.id}`;
    const storedHash = localStorage.getItem(hashKey);
    if (!storedHash) return { success: false, error: 'Account error. Please register again.' };

    const inputHash = await hashPasswordFallback(credentials.password);
    if (inputHash !== storedHash) return { success: false, error: 'Incorrect password' };

    user.lastLoginAt = new Date();
    localStorage.setItem('mindmirror_users', JSON.stringify(users));

    const token = generateTokenFallback();
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    localStorage.setItem(STORAGE_KEY_TOKEN, token);

    return { success: true, user, token };
  }

  async loginWithOAuth(provider: 'google' | 'github'): Promise<AuthResponse> {
    if (!isSupabaseConfigured()) {
      return { success: false, error: 'OAuth login requires Supabase backend configuration' };
    }

    const redirectUrl = `${window.location.origin}/auth/callback`;

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: redirectUrl,
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  }

  async handleOAuthCallback(): Promise<AuthResponse> {
    if (!isSupabaseConfigured()) {
      return { success: false, error: 'Supabase not configured' };
    }

    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return { success: false, error: error.message };
    }

    if (data.session?.user) {
      const user = mapSupabaseUserToUser(data.session.user);
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
      localStorage.setItem(STORAGE_KEY_TOKEN, data.session.access_token);
      return { success: true, user, token: data.session.access_token };
    }

    return { success: false, error: 'No session found after OAuth callback' };
  }

  async logout(): Promise<void> {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.removeItem(STORAGE_KEY_TOKEN);
  }

  async resetPasswordForEmail(email: string): Promise<AuthResponse> {
    if (!email) {
      return { success: false, error: 'Email is required' };
    }

    if (isSupabaseConfigured()) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`,
      });
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    }

    return { success: true };
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(STORAGE_KEY_USER);
    if (!userStr) return null;
    try {
      const user = JSON.parse(userStr);
      user.createdAt = new Date(user.createdAt);
      if (user.lastLoginAt) user.lastLoginAt = new Date(user.lastLoginAt);
      return user;
    } catch {
      return null;
    }
  }

  getToken(): string | null {
    return localStorage.getItem(STORAGE_KEY_TOKEN);
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser() && !!this.getToken();
  }

  async restoreSession(): Promise<User | null> {
    if (!isSupabaseConfigured()) {
      return this.getCurrentUser();
    }

    const { data } = await supabase.auth.getSession();
    if (data.session?.user) {
      const user = mapSupabaseUserToUser(data.session.user);
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
      localStorage.setItem(STORAGE_KEY_TOKEN, data.session.access_token);
      return user;
    }

    return this.getCurrentUser();
  }

  private getStoredUsers(): User[] {
    const usersStr = localStorage.getItem('mindmirror_users');
    if (!usersStr) return [];
    try {
      const users = JSON.parse(usersStr);
      return users.map((u: Record<string, unknown>) => ({
        ...u,
        createdAt: new Date(u.createdAt as string),
        lastLoginAt: u.lastLoginAt ? new Date(u.lastLoginAt as string) : undefined,
      }));
    } catch {
      return [];
    }
  }

  generateAvatar(username: string): string {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];
    const color = colors[username.charCodeAt(0) % colors.length];
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=${color.slice(1)}&color=fff&size=128`;
  }

  async updateProfile(updates: Partial<User>): Promise<AuthResponse> {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return { success: false, error: 'Not authenticated' };

    if (updates.username && updates.username !== currentUser.username) {
      const usernameError = this.validateUsername(updates.username);
      if (usernameError) return { success: false, error: usernameError };
    }

    if (isSupabaseConfigured()) {
      const { error } = await supabase.auth.updateUser({
        data: {
          username: updates.username || currentUser.username,
          display_name: updates.username || currentUser.username,
        },
      });

      if (error) return { success: false, error: error.message };
    }

    const updatedUser = { ...currentUser, ...updates };
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updatedUser));

    const users = this.getStoredUsers();
    const idx = users.findIndex(u => u.id === currentUser.id);
    if (idx !== -1) {
      users[idx] = updatedUser;
      localStorage.setItem('mindmirror_users', JSON.stringify(users));
    }

    return { success: true, user: updatedUser, token: this.getToken() || undefined };
  }

  async changePassword(oldPassword: string, newPassword: string): Promise<AuthResponse> {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return { success: false, error: 'Not authenticated' };

    const passwordError = this.validatePassword(newPassword);
    if (passwordError) return { success: false, error: passwordError };

    if (isSupabaseConfigured()) {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) return { success: false, error: error.message };
      return { success: true, user: currentUser, token: this.getToken() || undefined };
    }

    const hashKey = `mindmirror_password_${currentUser.id}`;
    const storedHash = localStorage.getItem(hashKey);
    if (!storedHash) return { success: false, error: 'Password not found. Please register again.' };

    const inputOldHash = await hashPasswordFallback(oldPassword);
    if (inputOldHash !== storedHash) return { success: false, error: 'Current password is incorrect' };

    const newHash = await hashPasswordFallback(newPassword);
    localStorage.setItem(hashKey, newHash);
    return { success: true, user: currentUser, token: this.getToken() || undefined };
  }
}

export const authService = AuthService.getInstance();