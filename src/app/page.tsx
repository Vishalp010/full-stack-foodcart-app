"use client";

import Link from "next/link";

const VideoBackground = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Element */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/foodAd.mp4" // Replace with your video path
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay with Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black bg-opacity-40">
        <h1 className="text-3xl md:text-5xl text-yellow-500 font-bold">
          Welcome to My Site
        </h1>
        <Link
          href="/home"
          className="mt-4 px-6 py-3 text-lg md:text-2xl text-white bg-yellow-500 rounded-lg shadow hover:bg-yellow-600 transition"
        >
          ENTER
        </Link>
      </div>
    </div>
  );
};

export default VideoBackground;
