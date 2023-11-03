export const validatePassword = (password: string) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return hasUpperCase && hasNumber && hasSymbol;
};
