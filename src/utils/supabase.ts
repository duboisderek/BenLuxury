import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Define supabase client variable and helpers, then export at the end
let supabase: SupabaseClient;

async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

if (!supabaseUrl || !supabaseKey) {
  // eslint-disable-next-line no-console
  console.warn('Supabase env vars missing. Using mock supabase client.');

  type QueryBuilder = {
    select: (..._args: unknown[]) => QueryBuilder;
    order: (..._args: unknown[]) => Promise<{ data: null; error: { message: string } }>;
    eq: (..._args: unknown[]) => QueryBuilder;
    single: () => Promise<{ data: null; error: { message: string } }>;
    insert: (..._args: unknown[]) => Promise<{ data: null; error: { message: string } }>;
  };

  const errorResult = { data: null, error: { message: 'Supabase not configured' } } as const;

  const builder: QueryBuilder = {
    select: () => builder,
    order: async () => errorResult,
    eq: () => builder,
    single: async () => errorResult,
    insert: async () => errorResult,
  };

  // @ts-expect-error minimal mock to satisfy usage in codebase
  supabase = {
    from: () => builder,
    auth: {
      getUser: async () => ({ data: { user: null }, error: { message: 'Supabase not configured' } }),
      signInWithPassword: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
      signOut: async () => ({ error: { message: 'Supabase not configured' } }),
    },
  };

  // Override helpers to no-op/return null in mock mode
  getCurrentUser = async () => null;
  signOut = async () => { return; };
} else {
  supabase = createClient(supabaseUrl, supabaseKey);
}

export { supabase, getCurrentUser, signOut };