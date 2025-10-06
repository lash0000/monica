import { MdOutlineFamilyRestroom } from "react-icons/md";
import { FaMapLocation } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaClock } from 'react-icons/fa';
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { FaUsers } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaLocationDot } from 'react-icons/fa6';
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css'; // this is important


function Landing() {
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000, //  animation duration in ms
      once: true,     //  animate only once on scroll
    });
  }, []);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const announcements = [
    {
      title: "Free medical mission",
      details: {
        where: "Barangay Hall",
        date: "Saturday, October 26, 2025",
        time: "8:00 AM - 4:00 PM"
      },
      services: [
        "General Check-ups",
        "Dental Services (Tooth Extraction)",
        "Free Medicine"
      ],
      images: ["/assets/images/Flood.png", "/assets/images/Flood.png"]
    },
    {
      title: "Free Anti-Rabies Vaccine Drive",
      subtitle: "for your beloved dogs and cats.",
      details: {
        date: "Saturday, November 9, 2025",
        time: "9:00 AM - 3:00 PM",
        location: "Barangay Covered Court"
      },
      images: ["/assets/images/Flood.png", "/assets/images/Flood.png"]
    }
  ];
  const nextAnnouncement = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
      setIsAnimating(false);
    }, 100);
  };

  const prevAnnouncement = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentAnnouncement((prev) => (prev - 1 + announcements.length) % announcements.length);
      setIsAnimating(false);
    }, 100);
  };

  const goToAnnouncement = (index) => {
    if (isAnimating || index === currentAnnouncement) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentAnnouncement(index);
      setIsAnimating(false);
    }, 100);
  };

  return (
    <div className="w-full min-h-screen bg-white overflow-y-hidden">
      {/* Header Section */}
      <section id="incident-report" className="text-white py-12 xl:py-16 2xl:py-20 px-4" style={{ backgroundColor: '#4B663B' }}>
        <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto text-center">
          <h1 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-4 xl:mb-6 2xl:mb-8">Barangay Santa Monica</h1>
          <p className="text-lg xl:text-xl 2xl:text-2xl mb-3 xl:mb-4 2xl:mb-6">Community Safety, Reimagined</p>
          <h2 className="text-2xl xl:text-3xl 2xl:text-4xl font-semibold mb-4 xl:mb-6 2xl:mb-8">Connecting Your Barangay, One Report at a Time</h2>
          <p className="text-base xl:text-lg 2xl:text-xl max-w-3xl xl:max-w-4xl 2xl:max-w-5xl mx-auto mb-6 xl:mb-8 2xl:mb-10 leading-relaxed">
            Mata Taumbayan is a smart incident reporting system that empowers residents
            and equips barangay officials to build a safer, more responsive community
            through technology
          </p>

          {/* Emergency Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 xl:gap-6 2xl:gap-8 mt-6 xl:mt-8 2xl:mt-10">
            <div className="rounded-xl overflow-hidden h-40 xl:h-48 2xl:h-56 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
              <img
                src="/assets/images/Flood.png"
                alt="Emergency Fire Response"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden h-40 xl:h-48 2xl:h-56 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
              <img
                src="/assets/images/Flood.png"
                alt="Street Emergency Scene"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden h-40 xl:h-48 2xl:h-56 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
              <img
                src="/assets/images/Flood.png"
                alt="Medical Emergency Response"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Submit Report Button */}
          <div className="mt-6 xl:mt-8 2xl:mt-10">
            <button className="bg-white text-gray-700 px-8 xl:px-10 2xl:px-12 py-3 xl:py-4 2xl:py-5 rounded-xl font-semibold text-base xl:text-lg 2xl:text-xl hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
              Submit Report
            </button>
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <div className="py-6 xl:py-8 2xl:py-10 px-4 pt-12 xl:pt-16 2xl:pt-20">
        <h1 className="text-3xl xl:text-4xl 2xl:text-5xl font-bold text-center text-black" data-aos="fade-up">Announcements</h1>
      </div>
      <section id="announcements" className="pt-4 pb-8 xl:pt-6 xl:pb-12 2xl:pt-8 2xl:pb-16 px-4" style={{ backgroundColor: '#FFFFFF' }} data-aos="fade-up">
        <div className="max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto">

          {/* Carousel Container */}
          <div className="flex items-center gap-6 xl:gap-8 2xl:gap-10">
            {/* Left Navigation Button */}
            <button
              onClick={prevAnnouncement}
              disabled={isAnimating}
              className={`bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 w-12 h-12 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16 rounded-full shadow-xl flex items-center justify-center flex-shrink-0 hover:shadow-2xl transition-all duration-300 hover:scale-110 ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'
                }`}
            >
              <MdOutlineKeyboardArrowLeft size={24} className="xl:w-6 xl:h-6 2xl:w-8 2xl:h-8" />
            </button>

            {/* Carousel Content */}
            <div
              className={`bg-white rounded-2xl p-4 xl:p-6 2xl:p-8 shadow-2xl mx-auto max-w-3xl xl:max-w-4xl 2xl:max-w-5xl transition-all duration-500 ease-in-out flex flex-col justify-between h-[400px] xl:h-[480px] 2xl:h-[560px] hover:shadow-3xl ${isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
                }`}
            >
              {/* Top Section - Title and Details */}
              <div className="flex flex-col justify-start h-1/2">
                <div className={`transition-all duration-300 delay-100 ${isAnimating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}`}>
                  <h3 className="text-xl xl:text-2xl 2xl:text-3xl font-bold text-green-600 mb-3 xl:mb-4 2xl:mb-5">
                    {announcements[currentAnnouncement].title}
                  </h3>
                </div>

                {announcements[currentAnnouncement].subtitle && (
                  <div className={`transition-all duration-300 delay-200 ${isAnimating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}`}>
                    <p className="text-sm xl:text-base 2xl:text-lg mb-3 xl:mb-4 2xl:mb-5">{announcements[currentAnnouncement].subtitle}</p>
                  </div>
                )}

                <div className="space-y-1 xl:space-y-2 2xl:space-y-3 mb-3 xl:mb-4 2xl:mb-5">
                  {Object.entries(announcements[currentAnnouncement].details).map(([key, value]) => (
                    <p key={key} className="text-sm xl:text-base 2xl:text-lg">
                      <span className="font-semibold capitalize">{key}:</span> {value}
                    </p>
                  ))}
                </div>

                {announcements[currentAnnouncement].services && (
                  <div className={`mb-3 xl:mb-4 2xl:mb-5 transition-all duration-300 delay-500 ${isAnimating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}`}>
                    <p className="font-semibold mb-2 xl:mb-3 2xl:mb-4 text-sm xl:text-base 2xl:text-lg">Services Offered:</p>
                    <ul className="list-disc list-inside space-y-1 xl:space-y-2">
                      {announcements[currentAnnouncement].services.map((service, index) => (
                        <li key={index} className={`transition-all duration-300 delay-${600 + (index * 100)} ${isAnimating ? 'translate-x-4 opacity-0' : 'translate-x-0 opacity-100'} text-sm xl:text-base 2xl:text-lg`}>
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Bottom Section - Images */}
              <div className="flex flex-col justify-end h-1/2 mt-3 xl:mt-4 2xl:mt-5">
                <div className={`grid gap-3 xl:gap-4 2xl:gap-5 transition-all duration-300 delay-700 ${announcements[currentAnnouncement].images.length === 2 ? 'grid-cols-2' : 'grid-cols-1'} ${isAnimating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}`}>
                  {announcements[currentAnnouncement].images.map((image, index) => (
                    <div key={index} className={`rounded-xl overflow-hidden h-24 xl:h-32 2xl:h-40 transition-all duration-300 delay-${800 + (index * 100)} ${isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'} shadow-xl hover:shadow-2xl`}>
                      <img
                        src={image}
                        alt={`${announcements[currentAnnouncement].title} ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Navigation Button */}
            <button
              onClick={nextAnnouncement}
              disabled={isAnimating}
              className={`bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 w-12 h-12 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16 rounded-full shadow-xl flex items-center justify-center flex-shrink-0 hover:shadow-2xl transition-all duration-300 hover:scale-110 ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'
                }`}
            >
              <MdOutlineKeyboardArrowRight size={24} className="xl:w-6 xl:h-6 2xl:w-8 2xl:h-8" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-4 xl:mt-6 2xl:mt-8 space-x-2 xl:space-x-3 2xl:space-x-4">
            {announcements.map((_, index) => (
              <button
                key={index}
                onClick={() => goToAnnouncement(index)}
                disabled={isAnimating}
                className={`w-3 h-3 xl:w-4 xl:h-4 2xl:w-5 2xl:h-5 rounded-full transition-all duration-300 hover:scale-125 ${index === currentAnnouncement
                  ? 'bg-green-600 shadow-lg scale-110'
                  : 'bg-gray-400 hover:bg-gray-500'
                  } ${isAnimating ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Our Barangay Section */}
      <section id="about-barangay" className="bg-[#4B663B] py-16 xl:py-20 2xl:py-24 px-4 pt-20 xl:pt-24 2xl:pt-28" data-aos="fade-up">
        <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto">
          <h2 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold text-center text-white mb-10 xl:mb-12 2xl:mb-16" data-aos="fade-down">About our Barangay</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 2xl:gap-20 items-start">
            {/* Information */}
            <div className="space-y-4 xl:space-y-6 2xl:space-y-8 flex flex-col justify-center" data-aos="fade-right">
              <div className="flex items-center space-x-4 xl:space-x-6 2xl:space-x-8" data-aos="fade-up" data-aos-delay="200">
                <span className="text-2xl xl:text-3xl 2xl:text-4xl text-white"><FaLocationDot />
                </span>
                <span className="text-lg xl:text-xl 2xl:text-2xl text-white">Location: Novaliches, District 5, Quezon City</span>
              </div>
              <div className="flex items-center space-x-4 xl:space-x-6 2xl:space-x-8" data-aos="fade-up" data-aos-delay="300">
                <span className="text-2xl xl:text-3xl 2xl:text-4xl text-white"><FaMapLocation /></span>
                <span className="text-lg xl:text-xl 2xl:text-2xl text-white">Barangay Hall: Moises Street, Jordan Plains Subdivision</span>
              </div>
              <div className="flex items-center space-x-4 xl:space-x-6 2xl:space-x-8" data-aos="fade-up" data-aos-delay="400">
                <span className="text-2xl xl:text-3xl 2xl:text-4xl text-white"><FaUsers /></span>
                <span className="text-lg xl:text-xl 2xl:text-2xl text-white">Population: 51,785 residents</span>
              </div>
              <div className="flex items-center space-x-4 xl:space-x-6 2xl:space-x-8" data-aos="fade-up" data-aos-delay="500">
                <span className="text-2xl xl:text-3xl 2xl:text-4xl text-white"><FaHome /></span>
                <span className="text-lg xl:text-xl 2xl:text-2xl text-white">Households: ~12,500</span>
              </div>
              <div className="flex items-center space-x-4 xl:space-x-6 2xl:space-x-8" data-aos="fade-up" data-aos-delay="600">
                <span className="text-2xl xl:text-3xl 2xl:text-4xl text-white"><MdOutlineFamilyRestroom /></span>
                <span className="text-lg xl:text-xl 2xl:text-2xl text-white">Average Household Size: 4.2</span>
              </div>
              <div className="flex items-center space-x-4 xl:space-x-6 2xl:space-x-8" data-aos="fade-up" data-aos-delay="700">
                <span className="text-2xl xl:text-3xl 2xl:text-4xl text-white"><FaUser /></span>
                <span className="text-lg xl:text-xl 2xl:text-2xl text-white">Punong Barangay: Charles D.J. Manalad</span>
              </div>
            </div>

            {/* Images Grid - 2x2 grid for better balance */}
            <div className="grid grid-cols-2 gap-6 xl:gap-8 2xl:gap-10" data-aos="fade-left">
              <div className="rounded-2xl overflow-hidden h-48 xl:h-56 2xl:h-64 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105" data-aos="zoom-in" data-aos-delay="200">
                <img
                  src="/assets/images/Flood.png"
                  alt="Novaliches Map"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="rounded-2xl overflow-hidden h-48 xl:h-56 2xl:h-64 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105" data-aos="zoom-in" data-aos-delay="300">
                <img
                  src="/assets/images/Flood.png"
                  alt="Barangay Officials"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="rounded-2xl overflow-hidden h-48 xl:h-56 2xl:h-64 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105" data-aos="zoom-in" data-aos-delay="400">
                <img
                  src="/assets/images/Flood.png"
                  alt="Barangay Hall"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="rounded-2xl overflow-hidden h-48 xl:h-56 2xl:h-64 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105" data-aos="zoom-in" data-aos-delay="500">
                <img
                  src="/assets/images/Flood.png"
                  alt="Community Gathering"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Barangay Officials Section */}
      <section id="barangay-officials" className="bg-[#ffffff] py-16 xl:py-20 2xl:py-24 px-4 pt-20 xl:pt-24 2xl:pt-28" data-aos="fade-up">
        <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto">
          <h2 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold text-center text-black mb-10 xl:mb-12 2xl:mb-16" data-aos="fade-down">Barangay Officials</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-6 xl:gap-8 2xl:gap-10" data-aos="fade-up" data-aos-delay="200">
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
              <div key={index} className="bg-white rounded-2xl p-6 xl:p-8 2xl:p-10 text-center shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105" data-aos="zoom-in" data-aos-delay={`${300 + (index * 100)}`}>
                <div className="w-20 h-20 xl:w-24 xl:h-24 2xl:w-28 2xl:h-28 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 xl:mb-6 2xl:mb-8 overflow-hidden shadow-xl">
                  <img
                    src={official.image}
                    alt={official.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <span className="text-white text-2xl xl:text-3xl 2xl:text-4xl" style={{ display: 'none' }}>👤</span>
                </div>
                <h3 className="font-bold text-base xl:text-lg 2xl:text-xl mb-2 xl:mb-3 2xl:mb-4 text-gray-800">{official.name}</h3>
                <p className="text-sm xl:text-base 2xl:text-lg text-gray-600 font-medium">{official.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact-us" className="py-12 xl:py-16 2xl:py-20 px-4" style={{ backgroundColor: '#4B663B' }} data-aos="fade-up">
        <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto">
          <h2 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold text-center text-white mb-8 xl:mb-10 2xl:mb-12">Contact Us</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 2xl:gap-16">
            {/* Get in Touch */}
            <div>
              <h3 className="text-3xl xl:text-4xl 2xl:text-5xl font-bold text-white mb-6 xl:mb-8 2xl:mb-10">Get in Touch</h3>
              <div className="space-y-4 xl:space-y-6 2xl:space-y-8">
                <div className="flex items-center space-x-4 xl:space-x-6 2xl:space-x-8">
                  <span className="text-2xl xl:text-3xl 2xl:text-4xl text-white"> <FaMapLocation />
                  </span>
                  <span className="text-lg xl:text-xl 2xl:text-2xl text-white">Novaliches, District 5, Quezon City</span>
                </div>
                <div className="flex items-center space-x-4 xl:space-x-6 2xl:space-x-8">
                  <span className="text-2xl xl:text-3xl 2xl:text-4xl text-white"><FaPhoneAlt /></span>
                  <span className="text-lg xl:text-xl 2xl:text-2xl text-white">+1 6267464596</span>
                </div>
                <div className="flex items-center space-x-4 xl:space-x-6 2xl:space-x-8">
                  <span className="text-2xl xl:text-3xl 2xl:text-4xl text-white"><FaEnvelope /></span>
                  <span className="text-lg xl:text-xl 2xl:text-2xl text-white">stamonica@gmail.com</span>
                </div>
                <div className="flex items-center space-x-4 xl:space-x-6 2xl:space-x-8">
                  <span className="text-2xl xl:text-3xl 2xl:text-4xl text-white"> <FaClock /></span>
                  <span className="text-lg xl:text-xl 2xl:text-2xl text-white">Monday to Saturday, 8:00 AM - 5:00 PM</span>
                </div>
              </div>

              <div className="mt-6 xl:mt-8 2xl:mt-10">
                <p className="text-white mb-4 xl:mb-6 2xl:mb-8 text-lg xl:text-xl 2xl:text-2xl font-semibold">Follow Us</p>
                <div className="flex space-x-4 xl:space-x-6 2xl:space-x-8 items-center text-white">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl xl:text-3xl 2xl:text-4xl hover:text-blue-400 transition-all duration-300 hover:scale-110"
                  >
                    <FaFacebook />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl xl:text-3xl 2xl:text-4xl hover:text-gray-300 transition-all duration-300 hover:scale-110"
                  >
                    <FaSquareXTwitter />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl xl:text-3xl 2xl:text-4xl hover:text-pink-400 transition-all duration-300 hover:scale-110"
                  >
                    <FaInstagramSquare />
                  </a>
                </div>
              </div>
            </div>


            {/* Send us a Message */}
            <div>
              <h3 className="text-2xl xl:text-3xl 2xl:text-4xl font-bold text-white mb-6 xl:mb-8 2xl:mb-10">Send us a Message</h3>
              <form className="space-y-4 xl:space-y-6 2xl:space-y-8">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-4 xl:p-5 2xl:p-6 rounded-xl border border-white bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base xl:text-lg 2xl:text-xl shadow-lg hover:shadow-xl transition-all duration-300"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-4 xl:p-5 2xl:p-6 rounded-xl border border-white bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base xl:text-lg 2xl:text-xl shadow-lg hover:shadow-xl transition-all duration-300"
                />
                <textarea
                  placeholder="Message"
                  rows="4"
                  className="w-full p-4 xl:p-5 2xl:p-6 rounded-xl border border-white bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base xl:text-lg 2xl:text-xl shadow-lg hover:shadow-xl transition-all duration-300"
                ></textarea>
                <button
                  type="submit"
                  className="bg-white text-black px-8 xl:px-10 2xl:px-12 py-4 xl:py-5 2xl:py-6 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 text-base xl:text-lg 2xl:text-xl cursor-pointer shadow-xl hover:shadow-2xl hover:scale-105"
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