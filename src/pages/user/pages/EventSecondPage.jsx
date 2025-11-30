import React, { useState } from "react";

export default function EventSecondPage() {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-start justify-center py-12 px-4">
      <div className="w-full max-w-3xl">
        <div className="border-2 border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
          {/* Example image */}
          <div className="w-full h-64 md:h-80 bg-gray-200">
            <div className="w-full h-full p-1 bg-white dark:bg-gray-800">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrmP4NBEj61zRgfBctptAMwEFHBzVwjCtqvg&s"
                alt="Decorative top"
                className="w-full h-full object-cover block rounded-t-md"
              />
            </div>
          </div>
        </div>

        <div className="p-6 relative border-2 border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. 
            Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
          </h1>

          {/* Tab 1 & Tab 2 buttons */}
          <div className="flex items-center space-x-2 mb-5">
            <button
              type="button"
              onClick={() => setActiveTab("tab1")}
              aria-pressed={activeTab === "tab1"}
              className={
                "px-5 py-1 text-sm rounded-md font-medium transition " +
                (activeTab === "tab1"
                  ? "bg-blue-600 text-white border border-blue-700"
                  : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600")
              }
            >
              Tab 1
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("tab2")}
              aria-pressed={activeTab === "tab2"}
              className={
                "px-5 py-1 text-sm rounded-md font-medium transition " +
                (activeTab === "tab2"
                  ? "bg-blue-600 text-white border border-blue-700"
                  : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600")
              }
            >
              Tab 2
            </button>
          </div>

          <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
            Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
          </p>
        </div>
      </div>
    </div>
  );
}
