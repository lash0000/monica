import { useEffect, useState } from 'react';
import { IoPin } from "react-icons/io5";
import { MdOutlineFamilyRestroom, MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { FaClock, FaFacebook, FaInstagramSquare, FaUsers, FaHome, FaUser, FaCertificate, FaBriefcase, FaFileContract, FaIdBadge, FaFileAlt, FaTools, FaEye, FaCalendarAlt, FaTimes, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { FaSquareXTwitter, FaMapLocation, FaLocationDot } from "react-icons/fa6";
import AOS from 'aos';
import 'aos/dist/aos.css'; // this is important


function Landing() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isImageAnimating, setIsImageAnimating] = useState(false);
  const [currentEmergencyImage, setCurrentEmergencyImage] = useState(0);
  const [isEmergencyAnimating, setIsEmergencyAnimating] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);

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

  // Auto-advance image carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isImageAnimating) {
        nextImage();
      }
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [isImageAnimating]);



  // Stamonica images for carousel
  const stamonicaImages = [
    {
      src: "/assets/images/Introduction/stamonica.png",
      alt: "Barangay Santa Monica"
    },
    {
      src: "/assets/images/Introduction/stamonica1.png",
      alt: "Santa Monica Community"
    },
    {
      src: "/assets/images/Introduction/stamonica2.jpg",
      alt: "Santa Monica Events"
    },
    {
      src: "/assets/images/Introduction/stamonica3.png",
      alt: "Santa Monica Facilities"
    },
    {
      src: "/assets/images/Introduction/stamonica4.png",
      alt: "Santa Monica Activities"
    },
    {
      src: "/assets/images/Introduction/stamonica5.png",
      alt: "Santa Monica Officials"
    }
  ];

  // News & Events data for carousel
  const emergencyImages = [
    {
      id: 1,
      src: "/assets/images/news/ceremony.jpg",
      alt: "Community Ceremony",
      title: "Annual Community Recognition Ceremony",
      shortDescription: "Barangay Santa Monica honored outstanding community members and volunteers who have made significant contributions to our neighborhood's development and safety.",
      date: "December 15, 2024",
      time: "2:00 PM",
      author: "Barangay Santa Monica",
      fullContent: "The Annual Community Recognition Ceremony brought together residents, officials, and volunteers to celebrate the achievements of our outstanding community members. Awards were given to individuals who showed exceptional dedication in community service, youth development, and neighborhood safety initiatives. The event highlighted the spirit of unity and cooperation that makes Barangay Santa Monica a model community."
    },
    {
      id: 2,
      src: "/assets/images/news/strong_families_program.jpg",
      alt: "Strong Families Program",
      title: "Strong Families Program Launch",
      shortDescription: "A comprehensive family development program was launched to strengthen family bonds and provide support services to households in our barangay.",
      date: "November 28, 2024",
      time: "9:00 AM",
      author: "Social Services Office",
      fullContent: "The Strong Families Program is a new initiative aimed at providing comprehensive support to families in Barangay Santa Monica. The program includes parenting workshops, family counseling services, educational assistance, and livelihood training opportunities. This community-driven approach ensures that every family has access to resources that promote stability, growth, and overall well-being."
    },
    {
      id: 3,
      src: "/assets/images/news/general_assembly.jpg",
      alt: "General Assembly Meeting",
      title: "Quarterly General Assembly Meeting",
      shortDescription: "Residents gathered for the quarterly assembly to discuss community projects, budget allocations, and upcoming initiatives for the next quarter.",
      date: "October 20, 2024",
      time: "7:00 PM",
      author: "Barangay Council",
      fullContent: "The Quarterly General Assembly brought together over 200 residents to discuss important community matters. Key topics included the completion of new infrastructure projects, budget transparency reports, upcoming development plans, and resident feedback on various barangay services. The meeting emphasized the importance of community participation in local governance and decision-making processes."
    },
    {
      id: 4,
      src: "/assets/images/news/fiesta.jpg",
      alt: "Barangay Fiesta Celebration",
      title: "Barangay Santa Monica Annual Fiesta",
      shortDescription: "The community came together to celebrate our annual fiesta with cultural performances, local food, games, and activities for the whole family.",
      date: "September 8, 2024",
      time: "All Day",
      author: "Fiesta Committee",
      fullContent: "The Annual Barangay Fiesta was a spectacular celebration of our community's rich culture and traditions. The three-day event featured local artists, traditional dances, music performances, food festivals, and various competitions. Families enjoyed carnival rides, games, and special activities designed for all ages. The fiesta strengthened community bonds and showcased the vibrant spirit of Barangay Santa Monica."
    },
    {
      id: 5,
      src: "/assets/images/news/brgy_meeting.jpg",
      alt: "Barangay Meeting",
      title: "Emergency Preparedness Planning Meeting",
      shortDescription: "Local officials and emergency response teams met to review and update disaster preparedness protocols and community safety measures.",
      date: "August 15, 2024",
      time: "10:00 AM",
      author: "Emergency Response Team",
      fullContent: "The Emergency Preparedness Planning Meeting focused on enhancing our community's resilience against natural disasters and emergencies. Officials reviewed evacuation procedures, updated emergency contact lists, and discussed new safety equipment acquisitions. The meeting also addressed resident training programs for disaster response and the establishment of neighborhood emergency coordinators to ensure effective communication during crisis situations."
    },
    {
      id: 6,
      src: "/assets/images/news/kap_award.jpg",
      alt: "Kapitan Award Ceremony",
      title: "Outstanding Leadership Award Ceremony",
      shortDescription: "Barangay Captain Charles D.J. Manalad received recognition for exceptional leadership and community development achievements.",
      date: "July 4, 2024",
      time: "4:00 PM",
      author: "City Government",
      fullContent: "Barangay Captain Charles D.J. Manalad was honored with the Outstanding Leadership Award in recognition of his exceptional service and innovative approaches to community development. Under his leadership, Barangay Santa Monica has implemented numerous successful programs including digital governance initiatives, youth development projects, and environmental sustainability measures. The award ceremony highlighted the significant positive impact of dedicated public service on community growth."
    }
  ];

  // Image carousel navigation functions
  const nextImage = () => {
    if (isImageAnimating) return;
    setIsImageAnimating(true);
    setTimeout(() => {
      setCurrentImage((prev) => (prev + 1) % stamonicaImages.length);
      setIsImageAnimating(false);
    }, 100);
  };

  const prevImage = () => {
    if (isImageAnimating) return;
    setIsImageAnimating(true);
    setTimeout(() => {
      setCurrentImage((prev) => (prev - 1 + stamonicaImages.length) % stamonicaImages.length);
      setIsImageAnimating(false);
    }, 100);
  };

  const goToImage = (index) => {
    if (isImageAnimating || index === currentImage) return;
    setIsImageAnimating(true);
    setTimeout(() => {
      setCurrentImage(index);
      setIsImageAnimating(false);
    }, 100);
  };

  // Emergency carousel navigation function for dots
  const goToEmergencyImage = (index) => {
    if (isEmergencyAnimating || index === currentEmergencyImage || index > emergencyImages.length - 3) return;
    setIsEmergencyAnimating(true);
    setTimeout(() => {
      setCurrentEmergencyImage(index);
      setIsEmergencyAnimating(false);
    }, 300);
  };

  // News modal functions
  const openNewsModal = (newsItem) => {
    setSelectedNews(newsItem);
    setIsNewsModalOpen(true);
    // Disable body scroll
    document.body.style.overflow = 'hidden';
  };

  const closeNewsModal = () => {
    setIsNewsModalOpen(false);
    setSelectedNews(null);
    // Restore body scroll
    document.body.style.overflow = 'unset';
  };

  // Close modal when clicking outside
  const handleModalBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeNewsModal();
    }
  };

  // Close modal on ESC key
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape' && isNewsModalOpen) {
        closeNewsModal();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isNewsModalOpen]);

  // Cleanup body scroll on component unmount
  useEffect(() => {
    return () => {
      // Restore body scroll when component unmounts
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Auto-advance news carousel
  useEffect(() => {
    const newsInterval = setInterval(() => {
      if (!isEmergencyAnimating) {
        setIsEmergencyAnimating(true);
        setTimeout(() => {
          setCurrentEmergencyImage((prev) => {
            const maxIndex = emergencyImages.length - 3;
            return prev >= maxIndex ? 0 : prev + 1;
          });
          setIsEmergencyAnimating(false);
        }, 300);
      }
    }, 4000); // Change every 4 seconds

    return () => clearInterval(newsInterval);
  }, [isEmergencyAnimating, emergencyImages.length]);

  return (
    <div className="w-full min-h-screen bg-white overflow-y-hidden">
      {/* Header Section with Background Carousel */}
      <section 
        id="incident-report" 
        className="relative text-white py-16 xl:py-24 px-4 min-h-[70vh] xl:min-h-[90vh] flex items-center justify-center transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${stamonicaImages[currentImage].src}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
       

        {/* Content */}
        <div className="absolute left-8 xl:left-16 top-1/2 transform -translate-y-1/2 z-10 max-w-md xl:max-w-lg">
          <p className="text-lg xl:text-xl mb-2 xl:mb-3 font-medium opacity-90" style={{ textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)' }}>Welcome to</p>
          <h1 className="text-3xl xl:text-5xl font-bold mb-3 xl:mb-4" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}>Barangay Santa Monica</h1>
          <p className="text-lg xl:text-xl font-semibold opacity-95" style={{ textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)' }}>Community Safety, Reimagined</p>
          </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 xl:bottom-8 left-1/2 transform -translate-x-1/2 flex justify-center space-x-2 xl:space-x-3 z-10">
          {stamonicaImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              disabled={isImageAnimating}
              className={`w-3 h-3 xl:w-4 xl:h-4 rounded-full transition-all duration-300 hover:scale-125 ${
                index === currentImage
                  ? 'bg-white shadow-lg scale-110'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              } ${isImageAnimating ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            />
          ))}
        </div>
      </section>

      {/* Community News & Events Section */}
      <section id="community-news" className="pt-6 pb-12 xl:pt-8 xl:pb-16 px-4 bg-gray-50" data-aos="fade-up">
        <div className="max-w-6xl xl:max-w-7xl mx-auto">
          {/* Title */}
          <div className="text-center mb-4 xl:mb-6">
            <h2 className="text-3xl xl:text-4xl font-bold text-gray-900 mb-4" data-aos="fade-up">
              LATEST NEWS & EVENTS
            </h2>
            <p className="text-base xl:text-lg text-gray-600 mb-2" data-aos="fade-up" data-aos-delay="100">
              Stay updated with the latest happenings in our barangay community.
            </p>
            <p className="text-base xl:text-lg text-gray-600" data-aos="fade-up" data-aos-delay="200">
              From celebrations to important meetings, see what's happening in Barangay Santa Monica.
            </p>
            </div>

          {/* News & Events Images Carousel */}
          <div className="mb-8 xl:mb-12">
            {/* Carousel Container */}
            <div className="relative overflow-hidden w-full max-w-5xl mx-auto">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ 
                  transform: `translateX(-${currentEmergencyImage * (100 / 3)}%)`,
                }}
              >
                  {emergencyImages.map((image, index) => (
                    <div 
                      key={index}
                      className="w-1/3 flex-shrink-0 px-1 xl:px-2"
                      data-aos="fade-up" 
                      data-aos-delay={`${300 + (index * 100)}`}
                    >
                      <div 
                        className="rounded-lg overflow-hidden shadow-xl h-40 md:h-48 xl:h-56 relative group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                        onClick={() => openNewsModal(image)}
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {/* Image Title Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 xl:p-3">
                          <h3 className="text-white font-semibold text-xs md:text-sm xl:text-base line-clamp-2">
                            {image.title}
                          </h3>
                        </div>
                        {/* Click indicator */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 bg-white/20 rounded-full p-2 transition-opacity duration-300">
                            <FaEye className="text-white text-lg" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 xl:mt-8 space-x-2 xl:space-x-3">
              {Array.from({ length: Math.max(1, emergencyImages.length - 2) }, (_, index) => (
                <button
                  key={index}
                  onClick={() => goToEmergencyImage(index)}
                  disabled={isEmergencyAnimating}
                  className={`w-3 h-3 xl:w-4 xl:h-4 rounded-full transition-all duration-300 hover:scale-125 ${
                    index === currentEmergencyImage
                      ? 'bg-gray-800 shadow-lg scale-110'
                      : 'bg-gray-400 hover:bg-gray-600'
                  } ${isEmergencyAnimating ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                />
              ))}
            </div>
          </div>

          {/* Community Information */}
          <div className="text-center" data-aos="fade-up" data-aos-delay="600">
            <p className="text-lg xl:text-xl font-semibold text-gray-800 leading-relaxed">
              Join us in celebrating our community milestones and participate in the activities that make 
              Barangay Santa Monica a vibrant and united community for all residents.
            </p>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <div className="py-4 xl:py-6 px-4 pt-8">
        <h1 className="text-2xl xl:text-3xl font-bold text-center text-black" data-aos="fade-up">Barangay Santa Monica Services</h1>
      </div>
      <section id="services" className="pt-2 pb-6 xl:pt-3 xl:pb-8 px-4 min-h-[28rem]" style={{ backgroundColor: '#FFFFFF' }} data-aos="fade-up">
        <div className="max-w-4xl xl:max-w-5xl mx-auto">
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-5">
            {/* Barangay Clearance */}
            <div className="bg-white rounded-lg p-4 xl:p-5 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100" data-aos="fade-up" data-aos-delay="100">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 xl:w-14 xl:h-14 bg-green-100 rounded-full flex items-center justify-center mb-3 xl:mb-4">
                  <FaCertificate className="text-lg xl:text-xl text-green-600" />
                </div>
                <h3 className="text-base xl:text-lg font-bold text-gray-800 mb-1.5">Barangay Clearance</h3>
                <p className="text-xs xl:text-sm text-gray-600 leading-relaxed">
                  Official clearance document for various purposes
                </p>
              </div>
                  </div>

            {/* Business Permit */}
            <div className="bg-white rounded-lg p-4 xl:p-5 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100" data-aos="fade-up" data-aos-delay="200">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 xl:w-14 xl:h-14 bg-blue-100 rounded-full flex items-center justify-center mb-3 xl:mb-4">
                  <FaBriefcase className="text-lg xl:text-xl text-blue-600" />
                </div>
                <h3 className="text-base xl:text-lg font-bold text-gray-800 mb-1.5">Business Permit</h3>
                <p className="text-xs xl:text-sm text-gray-600 leading-relaxed">
                  Authorization to operate businesses in the barangay
                </p>
              </div>
                </div>

            {/* Certificate of Indigency */}
            <div className="bg-white rounded-lg p-4 xl:p-5 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100" data-aos="fade-up" data-aos-delay="300">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 xl:w-14 xl:h-14 bg-yellow-100 rounded-full flex items-center justify-center mb-3 xl:mb-4">
                  <FaFileContract className="text-lg xl:text-xl text-yellow-600" />
                  </div>
                <h3 className="text-base xl:text-lg font-bold text-gray-800 mb-1.5">Certificate of Indigency</h3>
                <p className="text-xs xl:text-sm text-gray-600 leading-relaxed">
                  Document certifying financial status for assistance
                </p>
              </div>
                    </div>

            {/* Barangay ID */}
            <div className="bg-white rounded-lg p-4 xl:p-5 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100" data-aos="fade-up" data-aos-delay="400">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 xl:w-14 xl:h-14 bg-purple-100 rounded-full flex items-center justify-center mb-3 xl:mb-4">
                  <FaIdBadge className="text-lg xl:text-xl text-purple-600" />
                </div>
                <h3 className="text-base xl:text-lg font-bold text-gray-800 mb-1.5">Barangay ID</h3>
                <p className="text-xs xl:text-sm text-gray-600 leading-relaxed">
                  Official identification card for residents
                </p>
              </div>
            </div>

            {/* Residency Certificate */}
            <div className="bg-white rounded-lg p-4 xl:p-5 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100" data-aos="fade-up" data-aos-delay="500">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 xl:w-14 xl:h-14 bg-red-100 rounded-full flex items-center justify-center mb-3 xl:mb-4">
                  <FaFileAlt className="text-lg xl:text-xl text-red-600" />
                </div>
                <h3 className="text-base xl:text-lg font-bold text-gray-800 mb-1.5">Residency Certificate</h3>
                <p className="text-xs xl:text-sm text-gray-600 leading-relaxed">
                  Proof of residency within the barangay
                </p>
              </div>
          </div>

            {/* Building Permit */}
            <div className="bg-white rounded-lg p-4 xl:p-5 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100" data-aos="fade-up" data-aos-delay="600">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 xl:w-14 xl:h-14 bg-orange-100 rounded-full flex items-center justify-center mb-3 xl:mb-4">
                  <FaTools className="text-lg xl:text-xl text-orange-600" />
                </div>
                <h3 className="text-base xl:text-lg font-bold text-gray-800 mb-1.5">Building Permit</h3>
                <p className="text-xs xl:text-sm text-gray-600 leading-relaxed">
                  Authorization for construction and renovation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Community Gallery Section */}
        <section id="community-gallery" className="relative py-8 xl:py-12 px-4 overflow-hidden" style={{ backgroundColor: '#f8f9fa' }} data-aos="fade-up">
          <div className="max-w-6xl xl:max-w-7xl mx-auto relative z-10">
            
            {/* Community Gallery */}
            <div className="relative mb-8 xl:mb-10" data-aos="fade-up" data-aos-delay="200">
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-5 xl:p-6 shadow-lg border border-white/20">
                <div className="text-center mb-6">
                  <h3 className="text-xl xl:text-2xl font-bold text-black bg-clip-text mb-2">Our Community in Action</h3>
                  <p className="text-gray-600 text-sm">Capturing moments that define our vibrant barangay</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 xl:gap-4">
                  <div className="group relative rounded-xl overflow-hidden h-24 xl:h-32 shadow-lg hover:shadow-2xl transition-all duration-500" data-aos="zoom-in" data-aos-delay="100">
                    <img
                      src="/assets/images/Flood.png"
                      alt="Barangay Hall"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end">
                      <p className="text-white font-semibold p-2 text-xs transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">Barangay Hall</p>
                    </div>
                    <div className="absolute top-2 right-2 w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <FaEye className="text-white text-xs" />
                    </div>
                  </div>

                  <div className="group relative rounded-xl overflow-hidden h-24 xl:h-32 shadow-lg hover:shadow-2xl transition-all duration-500" data-aos="zoom-in" data-aos-delay="200">
                    <img
                      src="/assets/images/Flood.png"
                      alt="Community Events"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end">
                      <p className="text-white font-semibold p-2 text-xs transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">Community Events</p>
                    </div>
                    <div className="absolute top-2 right-2 w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <FaEye className="text-white text-xs" />
                    </div>
                  </div>

                  <div className="group relative rounded-xl overflow-hidden h-24 xl:h-32 shadow-lg hover:shadow-2xl transition-all duration-500" data-aos="zoom-in" data-aos-delay="300">
                    <img
                      src="/assets/images/Flood.png"
                      alt="Public Services"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end">
                      <p className="text-white font-semibold p-2 text-xs transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">Public Services</p>
                    </div>
                    <div className="absolute top-2 right-2 w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <FaEye className="text-white text-xs" />
                    </div>
                  </div>

                  <div className="group relative rounded-xl overflow-hidden h-24 xl:h-32 shadow-lg hover:shadow-2xl transition-all duration-500" data-aos="zoom-in" data-aos-delay="400">
                    <img
                      src="/assets/images/Flood.png"
                      alt="Local Celebrations"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end">
                      <p className="text-white font-semibold p-2 text-xs transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">Local Celebrations</p>
                    </div>
                    <div className="absolute top-2 right-2 w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <FaEye className="text-white text-xs" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mission Statement */}
            <div className="relative" data-aos="fade-up" data-aos-delay="300">
              <div className="absolute inset-0 rounded-2xl blur-xl opacity-20" style={{ background: 'linear-gradient(to right, #4B663B, #5B7B4B)' }}></div>
              <div className="relative rounded-2xl p-6 xl:p-8 text-center shadow-2xl border border-white/10" style={{ background: 'linear-gradient(135deg, #4B663B 0%, #3A5A2A 50%, #4B663B 100%)' }}>
                <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30 rounded-2xl"></div>
                <div className="relative z-10">
                  <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-4">
                    <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                    <span className="text-white font-semibold text-xs tracking-wider">OUR MISSION</span>
                  </div>
                  <h3 className="text-xl xl:text-2xl font-black text-white mb-4">Building Tomorrow, Together</h3>
                  <p className="text-white/90 text-sm xl:text-base leading-relaxed max-w-4xl mx-auto font-light mb-4">
                    To foster a safe, united, and progressive community where every resident feels valued and empowered. 
                    Through innovative governance, quality services, and active citizen participation, we build a stronger Santa Monica for future generations.
                  </p>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 mb-3"></div>
                    <p className="text-white text-base font-bold italic mb-1">
                      "Mabilisang Aksyon, Agarang Solusyon"
                    </p>
                    <p className="text-white/70 text-xs tracking-wide">
                      BARANGAY SANTA MONICA
                    </p>
                  </div>
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

      {/* News Modal */}
      {isNewsModalOpen && selectedNews && (
        <div 
          className="fixed inset-0 bg-white/20 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={handleModalBackdropClick}
        >
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-fade-in flex flex-col">
            {/* Modal Header */}
            <div className="relative flex-shrink-0">
              <img
                src={selectedNews.src}
                alt={selectedNews.alt}
                className="w-full h-48 md:h-64 object-cover rounded-t-xl"
              />
              <button
                onClick={closeNewsModal}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all duration-200"
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto flex-1 modal-scroll">
              {/* Title */}
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                {selectedNews.title}
              </h2>

              {/* Date, Time & Author */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-600" />
                  <span>{selectedNews.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-green-600" />
                  <span>{selectedNews.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUser className="text-purple-600" />
                  <span>{selectedNews.author}</span>
                </div>
              </div>

              {/* Short Description */}
              <p className="text-gray-700 font-medium mb-4 text-base">
                {selectedNews.shortDescription}
              </p>

              {/* Full Content */}
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  {selectedNews.fullContent}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={closeNewsModal}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 w-full md:w-auto"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Landing;