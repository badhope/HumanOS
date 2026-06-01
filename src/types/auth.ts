export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  createdAt: Date;
  lastLoginAt?: Date;
  provider?: 'email' | 'google' | 'github';
  metadata?: Record<string, unknown>;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  username: string;
  password: string;
  confirmPassword?: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface ValidationError {
  field: string;
  message: string;
}