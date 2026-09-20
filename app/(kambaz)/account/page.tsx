import { redirect } from "next/navigation";

export default function AccountPage() {
  // Make Sign in the default screen under /account.
  redirect("/account/signin");
}
