"use client";

import { usePathname } from "next/navigation";
import NavBar from "@/components/NavBar";

export default function LayoutContent({ children }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      {!isHome && <NavBar />}
      <main className={isHome ? "ui-main" : "ui-main mx-auto w-full max-w-[1240px] px-4 py-8 md:px-6 md:py-10"}>
        {children}
      </main>
    </>
  );
}
