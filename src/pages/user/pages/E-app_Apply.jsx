import React from "react";

const ServiceCard = ({ title, icon }) => (
  <div className="bg-white rounded-lg p-8 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-shadow">
    <div className="w-16 h-16 bg-[#003161] rounded-full flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-center text-gray-800 font-medium">{title}</h3>
  </div>
);

const DocumentIcon = () => (
  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
    <path d="M10 9H8" />
  </svg>
);

const services = [
  {
    id: "barangay-clearance",
    title: "Barangay Clearance",
    icon: <DocumentIcon />,
  },
  {
    id: "business-permit",
    title: "Business Permit",
    icon: <DocumentIcon />,
  },
  {
    id: "cedula",
    title: "Cedula",
    icon: <DocumentIcon />,
  },
  {
    id: "certificate-residency",
    title: "Certificate of Residency",
    icon: <DocumentIcon />,
  },
  {
    id: "indigency",
    title: "Indigency",
    icon: <DocumentIcon />,
  },
];

function E_app_Apply() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#003161] rounded flex items-center justify-center">
                <span className="text-white">≡</span>
              </div>
              <h1 className="ml-3 text-lg font-medium">Bandibad, Mhel R.</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span>Available Barangay Services</span>
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Reminder Box */}
        <div className="bg-[#50589C] text-white rounded-lg p-4 mb-8">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Reminder</span>
          </div>
          <p className="mt-2 text-sm">
            Before proceeding, please ensure that you have provided all required information in your profile.
          </p>
        </div>

        {/* Services Title */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Available Barangay Services</h2>
          <span className="text-sm px-3 py-1 bg-gray-100 rounded">Bonafide</span>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              icon={service.icon}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#002B5B] text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-medium mb-4">Get Started</h3>
              <ul className="space-y-2 text-sm">
                <li>FIRST</li>
                <li>THIRTY TWO</li>
                <li>FOURTY THREE</li>
                <li>FIFTY FOUR</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">COLUMN TWO</h3>
              <ul className="space-y-2 text-sm">
                <li>Sixty Five</li>
                <li>Seventy Six</li>
                <li>Eighty Seven</li>
                <li>Ninety Eight</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">COLUMN THREE</h3>
              <ul className="space-y-2 text-sm">
                <li>One Two</li>
                <li>Three Four</li>
                <li>Five Six</li>
                <li>Seven Eight</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">COLUMN FOUR</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-gray-200">
                  <span className="sr-only">YouTube</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-gray-200">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-gray-200">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63z"/>
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-gray-200">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default E_app_Apply;
