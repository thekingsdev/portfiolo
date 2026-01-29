import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = () => !!supabaseUrl && !!supabaseAnonKey;

// Safely create the client
// If env vars are missing, we create a client with dummy values to prevent runtime crashes at import
// The app should check isSupabaseConfigured() before using the client for real operations
export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder'
);
