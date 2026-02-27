import CourseApplyForm from "@/app/academy/course/apply/CourseApplyForm";

export default function CourseApplyPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900 sm:px-6">
      <div className="mx-auto w-full max-w-4xl">
        <CourseApplyForm />
      </div>
    </main>
  );
}
