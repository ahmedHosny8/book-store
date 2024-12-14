/* eslint-disable no-unused-vars */
import React from "react";

export default function ReviewForm({
  editingReviewId,
  handleSubmit,
  setComment,
  comment,
  setRating,
  rating,
  setIsOpen,
  isDisabled,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">
          {editingReviewId ? "Edit Review" : "Leave a Review"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Comment:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border rounded-md w-full p-2 resize-none h-28"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Rating:</label>
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  onClick={() => setRating(index + 1)}
                  className={`w-6 h-6 cursor-pointer ${
                    rating > index ? "text-yellow-500" : "text-gray-400"
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

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className={`mr-2 btn ${
                isDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isDisabled}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex items-center justify-center gap-2 rounded-md px-6 py-2 transition-all duration-300 mb-4 btn bg-yellow-600 text-white hover:bg-[#946B3C] ${
                isDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isDisabled}
            >
              {editingReviewId ? "Update Review" : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
