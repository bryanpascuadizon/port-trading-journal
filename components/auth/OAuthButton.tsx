import { Icons } from "@/lib/icons";
import { Button } from "../ui/button";
import { signInByOAuth } from "@/lib/actions/auth-actions";
import { useTransition } from "react";

interface OAuthButtonProps {
  label: string;
  provider: string;
}

const OAuthButton = ({ label, provider }: OAuthButtonProps) => {
  const [isOAuthLoginPending, startOAuthLoginTransistion] = useTransition();

  const renderOAuthIcon = () => {
    switch (provider) {
      case "google":
        return <Icons.google />;

      case "github":
        return <Icons.github />;
    }
  };
  const handleOAuthSignIn = () => {
    startOAuthLoginTransistion(async () => {
      await signInByOAuth(provider);
    });
  };

  return (
    <Button
      variant="outline"
      className="bg-white hover:bg-white"
      onClick={handleOAuthSignIn}
    >
      {renderOAuthIcon()}
      {isOAuthLoginPending ? "Signing in..." : label}
    </Button>
  );
};

export default OAuthButton;
