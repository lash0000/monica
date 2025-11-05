import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegCalendarAlt, FaRegClock, FaRegUser } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const WEEKDAYS = ["Su", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sa"];

function formatMonthYear(date) {
  return date.toLocaleDateString(undefined, { month: "long", year: "numeric" });
}

export default function MedicalAppointment() {
  const navigate = useNavigate();
  const { type = 'medical' } = useParams();
  const title = type === 'dental' ? 'Dental Appointment' : 'Medical Appointment';
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selected, setSelected] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [stage, setStage] = useState('date');

  const { days, startOffset } = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const offset = firstDay.getDay(); // 0..6 (Sun..Sat)
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return {
      startOffset: offset,
      days: Array.from({ length: daysInMonth }, (_, i) => i + 1),
    };
  }, [currentMonth]);

  const gotoPrev = () => {
    setCurrentMonth((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  };

  const gotoNext = () => {
    setCurrentMonth((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  };

  return (
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="w-full flex items-center justify-center gap-4">
          {/* Stepper on left center */}
          <aside className="w-40 flex justify-center">
            <ol className="self-center space-y-4">
              {/* Step: Date (active) */}
              <li className="flex">
                <div className="w-12 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border-2 border-secondary text-secondary flex items-center justify-center">
                    <FaRegCalendarAlt className="w-5 h-5" />
                  </div>
                  <div className="mt-2 flex flex-col items-center text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full border-2 border-current" />
                    <span className="w-px h-8 border-l-2 border-dashed border-current/70" />
                    <span className="w-1.5 h-1.5 rounded-full border-2 border-current" />
                  </div>
                </div>
                <div className="ml-3 flex items-center">
                  <span className="text-base font-semibold text-secondary">Date</span>
                </div>
              </li>

              {/* Step: Time */}
              <li className={`flex ${(selectedTime || stage==='info') ? '' : 'opacity-50'}`}>
                <div className="w-12 flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${(selectedTime || stage==='info') ? 'border-secondary text-secondary' : 'border-gray-400 text-gray-500'}`}>
                    <FaRegClock className="w-5 h-5" />
                  </div>
                  <div className={`mt-2 flex flex-col items-center ${(selectedTime || stage==='info') ? 'text-secondary' : 'text-gray-400'}`}>
                    <span className="w-1.5 h-1.5 rounded-full border-2 border-current" />
                    <span className="w-px h-8 border-l-2 border-dashed border-current/70" />
                    <span className="w-1.5 h-1.5 rounded-full border-2 border-current" />
                  </div>
                </div>
                <div className="ml-3 flex items-center">
                  <span className={`text-base font-semibold ${(selectedTime || stage==='info') ? 'text-secondary' : 'text-gray-500'}`}>Time</span>
                </div>
              </li>

              {/* Step: Enter Information */}
              <li className={`flex ${stage==='info' ? '' : 'opacity-50'}`}>
                <div className="w-12 flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${stage==='info' ? 'border-secondary text-secondary' : 'border-gray-400 text-gray-500'}`}>
                    <FaRegUser className="w-5 h-5" />
                  </div>
                </div>
                <div className="ml-3 flex items-center">
                  <span className={`text-base font-semibold ${stage==='info' ? 'text-secondary' : 'text-gray-500'}`}>Enter Information</span>
                </div>
              </li>
            </ol>
          </aside>

          {/* Calendar or Form content */}
          {stage === 'date' ? (
          <div className="bg-white rounded-xl shadow p-5 w-full max-w-lg">
            <h1 className="text-2xl font-semibold text-center mb-6">{title}</h1>
            <p className="text-center text-sm text-gray-600 mb-8">Select your preferred date.</p>

            <div className="mx-auto max-w-md select-none">
              {/* Header */}
              <div className="flex items-center justify-center gap-3 mb-3">
                <button
                  type="button"
                  onClick={gotoPrev}
                  className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center hover:bg-gray-200"
                >
                  <FaChevronLeft className="w-5 h-5" />
                </button>
                <div className="text-gray-900">{formatMonthYear(currentMonth)}</div>
                <button
                  type="button"
                  onClick={gotoNext}
                  className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center"
                >
                  <FaChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Weekdays */}
              <div className="grid grid-cols-7 text-center text-sm text-gray-600 mb-2">
                {WEEKDAYS.map((d) => (
                  <div key={d}>{d}</div>
                ))}
              </div>

              {/* Days */}
              <div className="grid grid-cols-7 gap-y-1.5 text-center">
                {Array.from({ length: startOffset }).map((_, i) => (
                  <div key={`pad-${i}`} />
                ))}
                {days.map((day) => {
                  const dateObj = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                  const isSelected = selected && dateObj.toDateString() === selected.toDateString();
                  const base = "mx-auto w-9 h-9 flex items-center justify-center rounded-full";
                  const cls = isSelected
                    ? `${base} bg-secondary text-secondary-foreground`
                    : `${base} bg-gray-100 text-gray-700 hover:bg-gray-200`;
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setSelected(dateObj)}
                      className={cls}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
              {selectedTime && (
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="bg-secondary text-secondary-foreground hover:opacity-90 px-4 py-2 rounded-md text-sm"
                    onClick={() => setStage('info')}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
          ) : stage === 'info' ? (
          <div className="bg-white rounded-xl shadow p-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-1">Contact Information</h2>
            <p className="text-sm text-gray-500 mb-6">Fill up the information</p>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setStage('submitted'); }}>
              <div>
                <label className="text-sm text-gray-700">Name*</label>
                <input className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="text-sm text-gray-700">Email *</label>
                <input type="email" className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="example@xyz.com" />
              </div>
              <div>
                <label className="text-sm text-gray-700">Mobile</label>
                <input className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="text-sm text-gray-700">Please provide a brief detail about your symptoms.</label>
                <textarea className="mt-1 w-full border rounded-md px-3 py-2 h-28 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="coughs 3x" />
              </div>
              <div className="pt-2 flex justify-center">
                <button type="submit" className="bg-secondary text-secondary-foreground px-5 py-2 rounded-md">Submit</button>
              </div>
            </form>
          </div>
          ) : (
            <div className="bg-white rounded-xl shadow p-6 w-full max-w-lg">
              <h2 className="text-xl font-semibold mb-1">Appointment for E - Health</h2>
              <p className="text-sm text-gray-500 mb-6">Now, It's ready for review kindly check My Application for more updates.</p>

              <div className="space-y-8">
                <div className="rounded-lg bg-secondary text-secondary-foreground p-5">
                  <p className="font-semibold">Step 1: Completed</p>
                  <p className="text-xs opacity-90">This process is more on fill out all requirements for your application form to available barangay service.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">Step 2: For Review</h3>
                  <p className="text-sm text-gray-500">This process will be carefully reviewed by our administrative staff responsible for managing this website portal.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">Step 3: Approval</h3>
                  <p className="text-sm text-gray-500">Once your application has been reviewed, our administrators will proceed to the approval process.</p>
                </div>
              </div>
                    
              <div className="flex justify-end">
                <button type="button" onClick={() => navigate('/e-health')} className="mt-2 px-4 py-2 text-sm rounded-md border">Back</button>
              </div>
            </div>
          )}
          {/* Right panel with times when a day is selected */}
          <aside className="w-64">
            {stage==='date' && selected && (
              <div className="bg-white rounded-xl shadow p-4 flex flex-col min-h-[320px]">
                <div className="text-sm text-gray-700 mb-3">
                  {selected.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'long' })}
                </div>
                <div className="space-y-3">
                  {['9:30 AM','11:00 AM','3:00 PM','4:30 PM','5:00 PM'].map((slot) => {
                    const isActive = selectedTime === slot;
                    const cls = isActive
                      ? 'w-full text-center font-semibold text-secondary border-2 border-secondary rounded-xl py-3 shadow-sm'
                      : 'w-full text-center text-gray-400 border border-secondary/40 rounded-xl py-3 shadow-sm hover:text-secondary hover:border-secondary';
                    return (
                      <button
                        key={slot}
                        type="button"
                        className={cls}
                        onClick={() => setSelectedTime(slot)}
                      >
                        {slot}
                      </button>
                    )
                  })}
                </div>
                
              </div>
            )}
          </aside>
        </div>
      </main>
  );
}


