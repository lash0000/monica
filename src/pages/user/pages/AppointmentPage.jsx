import React, { useEffect, useState } from "react";
import { FaSliders } from "react-icons/fa6";
import { MdPendingActions } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useAppointmentStore } from "../stores/Appointment.store";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '../components/Breadcrumb';

export default function AppointmentPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // telekonsulta/:id
  const { fetchAppointmentById, loading, error } = useAppointmentStore();

  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await fetchAppointmentById(id);
      if (data) setAppointment(data);
    }
    load();
  }, [id]);


  if (loading) {
    return (
      <main className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 py-6">
        <p className="text-gray-600 text-sm">Loading appointment details...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 py-6">
        <p className="text-red-600 text-sm">{error}</p>
      </main>
    );
  }

  if (!appointment) {
    return (
      <main className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 py-6">
        <p className="text-gray-600 text-sm">No appointment found.</p>
      </main>
    );
  }

  // Extract key fields
  const owner = appointment.AppointmentOwner?.UserProfile;
  const ownerName = owner
    ? `${owner.name.last}, ${owner.name.first} ${owner.name.middle.charAt(0)}.`
    : "Unknown User";

  const actionName =
    appointment.AppointmentAction?.UserProfile?.name?.first ??
    appointment.AppointmentAction?.email ??
    "Not yet assigned";

  return (
    <main className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 py-6">
      <Breadcrumb className="my-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/telekonsulta">Appointment</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{appointment.id}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header card */}
      <div className="bg-white rounded-2xl shadow-sm border p-6 mb-4 relative">

        {/* chips */}
        <div className="flex flex-wrap items-center gap-2 text-[11px]">
          <span className="px-2.5 py-1 rounded-full bg-[#f7ecff] text-[#7a3aa5] font-medium">
            Opened by {ownerName}
          </span>
        </div>

        {/* title + description */}
        <h1 className="mt-3 text-[24px] font-extrabold text-gray-900">
          {appointment.category}
        </h1>
        <p className="text-[13px] text-gray-600 mt-1">
          Appointment Details:
        </p>

        <div className="whitespace-pre-wrap my-4">
          {appointment.details}
        </div>

        {/* Appointment Details bullet list */}
        <div className="mt-4 text-[13px] text-gray-700">
          <ul className="list-disc ml-5 space-y-1">
            <li>Status: {appointment.status}</li>
            <li>
              Date Scheduled:{" "}
              {new Date(appointment.date_scheduled).toLocaleString("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </li>
            {appointment.remarks && <li>Remarks: {appointment.remarks}</li>}
            <li>
              Created At:{" "}
              {new Date(appointment.createdAt).toLocaleString("en-US")}
            </li>
          </ul>
        </div>

        {/* actions row */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[12px] text-gray-800">
            <MdPendingActions className="size-4" />
            <span className="font-medium">Action by: {actionName}</span>
          </div>

          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f3e8ff] text-[#6f31a6] text-[12px]">
              <FaSliders className="w-3.5 h-3.5" />
              Options
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
