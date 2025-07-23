import React from "react";

const Loading = () => {
  return (
    <div className="animate-pulse space-y-4">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-64"></div>
        <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-32"></div>
      </div>
      
      {/* Table skeleton */}
      <div className="premium-card rounded-xl p-6">
        {/* Table header */}
        <div className="grid grid-cols-6 gap-4 pb-4 border-b border-gray-200">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
          ))}
        </div>
        
        {/* Table rows */}
        <div className="space-y-4 pt-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="grid grid-cols-6 gap-4 items-center py-3">
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
              <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-16"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-5/6"></div>
              <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-12"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-8"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;