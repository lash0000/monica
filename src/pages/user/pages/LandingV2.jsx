import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoPin } from "react-icons/io5";
import { MdOutlineFamilyRestroom, MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { FaClock, FaFacebook, FaInstagramSquare, FaUsers, FaHome, FaUser, FaCertificate, FaBriefcase, FaFileContract, FaIdBadge, FaFileAlt, FaTools, FaEye, FaCalendarAlt, FaTimes, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { FaSquareXTwitter, FaMapLocation, FaLocationDot } from "react-icons/fa6";
import AOS from 'aos';

function Landing() {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [isImageAnimating, setIsImageAnimating] = useState(false);
  const [currentEmergencyImage, setCurrentEmergencyImage] = useState(0);
  const [isEmergencyAnimating, setIsEmergencyAnimating] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [mouseStart, setMouseStart] = useState(null);
  const [mouseEnd, setMouseEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

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

  // Swipe functionality for news carousel
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentEmergencyImage < emergencyImages.length - 3) {
      // Swipe left - go to next
      goToEmergencyImage(currentEmergencyImage + 1);
    }
    if (isRightSwipe && currentEmergencyImage > 0) {
      // Swipe right - go to previous
      goToEmergencyImage(currentEmergencyImage - 1);
    }
  };

  // Mouse drag functionality for desktop
  const onMouseDown = (e) => {
    setIsDragging(true);
    setMouseEnd(null);
    setMouseStart(e.clientX);
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    setMouseEnd(e.clientX);
  };

  const onMouseUp = () => {
    if (!isDragging || !mouseStart || !mouseEnd) {
      setIsDragging(false);
      return;
    }

    const distance = mouseStart - mouseEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentEmergencyImage < emergencyImages.length - 3) {
      // Drag left - go to next
      goToEmergencyImage(currentEmergencyImage + 1);
    }
    if (isRightSwipe && currentEmergencyImage > 0) {
      // Drag right - go to previous
      goToEmergencyImage(currentEmergencyImage - 1);
    }

    setIsDragging(false);
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

  // Handle service click - show login modal
  const handleServiceClick = (serviceName) => {
    setSelectedService(serviceName);
    setIsLoginModalOpen(true);
  };

  // Close login modal
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    setSelectedService('');
  };

  // Handle login redirect
  const handleLoginRedirect = () => {
    navigate('/login');
    closeLoginModal();
  };

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
              className={`w-3 h-3 xl:w-4 xl:h-4 rounded-full transition-all duration-300 hover:scale-125 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 ${index === currentImage
                ? 'bg-foreground shadow-lg scale-110 ring-2 ring-foreground ring-opacity-50'
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                } ${isImageAnimating ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Community News & Events Section */}
      <section id="community-news" className="pt-6 pb-12 xl:pt-8 xl:pb-16 px-4 bg-gray-50">
        <div className="max-w-6xl xl:max-w-7xl mx-auto">
          {/* Title */}
          <div className="text-center mb-4 xl:mb-6">
            <h2 className="text-3xl xl:text-4xl font-bold text-gray-900 mb-4">
              LATEST NEWS & EVENTS
            </h2>
            <p className="text-base xl:text-lg text-gray-600 mb-2">
              Stay updated with the latest happenings in our barangay community.
            </p>
            <p className="text-base xl:text-lg text-gray-600" data-aos="fade-up">
              From celebrations to important meetings, see what's happening in Barangay Santa Monica.
            </p>
          </div>

          {/* News & Events Images Carousel */}
          <div className="mb-8 xl:mb-12">
            {/* Carousel Container */}
            <div
              className="relative overflow-hidden w-full max-w-5xl mx-auto select-none"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
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
                      onClick={(e) => {
                        if (!isDragging) {
                          openNewsModal(image);
                        }
                      }}
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
                  className={`w-3 h-3 xl:w-4 xl:h-4 rounded-full transition-all duration-300 hover:scale-125 ${index === currentEmergencyImage
                    ? 'bg-foreground shadow-lg scale-110'
                    : 'bg-gray-400 hover:bg-gray-600'
                    } ${isEmergencyAnimating ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                />
              ))}
            </div>
          </div>

          {/* Community Information */}
          <div className="text-center">
            <p className="text-lg xl:text-xl font-semibold text-gray-800 leading-relaxed">
              Join us in celebrating our community milestones and participate in the activities that make
              Barangay Santa Monica a vibrant and united community for all residents.
            </p>
          </div>
        </div>
      </section >

      {/* Our Services Section */}
      < div className="py-4 xl:py-6 px-4 pt-8" >
        <h1 className="text-2xl xl:text-3xl font-bold text-center text-black">Barangay Santa Monica Services</h1>
      </div >
      <section id="services" className="pt-2 pb-6 xl:pt-3 xl:pb-8 px-4 min-h-[28rem]" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-4xl xl:max-w-5xl mx-auto">

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-5">
            {/* Barangay Clearance */}
            <div
              className="bg-white rounded-lg p-4 xl:p-5 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 cursor-pointer"
              onClick={() => handleServiceClick('Barangay Clearance')}
            >
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
            <div
              className="bg-white rounded-lg p-4 xl:p-5 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 cursor-pointer"
              onClick={() => handleServiceClick('Business Permit')}
            >
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
            <div
              className="bg-white rounded-lg p-4 xl:p-5 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 cursor-pointer"
              onClick={() => handleServiceClick('Certificate of Indigency')}
            >
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
            <div
              className="bg-white rounded-lg p-4 xl:p-5 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 cursor-pointer"
              onClick={() => handleServiceClick('Barangay ID')}
            >
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
            <div
              className="bg-white rounded-lg p-4 xl:p-5 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 cursor-pointer"
              onClick={() => handleServiceClick('Residency Certificate')}
            >
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
            <div
              className="bg-white rounded-lg p-4 xl:p-5 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 cursor-pointer"
              onClick={() => handleServiceClick('Building Permit')}
            >
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
      <section id="community-gallery" className="relative py-8 xl:py-12 px-4 overflow-hidden" bg-card data-aos="fade-up">
        <div className="max-w-6xl xl:max-w-7xl mx-auto relative z-10">

          {/* About Us Section */}
          <div className="relative mb-6 xl:mb-8">
            <div className="relative bg-card/90 backdrop-blur-sm rounded-2xl p-4 xl:p-6 shadow-lg border border-white/20">
              {/* Main Title */}
              <div className="text-center mb-6">
                <h2 className="text-2xl xl:text-3xl font-bold text-black mb-4">ABOUT US</h2>
              </div>

              {/* Santa Monica Heading */}
              <div className="mb-4">
                <h3 className="text-xl xl:text-2xl font-bold text-foreground mb-3">Santa Monica</h3>
                <p className="text-gray-700 text-sm xl:text-base leading-relaxed">
                  <strong>Sta. Monica</strong> is a progressive barangay in Quezon City, known for its balance of residential comfort and urban accessibility.
                  The area features established neighborhoods, schools, local shops, and community facilities. Its strategic location provides easy access
                  to key areas of Quezon City, making it a practical and thriving community for families, professionals, and students.
                </p>
              </div>

              {/* Information Box */}
              <div className="bg-card rounded-xl p-4 xl:p-6 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-6">
                  {/* Left Column - Demographic/Geographical Details */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-black text-sm">Region:</span>
                      <span className="text-black text-sm">National Capital Region (NCR)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-black text-sm">District:</span>
                      <span className="text-black text-sm">5th District</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-black text-sm">Postal code:</span>
                      <span className="text-black text-sm">1127</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-black text-sm">Coordinates:</span>
                      <span className="text-black text-sm">14.7062° N, 121.0596° E</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-black text-sm">Barangay Hall:</span>
                      <span className="text-black text-sm text-right">Moises Street, Jordan Plains Subdivision</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-black text-sm">Punong Barangay:</span>
                      <span className="text-black text-sm">Charles D. J. Manalad</span>
                    </div>
                  </div>

                  {/* Right Column - Population Statistics */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-black text-sm">Population:</span>
                      <span className="text-black text-sm">51,785 residents</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-black text-sm">Households:</span>
                      <span className="text-black text-sm">~12,500</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-black text-sm">Average Household Size:</span>
                      <span className="text-black text-sm">4.2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Barangay Officials Section */}
      <section id="barangay-officials" className="bg-card py-12 xl:py-16 px-4 pt-16">
        <div className="max-w-5xl xl:max-w-6xl mx-auto">
          <h2 className="text-3xl xl:text-4xl font-bold text-center text-black mb-8 xl:mb-10" data-aos="fade-down">Barangay Officials</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 xl:gap-7">
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
              <div key={index} className="bg-white rounded-lg p-4 xl:p-5 text-center shadow-lg">
                <div className="w-14 h-14 xl:w-18 xl:h-18 border rounded-full flex items-center justify-center mx-auto mb-3 xl:mb-4 overflow-hidden">
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
      </section >

      {/* Contact Us Section */}
      <section id="contact-us" className="py-8 xl:py-12 px-4 bg-foreground">
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
      </section >

      {/* News Modal */}
      {
        isNewsModalOpen && selectedNews && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={handleModalBackdropClick}
          >
            <div className="bg-white rounded-lg max-w-lg w-full max-h-[80vh] overflow-hidden shadow-lg border border-gray-200">
              {/* Modal Header */}
              <div className="relative">
                <img
                  src={selectedNews.src}
                  alt={selectedNews.alt}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                <button
                  onClick={closeNewsModal}
                  className="absolute top-2 right-2 bg-black/50 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors text-sm"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-4 overflow-y-auto max-h-96">
                {/* Title */}
                <h2 className="text-lg font-bold text-gray-900 mb-2">
                  {selectedNews.title}
                </h2>

                {/* Date & Time */}
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt className="text-blue-500" />
                    <span>{selectedNews.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaClock className="text-green-500" />
                    <span>{selectedNews.time}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {selectedNews.shortDescription}
                </p>
              </div>

              {/* Action Button */}
              <div className="p-4 border-t border-gray-100">
                <button
                  onClick={closeNewsModal}
                  className="w-full bg-secondary text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )
      }

      {/* Login Required Modal */}
      {
        isLoginModalOpen && (
          <div
            className="fixed inset-0 flex bg-black/50 items-center justify-center z-50 p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeLoginModal();
              }
            }}
          >
            <div className="bg-white rounded-lg max-w-sm w-full p-4 shadow-lg border border-gray-200">
              {/* Modal Header */}
              <div className="text-center mb-4">
                <h2 className="text-lg font-bold text-gray-900 mb-2">Login Required</h2>
                <p className="text-sm text-gray-600">
                  Please login to access <span className="font-semibold text-secondary">{selectedService}</span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={closeLoginModal}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLoginRedirect}
                  className="flex-1 px-3 py-2 text-sm bg-secondary text-white rounded-md font-medium hover:opacity-90 transition-opacity"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div >
  )
}

export default Landing;
