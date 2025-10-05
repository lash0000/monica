import { useEffect } from 'react';
import { FaPhone, FaFireAlt, FaHospital, FaShieldAlt, FaBolt, FaWater, FaChartBar, FaAmbulance, FaHome } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';

function EmergencyHotlines() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Emergency Hotlines Section */}
      <section id="emergency-hotlines" className="py-12 xl:py-16 px-4" style={{ backgroundColor: '#f8f9fa' }} data-aos="fade-up">
        <div className="max-w-5xl xl:max-w-6xl mx-auto">
          {/* Title */}
          <div className="text-center mb-8 xl:mb-12">
            <h1 className="text-3xl xl:text-4xl font-bold mb-4" style={{ color: '#4B663B' }} data-aos="fade-up">
              EMERGENCY HOTLINES
            </h1>
            <p className="text-base xl:text-lg text-gray-600 mb-2" data-aos="fade-up" data-aos-delay="100">
              Important contact numbers for emergencies and essential services
            </p>
            <p className="text-sm xl:text-base text-gray-600" data-aos="fade-up" data-aos-delay="200">
              Save these numbers and call immediately in case of emergency
            </p>
          </div>

          {/* Critical Emergency Numbers - Most Important */}
          <div className="mb-8 xl:mb-12">
            <h3 className="text-xl xl:text-2xl font-bold text-center mb-6" style={{ color: '#4B663B' }}>CRITICAL EMERGENCY</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 xl:gap-6">
              
              {/* 911 Emergency */}
              <div className="bg-red-600 text-white rounded-lg p-6 xl:p-8 shadow-md text-center hover:shadow-lg transition-shadow duration-300" data-aos="fade-up" data-aos-delay="100">
                <FaPhone className="text-3xl mb-3 mx-auto" />
                <h3 className="text-base font-bold mb-2">NATIONAL EMERGENCY</h3>
                <p className="text-3xl xl:text-4xl font-bold">911</p>
                <p className="text-sm mt-2 opacity-90">Life-threatening emergencies</p>
              </div>

              {/* QC Hotline */}
              <div className="text-white rounded-lg p-6 xl:p-8 shadow-md text-center hover:shadow-lg transition-shadow duration-300" style={{ backgroundColor: '#4B663B' }} data-aos="fade-up" data-aos-delay="200">
                <FaShieldAlt className="text-3xl mb-3 mx-auto" />
                <h3 className="text-base font-bold mb-2">QC HOTLINE</h3>
                <p className="text-3xl xl:text-4xl font-bold">122</p>
                <p className="text-sm mt-2 opacity-90">Quezon City Emergency</p>
              </div>

              {/* Barangay Emergency */}
              <div className="text-white rounded-lg p-6 xl:p-8 shadow-md text-center hover:shadow-lg transition-shadow duration-300" style={{ backgroundColor: '#6B7F5B' }} data-aos="fade-up" data-aos-delay="300">
                <FaPhone className="text-3xl mb-3 mx-auto" />
                <h3 className="text-base font-bold mb-2">BARANGAY EMERGENCY</h3>
                <div className="space-y-1">
                  <p className="text-lg font-bold">0931-111-1019</p>
                  <p className="text-base">0906-402-4512</p>
                  <p className="text-base">847-72621</p>
                </div>
              </div>

            </div>
          </div>

          {/* All Services in One Grid */}
          <div className="bg-white rounded-xl p-6 xl:p-8 shadow-md mb-6 xl:mb-8">
            <h3 className="text-xl xl:text-2xl font-bold text-center mb-6" style={{ color: '#4B663B' }}>EMERGENCY & UTILITY SERVICES</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xl:gap-6">
              
              {/* Fire Department */}
              <div className="text-center p-4 rounded-lg border-l-4 border-red-500 bg-red-50" data-aos="fade-up" data-aos-delay="400">
                <FaFireAlt className="text-red-500 text-2xl mb-3 mx-auto" />
                <h4 className="font-bold text-gray-800 text-sm">Fire Department</h4>
                <p className="text-sm font-semibold text-gray-800">8928-1982</p>
                <p className="text-sm text-gray-700">8936-3594</p>
              </div>

              {/* Police Station */}
              <div className="text-center p-4 rounded-lg border-l-4 border-blue-500 bg-blue-50" data-aos="fade-up" data-aos-delay="500">
                <FaShieldAlt className="text-blue-500 text-2xl mb-3 mx-auto" />
                <h4 className="font-bold text-gray-800 text-sm">Police Station 4</h4>
                <p className="text-sm font-semibold text-gray-800">0998-598-7950</p>
                <p className="text-sm text-gray-700">8374-2248</p>
              </div>

              {/* District Hospital */}
              <div className="text-center p-4 rounded-lg border-l-4 bg-green-50" style={{ borderColor: '#4B663B' }} data-aos="fade-up" data-aos-delay="600">
                <FaHospital className="text-2xl mb-3 mx-auto" style={{ color: '#4B663B' }} />
                <h4 className="font-bold text-gray-800 text-sm">District Hospital</h4>
                <p className="text-sm font-semibold text-gray-800">8931-0312</p>
              </div>

              {/* Red Cross */}
              <div className="text-center p-4 rounded-lg border-l-4 border-red-400 bg-red-50" data-aos="fade-up" data-aos-delay="700">
                <FaAmbulance className="text-red-500 text-2xl mb-3 mx-auto" />
                <h4 className="font-bold text-gray-800 text-sm">Red Cross</h4>
                <p className="text-sm font-semibold text-gray-800">8403-1063</p>
              </div>

              {/* Meralco */}
              <div className="text-center p-4 rounded-lg border-l-4 border-yellow-500 bg-yellow-50" data-aos="fade-up" data-aos-delay="800">
                <FaBolt className="text-yellow-600 text-2xl mb-3 mx-auto" />
                <h4 className="font-bold text-gray-800 text-sm">MERALCO</h4>
                <p className="text-sm font-semibold text-yellow-600">16211</p>
              </div>

              {/* Maynilad */}
              <div className="text-center p-4 rounded-lg border-l-4 border-blue-400 bg-blue-50" data-aos="fade-up" data-aos-delay="900">
                <FaWater className="text-blue-600 text-2xl mb-3 mx-auto" />
                <h4 className="font-bold text-gray-800 text-sm">MAYNILAD</h4>
                <p className="text-sm font-semibold text-blue-600">1626</p>
              </div>

              {/* MMDA */}
              <div className="text-center p-4 rounded-lg border-l-4 border-purple-500 bg-purple-50" data-aos="fade-up" data-aos-delay="1000">
                <FaChartBar className="text-purple-600 text-2xl mb-3 mx-auto" />
                <h4 className="font-bold text-gray-800 text-sm">MMDA</h4>
                <p className="text-sm font-semibold text-purple-600">136</p>
              </div>

              {/* QC BDRMO */}
              <div className="text-center p-4 rounded-lg border-l-4 border-teal-500 bg-teal-50" data-aos="fade-up" data-aos-delay="1100">
                <FaShieldAlt className="text-teal-600 text-2xl mb-3 mx-auto" />
                <h4 className="font-bold text-gray-800 text-sm">QC BDRMO</h4>
                <p className="text-sm font-semibold text-teal-600">09166306686</p>
              </div>

            </div>
          </div>

          {/* Barangay Hall Locations */}
          <div className="bg-white rounded-xl p-6 xl:p-8 shadow-md mb-6">
            <h3 className="text-xl xl:text-2xl font-bold text-center mb-6" style={{ color: '#4B663B' }}>BARANGAY HALL LOCATIONS</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#E8F5E8' }}>
                <FaHome className="text-xl mb-2 mx-auto" style={{ color: '#4B663B' }} />
                <h4 className="font-bold text-gray-800 text-base">JPS</h4>
                <p className="text-sm font-semibold" style={{ color: '#4B663B' }}>0931-111-1019</p>
              </div>

              <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#E8F5E8' }}>
                <FaHome className="text-xl mb-2 mx-auto" style={{ color: '#4B663B' }} />
                <h4 className="font-bold text-gray-800 text-base">Satellite Aguardiente</h4>
                <p className="text-sm font-semibold" style={{ color: '#4B663B' }}>0985-758-7074</p>
              </div>

              <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#E8F5E8' }}>
                <FaHome className="text-xl mb-2 mx-auto" style={{ color: '#4B663B' }} />
                <h4 className="font-bold text-gray-800 text-base">Satellite Palmera</h4>
                <p className="text-sm font-semibold" style={{ color: '#4B663B' }}>0906-402-4512</p>
              </div>

            </div>
          </div>

          {/* Emergency Note */}
          <div className="text-center bg-red-100 border border-red-200 rounded-xl p-6 xl:p-8" data-aos="fade-up" data-aos-delay="1500">
            <FaPhone className="text-3xl text-red-600 mb-3 mx-auto" />
            <p className="text-red-800 font-semibold text-lg xl:text-xl mb-2">
              🚨 In case of life-threatening emergencies, call <strong>911</strong> immediately!
            </p>
            <p className="text-red-700 text-base xl:text-lg font-medium">
              "Mabilisang Aksyon, Agarang Solusyon"
            </p>
            <p className="text-red-600 text-sm mt-1">
              - KAP CHARLIE MANALAD AND COUNCIL
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}

export default EmergencyHotlines;
