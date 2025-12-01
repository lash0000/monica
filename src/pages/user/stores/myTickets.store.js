import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_SOCKET_URL || "";

export const useTicketStore = create((set) => ({
  ticketStatus: null,
  blotterStatus: null,
  loading: false,
  error: null,

  fetchTicketStatus: async () => {
    try {
      const userId = localStorage.getItem("user_id");
      const token = localStorage.getItem("access_token");

      if (!token) throw new Error("No access token found.");
      if (!userId) throw new Error("No user ID found.");

      set({ loading: true, error: null });

      const res = await axios.get(
        `${API_URL}/api/v1/data/tickets/user/status/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      set({
        ticketStatus: res.data,
        loading: false
      });

    } catch (err) {
      set({
        error: err?.message || "Failed to fetch ticket status",
        loading: false,
      });
    }
  },

  fetchBlotterStatus: async () => {
    try {
      const userId = localStorage.getItem("user_id");
      const token = localStorage.getItem("access_token");

      if (!token) throw new Error("No access token found.");
      if (!userId) throw new Error("No user ID found.");

      set({ loading: true, error: null });

      const res = await axios.get(
        `${API_URL}/api/v1/data/tickets/user/blotter/status/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      set({
        blotterStatus: res.data,
        loading: false
      });

    } catch (err) {
      set({
        error: err?.message || "Failed to fetch blotter status",
        loading: false,
      });
    }
  },
}));
