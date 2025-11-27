import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

if (!supabaseUrl) throw new Error("❌ SUPABASE_URL missing in ENV");
if (!supabaseServiceRoleKey) throw new Error("❌ SERVICE_ROLE_KEY missing in ENV");

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);
