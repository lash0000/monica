import { create } from "zustand";
import axios from "axios";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export const useUserCredentialStore = create((set) => ({
  credentials: [],
  loading: false,
  error: null,

  GetAllCredentials: async ({ token }) => {
    set({ loading: true, error: null });

    try {
      const res = await axios.get(
        `${SOCKET_URL}/api/v1/data/user-creds/all-users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        set({ credentials: res.data.data, loading: false });
      } else {
        set({
          error: res?.data?.message || "Failed to fetch credentials",
          loading: false,
        });
      }

      return res.data;
    } catch (err) {
      set({
        loading: false,
        error: err?.response?.data?.message || err.message,
      });
      return null;
    }
  },

  clearCredentials: () => set({ credentials: [] }),
}));
