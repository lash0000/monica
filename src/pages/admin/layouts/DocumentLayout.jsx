
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { X, Search, ZoomIn, ZoomOut, Moon, Download } from 'lucide-react';
import { useState, useEffect } from "react";

export default function Document_Layout() {
  const [zoom, setZoom] = useState(100);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const docTitle = location.state?.docTitle || "Document";
  const zoomIn = () => setZoom((z) => Math.min(z + 10, 200));
  const zoomOut = () => setZoom((z) => Math.max(z - 10, 50));
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const pages = document.querySelectorAll("article").length;
    setTotalPages(pages);

    const updatePage = () => {
      const articles = document.querySelectorAll("article");
      let current = 1;

      articles.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom >= 200) {
          current = index + 1;
        }
      });

      setPage(current);
    };

    window.addEventListener("scroll", updatePage);
    updatePage();

    return () => window.removeEventListener("scroll", updatePage);
  }, [zoom]);

  return (
    <div id="authenticated-wrapper" className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header Toolbar */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center justify-between px-4 py-3 gap-4">

          {/* Left Section - Close & Filename */}
          <div className="flex items-center gap-3">
            <button
              className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition"
              onClick={() => navigate(-1)}
            >
              <X size={20} className="text-gray-700 dark:text-gray-300" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-100 dark:bg-red-900 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-red-600 dark:text-red-300">📄</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {docTitle}.pdf
              </span>
            </div>
          </div>


          {/* Center Section - Page Navigation */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Page</span>

            <input
              type="text"
              value={page}
              readOnly
              className="w-10 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm text-center bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />

            <span className="text-sm text-gray-600 dark:text-gray-400">/ {totalPages}</span>
          </div>

          {/* Right Section - Controls */}
          <div className="flex items-center gap-2">
            <button className="hidden p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition">
              <Search size={18} className="text-gray-700 dark:text-gray-300" />
            </button>


            <button
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition"
              onClick={zoomIn}
            >
              <ZoomIn size={18} className="text-gray-700 dark:text-gray-300" />
            </button>

            <span className="text-sm text-gray-700 dark:text-gray-300 min-w-10 text-center">
              {zoom}%
            </span>

            <button
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition"
              onClick={zoomOut}
            >
              <ZoomOut size={18} className="text-gray-700 dark:text-gray-300" />
            </button>


            <button className="p-2 hover:bg-blue-600 dark:hover:bg-blue-700 rounded transition bg-blue-600">
              <Download size={18} className="text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main
        id="authenticated-main"
        style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
        className="flex-1 bg-slate-100"
      >
        <Outlet />
      </main>

    </div>
  );
}
