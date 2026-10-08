"use client";
import { useEffect } from "react";

// Next.js keeps this page's stylesheet (with Preflight) attached after client-side
// navigation, so link clicks here are kept from the router and load the next page fully.
export default function FullPageExits() {
  useEffect(() => {
    const leaveWithFullLoad = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (target?.closest("a[href]")) event.stopPropagation();
    };
    window.addEventListener("click", leaveWithFullLoad, true);
    return () => window.removeEventListener("click", leaveWithFullLoad, true);
  }, []);
  return null;
}
