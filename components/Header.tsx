"use client";

import { useTransition } from "react";
import { Button } from "./ui/button";
import { signOutUser } from "@/lib/actions/auth-actions";

const Header = () => {
  const [isLogoutPending, startLogoutTransition] = useTransition();

  const handleLogout = () => {
    startLogoutTransition(async () => {
      await signOutUser();
    });
  };
  return (
    <Button className="absolute right-10 top-10" onClick={handleLogout}>
      {isLogoutPending ? "Logging out" : "Logout"}
    </Button>
  );
};

export default Header;
