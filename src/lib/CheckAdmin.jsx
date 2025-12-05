import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import UserProfileStore from "../pages/user/stores/user-profile.store";

export default function CheckAdmin({ children }) {
  const { profile, fetchUserProfile } = UserProfileStore();

  const userId = localStorage.getItem("user_id");
  const token = localStorage.getItem("access_token");

  // Fetch profile if not loaded yet
  useEffect(() => {
    if (!profile && userId && token) {
      fetchUserProfile(userId, token);
    }
  }, [profile, userId, token, fetchUserProfile]);

  // Still loading
  if (!profile) {
    return null; // or spinner
  }

  const adminRole = profile?.userProfile?.admin_role;

  if (!adminRole || adminRole.trim() === "") {
    console.log("Access denied → missing admin role:", adminRole);
    return <Navigate to="/error" replace />;
  }

  console.log("Access granted → admin role:", adminRole);
  return children;
}
