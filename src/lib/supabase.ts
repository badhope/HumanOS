import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return (
    supabaseUrl !== '' &&
    supabaseUrl !== 'your_supabase_project_url' &&
    supabaseAnonKey !== '' &&
    supabaseAnonKey !== 'your_supabase_anon_key'
  );
};

const noopPromise = <T = null>() => Promise.resolve({ data: null as T, error: null });
const noopChain = () => ({
  select: () => ({
    order: () => ({
      limit: () => noopPromise(),
    }),
    eq: () => ({
      single: () => noopPromise(),
      order: () => ({
        limit: () => noopPromise(),
      }),
    }),
    single: () => noopPromise(),
    limit: () => noopPromise(),
  }),
  insert: () => ({
    select: () => ({
      single: () => noopPromise(),
    }),
  }),
  update: () => ({
    eq: () => noopPromise(),
    select: () => ({
      single: () => noopPromise(),
    }),
  }),
  upsert: () => ({
    select: () => ({
      single: () => noopPromise(),
    }),
  }),
  delete: () => ({
    eq: () => noopPromise(),
  }),
});

function createSafeClient(): SupabaseClient {
  if (isSupabaseConfigured()) {
    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        flowType: 'pkce',
      },
    });
  }

  return {
    auth: {
      signUp: () => Promise.resolve({ data: { user: null, session: null }, error: null }),
      signInWithPassword: () => Promise.resolve({ data: { user: null, session: null }, error: null }),
      signInWithOAuth: () => Promise.resolve({ data: { provider: '', url: '' }, error: null }),
      signOut: () => Promise.resolve({ error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      updateUser: () => Promise.resolve({ data: { user: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      setSession: () => Promise.resolve({ data: { session: null }, error: null }),
      resetPasswordForEmail: () => Promise.resolve({ data: {}, error: null }),
    },
    from: () => noopChain(),
  } as unknown as SupabaseClient;
}

export const supabase = createSafeClient();