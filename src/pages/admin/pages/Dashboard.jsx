import { FaArrowRight } from 'react-icons/fa';
import { useMemo, useState, useEffect } from 'react';
import { useDashboardStore } from '../stores/Dashboard.store';

function Dashboard() {
  // -------------------------------
  // FETCH STORE DATA
  // -------------------------------
  const {
    fetchTicketCategories,
    fetchApplicantAnalytics,
    ticketCategories,
    applicantAnalytics,
  } = useDashboardStore();

  useEffect(() => {
    fetchTicketCategories();
    fetchApplicantAnalytics();
  }, []);

  // -------------------------------
  // CHART MONTH COMPUTATION
  // -------------------------------
  const getLastMonths = (count) => {
    const formatter = new Intl.DateTimeFormat('en', { month: 'short' });
    const result = [];
    const now = new Date();
    for (let i = count - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      result.push(formatter.format(d));
    }
    return result;
  };

  const months = useMemo(() => getLastMonths(6), []);
  const rangeLabel = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth() - 5, 1);
    const end = new Date(now.getFullYear(), now.getMonth(), 1);
    const fmt = new Intl.DateTimeFormat('en', { month: 'long' });
    const startYear = start.getFullYear();
    const endYear = end.getFullYear();
    if (startYear === endYear) {
      return `${fmt.format(start)} - ${fmt.format(end)} ${endYear}`;
    }
    return `${fmt.format(start)} ${startYear} - ${fmt.format(end)} ${endYear}`;
  }, []);

  // Temporary demo chart values
  const [complaintData] = useState([75, 52, 40, 20, 70, 15]);
  const [incidentData] = useState([18, 7, 4, 2, 28, 12]);

  // -------------------------------
  // SERVICE MANAGEMENT USING REAL API VALUES
  // -------------------------------
  const serviceCategories = [
    {
      name: 'Maintenance & Infrastructure',
      count: ticketCategories?.Infrastructure ?? 0
    },
    {
      name: 'Healthcare',
      count: ticketCategories?.Healthcare ?? 0
    },
    {
      name: 'Social Services & Assistance',
      count: ticketCategories?.['Social-Services'] ?? 0
    },
    {
      name: 'Community Programs',
      count: ticketCategories?.Community ?? 0
    },
    {
      name: 'Administrative & Governance',
      count: ticketCategories?.Administrative ?? 0
    },
    {
      name: 'Others',
      count: ticketCategories?.Other ?? 0
    },
  ];

  // -------------------------------
  // E-APPLICATIONS USING REAL API VALUES
  // -------------------------------
  const totalForReview = applicantAnalytics?.['for-review'] ?? 0;
  const totalApproved = applicantAnalytics?.approved ?? 0;

  return (
    <div className="w-full space-y-6 mt-10">

      {/* ------------------------------ */}
      {/* TOP CARDS */}
      {/* ------------------------------ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg relative min-h-[220px] pb-16">
          <div className="mb-2">
            <span className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full">
              Traffic Advisory
            </span>
          </div>
          <h3 className="text-xl font-bold mb-2">Narito ang ulat-trapiko para sa ating barangay</h3>
          <p className="text-sm text-purple-100 mb-4">Mula sa prediksyon ng Artificial Intelligence</p>
          <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors flex items-center gap-2 absolute left-6 bottom-6">
            Explore <FaArrowRight />
          </button>
        </div>

        <div className="bg-gradient-to-br from-pink-600 to-pink-700 rounded-2xl p-6 text-white shadow-lg relative min-h-[220px] pb-16">
          <div className="mb-2">
            <span className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full">Prevention</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Narito ang ulat kontra kriminalidad at paghahanda sa bawat sakuna</h3>
          <p className="text-sm text-pink-100 mb-4">Base sa data mula sa mga incident reports</p>
          <button className="bg-white text-pink-600 px-4 py-2 rounded-lg font-semibold hover:bg-pink-50 transition-colors flex items-center gap-2 absolute left-6 bottom-6">
            Explore <FaArrowRight />
          </button>
        </div>
      </div>

      {/* ------------------------------ */}
      {/* SERVICE MANAGEMENT */}
      {/* ------------------------------ */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Service Management</h2>
        <p className="text-sm text-gray-500">Mula sa mga existing tickets ng ating mga ka-barangay.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {serviceCategories.map((service, i) => (
          <div key={i} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer relative min-h-[140px]">
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-gray-300 bg-gray-100 flex items-center justify-center">
              <FaArrowRight className="text-gray-600 text-xs rotate-[320deg]" style={{ transformOrigin: 'center' }} />
            </div>
            <h3 className="text-sm font-medium text-gray-700 pr-12">{service.name}</h3>
            <span className="absolute bottom-4 left-4 text-3xl font-bold text-gray-800">{service.count}</span>
          </div>
        ))}
      </div>


      {/* Blotter Section */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Blotter</h2>
          <p className="text-sm text-gray-500">Monthly statistics for complaints and incident reports</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* All for Complaint Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900">All for Complaint</h3>
          <p className="text-xs text-gray-500 mb-4">{rangeLabel}</p>
          <div className="relative h-64">
            {/* Y-axis labels with grid */}
            <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-[11px] text-gray-500 z-0">
              {[100, 75, 50, 25, 0].map(v => (
                <div key={v} className="flex items-center">
                  <span className="w-6 text-right mr-2">{v}</span>
                  <div className="flex-1 border-t border-gray-200" />
                </div>
              ))}
            </div>
            {/* Chart area */}
            <div className="ml-10 h-full flex items-end justify-between gap-3 pb-8">
              {months.map((month, index) => {
                const height = (complaintData[index] / 100) * 100;
                return (
                  <div key={month} className="flex-1 flex flex-col justify-end items-center h-full">
                    <div
                      className="w-full rounded-t-md relative z-10"
                      style={{ height: `${height}%`, backgroundColor: '#0B2D4F' }}
                    />
                  </div>
                );
              })}
            </div>
            {/* X-axis labels */}
            <div className="ml-10 mt-2 flex justify-between text-[11px] text-gray-500">
              {months.map(month => (
                <span key={month} className="flex-1 text-center">{month}</span>
              ))}
            </div>
          </div>
          <div className="mt-10">
            <p className="text-sm font-semibold text-gray-900">Trending up by 2.4% this month</p>
            <p className="text-xs text-gray-500">Showing total complaints for the last 6 months</p>
          </div>
        </div>

        {/* All for Incident Reports Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900">All for Incident Reports</h3>
          <p className="text-xs text-gray-500 mb-4">{rangeLabel}</p>
          <div className="relative h-64">
            {/* Y-axis labels with grid */}
            <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-[11px] text-gray-500 z-0">
              {[100, 75, 50, 25, 0].map(v => (
                <div key={v} className="flex items-center">
                  <span className="w-6 text-right mr-2">{v}</span>
                  <div className="flex-1 border-t border-gray-200" />
                </div>
              ))}
            </div>
            {/* Chart area */}
            <div className="ml-10 h-full flex items-end justify-between gap-3 pb-8">
              {months.map((month, index) => {
                const height = (incidentData[index] / 100) * 100;
                return (
                  <div key={month} className="flex-1 flex flex-col justify-end items-center h-full">
                    <div
                      className="w-full rounded-t-md relative z-10"
                      style={{ height: `${height}%`, backgroundColor: '#0B2D4F' }}
                    />
                  </div>
                );
              })}
            </div>
            {/* X-axis labels */}
            <div className="ml-10 mt-2 flex justify-between text-[11px] text-gray-500">
              {months.map(month => (
                <span key={month} className="flex-1 text-center">{month}</span>
              ))}
            </div>
          </div>
          <div className="mt-10">
            <p className="text-sm font-semibold text-gray-900">Trending up by 0.8% this month</p>
            <p className="text-xs text-gray-500">Showing total incident reports for the last 6 months</p>
          </div>
        </div>
      </div>

      {/* ------------------------------ */}
      {/* E-APPLICATIONS */}
      {/* ------------------------------ */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">E-Applications</h2>
        <p className="text-sm text-gray-500">For barangay services available</p>
      </div>
      <div className="flex flex-wrap gap-4">

        {/* FOR REVIEW */}
        <div className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-sm transition-shadow cursor-pointer relative min-h-[140px] w-[280px] flex-shrink-0">
          <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-gray-300 bg-gray-100 flex items-center justify-center">
            <FaArrowRight className="text-gray-600 text-xs rotate-[320deg]" />
          </div>
          <h3 className="text-sm font-medium text-gray-700 pr-12">Total of Ongoing to Review</h3>
          <span className="absolute bottom-4 left-4 text-3xl font-bold text-gray-900">{totalForReview}</span>
        </div>

        {/* APPROVED */}
        <div className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-sm transition-shadow cursor-pointer relative min-h-[140px] w-[280px] flex-shrink-0">
          <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-gray-300 bg-gray-100 flex items-center justify-center">
            <FaArrowRight className="text-gray-600 text-xs rotate-[320deg]" />
          </div>
          <h3 className="text-sm font-medium text-gray-700 pr-12">Total of Approved</h3>
          <span className="absolute bottom-4 left-4 text-3xl font-bold text-gray-900">{totalApproved}</span>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
