import { IoPin } from "react-icons/io5";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { FaMapLocation } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // 👈 this is important


function Landing() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // ⏱️ animation duration in ms
      once: true,     // ✅ animate only once on scroll
    });
  }, []);

  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      {/* Header Section */}
      <section className="bg-green-700 text-white py-2 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Incident Report</h1>
          <p className="text-xl mb-2">Community Safety, Reimagined</p>
          <h2 className="text-3xl font-semibold mb-6">Connecting Your Barangay, One Report at a Time</h2>
          <p className="text-lg max-w-4xl mx-auto mb-8">
            Mata Taumbayan is a smart incident reporting system that empowers residents
            and equips barangay officials to build a safer, more responsive community
            through technology
          </p>
          
          {/* Emergency Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="rounded-lg overflow-hidden h-48">
              <img
                src="/assets/images/Flood.png"
                alt="Emergency Fire Response"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden h-48">
              <img
                src="/assets/images/Flood.png"
                alt="Street Emergency Scene"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden h-48">
              <img
                src="/assets/images/Flood.png"
                alt="Medical Emergency Response"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Submit Report Button */}
          <div className="mt-8">
            <button className="bg-white text-gray-700 px-8 py-4 mb-6 mt-2 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg">
              Submit Report
            </button>
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <div className="py-8 px-4">
           <h2 className="text-4xl font-bold text-center text-black" data-aos="fade-up">Announcements</h2>
                </div>
      <section className="py-16 px-4" style={{ backgroundColor: '#6A994E' }} data-aos="fade-up">
  <div className="max-w-6xl mx-auto">
    <div className="rounded-lg p-4 mb-8">
    </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Medical Mission */}
            <div className="bg-white rounded-lg p-6 shadow-lg" data-aos="fade-right"> 
              <h3 className="text-2xl font-bold text-green-600 mb-4">Free medical mission</h3>
              <div className="space-y-2 mb-4">
                <p><span className="font-semibold">Where:</span> Barangay Hall</p>
                <p><span className="font-semibold">Date:</span> Saturday, October 26, 2025</p>
                <p><span className="font-semibold">Time:</span> 8:00 AM - 4:00 PM</p>
              </div>
              <div className="mb-4">
                <p className="font-semibold mb-2">Services Offered:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>General Check-ups</li>
                  <li>Dental Services (Tooth Extraction)</li>
                  <li>Free Medicine</li>
                </ul>
              </div>
              <div className="flex flex-col gap-4 items-end -mt-66">
                <div className="rounded-lg overflow-hidden h-32">
                  <img
                    src="/assets/images/Flood.png"
                    alt="Medical Check-up"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden h-32">
                  <img
                    src="/assets/images/Flood.png"
                    alt="Dental Treatment"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Anti-Rabies Vaccine Drive */}
            <div className="bg-white rounded-lg p-6 shadow-lg" data-aos="fade-left">
              <h3 className="text-2xl font-bold text-green-600 mb-2">Free Anti-Rabies Vaccine Drive</h3>
              <p className="text-sm mb-4">for your beloved dogs and cats.</p>
              <div className="space-y-2 mb-4">
                <p><span className="font-semibold">Date:</span> Saturday, November 9, 2025</p>
                <p><span className="font-semibold">Time:</span> 9:00 AM - 3:00 PM</p>
                <p><span className="font-semibold">Location:</span> Barangay Covered Court</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg overflow-hidden h-32">
                  <img
                    src="/assets/images/Flood.png"
                    alt="Cat Vaccination"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden h-32">
                  <img
                    src="/assets/images/Flood.png"
                    alt="Dog Vaccination"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Our Barangay Section */}
      <section className="bg-pink-100 py-16 px-4" data-aos="fade-up">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-black mb-12" data-aos="fade-down">About our Barangay</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Information */}
            <div className="space-y-4" data-aos="fade-right">
                <div className="flex items-center space-x-3" data-aos="fade-up" data-aos-delay="200">
                  <span className="text-2xl text-red-500"><IoPin />
                  </span>
                <span>Location: Novaliches, District 5, Quezon City</span>
              </div>
              <div className="flex items-center space-x-3" data-aos="fade-up" data-aos-delay="300">
                <span className="text-2xl">🏢</span>
                <span>Barangay Hall: Moises Street, Jordan Plains Subdivision</span>
              </div>
              <div className="flex items-center space-x-3" data-aos="fade-up" data-aos-delay="400">
                <span className="text-2xl">👥</span>
                <span>Population: 51,785 residents</span>
              </div>
              <div className="flex items-center space-x-3" data-aos="fade-up" data-aos-delay="500">
                <span className="text-2xl">🏠</span>
                <span>Households: ~12,500</span>
              </div>
              <div className="flex items-center space-x-3" data-aos="fade-up" data-aos-delay="600">
                <span className="text-2xl ml-1.5"><MdOutlineFamilyRestroom size={25} />
                </span>
                <span>Average Household Size: 4.2</span>
              </div>
              <div className="flex items-center space-x-3" data-aos="fade-up" data-aos-delay="700">
                <span className="text-2xl">👤</span>
                <span>Punong Barangay: Charles D.J. Manalad</span>
              </div>
            </div>

            {/* Images Grid */}
            <div className="grid grid-cols-2 gap-4" data-aos="fade-left">
              <div className="rounded-lg overflow-hidden h-32" data-aos="zoom-in" data-aos-delay="200">
                <img
                  src="/assets/images/Flood.png"
                  alt="Novaliches Map"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden h-32" data-aos="zoom-in" data-aos-delay="300">
                <img
                  src="/assets/images/Flood.png"
                  alt="Barangay Officials"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden h-32" data-aos="zoom-in" data-aos-delay="400">
                <img
                  src="/assets/images/Flood.png"
                  alt="Barangay Hall"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden h-32" data-aos="zoom-in" data-aos-delay="500">
                <img
                  src="/assets/images/Flood.png"
                  alt="Community Gathering"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Barangay Officials Section */}
<section className="bg-pink-100 py-16 px-4" data-aos="fade-up">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl font-bold text-center text-black mb-12" data-aos="fade-down">Barangay Officials</h2>
    
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6" data-aos="fade-up" data-aos-delay="200">
      {[
        { name: "Chaewon Batumbakal", position: "Punong Barangay", image: "/assets/images/officials/chaewon.jpg" },
        { name: "Na uy Sc Buenaventura", position: "Secretary", image: "/assets/images/officials/" },
        { name: "Nelson Alcantara", position: "Kagawad", image: "/assets/images/officials/" },
        { name: "Ogie S. Francisco", position: "Kagawad", image: "/assets/images/officials/" },
        { name: "Ramil Borre", position: "Kagawad", image: "/assets/images/officials/" },
        { name: "Roger A. Ternida", position: "Kagawad", image: "/assets/images/officials/" },
        { name: "Alfie Manluctao", position: "Kagawad", image: "/assets/images/officials/" },
        { name: "Hon. blab bla bla", position: "Punong Barangay", image: "/assets/images/" }
      ].map((official, index) => (
        <div key={index} className="bg-white rounded-lg p-4 text-center shadow-lg" data-aos="zoom-in" data-aos-delay={`${300 + (index * 100)}`}>
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3 overflow-hidden">
            <img
              src={official.image}
              alt={official.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <span className="text-white text-2xl" style={{ display: 'none' }}>👤</span>
          </div>
          <h3 className="font-semibold text-sm mb-1">{official.name}</h3>
          <p className="text-xs text-gray-600">{official.position}</p>
        </div>
      ))}
    </div>
  </div>
</section>

            {/* Contact Us Section */}
        <section className="py-16 px-4" style={{ backgroundColor: '#8BA77A' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-black-800 mb-12">Contact Us</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Get in Touch */}
            <div>
              <h3 className="text-2xl font-bold text-black-800 mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl text-white"> <FaMapLocation size={15} />
                  </span>
                  <span className="text-black-700">Novaliches, District 5, Quezon City</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl text-white"><FaPhoneAlt size={15}/></span>
                  <span className="text-black-700">+1 6267464596</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl text-white"><FaEnvelope size={15}/></span>
                  <span className="text-black-700">stamonica@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl text-white"><FaRegClock size={15} /></span>
                  <span className="text-black-700">Monday to Saturday, 8:00 AM - 5:00 PM</span>
                </div>
              </div>
              
                       <div className="mt-8">
                    <p className="text-black mb-4">Follow Us</p>
                    <div className="flex space-x-4 items-center text-white">
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl hover:text-blue-600 transition-colors"
                      >
                        <FaFacebook />
                      </a>
                      <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl hover:text-black transition-colors"
                      >
                        <FaSquareXTwitter size={24} />
                      </a>
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl hover:text-pink-600 transition-colors"
                      >
                        <FaInstagramSquare />
                      </a>
                    </div>
                  </div>
                  </div>


            {/* Send us a Message */}
                <div>
                  <h3 className="text-2xl font-bold text-black-800 mb-6">Send us a Message</h3>
                  <form className="space-y-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    <textarea
                      placeholder="Message"
                      rows="4"
                      className="w-full p-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    ></textarea>
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
                </div>
              </div>
            </section>
          </div>
  )
}

export default Landing;