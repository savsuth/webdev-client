import { ReactNode } from "react";
// kambaz.css loads Tailwind utilities without Preflight, so Kambaz keeps the browser's default headings and lists.
import "./kambaz.css";
import KambazNavigation from "./Navigation";
import { AccountProvider } from "./account/AccountContext";

export default function KambazLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    // Every Kambaz screen sits inside the provider so it can read the signed-in user.
    <AccountProvider>
      <div id="wd-kambaz" className="font-sans">
        <KambazNavigation />
        <div className="wd-main-content-offset p-3">{children}</div>
      </div>
    </AccountProvider>
  );
}
