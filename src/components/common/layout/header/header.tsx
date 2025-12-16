import React from "react";
import UserBar from "./user-bar";

export default function Header() {
  return (
    <header className="h-14 border-b shrink-0 flex items-center justify-between px-4">
      Header
      <UserBar />
    </header>
  );
}
