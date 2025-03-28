
// Simplified toast implementation 
import { toast as sonnerToast } from "sonner";

export const toast = {
  success: (message) => sonnerToast.success(message),
  error: (message) => sonnerToast.error(message),
  info: (message) => sonnerToast.info(message),
  warning: (message) => sonnerToast.warning(message),
};

export const useToast = () => {
  return {
    toast,
    toasts: [],
  };
};
