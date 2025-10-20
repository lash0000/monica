import { create } from "zustand";
import axios from "axios";

const MONICA_URL = import.meta.env.VITE_MONICA_URL;

export const useRegisterAuth = create((set) => ({
  email: sessionStorage.getItem("register_email") || null,
  loading: false,
  message: "",
  error: null,

  // Step 1: Register user
  register: async (data) => {
    set({ loading: true, error: null, message: "" });
    try {
      const payload = {
        email: data.email,
        password: data.password,
        acc_type: data.acc_type || "System",
      };

      const res = await axios.post(
        `${MONICA_URL}/api/v1/data/user-creds/register`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      // Store email for OTP
      sessionStorage.setItem("register_email", payload.email);
      set({
        email: payload.email,
        loading: false,
        message:
          res?.data?.message ||
          "User registered. Kindly verify your email to access other services.",
      });

      return res.data;
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Registration failed";
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  generateOtp: async () => {
    const email = sessionStorage.getItem("register_email");
    if (!email) throw new Error("No email found in session.");

    try {
      const res = await axios.post(
        `${MONICA_URL}/api/v1/data/user-creds/generate-otp`,
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      // Expecting { message, token } from backend
      const otpToken = res?.data?.token;
      if (!otpToken) throw new Error("Missing OTP token from backend.");

      // Save both email + token to session
      sessionStorage.setItem("otp_token", otpToken);

      set({
        message: res?.data?.message || "OTP sent successfully.",
        loading: false,
      });

      return res.data;
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to generate OTP.";
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  verifyOtp: async (otp) => {
    const email = sessionStorage.getItem("register_email");
    const otpToken = sessionStorage.getItem("otp_token");

    if (!email) throw new Error("No email found in session.");
    if (!otpToken) throw new Error("Missing OTP token in session.");

    try {
      const res = await axios.post(
        `${MONICA_URL}/api/v1/data/user-creds/verify`,
        { email, otp },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${otpToken}`, // ✅ Bearer token as required
          },
        }
      );

      // 🔸 DO NOT clear here — let frontend handle it after showing success modal
      set({
        loading: false,
        message: res?.data?.message || "OTP verified successfully.",
      });

      return res.data;
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Invalid or expired OTP token.";
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  clear: () => {
    sessionStorage.removeItem("register_email");
    sessionStorage.removeItem("otp_token");
    set({ email: null, loading: false, message: "", error: null });
  },
}));
