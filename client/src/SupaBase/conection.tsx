import { createClient } from '@supabase/supabase-js'
const supaUrl = process.env.REACT_APP_SUPABASE_URL;
const supaKey = process.env.REACT_APP_SUPABSE_KEY;

const supabaseUrl = supaUrl;
const supabaseKey = supaKey;
export const supabase = createClient(supabaseUrl ? supabaseUrl : '', supabaseKey ? supabaseKey : '')
