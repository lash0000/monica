import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_SOCKET_URL || "";

export const useTicketStore = create((set) => ({
  ticketStatus: null,
  blotterStatus: null,
  loading: false,
  error: null,

fetchTicketStatus: async (userId) => {
  try {
    console.log("[fetchTicketStatus] called with userId:", userId);
    const token = localStorage.getItem("access_token");
    console.log("[fetchTicketStatus] token from localStorage:", token);

    if (!token) throw new Error("No access token found.");

    set({ loading: true, error: null });

    const res = await axios.get(
      `${API_URL}/api/v1/data/tickets/user/status/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log("[fetchTicketStatus] raw response:", res.data);

    set((state) => {
      console.log("[fetchTicketStatus] state before set:", state);
      console.log("[fetchTicketStatus] res.data:", res.data);

      const next = { ...state, ticketStatus: res.data, loading: false };
      console.log("[fetchTicketStatus] next:", next);

      return next;
    });

  } catch (err) {
    console.error("[fetchTicketStatus] error:", err);
    set({
      error: err?.message || "Failed to fetch ticket status",
      loading: false,
    });
  }
},



  fetchBlotterStatus: async (userId) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("No access token found.");

      set({ loading: true, error: null });

      const res = await axios.get(
        `${API_URL}/api/v1/data/tickets/user/blotter/status/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set({ blotterStatus: res.data, loading: false });
    } catch (err) {
      set({
        error: err?.message || "Failed to fetch blotter status",
        loading: false,
      });
    }
  },
}));
