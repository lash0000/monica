import React, { useEffect } from 'react';
import { User, Check, Copy } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useApplicationStore } from '../../user/stores/Application.store';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogDescription
} from "../../user/components/AlertDialog"

export default function ApplicationForReview() {
  const { id } = useParams();
  const { currentApplication, viewApplication, updateApplication, loading } = useApplicationStore();

  useEffect(() => {
    if (id) viewApplication(id);
  }, [id, viewApplication]);

  const app = currentApplication;
  const creator = app?.ApplicationCreator;
  const profile = creator?.UserProfile;

  // Fallback safe values
  const name = profile?.name || {};
  const contactPerson = profile?.contact_person || {};
  const address = profile?.address || {};
  const fullName = `${name.first || ""} ${name.middle || ""} ${name.last || ""}`.trim();
  const residency = profile?.type_of_residency === "bonafide" ? "Bonafide" : "Non-Resident";

  const formattedDate = app?.createdAt
    ? new Date(app.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    : "Unknown Date";

  if (loading || !app) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading application...
      </div>
    );
  }

  const handleStatusSubmit = async () => {
    if (!app?.id) return;

    const userId = localStorage.getItem("user_id");
    if (!userId) {
      toast.error("Missing user ID");
      return;
    }

    try {
      await updateApplication(app.id, {
        status: "approved",
        action_by: userId
      });
      viewApplication(app.id);
    } catch (err) {
      toast.error("Failed to update application.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-t-lg">
          <h1 className="text-2xl font-bold mb-1">Application for Review</h1>
          <p className="text-purple-100">We can provide feedback before you approve it</p>
        </div>

        <div className="bg-white shadow-lg rounded-b-lg">
          {/* Application Summary */}
          <div className="border-b">
            <div className="p-6 border-b">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{app.application_service}</h2>
                  <p className="text-gray-500">Application Date: {formattedDate}</p>
                </div>

                <div className="bg-gray-100 rounded-xl p-4 border">
                  <img
                    src="https://github.com/LanderBose.png"
                    alt="avatar"
                    className="size-12 rounded-full"
                  />
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between w-full gap-3">
                <div className="text-sm">
                  <span className="font-semibold">Status: </span>
                  <span className="text-gray-700 capitalize">
                    {app.status}
                  </span>
                </div>
                <div className="flex gap-4">
                  <button className="border border-gray-300 px-6 py-2 rounded-full font-medium hover:bg-gray-50">
                    Feedback
                  </button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="ml-auto bg-pink-500 text-white px-6 py-2 rounded-full font-medium hover:bg-pink-600 flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        Approve
                      </button>
                    </AlertDialogTrigger>

                    <AlertDialogPortal>
                      <AlertDialogOverlay />
                      <AlertDialogContent>
                        <AlertDialogTitle>Confirm Action</AlertDialogTitle>
                        <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleStatusSubmit}>
                            Proceed
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialogPortal>
                  </AlertDialog>

                </div>

              </div>
            </div>
          </div>

          {/* Email */}
          <div className="border-b">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">Email Address</span>
                    <Check className="w-5 h-5 text-green-600" />
                  </div>

                  <p className="text-gray-700">{creator?.email || "N/A"}</p>
                </div>

                <button
                  className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 flex items-center gap-2"
                  onClick={() => navigator.clipboard.writeText(creator?.email || "")}
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
              </div>
            </div>
          </div>

          {/* Personal Details */}
          <div className="border-b">
            <div className="p-6">
              <h3 className="font-bold text-lg mb-4">Personal Details</h3>

              {/* GRID CONTAINER WITH FULL BORDERS */}
              <div className="border rounded-xl overflow-hidden">

                {/* Row 1: Name */}
                <div className="grid grid-cols-4 divide-x border-b">
                  <div className="p-4">
                    <label className="text-gray-500 text-sm">First Name</label>
                    <p className="font-semibold mt-1">{name.first || "N/A"}</p>
                  </div>

                  <div className="p-4">
                    <label className="text-gray-500 text-sm">Middle Name</label>
                    <p className="font-semibold mt-1">{name.middle || "N/A"}</p>
                  </div>

                  <div className="p-4">
                    <label className="text-gray-500 text-sm">Last Name</label>
                    <p className="font-semibold mt-1">{name.last || "N/A"}</p>
                  </div>

                  <div className="p-4">
                    <label className="text-gray-500 text-sm">Suffix</label>
                    <p className="font-semibold mt-1">{name.suffix || "N/A"}</p>
                  </div>
                </div>

                {/* Row 2: Birthdate + Gender */}
                <div className="grid grid-cols-2 divide-x border-b">
                  <div className="p-4">
                    <label className="text-gray-500 text-sm">Date of Birth</label>
                    <p className="font-semibold mt-1">
                      {profile?.birthdate
                        ? new Date(profile.birthdate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                        : "N/A"}
                    </p>
                  </div>

                  <div className="p-4">
                    <label className="text-gray-500 text-sm">Gender</label>
                    <p className="font-semibold mt-1 capitalize">{profile?.gender || "N/A"}</p>
                  </div>
                </div>

                {/* Row 3: Nationality + Civil Status */}
                <div className="grid grid-cols-2 divide-x border-b">
                  <div className="p-4">
                    <label className="text-gray-500 text-sm">Nationality</label>
                    <p className="font-semibold capitalize mt-1">{profile?.nationality || "N/A"}</p>
                  </div>

                  <div className="p-4">
                    <label className="text-gray-500 text-sm">Civil Status</label>
                    <p className="font-semibold mt-1 capitalize">{profile?.civil_status || "N/A"}</p>
                  </div>
                </div>

                {/* Row 4: Contact + Residency */}
                <div className="grid grid-cols-2 divide-x border-b">
                  <div className="p-4">
                    <label className="text-gray-500 text-sm">Phone Number</label>
                    <p className="font-semibold mt-1">{profile?.phone_number || "N/A"}</p>
                  </div>

                  <div className="p-4">
                    <label className="text-gray-500 text-sm">Type of Residency</label>
                    <div className="mt-1">
                      <span className="inline-block bg-gray-100 px-4 py-2 rounded font-medium">
                        {residency}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Row 5: Address */}
                <div className="p-4 border-b">
                  <label className="text-gray-500 text-sm">Permanent Address</label>
                  <p className="font-semibold mt-1">
                    {address.street_address || "Address not provided"}
                  </p>
                </div>

                {/* Row 6: Emergency */}
                <div className="p-4">
                  <label className="text-gray-500 text-sm">Emergency Contacts</label>
                  <p className="font-semibold mt-1">
                    {contactPerson.name
                      ? `${contactPerson.name} - ${contactPerson.number}`
                      : "N/A"}
                  </p>
                </div>

              </div> {/* END GRID */}
            </div>
          </div>
        </div>

      </div>
    </div >
  );
}
