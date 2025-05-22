import { User } from "@/types";
import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface ChatStore {
  users: User[];
  fetchUsers: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const useChatStore = create<ChatStore>((set) => ({
  users: [],
  isLoading: false,
  error: null,
  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/users");
      set({ users: response.data.users });
    } catch (error: any) {
      console.log(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));
