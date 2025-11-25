import { create } from "zustand";
import axios from "axios";
import { toast } from "sonner";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const UserProfileStore = create((set, get) => ({
  profile: null,
  loading: false,
  error: null,
  profileForEditing: null,

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
          account: null,
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
          user_id: data.user_id,
          email: data.email,
          acc_type: data.acc_type,
          is_verified: data.is_verified,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        },
        userProfile: userProfile
          ? {
            id: userProfile.id,
            user_id: userProfile.user_id,
            name: userProfile.name || {},
            birthdate: userProfile.birthdate || null,
            phone_number: userProfile.phone_number || null,
            user_type: userProfile.user_type || null,
            admin_role: userProfile.admin_role,
            gender: userProfile.gender || null,
            nationality: userProfile.nationality || null,
            civil_status: userProfile.civil_status || null,
            type_of_residency: userProfile.type_of_residency || null,
            address: userProfile.address || {},
            createdAt: userProfile.createdAt,
            updatedAt: userProfile.updatedAt,
          }
          : null,
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

  getProfileByID: async (id, token) => {
    if (!id || !token) return;

    set({ loading: true, error: null });

    try {
      const res = await axios.get(`${SOCKET_URL}/api/v1/data/profile/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const account = res.data?.profile;

      if (!account) {
        set({ loading: false });
        return { success: false, error: "Account not found" };
      }

      // Allow missing user profile
      const up = account.UserProfile || {};

      const normalized = {
        account: {
          user_id: account.user_id,
          email: account.email,
          acc_type: account.acc_type,
          is_verified: account.is_verified,
          createdAt: account.createdAt,
          updatedAt: account.updatedAt,
        },
        userProfile: up
          ? {
            id: up.id || null,
            user_id: up.user_id || account.user_id,
            name: up.name || {},
            birthdate: up.birthdate || "",
            phone_number: up.phone_number || "",
            user_type: up.user_type || "",
            admin_role: up.admin_role || "",
            type_of_residency: up.type_of_residency || "",
            address: up.address || {},
            gender: up.gender || "",
            nationality: up.nationality || "",
            civil_status: up.civil_status || "",
            contact_person: up.contact_person || {},
            createdAt: up.createdAt || null,
            updatedAt: up.updatedAt || null,
          }
          : null,
      };

      set({ profileForEditing: normalized, loading: false });

      return { success: true, data: normalized };

    } catch (err) {
      console.error("GET PROFILE ERROR:", err);
      set({ loading: false });
      return { success: false, error: err.message };
    }
  },


  updateUserProfileById: async (id, updateData, token) => {
    if (!id || !token) return;

    set({ loading: true, error: null });

    try {
      const res = await axios.patch(
        `${SOCKET_URL}/api/v1/data/profile/${id}`,
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

      const updated = res.data?.profile || res.data;

      // Merge into profileForEditing (same pattern as getProfileByID)
      const current = get().profileForEditing || {
        account: null,
        userProfile: {},
      };

      const merged = {
        ...current,
        userProfile: {
          ...current.userProfile,
          ...updated,
          name: updated.name || current.userProfile.name,
          address: updated.address || current.userProfile.address,
        },
      };

      set({ profileForEditing: merged, loading: false });

      toast.success("This user profile has been updated successfully.");
      return { success: true, data: merged };

    } catch (err) {
      console.error("updateUserProfileById Error:", err);
      toast.error("Profile update failed.");
      set({ error: err.message, loading: false });
      return { success: false, error: err.message };
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

      const current = get().profile || {
        account: {},
        userProfile: {},
      };

      const merged = {
        ...current,
        userProfile: {
          ...current.userProfile,
          ...updated,
          name: updated.name || current.userProfile.name,
          address: updated.address || current.userProfile.address,
        },
      };

      set({ profile: merged, loading: false });

      toast.success("Profile has been updated successfully.");
      return { success: true, data: merged };
    } catch (err) {
      console.error("Profile Update Error:", err);
      toast.error("Profile updating unsuccessful.");
      set({ error: err.message, loading: false });
      return { success: false, error: err.message };
    }
  },

  clearProfile: () => set({ profile: null }),

  isAdmin: () => {
    const p = get().profile;
    if (!p) return false;

    const role =
      p.userProfile?.admin_role ||
      p.UserProfile?.admin_role ||
      null;

    if (!role) return false;

    return role.toLowerCase() !== "none" && role.trim() !== "";
  },

}));

export default UserProfileStore;
