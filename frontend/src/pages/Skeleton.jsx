// Skeleton.js
import React from 'react';

const Skeleton = ({ width, height }) => {
  return (
    <div
      style={{
        width: width || '100%',
        height: height || '20px',
        backgroundColor: '#e0e0e0',
        borderRadius: '4px',
        animation: 'pulse 1.5s infinite',
      }}
    />
  );
};

export const SliderSkeleton = () => {
  return (
    <div className="relative">
      <div className="flex justify-between my-10 ">
        <Skeleton  /> 
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex justify-center">
          <Skeleton width="280px" height="430px" /> 
        </div>
        <div className="flex justify-center">
          <Skeleton width="280px" height="430px" />
        </div>
        <div className="flex justify-center">
          <Skeleton width="280px" height="430px" />
        </div>
        <div className="flex justify-center">
          <Skeleton width="280px" height="430px" />
        </div>
      </div>
    </div>
  );
};

export const HomeHeaderSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Header Section */}
      <div className="text-center my-5 mt-10">
        <div className="bg-gray-300 h-8 w-3/4 mb-10 mx-auto rounded"></div> {/* Title Skeleton */}
      </div>

      {/* Cover Section */}
      <div
        className="grid grid-cols-12 gap-4 mx-auto mt-20  container"
        style={{ maxWidth: "90vw", margin: "auto" }}
      >
        {/* Left Section Skeleton */}
        <div className="xl:col-span-3 col-span-2 grid grid-cols-12 xl:me-10 lg:me-5 me-20">
          <div className="col-span-6 mt-12 h-32 bg-gray-300 rounded"></div> {/* First image */}
          <div className="xl:col-span-6 col-span-12 ms-11 mt-7 h-32 bg-gray-300 rounded"></div> {/* Second image */}
          <div className="col-span-6 mt-20 h-32 bg-gray-300 rounded"></div> {/* Third image */}
          <div className="xl:col-span-6 col-span-12 ms-10 mt-7 h-32 bg-gray-300 rounded"></div> {/* Fourth image */}
        </div>

        {/* Middle Section Skeleton */}
        <div className="lg:col-span-6 md:col-span-9 col-span-12 grid grid-cols-12 relative me-10 mb-20 sm:mb-40">
          <div className="col-span-4 h-96 bg-gray-300 rounded"></div> {/* First middle image */}
          <div className="col-span-4 h-96 bg-gray-300 rounded transform scale-110"></div> {/* Central highlighted image */}
          <div className="col-span-4 h-96 bg-gray-300 rounded"></div> {/* Third middle image */}
        </div>

        {/* Right Section Skeleton */}
        <div className="lg:col-span-3 col-span-1 grid grid-cols-12 xl:ms-20 lg:ms-10 ms-0">
          <div className="lg:col-span-6 col-span-12 h-32 bg-gray-300 rounded"></div> {/* First right image */}
          <div className="col-span-6 mt-10 ms-11 h-32 bg-gray-300 rounded"></div> {/* Second right image */}
          <div className="lg:col-span-6 col-span-12 mt-14 h-32 bg-gray-300 rounded"></div> {/* Third right image */}
          <div className="col-span-6 mt-28 ms-10 h-32 bg-gray-300 rounded"></div> {/* Fourth right image */}
        </div>
      </div>
    </div>)
}

const SkeletonBlock = ({ width, height }) => {
  return (
    <div
      style={{
        width: width || '100%',
        height: height || '20px',
        backgroundColor: '#e0e0e0',
        borderRadius: '4px',
        animation: 'pulse 1.5s infinite',
      }}
    />
  );
};
export const SearchHomeSkeleton = () => {
  return (
    <div
      className="p-6 container mx-auto bg-gray-200 flex flex-col lg:flex-row items-center justify-between rounded-lg animate-pulse"
    >
      {/* Left Section Skeleton */}
      <div className="lg:w-1/2 mb-4 lg:mb-0 flex flex-col items-center lg:items-start">
        <div className="h-8 w-3/4 lg:w-1/2 bg-gray-300 rounded mb-6"></div> {/* Skeleton for Title */}
        <div className="lg:w-96 w-full">
          <SkeletonBlock width="100%" height="40px" /> {/* Skeleton for SearchBar */}
        </div>
      </div>

      {/* Right Section Skeleton */}
      <div className="lg:w-1/2 flex justify-center lg:justify-end">
        <div className="w-3/4 lg:w-1/2 max-w-xs lg:max-w-md h-48 bg-gray-300 rounded"></div> {/* Skeleton for Image */}
      </div>
    </div>
  );
};

export const BookCardSkeleton = () => (
  <div className="card bg-white relative shadow-xl" style={{ height: '430px', width: '280px', transition: 'border-color 0.3s ease-in-out' }}>
    <Skeleton width="100%" height="192px" />
    <div className="card-body flex-grow-0 ps-8 bodyCard">
      <Skeleton width="100px" height="16px" />
      <Skeleton width="80%" height="24px" style={{ margin: '10px 0' }} />
      <Skeleton width="40%" height="32px" />
      <div className="flex justify-between mt-4">
        <Skeleton width="60%" height="20px" />
        <Skeleton width="24px" height="24px" />
      </div>
    </div>
  </div>
);

export const HomeCardSkeleton = () => (
  <div className="flex space-x-52 ">
    <BookCardSkeleton />
    <BookCardSkeleton />
    <BookCardSkeleton />
    <BookCardSkeleton />
  </div>
);
