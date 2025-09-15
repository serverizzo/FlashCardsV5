import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Expo docs mention this is fine to be public
const supabaseUrl = "https://fnvfgyeuhqztpifhdofb.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZudmZneWV1aHF6dHBpZmhkb2ZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxNzI4MzMsImV4cCI6MjA3Mjc0ODgzM30.bI0hqNqc7rpfaHwOa-BMe-cHtwcgpe2KuHlRZpk3IYo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});