import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCalendarAlt, FaClock } from "react-icons/fa";

export default function EventSecondPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Same data as Events / EventsMainPage so clicking a card can show full view
  const allEvents = [
    {
      id: 1,
      src: "https://qby900ozue.ufs.sh/f/k3CYx7aMjR9S43ZecMWXepnisxGfYvdhZCamA9gBL6EN73R8",
      alt: "Community Ceremony",
      title: "Annual Community Recognition Ceremony",
      date: "December 15, 2024",
      time: "2:00 PM",
      location: "Barangay Hall, Santa Monica",
      category: "Ceremony",
      shortDescription:
        "Barangay Santa Monica honored outstanding community members and volunteers who have made significant contributions.",
      fullDescription:
        "The Annual Community Recognition Ceremony is a special event where we celebrate the dedication and hard work of our community members. This year, we recognized volunteers, local leaders, and residents who have gone above and beyond in serving our barangay. The ceremony included award presentations, cultural performances, and a community feast.",
    },
    {
      id: 2,
      src: "https://qby900ozue.ufs.sh/f/k3CYx7aMjR9SxDc4UmRWcfU9ngx4iY5PjwC3Bk0K8mF6lIZb",
      alt: "Strong Families Program",
      title: "Strong Families Program Launch",
      date: "November 28, 2024",
      time: "9:00 AM",
      location: "Community Center, Santa Monica",
      category: "Program",
      shortDescription:
        "A comprehensive family development program launched to strengthen family bonds and support households in our barangay.",
      fullDescription:
        "The Strong Families Program is a comprehensive initiative designed to support families in our community. The program includes workshops on parenting, financial literacy, health and wellness, and family communication. This launch event introduced the program to residents and provided information on how to participate in upcoming sessions.",
    },
    {
      id: 3,
      src: "https://qby900ozue.ufs.sh/f/k3CYx7aMjR9S3ekbqIHFqW15xQ07Tp3SLu9gblVknyem2AMB",
      alt: "General Assembly",
      title: "Quarterly General Assembly Meeting",
      date: "October 20, 2024",
      time: "7:00 PM",
      location: "Barangay Hall, Santa Monica",
      category: "Meeting",
      shortDescription:
        "Residents gathered for the quarterly assembly to discuss community projects and budget allocations.",
      fullDescription:
        "The Quarterly General Assembly Meeting is an important gathering where barangay officials present updates on ongoing projects, budget allocations, and future plans. Residents had the opportunity to voice their concerns, ask questions, and participate in decision-making processes that affect the community.",
    },
    {
      id: 4,
      src: "https://qby900ozue.ufs.sh/f/k3CYx7aMjR9S43ZecMWXepnisxGfYvdhZCamA9gBL6EN73R8",
      alt: "Health Fair",
      title: "Community Health Fair 2024",
      date: "September 10, 2024",
      time: "8:00 AM - 4:00 PM",
      location: "Barangay Plaza, Santa Monica",
      category: "Health",
      shortDescription:
        "Free health check-ups, vaccinations, and health education for all residents.",
      fullDescription:
        "The Community Health Fair provided free medical services including blood pressure checks, blood sugar tests, dental check-ups, and vaccinations. Health professionals from local clinics and hospitals volunteered their time to serve the community. Information booths were set up for health education on nutrition, exercise, and disease prevention.",
    },
    {
      id: 5,
      src: "https://qby900ozue.ufs.sh/f/k3CYx7aMjR9SxDc4UmRWcfU9ngx4iY5PjwC3Bk0K8mF6lIZb",
      alt: "Clean-up Drive",
      title: "Barangay Clean-up Drive",
      date: "August 25, 2024",
      time: "6:00 AM - 10:00 AM",
      location: "Various Streets, Santa Monica",
      category: "Community Service",
      shortDescription:
        "Community-wide clean-up initiative to maintain cleanliness and environmental awareness.",
      fullDescription:
        "Residents came together for a barangay-wide clean-up drive to maintain cleanliness and promote environmental awareness. Volunteers cleaned streets, parks, and public areas. The event also included a tree-planting activity and a workshop on proper waste segregation and recycling.",
    },
    {
      id: 6,
      src: "https://qby900ozue.ufs.sh/f/k3CYx7aMjR9S3ekbqIHFqW15xQ07Tp3SLu9gblVknyem2AMB",
      alt: "Youth Sports Tournament",
      title: "Inter-Barangay Youth Sports Tournament",
      date: "July 15-17, 2024",
      time: "8:00 AM - 6:00 PM",
      location: "Barangay Sports Complex, Santa Monica",
      category: "Sports",
      shortDescription:
        "Three-day sports tournament featuring basketball, volleyball, and badminton competitions.",
      fullDescription:
        "The Inter-Barangay Youth Sports Tournament brought together young athletes from neighboring barangays for friendly competition. The event featured basketball, volleyball, and badminton tournaments. It promoted sportsmanship, teamwork, and physical fitness among the youth while fostering camaraderie between communities.",
    },
    {
      id: 7,
      src: "https://qby900ozue.ufs.sh/f/k3CYx7aMjR9S43ZecMWXepnisxGfYvdhZCamA9gBL6EN73R8",
      alt: "Senior Citizens Day",
      title: "Senior Citizens Appreciation Day",
      date: "June 20, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Community Center, Santa Monica",
      category: "Celebration",
      shortDescription:
        "Special celebration honoring our senior citizens with entertainment, gifts, and recognition.",
      fullDescription:
        "A heartwarming event dedicated to honoring our beloved senior citizens. The celebration included cultural performances, games, free health check-ups, and distribution of gift packages. Senior citizens were recognized for their contributions to the community and enjoyed a special afternoon of entertainment and fellowship.",
    },
    {
      id: 8,
      src: "https://qby900ozue.ufs.sh/f/k3CYx7aMjR9SxDc4UmRWcfU9ngx4iY5PjwC3Bk0K8mF6lIZb",
      alt: "Skills Training",
      title: "Livelihood Skills Training Program",
      date: "May 5-12, 2024",
      time: "9:00 AM - 4:00 PM",
      location: "Barangay Training Center, Santa Monica",
      category: "Training",
      shortDescription:
        "Week-long training program on various livelihood skills including cooking, handicrafts, and basic computer skills.",
      fullDescription:
        "A comprehensive week-long training program designed to equip residents with practical skills for income generation. The program covered various topics including food preparation and preservation, handicraft making, basic computer literacy, and small business management. Participants received certificates upon completion.",
    },
    {
      id: 9,
      src: "https://qby900ozue.ufs.sh/f/k3CYx7aMjR9S3ekbqIHFqW15xQ07Tp3SLu9gblVknyem2AMB",
      alt: "Fiesta Celebration",
      title: "Barangay Fiesta Celebration",
      date: "April 20, 2024",
      time: "All Day",
      location: "Barangay Plaza, Santa Monica",
      category: "Celebration",
      shortDescription:
        "Annual fiesta celebration with food stalls, games, cultural shows, and community gathering.",
      fullDescription:
        "The annual Barangay Fiesta is one of the most anticipated events of the year. The celebration featured food stalls offering local delicacies, traditional games, cultural performances, and a grand community gathering. It's a time for families to come together, celebrate our culture, and strengthen community bonds.",
    },
    {
      id: 10,
      src: "https://qby900ozue.ufs.sh/f/k3CYx7aMjR9S43ZecMWXepnisxGfYvdhZCamA9gBL6EN73R8",
      alt: "Disaster Preparedness",
      title: "Disaster Preparedness Seminar",
      date: "March 18, 2024",
      time: "9:00 AM - 12:00 PM",
      location: "Barangay Hall, Santa Monica",
      category: "Seminar",
      shortDescription:
        "Educational seminar on disaster preparedness, emergency response, and safety protocols.",
      fullDescription:
        "An important educational seminar focused on disaster preparedness and emergency response. The event covered topics such as earthquake safety, flood preparedness, fire prevention, and first aid. Residents learned about creating emergency kits, evacuation procedures, and how to respond during various emergency situations.",
    },
    {
      id: 11,
      src: "https://qby900ozue.ufs.sh/f/k3CYx7aMjR9SxDc4UmRWcfU9ngx4iY5PjwC3Bk0K8mF6lIZb",
      alt: "Ayuda Distribution",
      title: "Ayuda Distribution Program",
      date: "Ongoing",
      time: "All Day",
      location: "Barangay Hall, Santa Monica",
      category: "Program",
      shortDescription:
        "Government assistance programs available for qualified residents. Apply now for financial, employment, and crisis assistance.",
      fullDescription:
        "The Ayuda Distribution Program provides various government assistance programs for qualified residents of Barangay Santa Monica. This includes financial assistance, employment programs, and crisis assistance. Residents can apply for programs such as 4Ps, SAP, TUPAD, AICS, UCT, and Rice Subsidy Program based on their eligibility and needs.",
    },
  ];

  const eventId = Number(id);
  const event = allEvents.find((e) => e.id === eventId);

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <p className="text-gray-700 dark:text-gray-200 mb-4">
            Event not found or the link is invalid.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
          >
            <FaArrowLeft /> Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-start justify-center py-10 px-4">
      <div className="w-full max-w-4xl space-y-4">
        {/* Top bar similar to "view post" header */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            <FaArrowLeft className="text-xs" />
            Back to Events
          </button>

          <span className="px-4 py-1.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
            Event Detail
          </span>
          <span className="px-4 py-1.5 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">
            {event.category}
          </span>
        </div>

        {/* Image */}
        <div className="border-2 border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
          <div className="w-full h-64 md:h-80 bg-gray-200">
            <img
              src={event.src}
              alt={event.alt}
              className="w-full h-full object-cover block"
            />
          </div>
        </div>

        {/* Content card */}
        <div className="p-6 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm space-y-5">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            {event.title}
          </h1>

          {/* Meta info row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
            <div className="inline-flex items-center gap-2">
              <FaCalendarAlt className="text-blue-500" />
              <span>{event.date}</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <FaClock className="text-green-500" />
              <span>{event.time}</span>
            </div>
            {event.location && (
              <div className="inline-flex items-center gap-2">
                <span className="text-purple-500 text-lg">📍</span>
                <span>{event.location}</span>
              </div>
            )}
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {event.fullDescription || event.shortDescription}
          </p>

          {/* Comment section similar to screenshot (front-end only) */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Comments
            </h2>

            <textarea
              rows="3"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-gray-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Comment here..."
            />

            <div className="flex justify-end">
              <button className="px-5 py-2 rounded-md bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700">
                Reply
              </button>
            </div>

            {/* Static example comment */}
            <div className="mt-4 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex gap-3 items-start">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                {event.title.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    Barangay Staff
                  </span>
                  <span className="text-gray-400 text-xs">yesterday</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                  Thank you for your interest in this event.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}