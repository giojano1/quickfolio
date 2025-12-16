import React from "react";
import UserBar from "./user-bar";
import { Separator } from "@/components/ui/separator";
import PublicPageActions from "./public-page-actions";

export default function Header() {
  return (
    <header className="h-16 border-b shrink-0 flex items-center justify-between px-4">
      Header
      <div className="flex items-center gap-2">
        <PublicPageActions />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <UserBar />
      </div>
    </header>
  );
}
