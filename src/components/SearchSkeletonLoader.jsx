// src/components/SearchSkeletonLoader.jsx
import React from "react";

const SearchSkeletonLoader = () => {
  const placeholderCards = Array.from({ length: 12 });

  return (
    // No extra wrapper with min-h-screen or p-8 here
    <div className="grid grid-cols-1 md:grid-cols-3 gap-9">
      {placeholderCards.map((_, index) => (
        <div
          key={index}
          className="border p-4 border-zinc-400 rounded-lg shadow bg-gray-700 animate-pulse"
        >
          {/* Image Placeholder */}
          <div className="w-full h-48 bg-gray-600 rounded-md" />
          {/* Date Placeholder */}
          <div className="mt-2 h-4 bg-gray-600 rounded w-1/2" />
          {/* Captured By Placeholder */}
          <div className="mt-2 h-4 bg-gray-600 rounded w-full" />
          {/* More Info Button Placeholder */}
          <div className="mt-2 h-4 bg-gray-600 rounded w-3/4" />
        </div>
      ))}
    </div>
  );
};

export default SearchSkeletonLoader;
