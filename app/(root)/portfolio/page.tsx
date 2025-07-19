"use client";

import { Button } from "@/components/ui/button";
import { signOutUser } from "@/lib/actions/auth-actions";
import { useTransition } from "react";

const Portfolio = () => {
  const [, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await signOutUser();
    });
  };
  return (
    <div>
      Portfolio
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Portfolio;
