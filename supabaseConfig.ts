
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xiivmyvfsxluwtfcfhsp.supabase.co";
const supabaseAnonKey = "sb_publishable_IhaIUukNly6KWNSKbv18YA_nlVxSeSy";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
