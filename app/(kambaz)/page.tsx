import { redirect } from "next/navigation";

export default function Kambaz() {
  // Send visitors to Sign in until real authentication exists.
  redirect("/account/signin");
}
