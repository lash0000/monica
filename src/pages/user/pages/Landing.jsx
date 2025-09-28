import { IoPin } from "react-icons/io5";
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
      <section id="incident-report" className="text-white py-8 xl:py-12 px-4" style={{ backgroundColor: '#4B663B' }}>
        <div className="max-w-4xl xl:max-w-5xl mx-auto text-center">
          <h1 className="text-3xl xl:text-4xl font-bold mb-3 xl:mb-4">Barangay Santa Monica</h1>
          <p className="text-base xl:text-lg mb-2 xl:mb-3">Community Safety, Reimagined</p>
          <h2 className="text-xl xl:text-2xl font-semibold mb-3 xl:mb-4">Connecting Your Barangay, One Report at a Time</h2>
          <p className="text-sm xl:text-base max-w-2xl xl:max-w-3xl mx-auto mb-4 xl:mb-6">
            Mata Taumbayan is a smart incident reporting system that empowers residents
            and equips barangay officials to build a safer, more responsive community
            through technology
          </p>

          {/* Emergency Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 xl:gap-4 mt-5 xl:mt-6">
            <div className="rounded-lg overflow-hidden h-32 xl:h-36">
              <img
                src="/assets/images/Flood.png"
                alt="Emergency Fire Response"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden h-32 xl:h-36">
              <img
                src="/assets/images/Flood.png"
                alt="Street Emergency Scene"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden h-32 xl:h-36">
              <img
                src="/assets/images/Flood.png"
                alt="Medical Emergency Response"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Submit Report Button */}
          <div className="mt-4 xl:mt-6">
            <button className="bg-white text-gray-700 px-4 xl:px-6 py-2 xl:py-3 rounded-lg font-semibold text-sm xl:text-base hover:bg-gray-100 transition-colors shadow-lg">
              Submit Report
            </button>
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <div className="py-4 xl:py-6 px-4 pt-8">
        <h1 className="text-2xl xl:text-3xl font-bold text-center text-black" data-aos="fade-up">Announcements</h1>
      </div>
      <section id="announcements" className="pt-3 pb-6 xl:pt-4 xl:pb-8 px-4" style={{ backgroundColor: '#FFFFFF' }} data-aos="fade-up">
        <div className="max-w-3xl xl:max-w-4xl mx-auto">

          {/* Carousel Container */}
          <div className="flex items-center gap-4">
            {/* Left Navigation Button */}
            <button
              onClick={prevAnnouncement}
              disabled={isAnimating}
              className={`bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 w-10 h-10 rounded-full shadow-lg flex items-center justify-center flex-shrink-0 ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'
                }`}
            >
              <MdOutlineKeyboardArrowLeft size={20} />
            </button>

            {/* Carousel Content */}
            <div
              className={`bg-white rounded-lg p-3 xl:p-4 shadow-lg mx-auto max-w-2xl xl:max-w-3xl transition-all duration-500 ease-in-out flex flex-col justify-between h-[320px] xl:h-[380px] ${isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
                }`}
            >
              {/* Top Section - Title and Details */}
              <div className="flex flex-col justify-start h-1/2">
                <div className={`transition-all duration-300 delay-100 ${isAnimating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}`}>
                  <h3 className="text-lg xl:text-xl font-bold text-green-600 mb-2 xl:mb-3">
                    {announcements[currentAnnouncement].title}
                  </h3>
                </div>

                {announcements[currentAnnouncement].subtitle && (
                  <div className={`transition-all duration-300 delay-200 ${isAnimating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}`}>
                    <p className="text-xs xl:text-sm mb-2 xl:mb-3">{announcements[currentAnnouncement].subtitle}</p>
                  </div>
                )}

                <div className="space-y-0.5 xl:space-y-1 mb-2 xl:mb-3">
                  {Object.entries(announcements[currentAnnouncement].details).map(([key, value]) => (
                    <p key={key} className="text-xs xl:text-sm">
                      <span className="font-semibold capitalize">{key}:</span> {value}
                    </p>
                  ))}
                </div>

                {announcements[currentAnnouncement].services && (
                  <div className={`mb-2 xl:mb-3 transition-all duration-300 delay-500 ${isAnimating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}`}>
                    <p className="font-semibold mb-1 text-xs xl:text-sm">Services Offered:</p>
                    <ul className="list-disc list-inside space-y-0.5">
                      {announcements[currentAnnouncement].services.map((service, index) => (
                        <li key={index} className={`transition-all duration-300 delay-${600 + (index * 100)} ${isAnimating ? 'translate-x-4 opacity-0' : 'translate-x-0 opacity-100'} text-xs xl:text-sm`}>
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Bottom Section - Images */}
              <div className="flex flex-col justify-end h-1/2 mt-2">
                <div className={`grid gap-2 xl:gap-3 transition-all duration-300 delay-700 ${announcements[currentAnnouncement].images.length === 2 ? 'grid-cols-2' : 'grid-cols-1'} ${isAnimating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}`}>
                  {announcements[currentAnnouncement].images.map((image, index) => (
                    <div key={index} className={`rounded-lg overflow-hidden h-20 xl:h-24 transition-all duration-300 delay-${800 + (index * 100)} ${isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'} shadow-lg hover:shadow-xl`}>
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
              className={`bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 w-10 h-10 rounded-full shadow-lg flex items-center justify-center flex-shrink-0 ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'
                }`}
            >
              <MdOutlineKeyboardArrowRight size={20} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-3 xl:mt-4 space-x-1.5 xl:space-x-2">
            {announcements.map((_, index) => (
              <button
                key={index}
                onClick={() => goToAnnouncement(index)}
                disabled={isAnimating}
                className={`w-2.5 h-2.5 xl:w-3 xl:h-3 rounded-full transition-all duration-300 hover:scale-125 ${index === currentAnnouncement
                  ? 'bg-white shadow-lg scale-110'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                  } ${isAnimating ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              />
            ))}
          </div>
        </div>
      </section>

       {/* About Our Barangay Section */}
       <section id="about-barangay" className="bg-[#4B663B] py-12 xl:py-16 px-4 pt-16" data-aos="fade-up">
         <div className="max-w-5xl xl:max-w-6xl mx-auto">
           <h2 className="text-3xl xl:text-4xl font-bold text-center text-white mb-8 xl:mb-10" data-aos="fade-down">About our Barangay</h2>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 items-start">
             {/* Information */}
             <div className="space-y-3 xl:space-y-4 flex flex-col justify-center" data-aos="fade-right">
               <div className="flex items-center space-x-3 xl:space-x-4" data-aos="fade-up" data-aos-delay="200">
                 <span className="text-xl xl:text-2xl text-white"><FaLocationDot />
                 </span>
                 <span className="text-base xl:text-lg text-white">Location: Novaliches, District 5, Quezon City</span>
               </div>
               <div className="flex items-center space-x-3 xl:space-x-4" data-aos="fade-up" data-aos-delay="300">
                 <span className="text-xl xl:text-2xl text-white"><FaMapLocation /></span>
                 <span className="text-base xl:text-lg text-white">Barangay Hall: Moises Street, Jordan Plains Subdivision</span>
               </div>
               <div className="flex items-center space-x-3 xl:space-x-4" data-aos="fade-up" data-aos-delay="400">
                 <span className="text-xl xl:text-2xl text-white"><FaUsers /></span>
                 <span className="text-base xl:text-lg text-white">Population: 51,785 residents</span>
               </div>
               <div className="flex items-center space-x-3 xl:space-x-4" data-aos="fade-up" data-aos-delay="500">
                 <span className="text-xl xl:text-2xl text-white"><FaHome /></span>
                 <span className="text-base xl:text-lg text-white">Households: ~12,500</span>
               </div>
               <div className="flex items-center space-x-3 xl:space-x-4" data-aos="fade-up" data-aos-delay="600">
                 <span className="text-xl xl:text-2xl text-white"><MdOutlineFamilyRestroom /></span>
                 <span className="text-base xl:text-lg text-white">Average Household Size: 4.2</span>
               </div>
               <div className="flex items-center space-x-3 xl:space-x-4" data-aos="fade-up" data-aos-delay="700">
                 <span className="text-xl xl:text-2xl text-white"><FaUser /></span>
                 <span className="text-base xl:text-lg text-white">Punong Barangay: Charles D.J. Manalad</span>
               </div>
             </div>

             {/* Images Grid - 2x2 grid for better balance */}
             <div className="grid grid-cols-2 gap-4 xl:gap-5" data-aos="fade-left">
               <div className="rounded-lg overflow-hidden h-36 xl:h-42 shadow-lg hover:shadow-xl transition-shadow duration-300" data-aos="zoom-in" data-aos-delay="200">
                 <img
                   src="/assets/images/Flood.png"
                   alt="Novaliches Map"
                   className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                 />
               </div>
               <div className="rounded-lg overflow-hidden h-36 xl:h-42 shadow-lg hover:shadow-xl transition-shadow duration-300" data-aos="zoom-in" data-aos-delay="300">
                 <img
                   src="/assets/images/Flood.png"
                   alt="Barangay Officials"
                   className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                 />
               </div>
               <div className="rounded-lg overflow-hidden h-36 xl:h-42 shadow-lg hover:shadow-xl transition-shadow duration-300" data-aos="zoom-in" data-aos-delay="400">
                 <img
                   src="/assets/images/Flood.png"
                   alt="Barangay Hall"
                   className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                 />
               </div>
               <div className="rounded-lg overflow-hidden h-36 xl:h-42 shadow-lg hover:shadow-xl transition-shadow duration-300" data-aos="zoom-in" data-aos-delay="500">
                 <img
                   src="/assets/images/Flood.png"
                   alt="Community Gathering"
                   className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                 />
               </div>
             </div>
          </div>
        </div>
      </section>

       {/* Barangay Officials Section */}
       <section id="barangay-officials" className="bg-[#ffffff] py-12 xl:py-16 px-4 pt-16" data-aos="fade-up">
         <div className="max-w-5xl xl:max-w-6xl mx-auto">
           <h2 className="text-3xl xl:text-4xl font-bold text-center text-black mb-8 xl:mb-10" data-aos="fade-down">Barangay Officials</h2>

           <div className="grid grid-cols-2 md:grid-cols-4 gap-5 xl:gap-7" data-aos="fade-up" data-aos-delay="200">
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
               <div key={index} className="bg-white rounded-lg p-4 xl:p-5 text-center shadow-lg" data-aos="zoom-in" data-aos-delay={`${300 + (index * 100)}`}>
                 <div className="w-14 h-14 xl:w-18 xl:h-18 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3 xl:mb-4 overflow-hidden">
                   <img
                     src={official.image}
                     alt={official.name}
                     className="w-full h-full object-cover"
                     onError={(e) => {
                       e.target.style.display = 'none';
                       e.target.nextSibling.style.display = 'block';
                     }}
                   />
                   <span className="text-white text-xl xl:text-2xl" style={{ display: 'none' }}>👤</span>
                 </div>
                 <h3 className="font-semibold text-sm xl:text-base mb-1 xl:mb-2">{official.name}</h3>
                 <p className="text-xs xl:text-sm text-gray-600">{official.position}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact-us" className="py-8 xl:py-12 px-4" style={{ backgroundColor: '#4B663B' }} data-aos="fade-up">
        <div className="max-w-4xl xl:max-w-5xl mx-auto">
          <h2 className="text-3xl xl:text-4xl font-bold text-center text-white mb-6 xl:mb-8">Contact Us</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8">
            {/* Get in Touch */}
            <div>
              <h3 className="text-2xl xl:text-3xl font-bold text-white mb-4 xl:mb-6">Get in Touch</h3>
              <div className="space-y-2 xl:space-y-3">
                <div className="flex items-center space-x-2 xl:space-x-3">
                  <span className="text-lg xl:text-xl text-white"> <FaMapLocation size={14} />
                  </span>
                  <span className="text-base xl:text-lg text-white">Novaliches, District 5, Quezon City</span>
                </div>
                <div className="flex items-center space-x-2 xl:space-x-3">
                  <span className="text-lg xl:text-xl text-white"><FaPhoneAlt size={14} /></span>
                  <span className="text-base xl:text-lg text-white">+1 6267464596</span>
                </div>
                <div className="flex items-center space-x-2 xl:space-x-3">
                  <span className="text-lg xl:text-xl text-white"><FaEnvelope size={14} /></span>
                  <span className="text-base xl:text-lg text-white">stamonica@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2 xl:space-x-3">
                  <span className="text-lg xl:text-xl text-white"> <FaClock size={14} /></span>
                  <span className="text-base xl:text-lg text-white">Monday to Saturday, 8:00 AM - 5:00 PM</span>
                </div>
              </div>

              <div className="mt-4 xl:mt-6">
                <p className="text-white mb-3 xl:mb-4 text-base xl:text-lg">Follow Us</p>
                <div className="flex space-x-3 xl:space-x-4 items-center text-white">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl xl:text-2xl hover:text-blue-600 transition-colors"
                  >
                    <FaFacebook />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl xl:text-2xl hover:text-black transition-colors"
                  >
                    <FaSquareXTwitter size={24} />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl xl:text-2xl hover:text-pink-600 transition-colors"
                  >
                    <FaInstagramSquare />
                  </a>
                </div>
              </div>
            </div>


            {/* Send us a Message */}
            <div>
              <h3 className="text-xl xl:text-2xl font-bold text-white mb-4 xl:mb-6">Send us a Message</h3>
              <form className="space-y-3 xl:space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-2 xl:p-3 rounded-lg border border-white bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm xl:text-base"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-2 xl:p-3 rounded-lg border border-white bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm xl:text-base"
                />
                <textarea
                  placeholder="Message"
                  rows="3"
                  className="w-full p-2 xl:p-3 rounded-lg border border-white bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm xl:text-base"
                ></textarea>
                <button
                  type="submit"
                  className="bg-white text-black px-4 xl:px-6 py-2 xl:py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm xl:text-base cursor-pointer"
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