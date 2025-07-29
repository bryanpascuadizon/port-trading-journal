"use client";

import { signOutUser } from "@/lib/actions/auth-actions";
import { Icons } from "@/lib/icons";

const SidePanelLogoutButton = () => {
  const handleLogout = async () => {
    await signOutUser();
  };
  return (
    <div
      className="flex gap-2 items-center cursor-pointer"
      onClick={handleLogout}
    >
      <Icons.logout className="w-5 h-5" />
      <p>Logout</p>
    </div>
  );
};

export default SidePanelLogoutButton;
