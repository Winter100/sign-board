import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="h-3 w-3 animate-pulse rounded-full bg-blue-500"></div>
      <div className="h-3 w-3 animate-pulse rounded-full bg-blue-500 delay-100"></div>
      <div className="h-3 w-3 animate-pulse rounded-full bg-blue-500 delay-200"></div>
    </div>
  );
};

export default Loading;
