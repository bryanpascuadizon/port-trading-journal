interface ToastMessageProps {
  success: boolean;
  message: string;
}

const ToastMessage = ({ success, message }: ToastMessageProps) => {
  return (
    <p
      className={`text-sm ${
        success
          ? "text-[var(--color-successfull)]"
          : "text-[var(--color-destructive)]"
      }`}
    >
      {message}
    </p>
  );
};

export default ToastMessage;
