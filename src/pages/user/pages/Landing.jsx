import { IoPin } from "react-icons/io5";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { FaMapLocation } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { useEffect, useState } from 'react';
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
npm
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
      <section id="incident-report" className=" text-white py-8 xl:py-16 px-4 " style={{ backgroundColor: '#4B663B' }}>
        <div className="max-w-6xl xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto text-center">
          <h1 className="text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-4 xl:mb-6">Incident Report</h1>
          <p className="text-xl xl:text-2xl 2xl:text-3xl mb-2 xl:mb-4">Community Safety, Reimagined</p>
          <h2 className="text-3xl xl:text-4xl 2xl:text-5xl font-semibold mb-6 xl:mb-8">Connecting Your Barangay, One Report at a Time</h2>
          <p className="text-lg xl:text-xl 2xl:text-2xl max-w-4xl xl:max-w-5xl mx-auto mb-8 xl:mb-12">
            Mata Taumbayan is a smart incident reporting system that empowers residents
            and equips barangay officials to build a safer, more responsive community
            through technology
          </p>

          {/* Emergency Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8 mt-12 xl:mt-16">
            <div className="rounded-lg overflow-hidden h-48 xl:h-64 2xl:h-80">
              <img
                src="/assets/images/Flood.png"
                alt="Emergency Fire Response"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden h-48 xl:h-64 2xl:h-80">
              <img
                src="/assets/images/Flood.png"
                alt="Street Emergency Scene"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden h-48 xl:h-64 2xl:h-80">
              <img
                src="/assets/images/Flood.png"
                alt="Medical Emergency Response"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Submit Report Button */}
          <div className="mt-8 xl:mt-12">
            <button className="bg-white text-gray-700 px-8 xl:px-12 py-4 xl:py-6 mb-6 mt-2 rounded-lg font-semibold text-lg xl:text-xl 2xl:text-2xl hover:bg-gray-100 transition-colors shadow-lg">
              Submit Report
            </button>
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <div className="py-8 xl:py-12 px-4 pt-20">
        <h1 className="text-4xl xl:text-3xl 2xl:text-6xl font-bold text-center text-black" data-aos="fade-up">Announcements</h1>
      </div>
      <section id="announcements" className="py-16 xl:py-24 px-4" style={{ backgroundColor: '#4B663B' }} data-aos="fade-up">
        <div className="max-w-6xl xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto">
          <div className="rounded-lg p-4 mb-8">
          </div>

          {/* Carousel Container */}
          <div className="relative overflow-hidden">
            {/* Navigation Buttons - Fixed to container */}
            <button
              onClick={prevAnnouncement}
              disabled={isAnimating}
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 p-3 rounded-full shadow-lg z-50 ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'
                }`}
              style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', zIndex: 50 }}
            >
              <span className="text-lg font-bold">←</span>
            </button>
            <button
              onClick={nextAnnouncement}
              disabled={isAnimating}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 p-3 rounded-full shadow-lg z-50 ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'
                }`}
              style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', zIndex: 50 }}
            >
              <span className="text-lg font-bold">→</span>
            </button>

            {/* Carousel Content */}
            <div
              className={`bg-white rounded-lg p-6 xl:p-8 2xl:p-12 shadow-lg mx-auto max-w-4xl xl:max-w-5xl 2xl:max-w-6xl transition-all duration-500 ease-in-out flex flex-col justify-between min-h-[500px] xl:min-h-[600px] 2xl:min-h-[700px] ${isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
                }`}
            >
              {/* Top Section - Title and Details */}
              <div className="flex-1 flex flex-col justify-start">
                <div className={`transition-all duration-300 delay-100 ${isAnimating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}`}>
                  <h3 className="text-2xl xl:text-3xl 2xl:text-4xl font-bold text-green-600 mb-4 xl:mb-6">
                    {announcements[currentAnnouncement].title}
                  </h3>
                </div>

                {announcements[currentAnnouncement].subtitle && (
                  <div className={`transition-all duration-300 delay-200 ${isAnimating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}`}>
                    <p className="text-sm xl:text-base 2xl:text-lg mb-4 xl:mb-6">{announcements[currentAnnouncement].subtitle}</p>
                  </div>
                )}

                <div className="space-y-2 xl:space-y-3 mb-4 xl:mb-6">
                  {Object.entries(announcements[currentAnnouncement].details).map(([key, value]) => (
                    <p key={key} className="text-base xl:text-lg">
                      <span className="font-semibold capitalize">{key}:</span> {value}
                    </p>
                  ))}
                </div>

                {announcements[currentAnnouncement].services && (
                  <div className={`mb-4 xl:mb-6 transition-all duration-300 delay-500 ${isAnimating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}`}>
                    <p className="font-semibold mb-2 xl:mb-3 text-base xl:text-lg">Services Offered:</p>
                    <ul className="list-disc list-inside space-y-1 xl:space-y-2">
                      {announcements[currentAnnouncement].services.map((service, index) => (
                        <li key={index} className={`transition-all duration-300 delay-${600 + (index * 100)} ${isAnimating ? 'translate-x-4 opacity-0' : 'translate-x-0 opacity-100'} text-base xl:text-lg`}>
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Bottom Section - Images */}
              <div className="flex-1 flex flex-col justify-end">
                <div className={`grid gap-4 xl:gap-6 transition-all duration-300 delay-700 ${announcements[currentAnnouncement].images.length === 2 ? 'grid-cols-2' : 'grid-cols-1'} ${isAnimating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}`}>
                  {announcements[currentAnnouncement].images.map((image, index) => (
                    <div key={index} className={`rounded-lg overflow-hidden h-48 xl:h-56 2xl:h-64 transition-all duration-300 delay-${800 + (index * 100)} ${isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'} shadow-lg hover:shadow-xl`}>
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

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 xl:mt-8 space-x-3 xl:space-x-4">
              {announcements.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToAnnouncement(index)}
                  disabled={isAnimating}
                  className={`w-4 h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 rounded-full transition-all duration-300 hover:scale-125 ${index === currentAnnouncement
                    ? 'bg-white shadow-lg scale-110'
                    : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                    } ${isAnimating ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Our Barangay Section */}
      <section id="about-barangay" className="bg-pink-100 py-16 xl:py-24 px-4 pt-20" data-aos="fade-up">
        <div className="max-w-6xl xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto">
          <h2 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold text-center text-black mb-12 xl:mb-16" data-aos="fade-down">About our Barangay</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-start">
            {/* Information */}
            <div className="space-y-4 xl:space-y-6 flex flex-col justify-center" data-aos="fade-right">
              <div className="flex items-center space-x-3 xl:space-x-4" data-aos="fade-up" data-aos-delay="200">
                <span className="text-2xl xl:text-3xl text-red-500"><IoPin />
                </span>
                <span className="text-base xl:text-lg">Location: Novaliches, District 5, Quezon City</span>
              </div>
              <div className="flex items-center space-x-3 xl:space-x-4" data-aos="fade-up" data-aos-delay="300">
                <span className="text-2xl xl:text-3xl">🏢</span>
                <span className="text-base xl:text-lg">Barangay Hall: Moises Street, Jordan Plains Subdivision</span>
              </div>
              <div className="flex items-center space-x-3 xl:space-x-4" data-aos="fade-up" data-aos-delay="400">
                <span className="text-2xl xl:text-3xl">👥</span>
                <span className="text-base xl:text-lg">Population: 51,785 residents</span>
              </div>
              <div className="flex items-center space-x-3 xl:space-x-4" data-aos="fade-up" data-aos-delay="500">
                <span className="text-2xl xl:text-3xl">🏠</span>
                <span className="text-base xl:text-lg">Households: ~12,500</span>
              </div>
              <div className="flex items-center space-x-3 xl:space-x-4" data-aos="fade-up" data-aos-delay="600">
                <span className="text-2xl xl:text-3xl ml-1.5"><MdOutlineFamilyRestroom size={25} />
                </span>
                <span className="text-base xl:text-lg">Average Household Size: 4.2</span>
              </div>
              <div className="flex items-center space-x-3 xl:space-x-4" data-aos="fade-up" data-aos-delay="700">
                <span className="text-2xl xl:text-3xl">👤</span>
                <span className="text-base xl:text-lg">Punong Barangay: Charles D.J. Manalad</span>
              </div>
            </div>

            {/* Images Grid - 2x2 grid for better balance */}
            <div className="grid grid-cols-2 gap-4 xl:gap-6" data-aos="fade-left">
              <div className="rounded-lg overflow-hidden h-40 xl:h-48 2xl:h-56 shadow-lg hover:shadow-xl transition-shadow duration-300" data-aos="zoom-in" data-aos-delay="200">
                <img
                  src="/assets/images/Flood.png"
                  alt="Novaliches Map"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="rounded-lg overflow-hidden h-40 xl:h-48 2xl:h-56 shadow-lg hover:shadow-xl transition-shadow duration-300" data-aos="zoom-in" data-aos-delay="300">
                <img
                  src="/assets/images/Flood.png"
                  alt="Barangay Officials"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="rounded-lg overflow-hidden h-40 xl:h-48 2xl:h-56 shadow-lg hover:shadow-xl transition-shadow duration-300" data-aos="zoom-in" data-aos-delay="400">
                <img
                  src="/assets/images/Flood.png"
                  alt="Barangay Hall"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="rounded-lg overflow-hidden h-40 xl:h-48 2xl:h-56 shadow-lg hover:shadow-xl transition-shadow duration-300" data-aos="zoom-in" data-aos-delay="500">
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
      <section id="barangay-officials" className="bg-pink-100 py-16 xl:py-24 px-4 pt-20" data-aos="fade-up">
        <div className="max-w-6xl xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto">
          <h2 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold text-center text-black mb-12 xl:mb-16" data-aos="fade-down">Barangay Officials</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-6 xl:gap-8" data-aos="fade-up" data-aos-delay="200">
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
              <div key={index} className="bg-white rounded-lg p-4 xl:p-6 text-center shadow-lg" data-aos="zoom-in" data-aos-delay={`${300 + (index * 100)}`}>
                <div className="w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3 xl:mb-4 overflow-hidden">
                  <img
                    src={official.image}
                    alt={official.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <span className="text-white text-2xl xl:text-3xl" style={{ display: 'none' }}>👤</span>
                </div>
                <h3 className="font-semibold text-sm xl:text-base 2xl:text-lg mb-1 xl:mb-2">{official.name}</h3>
                <p className="text-xs xl:text-sm 2xl:text-base text-gray-600">{official.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact-us" className="py-16 xl:py-24 px-4" style={{ backgroundColor: '#4B663B' }} data-aos="fade-up">
        <div className="max-w-6xl xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto">
          <h2 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold text-center text-black-800 mb-12 xl:mb-16">Contact Us</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">
            {/* Get in Touch */}
            <div>
              <h3 className="text-2xl xl:text-3xl 2xl:text-4xl font-bold text-black-800 mb-6 xl:mb-8">Get in Touch</h3>
              <div className="space-y-4 xl:space-y-6">
                <div className="flex items-center space-x-3 xl:space-x-4">
                  <span className="text-2xl xl:text-3xl text-white"> <FaMapLocation size={15} />
                  </span>
                  <span className="text-black-700 text-base xl:text-lg">Novaliches, District 5, Quezon City</span>
                </div>
                <div className="flex items-center space-x-3 xl:space-x-4">
                  <span className="text-2xl xl:text-3xl text-white"><FaPhoneAlt size={15} /></span>
                  <span className="text-black-700 text-base xl:text-lg">+1 6267464596</span>
                </div>
                <div className="flex items-center space-x-3 xl:space-x-4">
                  <span className="text-2xl xl:text-3xl text-white"><FaEnvelope size={15} /></span>
                  <span className="text-black-700 text-base xl:text-lg">stamonica@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 xl:space-x-4">
                  <span className="text-2xl xl:text-3xl text-white"><FaRegClock size={15} /></span>
                  <span className="text-black-700 text-base xl:text-lg">Monday to Saturday, 8:00 AM - 5:00 PM</span>
                </div>
              </div>

              <div className="mt-8 xl:mt-12">
                <p className="text-black mb-4 xl:mb-6 text-base xl:text-lg">Follow Us</p>
                <div className="flex space-x-4 xl:space-x-6 items-center text-white">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl xl:text-3xl 2xl:text-4xl hover:text-blue-600 transition-colors"
                  >
                    <FaFacebook />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl xl:text-3xl 2xl:text-4xl hover:text-black transition-colors"
                  >
                    <FaSquareXTwitter size={35} />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl xl:text-3xl 2xl:text-4xl hover:text-pink-600 transition-colors"
                  >
                    <FaInstagramSquare />
                  </a>
                </div>
              </div>
            </div>


            {/* Send us a Message */}
            <div>
              <h3 className="text-2xl xl:text-3xl 2xl:text-4xl font-bold text-black-800 mb-6 xl:mb-8">Send us a Message</h3>
              <form className="space-y-4 xl:space-y-6">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-3 xl:p-4 2xl:p-5 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base xl:text-lg"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-3 xl:p-4 2xl:p-5 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base xl:text-lg"
                />
                <textarea
                  placeholder="Message"
                  rows="4"
                  className="w-full p-3 xl:p-4 2xl:p-5 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base xl:text-lg"
                ></textarea>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 xl:px-8 2xl:px-10 py-3 xl:py-4 2xl:py-5 rounded-lg font-semibold hover:bg-green-700 transition-colors text-base xl:text-lg 2xl:text-xl"
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