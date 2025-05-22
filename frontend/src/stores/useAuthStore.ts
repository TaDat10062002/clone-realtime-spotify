import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

interface AuthStore {
    isAdmin: boolean;
    error: string | null;
    isLoading: Boolean;

    checkAdminStatus: () => Promise<void>;
    reset: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    isAdmin: false,
    isLoading: false,
    error: null,
    checkAdminStatus: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/admin/check");
            set({ isAdmin: response.data.admin });
        } catch (error: any) {
            set({ isAdmin: false, error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },

    reset: async () => {
        set({ isAdmin: false, isLoading: false, error: null });
    },
}));
