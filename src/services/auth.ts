import type { User, AuthCredentials, RegisterData, AuthResponse, ValidationError } from '../types/auth';

const STORAGE_KEY_USER = 'mindmirror_user';
const STORAGE_KEY_TOKEN = 'mindmirror_token';
const API_DELAY = 500;

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

  private generateToken(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return 'token_' + Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('') + Date.now().toString(36);
  }

  private generateUserId(): string {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return 'user_' + Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  private async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + 'mindmirror_salt_2024');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  validateEmail(email: string): string | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return 'Email is required';
    }
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return null;
  }

  validateUsername(username: string): string | null {
    if (!username) {
      return 'Username is required';
    }
    if (username.length < 3) {
      return 'Username must be at least 3 characters';
    }
    if (username.length > 20) {
      return 'Username must be less than 20 characters';
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return 'Username can only contain letters, numbers, and underscores';
    }
    return null;
  }

  validatePassword(password: string): string | null {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    if (password.length > 50) {
      return 'Password must be less than 50 characters';
    }
    return null;
  }

  validateRegisterData(data: RegisterData): ValidationError[] {
    const errors: ValidationError[] = [];

    const emailError = this.validateEmail(data.email);
    if (emailError) {
      errors.push({ field: 'email', message: emailError });
    }

    const usernameError = this.validateUsername(data.username);
    if (usernameError) {
      errors.push({ field: 'username', message: usernameError });
    }

    const passwordError = this.validatePassword(data.password);
    if (passwordError) {
      errors.push({ field: 'password', message: passwordError });
    }

    if (data.password !== data.confirmPassword) {
      errors.push({ field: 'confirmPassword', message: 'Passwords do not match' });
    }

    return errors;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    await this.delay();

    const errors = this.validateRegisterData(data);
    if (errors.length > 0) {
      return {
        success: false,
        error: errors[0].message
      };
    }

    const existingUsers = this.getStoredUsers();
    if (existingUsers.some(u => u.email === data.email)) {
      return {
        success: false,
        error: 'This email is already registered'
      };
    }

    if (existingUsers.some(u => u.username === data.username)) {
      return {
        success: false,
        error: 'This username is already taken'
      };
    }

    const passwordHash = await this.hashPassword(data.password);

    const newUser: User = {
      id: this.generateUserId(),
      email: data.email,
      username: data.username,
      avatar: this.generateAvatar(data.username),
      createdAt: new Date(),
      lastLoginAt: new Date()
    };

    existingUsers.push(newUser);
    localStorage.setItem('mindmirror_users', JSON.stringify(existingUsers));
    
    const hashKey = `mindmirror_password_${newUser.id}`;
    localStorage.setItem(hashKey, passwordHash);

    const token = this.generateToken();
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));
    localStorage.setItem(STORAGE_KEY_TOKEN, token);

    return {
      success: true,
      user: newUser,
      token
    };
  }

  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    await this.delay();

    const emailError = this.validateEmail(credentials.email);
    if (emailError) {
      return {
        success: false,
        error: emailError
      };
    }

    const passwordError = this.validatePassword(credentials.password);
    if (passwordError) {
      return {
        success: false,
        error: passwordError
      };
    }

    const users = this.getStoredUsers();
    const user = users.find(u => u.email === credentials.email);

    if (!user) {
      return {
        success: false,
        error: 'No account found with this email'
      };
    }

    const hashKey = `mindmirror_password_${user.id}`;
    const storedHash = localStorage.getItem(hashKey);

    if (!storedHash) {
      return {
        success: false,
        error: 'Account error. Please register again.'
      };
    }

    const inputHash = await this.hashPassword(credentials.password);

    if (inputHash !== storedHash) {
      return {
        success: false,
        error: 'Incorrect password'
      };
    }

    user.lastLoginAt = new Date();
    localStorage.setItem('mindmirror_users', JSON.stringify(users));

    const token = this.generateToken();
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    localStorage.setItem(STORAGE_KEY_TOKEN, token);

    return {
      success: true,
      user,
      token
    };
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.removeItem(STORAGE_KEY_TOKEN);
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(STORAGE_KEY_USER);
    if (!userStr) return null;
    
    try {
      const user = JSON.parse(userStr);
      user.createdAt = new Date(user.createdAt);
      if (user.lastLoginAt) {
        user.lastLoginAt = new Date(user.lastLoginAt);
      }
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

  private getStoredUsers(): User[] {
    const usersStr = localStorage.getItem('mindmirror_users');
    if (!usersStr) return [];
    
    try {
      const users = JSON.parse(usersStr);
      return users.map((u: any) => ({
        ...u,
        createdAt: new Date(u.createdAt),
        lastLoginAt: u.lastLoginAt ? new Date(u.lastLoginAt) : undefined
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
    await this.delay();

    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return {
        success: false,
        error: 'Not authenticated'
      };
    }

    const users = this.getStoredUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex === -1) {
      return {
        success: false,
        error: 'User not found'
      };
    }

    if (updates.username && updates.username !== currentUser.username) {
      const usernameError = this.validateUsername(updates.username);
      if (usernameError) {
        return {
          success: false,
          error: usernameError
        };
      }
      if (users.some(u => u.username === updates.username && u.id !== currentUser.id)) {
        return {
          success: false,
          error: 'Username already taken'
        };
      }
    }

    if (updates.email && updates.email !== currentUser.email) {
      const emailError = this.validateEmail(updates.email);
      if (emailError) {
        return {
          success: false,
          error: emailError
        };
      }
      if (users.some(u => u.email === updates.email && u.id !== currentUser.id)) {
        return {
          success: false,
          error: 'Email already in use'
        };
      }
    }

    const updatedUser = { ...users[userIndex], ...updates };
    users[userIndex] = updatedUser;
    
    localStorage.setItem('mindmirror_users', JSON.stringify(users));
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updatedUser));

    return {
      success: true,
      user: updatedUser,
      token: this.getToken() || undefined
    };
  }

  async changePassword(oldPassword: string, newPassword: string): Promise<AuthResponse> {
    await this.delay();

    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return {
        success: false,
        error: 'Not authenticated'
      };
    }

    const oldHashKey = `mindmirror_password_${currentUser.id}`;
    const storedOldHash = localStorage.getItem(oldHashKey);

    if (!storedOldHash) {
      return {
        success: false,
        error: 'Password not found. Please register again.'
      };
    }

    const inputOldHash = await this.hashPassword(oldPassword);

    if (inputOldHash !== storedOldHash) {
      return {
        success: false,
        error: 'Current password is incorrect'
      };
    }

    const newHashError = this.validatePassword(newPassword);
    if (newHashError) {
      return {
        success: false,
        error: newHashError
      };
    }

    const newHash = await this.hashPassword(newPassword);
    localStorage.setItem(oldHashKey, newHash);

    return {
      success: true,
      user: currentUser,
      token: this.getToken() || undefined
    };
  }
}

export const authService = AuthService.getInstance();
