import { create } from "zustand";
import axios from "axios";
import { toast } from "sonner";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export const useEventsStore = create((set, get) => ({
  loading: false,
  error: null,
  events: [],
  singleEvent: null,

  allEvents: async () => {
    try {
      set({ loading: true, error: null });

      const token = localStorage.getItem("access_token");
      if (!token) {
        toast.error("Missing access token.");
        set({ loading: false });
        return;
      }

      const res = await axios.get(
        `${SOCKET_URL}/api/v1/data/events`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res?.data?.success) {
        set({ events: res.data.events });
      }

      return res.data;
    } catch (err) {
      console.error("Fetch All Events Error:", err);
      toast.error(err?.response?.data?.message || "Failed to fetch events");
      set({ error: err });
    } finally {
      set({ loading: false });
    }
  },

  createEvent: async (payload) => {
    try {
      set({ loading: true, error: null });

      const token = localStorage.getItem("access_token");
      const userId = localStorage.getItem("user_id");

      if (!token || !userId) {
        toast.error("Missing authentication details.");
        set({ loading: false });
        return;
      }

      // merge user_id into payload as `created_by`
      const body = {
        created_by: userId,
        ...payload,
      };

      const res = await axios.post(
        `${SOCKET_URL}/api/v1/data/events`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Event created successfully!");
      }

      return res.data;
    } catch (err) {
      console.error("Create Event Error:", err);
      toast.error(err?.response?.data?.message || "Failed to create event");
      set({ error: err });
    } finally {
      set({ loading: false });
    }
  },

  eventById: async (event_id) => {
    try {
      set({ loading: true, error: null });

      const token = localStorage.getItem("access_token");
      if (!token) {
        toast.error("Missing access token.");
        set({ loading: false });
        return;
      }

      const res = await axios.get(
        `${SOCKET_URL}/api/v1/data/events/${event_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res?.data?.success) {
        set({ singleEvent: res.data.event });
      }

      return res.data;
    } catch (err) {
      console.error("Fetch Event Error:", err);
      toast.error(err?.response?.data?.message || "Failed to fetch event");
      set({ error: err });
    } finally {
      set({ loading: false });
    }
  },

  updateEvent: async (event_id, updates) => {
    try {
      set({ loading: true, error: null });

      const token = localStorage.getItem("access_token");
      if (!token) {
        toast.error("Missing access token.");
        set({ loading: false });
        return;
      }

      const res = await axios.patch(
        `${SOCKET_URL}/api/v1/data/events/${event_id}`,
        updates,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Event updated successfully!");
        set({ singleEvent: res.data.event });
      }

      return res.data;
    } catch (err) {
      console.error("Update Event Error:", err);
      toast.error(err?.response?.data?.message || "Failed to update event");
      set({ error: err });
    } finally {
      set({ loading: false });
    }
  },
}));
