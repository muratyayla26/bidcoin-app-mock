import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/firebase/firebase-admin";
import { DashboardItems } from "@/components/admin/dashboard-items";

export default async function AdminDashboardPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) redirect("/admin-login");

  return (
    <div>
      <h1>Admin Dashboard Page</h1>
      <DashboardItems
        currentUser={currentUser.toJSON() as typeof currentUser}
      />
    </div>
  );
}
