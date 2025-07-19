import { Icons } from "@/lib/icons";
import { SetStateAction } from "react";

interface PasswordVisibilityProps {
  showPassword: boolean;
  setShowPassword: (showPassword: boolean) => void;
}

const PasswordVisibility = ({
  showPassword,
  setShowPassword,
}: PasswordVisibilityProps) => {
  return (
    <div
      onClick={() => setShowPassword(!showPassword)}
      className="absolute cursor-pointer p-2 top-7.5 right-1.5 bg-transparent hover:bg-transparent border-white text-black"
    >
      {showPassword ? <Icons.eyeOpen /> : <Icons.eyeClosed />}
    </div>
  );
};

export default PasswordVisibility;
