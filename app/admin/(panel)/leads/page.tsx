import { supabase } from "@/lib/supabase";
import LeadsManager, { type AdminLead } from "@/app/admin/(panel)/leads/LeadsManager";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const { data } = await supabase
    .from("leads")
    .select(
      "id, name, email, phone, websitestatus, goals, channels, source, status, created_at, updated_at"
    )
    .order("created_at", { ascending: false })
    .limit(500);

  return <LeadsManager initialLeads={(data ?? []) as AdminLead[]} />;
}
