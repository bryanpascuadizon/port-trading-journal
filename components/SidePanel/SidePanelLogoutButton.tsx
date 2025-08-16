"use client";

import { signOutUser } from "@/lib/actions/auth-actions";
import { Power } from "lucide-react";

const SidePanelLogoutButton = () => {
  const handleLogout = async () => {
    await signOutUser();
  };
  return (
    <div
      className="flex gap-2 items-center cursor-pointer"
      onClick={handleLogout}
    >
      <Power className="h-5" />
      <p>Logout</p>
    </div>
  );
};

export default SidePanelLogoutButton;
