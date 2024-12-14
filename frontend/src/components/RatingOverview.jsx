import React from "react";
import StarIcon from "./StarIcon";

const RatingBar = ({ stars, count, totalReviews }) => {
  const percentage = totalReviews
    ? Math.min((count / totalReviews) * 100, 100)
    : 0;
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm w-12">{stars} stars</span>
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          style={{
            width: `${percentage}%`,
          }}
          className="h-full bg-yellow-500 rounded-full"
        />
      </div>
      <span className="text-sm w-6 text-right">{count}</span>
    </div>
  );
};

const ReviewSummary = (props) => {
  const { averageRating, totalReviews, ratingsDistribution } = props;
  return (
    <div className="max-w-lg">
      <h2 className="text-xl font-semibold mb-4">Overview</h2>
      <div className="flex items-center space-x-4 mb-4">
        <span className="text-4xl font-bold">{averageRating.toFixed(1)}</span>
        <StarIcon bookRate={averageRating} reviewsLength={totalReviews} />
      </div>
      <div className="space-y-2">
        {Object.keys(ratingsDistribution)
          .sort((a, b) => b - a)
          .map((stars) => (
            <RatingBar
              key={stars}
              stars={stars}
              count={ratingsDistribution[stars]}
              totalReviews={totalReviews}
            />
          ))}
      </div>
    </div>
  );
};

export default ReviewSummary;
