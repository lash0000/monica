import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'sonner';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL; // or your constant

export const useApplicationStore = create((set, get) => ({
  loading: false,
  applications: [],
  error: null,

  // Fetch applications from logged-in user
  myApplication: async (userId) => {
    try {
      set({ loading: true, error: null });

      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("No access token found.");

      const res = await axios.get(
        `${SOCKET_URL}/api/v1/data/applications/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set({ applications: res.data.applications || [] });
      return res.data;
    } catch (err) {
      set({ error: err.response?.data || err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  // Submit new application
  createApplication: async (payload) => {
    try {
      set({ loading: true, error: null });

      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("No access token found.");

      const res = await axios.post(
        `${SOCKET_URL}/api/v1/data/applications`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Optional: push the new application into state
      set((state) => ({
        applications: [res.data.application, ...state.applications],
      }));

      toast.success("Application submitted successfully!")
      return res.data;
    } catch (err) {
      set({ error: err.response?.data || err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));
