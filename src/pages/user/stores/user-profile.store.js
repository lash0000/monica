import { create } from "zustand";
import axios from "axios";
import { toast } from "sonner";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const UserProfileStore = create((set, get) => ({
  profile: null,
  loading: false,
  error: null,


  createUserProfile: async (data, token) => {
    if (!token) return;

    set({ loading: true, error: null });

    try {
      const res = await axios.post(
        `${SOCKET_URL}/api/v1/data/profile`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const created = res.data;

      set({
        profile: {
          account: get().profile.account,
          userProfile: created
        },
        loading: false,
      });

      toast.success("Your profile has been created successfully.");
      return { success: true, data: created };

    } catch (err) {
      console.error("Profile Create Error:", err);
      toast.error("Profile creation failed.");
      set({ error: err.message, loading: false });
      return { success: false, error: err.message };
    }
  },

  fetchUserProfile: async (userId, token) => {
    if (!userId || !token) return;

    set({ loading: true, error: null });

    try {
      const res = await axios.get(
        `${SOCKET_URL}/api/v1/data/profile/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          withCredentials: true,
        }
      );

      const data = res.data;

      const userProfile = data.UserProfile;
      const normalized = {
        account: {
          email: data.email,
          user_id: data.user_id,
          acc_type: data.acc_type,
          is_verified: data.is_verified,
        },

        userProfile: data.UserProfile ? {
          ...data.UserProfile,
          name: data.UserProfile?.name || {},
          address: data.UserProfile?.address || {},
          birthdate: data.UserProfile?.birthdate || null,
          phone_number: data.UserProfile?.phone_number || null,
          type_of_residency: data.UserProfile?.type_of_residency || null,
        } : null
      };

      set({ profile: normalized, loading: false });

      return {
        empty: userProfile === null,
        data: normalized,
      };
    } catch (err) {
      console.error("Profile Fetch Error:", err);
      set({ error: err.message, loading: false });
      return { error: err.message };
    }
  },

  updateUserProfile: async (updateData, token) => {
    if (!token) return;

    set({ loading: true, error: null });

    try {
      const res = await axios.patch(
        `${SOCKET_URL}/api/v1/data/profile/me`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const updated = res.data;

      const current = get().profile || { account: {}, userProfile: {} };

      const merged = {
        ...current,
        userProfile: {
          ...current.userProfile,
          ...updated,
          name: updated.name || current.userProfile?.name,
          address: updated.address || current.userProfile?.address,
        },
      };

      set({ profile: merged, loading: false });

      toast.success("Your profile has been updated successfully.");
      return { success: true, data: merged };
    } catch (err) {
      console.error("Profile Update Error:", err);
      toast.error("Profile updating unsuccessful.");
      set({ error: err.message, loading: false });
      return { success: false, error: err.message };
    }
  },

  clearProfile: () => set({ profile: null }),
}));

export default UserProfileStore;
