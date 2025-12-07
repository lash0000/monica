import { create } from "zustand";
import axios from "axios";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export const useDashboardStore = create((set, get) => ({
  ticketCategories: null,
  applicantAnalytics: null,
  loading: {
    ticketCategories: false,
    applicantAnalytics: false,
  },
  error: {
    ticketCategories: null,
    applicantAnalytics: null,
  },

  fetchTicketCategories: async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      set((state) => ({
        error: { ...state.error, ticketCategories: "No access token found." },
      }));
      return;
    }

    set((state) => ({
      loading: { ...state.loading, ticketCategories: true },
      error: { ...state.error, ticketCategories: null },
    }));

    try {
      const { data } = await axios.get(
        `${SOCKET_URL}/api/v1/data/tickets/categories`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      set((state) => ({
        ticketCategories: data,
        loading: { ...state.loading, ticketCategories: false },
      }));
    } catch (err) {
      set((state) => ({
        error: {
          ...state.error,
          ticketCategories: err?.response?.data?.message || "Request failed",
        },
        loading: { ...state.loading, ticketCategories: false },
      }));
    }
  },

  fetchApplicantAnalytics: async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      set((state) => ({
        error: { ...state.error, applicantAnalytics: "No access token found." },
      }));
      return;
    }

    set((state) => ({
      loading: { ...state.loading, applicantAnalytics: true },
      error: { ...state.error, applicantAnalytics: null },
    }));

    try {
      const { data } = await axios.get(
        `${SOCKET_URL}/api/v1/data/applications/analytics`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      set((state) => ({
        applicantAnalytics: data,
        loading: { ...state.loading, applicantAnalytics: false },
      }));
    } catch (err) {
      set((state) => ({
        error: {
          ...state.error,
          applicantAnalytics:
            err?.response?.data?.message || "Request failed",
        },
        loading: { ...state.loading, applicantAnalytics: false },
      }));
    }
  },
}));
