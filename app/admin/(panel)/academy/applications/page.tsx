import { supabase } from "@/lib/supabase";
import ApplicationsManager, {
  type AdminAcademyApplication,
} from "@/app/admin/(panel)/academy/applications/ApplicationsManager";

export const dynamic = "force-dynamic";

export default async function AdminAcademyApplicationsPage() {
  const { data } = await supabase
    .from("academy_applications")
    .select(
      "id, application_no, application_type, track, full_name, email, phone, city, education, experience_level, resume_link, availability, notes, internal_notes, status, assigned_to, follow_up_at, last_contacted_at, created_at, updated_at"
    )
    .order("created_at", { ascending: false })
    .limit(500);

  return <ApplicationsManager initialApplications={(data ?? []) as AdminAcademyApplication[]} />;
}
