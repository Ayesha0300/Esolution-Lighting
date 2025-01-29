// components/ui/use-toast.tsx
import { create } from 'zustand'

interface ToastStore {
  toast: (props: { 
    title: string;
    description: string;
    variant?: "default" | "destructive";
  }) => void;
}

export const useToast = create<ToastStore>((set) => ({
  toast: (props) => {
    // Implementation of toast functionality
    console.log(props);
  },
}));
