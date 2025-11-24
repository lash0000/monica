import axios from "axios";
import { toast } from "sonner";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export const myApplication = async (userId) => {
  try {
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

    return {
      success: true,
      data: res.data,
      applications: res.data.applications || [],
    };
  } catch (err) {
    const message = err.response?.data || err.message;
    return {
      success: false,
      error: message,
    };
  }
};

export const createApplication = async (payload) => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      toast.error("Missing access token.");
      return { success: false };
    }

    const res = await axios.post(
      `${SOCKET_URL}/api/v1/data/applications`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    toast.success("Application submitted successfully.");

    return {
      success: true,
      data: res.data.application,
    };
  } catch (err) {
    const message =
      err.response?.data?.message ||
      err.message ||
      "Application submission failed.";

    toast.error(message);

    return {
      success: false,
      error: message,
    };
  }
};
