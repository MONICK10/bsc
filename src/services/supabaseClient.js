// Supabase client initialization
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if credentials are properly configured (not just placeholder values)
const isConfigured = SUPABASE_URL && 
  SUPABASE_ANON_KEY && 
  SUPABASE_URL !== 'https://example.supabase.co' &&
  SUPABASE_ANON_KEY !== 'your-anon-key-here';

if (!isConfigured) {
  console.warn(
    '⚠️ Supabase credentials not properly configured in .env file\n' +
    'Please add your actual Supabase URL and anon key to .env\n' +
    'See QUICK_START_ADMIN.md for setup instructions'
  );
}

// Create client with actual credentials if available, otherwise create a placeholder
export const supabase = isConfigured 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : {
      from: () => ({ select: () => Promise.resolve({ data: [], error: new Error('Supabase not configured') }) }),
      storage: { from: () => ({ upload: () => Promise.reject(new Error('Supabase not configured')) }) }
    };
