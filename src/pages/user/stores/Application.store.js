import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'sonner';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL; // or your constant

export const useApplicationStore = create((set, get) => ({
  loading: false,
  applications: [],
  currentApplication: null,
  error: null,

  allApplications: async () => {
    try {
      set({ loading: true, error: null });
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("No access token found.");

      const res = await axios.get(`${SOCKET_URL}/api/v1/data/applications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({ applications: res.data.applications || [] });
      return res.data;
    } catch (err) {
      set({ error: err.response?.data || err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

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

  viewApplication: async (applicationId) => {
    try {
      set({ loading: true, error: null });

      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("No access token found.");

      const res = await axios.get(
        `${SOCKET_URL}/api/v1/data/applications/view/${applicationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const app = res.data.application;

      set({ currentApplication: app });
      return app;
    } catch (err) {
      set({ error: err.response?.data || err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  updateApplication: async (applicationId, payload) => {
    try {
      set({ loading: true, error: null });

      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("No access token found.");

      const res = await axios.patch(
        `${SOCKET_URL}/api/v1/data/applications/${applicationId}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updated = res.data.application;
      set((state) => ({
        applications: state.applications.map((a) =>
          a.id === updated.id ? updated : a
        ),
        currentApplication:
          state.currentApplication?.id === updated.id
            ? updated
            : state.currentApplication,
      }));

      toast.success("Application updated successfully!");
      return updated;
    } catch (err) {
      set({ error: err.response?.data || err.message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));
