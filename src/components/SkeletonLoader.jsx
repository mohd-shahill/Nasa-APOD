import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-transparent">
      {/* Header Skeleton */}
      <h1 className="text-4xl font-bold -mt-16 mb-4 text-center text-gray-300 opacity-50">
        NASA Astronomy Picture of the Day
      </h1>

      {/* Main Content Skeleton */}
      <div className="w-[92vw] h-[79vh] rounded-lg shadow-lg overflow-hidden flex animate-pulse bg-transparent">
        {/* Left Side Skeleton (for Photo/Video) */}
        <div className="w-1/2 flex items-center justify-center bg-white/10 backdrop-blur-lg animate-pulse">
          <div className="w-full h-full bg-white/20 rounded-lg animate-pulse" />
        </div>

        {/* Right Side Skeleton (for Text) */}
        <div className="w-2/3 p-6 space-y-4">
          {/* Date Skeleton */}
          <div className="h-4 bg-white/20 backdrop-blur-md rounded w-1/3 animate-pulse" />
          {/* Title Skeleton */}
          <div className="h-6 bg-white/25 backdrop-blur-md rounded w-1/2 animate-pulse" />
          {/* Explanation Skeleton Lines */}
          <div className="h-4 bg-white/30 backdrop-blur-md rounded w-full animate-pulse" />
          <div className="h-4 bg-white/30 backdrop-blur-md rounded w-full animate-pulse" />
          <div className="h-4 bg-white/30 backdrop-blur-md rounded w-5/6 animate-pulse" />
        </div>
      </div>

      {/* Fixed Randomize Button Skeleton */}
      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-12">
        <button
          className="w-32 px-4 py-2 bg-transparent text-white border-zinc-400 rounded opacity-50 cursor-not-allowed"
          disabled
        >
          Search
        </button>
        <button
          className="w-32 px-4 py-2 bg-transparent text-white border-zinc-400 rounded opacity-50 cursor-not-allowed"
          disabled
        >
          Randomize
        </button>
      </div>
    </div>
  );
};

export default SkeletonLoader;
