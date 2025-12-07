import { useEffect, useState } from "react";
import { useAuth } from "../stores/store";
import UserProfileStore from "../stores/user-profile.store";
import { useNavigate, useLocation } from "react-router-dom";

export default function Profile() {
  const { profile, fetchUserProfile } = UserProfileStore();
  const { accessToken, user } = useAuth();
  const [loadingPage, setLoadingPage] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const userId = user?.user_id || localStorage.getItem("user_id");
  const base_path = location.pathname;

  const userProfile = profile?.userProfile || null;
  const accountEmail = profile?.account?.email || "Not available";

  // Fetch once — no duplicate request
  useEffect(() => {
    const load = async () => {
      if (!userId || !accessToken) return;

      setLoadingPage(true);
      await fetchUserProfile(userId, accessToken);
      setLoadingPage(false);
    };

    load();
  }, [userId, accessToken, fetchUserProfile]);

  // Handle first-time user (no profile yet)
  if (loadingPage) {
    return (
      <main className="max-w-2xl mx-auto px-3 sm:px-4 lg:px-6 py-8">
        <div className="flex items-center justify-center py-20 text-gray-600">
          Loading profile...
        </div>
      </main>
    );
  }

  if (!profile || !userProfile) {
    return (
      <main className="max-w-2xl mx-auto px-3 sm:px-4 lg:px-6 py-8">
        <div className="bg-white border rounded-xl p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            No Profile Found
          </h2>
          <p className="text-gray-600 text-sm mb-5">
            It looks like you haven't created your personal profile yet.
          </p>

          <button
            onClick={() => navigate(`${base_path}/update-profile`)}
            className="px-4 py-2 text-sm bg-[#20326e] text-white rounded-md hover:bg-[#1a2658]"
          >
            Create Profile
          </button>
        </div>
      </main>
    );
  }

  // Computed fields
  const birthdate = userProfile.birthdate
    ? new Date(userProfile.birthdate).toLocaleDateString("en-PH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    : "N/A";

  const middleInitial = userProfile.name?.middle
    ? `${userProfile.name.middle.charAt(0).toUpperCase()}.`
    : "";

  const fullName = `${userProfile.name?.last ?? ""} ${userProfile.name?.first ?? ""} ${middleInitial}`.trim();

  return (
    <main className="max-w-2xl mx-auto px-3 sm:px-4 lg:px-6 py-8">
      <div className="bg-white rounded-2xl shadow border overflow-hidden">

        {/* Banner */}
        <div className="relative bg-slate-200 h-28">
          <div className="absolute left-1/2 -bottom-8 -translate-x-1/2 w-20 h-20 rounded-md ring-4 ring-white overflow-hidden shadow-lg">
            <img
              src="https://github.com/Roelskie.png"
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="pt-12 px-4 sm:px-5 pb-6">

          {/* Update Button */}
          <div className="flex justify-end mb-3 -mt-6">
            <button
              className="group px-3 py-1.5 text-xs rounded-md border bg-white shadow-sm 
                         flex items-center gap-2 hover:shadow-lg"
              onClick={() => navigate(`${base_path}/update-profile`)}
            >
              <span className="inline-block size-3 rounded-sm bg-[#20326e]"></span>
              Update your Profile
            </button>
          </div>

          {/* Email Box */}
          <div className="border rounded-lg overflow-hidden">
            <div className="px-4 py-3 text-sm flex items-center justify-between bg-white">
              <div className="space-y-1">
                <div className="text-gray-800 font-medium flex items-center gap-2">
                  <span>Email Address</span>
                  <span className="text-green-600">✓</span>
                </div>
                <div className="text-gray-700">{accountEmail}</div>
              </div>

              <button className="px-3 py-1.5 text-xs rounded-md border text-[#20326e] 
                                 flex items-center gap-2 bg-[#eef2ff]">
                <span className="inline-block w-3 h-3 rounded-sm bg-[#20326e]"></span>
                Change Email
              </button>
            </div>
          </div>

          {/* Personal Details */}
          <div className="mt-4">
            <div className="text-sm font-semibold text-gray-800 mb-2">Personal Details</div>

            <div className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-4 divide-x">
                <DetailItem label="First Name" value={userProfile.name?.first} />
                <DetailItem label="Middle Name" value={userProfile.name?.middle} />
                <DetailItem label="Last Name" value={userProfile.name?.last} />
                <DetailItem label="Suffix" value={userProfile.name?.suffix || "N/A"} />
              </div>

              <div className="grid grid-cols-2 divide-x border-t">
                <DetailItem label="Date of Birth" value={birthdate} />
                <DetailItem label="Gender" value={userProfile.gender || "N/A"} />
              </div>

              <div className="grid grid-cols-2 divide-x border-t">
                <DetailItem label="Nationality" value={userProfile.nationality || "N/A"} />
                <DetailItem
                  label="Civil Status"
                  value={
                    userProfile.civil_status
                      ? userProfile.civil_status.charAt(0).toUpperCase() +
                      userProfile.civil_status.slice(1)
                      : "N/A"
                  }
                />
              </div>

              <div className="grid grid-cols-2 divide-x border-t">
                <DetailItem label="Phone Number" value={userProfile.phone_number || "N/A"} />

                <div className="p-3">
                  <div className="text-[11px] text-gray-500">Type of Residency</div>
                  <div className="inline-block text-[11px] mt-1 px-2 py-1 rounded bg-gray-100 border capitalize">
                    {userProfile.type_of_residency || "N/A"}
                  </div>
                </div>
              </div>

              <div className="border-t p-3">
                <div className="text-[11px] text-gray-500">Permanent Address</div>
                <div className="text-sm">
                  {userProfile.address?.house_no ?? ""} {userProfile.address?.street_address ?? ""}
                  {userProfile.address?.street ? ", " : ""}
                  {userProfile.address?.barangay ?? ""}
                  {userProfile.address?.barangay ? ", " : ""}{" "}
                  {userProfile.address?.city ?? ""}{" "}
                  {userProfile.address?.zip_code ?? ""}
                </div>
              </div>

              <div className="border-t p-3">
                <div className="text-[11px] text-gray-500">Emergency Contacts</div>

                {userProfile?.contact_person?.name || userProfile?.contact_person?.number ? (
                  <div className="text-sm">
                    {userProfile.contact_person?.name ?? "Unnamed"}
                    {userProfile.contact_person?.number
                      ? ` — ${userProfile.contact_person.number}`
                      : ""}
                  </div>
                ) : (
                  <div className="text-sm">N/A</div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

function DetailItem({ label, value }) {
  return (
    <div className="p-3">
      <div className="text-[11px] text-gray-500">{label}</div>
      <div className="text-sm font-medium">{value ?? "N/A"}</div>
    </div>
  );
}
