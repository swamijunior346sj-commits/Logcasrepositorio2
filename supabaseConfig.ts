
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://xiivmyvfsxluwtfcfhsp.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_IhaIUukNly6KWNSKbv18YA_nlVxSeSy";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
