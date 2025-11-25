import React from "react";

const randomImages = [
  "https://picsum.photos/800/500?random=1",
  "https://picsum.photos/800/500?random=2",
  "https://picsum.photos/800/500?random=3",
  "https://picsum.photos/800/500?random=4",
  "https://picsum.photos/800/500?random=5",
];

const Carousel = () => {
  return (
    <div id="default-carousel" className="relative w-full" data-carousel="slide">

      {/* Wrapper */}
      <div className="relative h-56 overflow-hidden rounded-base md:h-96">

        {randomImages.map((url, index) => (
          <div
            key={index}
            className="hidden duration-700 ease-in-out"
            data-carousel-item
          >
            <img
              src="https://picsum.photos/800/500?random=5"
              alt={`Random ${index + 1}`}
              referrerPolicy="no-referrer"
              className="absolute block w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            />
          </div>
        ))}

      </div>

      {/* Dots */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {randomImages.map((_, index) => (
          <button
            key={index}
            type="button"
            className="w-3 h-3 rounded-base bg-gray-300 dark:bg-gray-600"
            aria-label={`Slide ${index + 1}`}
            data-carousel-slide-to={index}
          />
        ))}
      </div>

      {/* Prev */}
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-base bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60">
          <svg
            className="w-5 h-5 text-white rtl:rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m15 19-7-7 7-7" />
          </svg>
        </span>
      </button>

      {/* Next */}
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-base bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60">
          <svg
            className="w-5 h-5 text-white rtl:rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m9 5 7 7-7 7" />
          </svg>
        </span>
      </button>
    </div>
  );
};

export default Carousel;
