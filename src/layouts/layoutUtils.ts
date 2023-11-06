import { Toast } from "primereact/toast";

export const validatePassword = (password: string) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return hasUpperCase && hasNumber && hasSymbol;
};

export const toastDisplay = (
  toast: React.RefObject<Toast>,
  details: string,
  severity: "success" | "info" | "warn" | "error" | undefined,
  summary: string
) => {
  return toast.current?.show({
    severity: severity,
    summary: summary,
    detail: details,
  });
};
