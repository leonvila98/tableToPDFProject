import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = process.env.SUPABASE_API_URL;
const SUPABASE_TOKEN = process.env.SUPABASE_TOKEN;

export const supabase = createClient(SUPABASE_URL, SUPABASE_TOKEN);
