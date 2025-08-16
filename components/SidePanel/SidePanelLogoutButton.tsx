"use client";

import { signOutUser } from "@/lib/actions/auth-actions";
import { LoaderCircle, Power } from "lucide-react";
import { useTransition } from "react";

const SidePanelLogoutButton = () => {
  const [isLogoutPending, startLogoutTransition] = useTransition();
  const handleLogout = () => {
    startLogoutTransition(async () => {
      await signOutUser();
    });
  };
  return (
    <div
      className="flex gap-2 items-center cursor-pointer"
      onClick={handleLogout}
    >
      {isLogoutPending ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <Power className="h-5" />
      )}

      <p>Logout</p>
    </div>
  );
};

export default SidePanelLogoutButton;
