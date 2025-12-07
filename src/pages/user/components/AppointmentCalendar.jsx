import React, { useState, useRef, forwardRef, useImperativeHandle } from "react";
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
} from "./AlertDialog";

/* ---------------------------------------------
   MATERIAL DESIGN 3 TIME PICKER (Keyboard Version)
--------------------------------------------- */
const TimePickerM3 = forwardRef(function TimePickerM3({ onConfirm }, ref) {
  const [hour, setHour] = useState("");
  const [minute] = useState("00");
  const [ampm, setAmpm] = useState("AM");

  const allowed = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const commit = () => {
    if (!hour) return;

    const padded = hour.toString().padStart(2, "0");
    const timeStr = `${padded}:${minute} ${ampm}`;

    onConfirm({
      time: timeStr,
      hour: padded,
      minute,
      ampm
    });
  };

  useImperativeHandle(ref, () => ({ commit }));

  return (
    <div className="w-full p-4 rounded-2xl bg-[#F7F2FA] border border-[#D9CDED]">
      <div className="text-sm text-gray-700 mb-4">Enter time</div>

      <div className="flex items-start justify-center w-full gap-4">

        {/* Hour */}
        <div className="flex flex-col items-center">
          <input
            value={hour}
            onChange={(e) => {
              let v = e.target.value.replace(/\D/g, "");

              if (v === "") return setHour("");
              if (v.length > 2) return;

              const num = parseInt(v, 10);
              if (!allowed.includes(num)) return;

              setHour(v);
            }}
            onBlur={() => {
              if (!hour) return;
              const num = parseInt(hour, 10);
              if (allowed.includes(num)) setHour(num.toString().padStart(2, "0"));
            }}
            maxLength={2}
            className="w-20 text-center text-4xl font-semibold bg-[#E8DEF8] text-[#1D192B] rounded-xl py-3 outline-none border-2 border-[#625B71]"
          />
          <span className="text-xs mt-2 text-[#49454F]">Hour</span>
        </div>

        <span className="text-4xl font-light mt-3">:</span>

        {/* Minute */}
        <div className="flex flex-col items-center">
          <input
            disabled
            value="00"
            className="w-20 text-center text-4xl font-semibold bg-white text-[#1D192B] rounded-xl py-3 outline-none border border-[#CAC4D0]"
          />
          <span className="text-xs mt-2 text-[#49454F]">Minute</span>
        </div>

        {/* AM / PM */}
        <div className="flex flex-col border border-[#CAC4D0] rounded-xl overflow-hidden">
          <button
            onClick={() => setAmpm("AM")}
            className={`px-4 py-2 text-sm font-medium ${ampm === "AM" ? "bg-[#FFD8E4]" : "bg-white"}`}
          >
            AM
          </button>
          <button
            onClick={() => setAmpm("PM")}
            className={`px-4 py-2 text-sm font-medium ${ampm === "PM" ? "bg-[#FFD8E4]" : "bg-white"}`}
          >
            PM
          </button>
        </div>

      </div>
    </div>
  );
});

/* ---------------------------------------------
   DATE MATRIX
--------------------------------------------- */
function getCalendarMatrix(year, month) {
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();

  let matrix = [];
  let row = [];
  let d = 1;

  for (let i = 0; i < first; i++) row.push(null);

  while (d <= days) {
    if (row.length === 7) {
      matrix.push(row);
      row = [];
    }
    row.push(d++);
  }

  while (row.length < 7) row.push(null);
  matrix.push(row);

  return matrix;
}

/* ---------------------------------------------
   FINAL COMPONENT
--------------------------------------------- */
export default function AppointmentSchedule({ holidays = {}, onSelect }) {
  const today = new Date();

  const [year] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [pendingDate, setPendingDate] = useState(null);
  const [selectedKey, setSelectedKey] = useState(null);

  const timeRef = useRef(null);
  const calendar = getCalendarMatrix(year, month);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleDayClick = (day) => {
    const final = `${year}-${month + 1}-${day}`;
    setPendingDate(final);
  };

  const formatLong = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric"
    });

  const goNext = () => setMonth((m) => (m === 11 ? 0 : m + 1));
  const goPrev = () => {
    if (month === today.getMonth()) return;
    setMonth((m) => (m === 0 ? 11 : m - 1));
  };

  return (
    <div className="w-full p-4">

      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold">{monthNames[month]} {year}</h2>

        <div className="flex gap-2">
          <button disabled={month === today.getMonth()} onClick={goPrev} className="px-4 py-1 border rounded">
            Previous
          </button>
          <button onClick={goNext} className="px-4 py-1 border rounded">
            Next
          </button>
        </div>
      </div>

      {/* Calendar */}
      <div className="grid grid-cols-7 border text-center select-none">

        {weekdays.map((d) => (
          <div key={d} className="border-b p-2 font-semibold bg-gray-100">
            {d}
          </div>
        ))}

        {calendar.map((week, i) => (
          <React.Fragment key={i}>
            {week.map((day, j) => {
              if (!day) return <div key={j} className="h-24 border" />;

              const key = `${year}-${month + 1}-${day}`;
              const holiday = holidays[key];
              const weekday = j >= 1 && j <= 5;

              const cellDate = new Date(year, month, day);
              const todayClean = new Date(today.getFullYear(), today.getMonth(), today.getDate());
              const past = cellDate < todayClean;

              return (
                <div key={j} className="h-32 border p-1 flex flex-col">

                  <div className="text-right text-sm font-medium">{day}</div>

                  {holiday && (
                    <div className="mt-1 flex-1 bg-red-500 text-white text-xs flex items-center justify-center rounded">
                      {holiday}
                    </div>
                  )}

                  {!holiday && weekday && !past && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <div
                          onClick={() => handleDayClick(day)}
                          className={`mt-2 py-2 text-sm rounded border w-full
                          ${selectedKey === key ? "bg-blue-500 text-white border-blue-600" :
                              "bg-slate-100 text-blue-600 border-slate-300 hover:bg-slate-200"}`}
                        >
                          8AM – 5PM
                        </div>
                      </AlertDialogTrigger>

                      <AlertDialogPortal>
                        <AlertDialogOverlay />
                        <AlertDialogContent className="w-[480px]">

                          <div className="mb-4">
                            <AlertDialogTitle>Select time</AlertDialogTitle>
                            <AlertDialogDescription>
                              You selected: <span className="font-semibold">
                                {pendingDate ? formatLong(pendingDate) : ""}
                              </span>
                            </AlertDialogDescription>
                          </div>

                          <TimePickerM3
                            ref={timeRef}
                            onConfirm={(info) => {
                              const full = {
                                date: pendingDate,
                                time: info.time,
                                hour: info.hour,
                                minute: info.minute,
                                ampm: info.ampm,
                                datetime: `${pendingDate} ${info.time}`
                              };

                              onSelect(full);
                              setSelectedKey(pendingDate);
                            }}
                          />

                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => timeRef.current && timeRef.current.commit()}
                            >
                              Proceed
                            </AlertDialogAction>
                          </AlertDialogFooter>

                        </AlertDialogContent>
                      </AlertDialogPortal>
                    </AlertDialog>
                  )}

                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
