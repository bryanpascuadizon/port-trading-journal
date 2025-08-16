"use client";

import { signOutUser } from "@/lib/actions/auth-actions";
import { Power } from "lucide-react";
import { useTransition } from "react";
import LoaderCircleIcon from "../utils/LoaderCircleIcon";

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
      {isLogoutPending ? <LoaderCircleIcon /> : <Power className="h-5" />}

      <p>Logout</p>
    </div>
  );
};

export default SidePanelLogoutButton;
