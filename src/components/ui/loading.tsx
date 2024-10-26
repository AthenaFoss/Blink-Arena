import React from "react";

const LoadingScreen: React.FC = () => {
  return (
    <>
      <div className="custom-font loading-container">
        <div className="loading-text">
          <span>L</span>
          <span>O</span>
          <span>A</span>
          <span>D</span>
          <span>I</span>
          <span>N</span>
          <span>G</span>
        </div>
      </div>
      <div className="absolute top-12 left-12 z-50 max-w-xl">
        <div className="text-left">
          <h1 className="text-white text-2xl font-medium">
            blink{" "}
            <span className="px-2 py-1 bg-gradient-to-r from-purple-600 via-fuchsia-700 to-purple-900  rounded-md text-slate-200">
              arena
            </span>
          </h1>
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;
