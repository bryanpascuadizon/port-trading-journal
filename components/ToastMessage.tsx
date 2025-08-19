interface ToastMessageProps {
  success: boolean;
  message: string;
}

const ToastMessage = ({ success, message }: ToastMessageProps) => {
  return (
    <p className={`text-sm ${success ? "text-positive" : "text-negative"}`}>
      {message}
    </p>
  );
};

export default ToastMessage;
