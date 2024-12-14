/* eslint-disable no-unused-vars */
import React from "react";

export default function ReviewCard({
  review,
  isDisabled,
  handleEdit,
  handleDelete,
}) {
  return (
    <div
      key={review?._id}
      className="p-4 mb-4 overflow-hidden w-full mx-auto border-b-2"
    >
      {/* flex justify-between items-start md:flex-row flex-col */}
      <div className="">
        <div>
          <div className="flex gap-4 items-start">
            <p className="font-bold text-gray-700">
              {review?.userId?.username}
            </p>
            <div className="flex mt-1">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-4 h-4 ${
                    review?.rating > index ? "text-yellow-500" : "text-gray-400"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 .587l3.668 7.431 8.22 1.19-5.94 5.5 1.4 8.23L12 18.897l-7.658 4.015 1.4-8.23-5.94-5.5 8.22-1.19z" />
                </svg>
              ))}
            </div>
          </div>
          <p className="text-gray-800 mt-2 sm:overflow-visible overflow-hidden">
            {review?.comment}
          </p>
          <p className="text-slate-400 text-sm mt-3">
            {new Date(review?.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      {review?.userId?._id ===
        JSON.parse(localStorage?.getItem("user"))?.id && (
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => handleEdit(review)}
            disabled={isDisabled}
            className="hover:underline hover:font-medium"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(review?._id)}
            disabled={isDisabled}
            className="text-error ml-2 hover:underline hover:font-medium"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
