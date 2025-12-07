import { create } from "zustand";
import axios from "axios";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export const useAppointmentStore = create((set) => ({
  loading: false,
  error: null,
  appointments: [],
  allAppointments: [],

  fetchAllAppointments: async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      set({ error: "Missing authentication credentials." });
      return;
    }

    set({ loading: true, error: null });

    try {
      const response = await axios.get(
        `${SOCKET_URL}/api/v1/data/appointments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data?.success) {
        set({
          allAppointments: response.data.appointments || [],
          loading: false,
        });
      } else {
        set({
          error: "Failed to fetch all appointments.",
          loading: false,
        });
      }
    } catch (err) {
      set({
        error: err.response?.data?.message || "Request failed.",
        loading: false,
      });
    }
  },

  // Fetch user's appointments
  fetchMyAppointments: async () => {
    const token = localStorage.getItem("access_token");
    const userId = localStorage.getItem("user_id");

    if (!token || !userId) {
      set({ error: "Missing authentication credentials." });
      return;
    }

    set({ loading: true, error: null });

    try {
      const response = await axios.get(
        `${SOCKET_URL}/api/v1/data/appointments/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data?.success) {
        set({
          appointments: response.data.appointments || [],
          loading: false,
        });
      } else {
        set({
          error: "Failed to fetch appointments.",
          loading: false,
        });
      }
    } catch (err) {
      set({
        error: err.response?.data?.message || "Request failed.",
        loading: false,
      });
    }
  },

  addMyAppointment: async (payload) => {
    const token = localStorage.getItem("access_token");
    const userId = localStorage.getItem("user_id");

    if (!token || !userId) {
      set({ error: "Missing authentication credentials." });
      return;
    }

    set({ loading: true, error: null });

    try {
      const body = {
        appointment_by: userId,
        ...payload,
      };

      const response = await axios.post(
        `${SOCKET_URL}/api/v1/data/appointments`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data?.success) {
        set((state) => ({
          appointments: [...state.appointments, response.data.appointment],
          loading: false,
        }));
      } else {
        set({
          error: "Failed to add appointment.",
          loading: false,
        });
      }
    } catch (err) {
      set({
        error: err.response?.data?.message || "Request failed.",
        loading: false,
      });
    }
  },


  fetchAppointmentById: async (appointmentId) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      set({ error: "Missing authentication credentials." });
      return null;
    }

    set({ loading: true, error: null });

    try {
      const response = await axios.get(
        `${SOCKET_URL}/api/v1/data/appointments/${appointmentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data?.success) {
        // API returns a single object, NOT an array
        return response.data.appointment;
      } else {
        set({ error: "Failed to fetch appointment details." });
        return null;
      }
    } catch (err) {
      set({
        error: err.response?.data?.message || "Request failed.",
        loading: false,
      });
      return null;
    } finally {
      set({ loading: false });
    }
  },

}));
