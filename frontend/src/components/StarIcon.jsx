/* eslint-disable no-unused-vars */
import React from "react";

export default function StarIcon({ bookRate, reviewsLength }) {
  return (
    <div className="flex items-center">
      <div className="flex mt-1">
        {[...Array(5)].map((_, index) => {
          const fullStarThreshold = index + 1;
          const halfStarThreshold = index + 0.3;
          return (
            <svg
              key={index}
              className="w-6 h-6"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-label={`Rating: ${bookRate}`}
            >
              {bookRate >= fullStarThreshold ? (
                <path
                  fill="#eab308"
                  d="M12 .587l3.668 7.431 8.22 1.19-5.94 5.5 1.4 8.23L12 18.897l-7.658 4.015 1.4-8.23-5.94-5.5 8.22-1.19z"
                />
              ) : bookRate >= halfStarThreshold ? (
                <>
                  <clipPath id={`halfClip-${index}`}>
                    <rect x="0" y="0" width="50%" height="100%" />
                  </clipPath>
                  <path
                    fill="#eab308"
                    clipPath={`url(#halfClip-${index})`}
                    d="M12 .587l3.668 7.431 8.22 1.19-5.94 5.5 1.4 8.23L12 18.897l-7.658 4.015 1.4-8.23-5.94-5.5 8.22-1.19z"
                  />
                  <clipPath id={`emptyClip-${index}`}>
                    <rect x="50%" y="0" width="50%" height="100%" />
                  </clipPath>
                  <path
                    fill="#D1D5DB"
                    clipPath={`url(#emptyClip-${index})`}
                    d="M12 .587l3.668 7.431 8.22 1.19-5.94 5.5 1.4 8.23L12 18.897l-7.658 4.015 1.4-8.23-5.94-5.5 8.22-1.19z"
                  />
                </>
              ) : (
                <path
                  fill="#D1D5DB"
                  d="M12 .587l3.668 7.431 8.22 1.19-5.94 5.5 1.4 8.23L12 18.897l-7.658 4.015 1.4-8.23-5.94-5.5 8.22-1.19z"
                />
              )}
            </svg>
          );
        })}
      </div>

      <p className="text-md max-w-xl font-medium ms-3 mb-0">
        {`(${reviewsLength})`}
      </p>
    </div>
  );
}
