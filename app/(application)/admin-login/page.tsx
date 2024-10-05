import { redirect } from "next/navigation";
import { isUserAuthenticated } from "@/lib/firebase/firebase-admin";
import { LoginItems } from "@/components/admin/login-items";

export default async function AdminLoginPage() {
  if (await isUserAuthenticated()) redirect("/admin-dashboard");

  return (
    <div>
      <p>Only admin accounts can login</p>
      <LoginItems />
    </div>
  );
}
