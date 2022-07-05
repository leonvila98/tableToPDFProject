import { createClient } from '@supabase/supabase-js';
const API = process.env.REACT_APP_SUPABASE_API_URL;
const TOKEN = process.env.REACT_APP_SUPABASE_TOKEN;

export const supabase = createClient(API, TOKEN);
