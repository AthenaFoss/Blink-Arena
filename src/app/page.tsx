import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="relative w-full h-screen mx-auto flex items-center justify-center bg-gradient-to-b from-stone-900 to-purple-900">
      {/* Main Image */}
      <Image
        src="/blink-img-1.png"
        layout="fill"
        objectFit="cover"
        alt="alt"
        className="absolute top-0 z-10 left-0"
      />

      {/* Noise effect overlay */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-20"
        style={{
          backgroundImage: "url('/noise.png')",
          opacity: 0.8,
          mixBlendMode: "overlay",
        }}
      />
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-20"
        style={{
          backgroundImage: "url('/noise.png')",
          opacity: 0.8,
          mixBlendMode: "overlay",
        }}
      />
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-20"
        style={{
          backgroundImage: "url('/noise.png')",
          opacity: 0.8,
          mixBlendMode: "overlay",
        }}
      />

      {/* Overlay text/content at the bottom-left */}
      <div className="absolute bottom-12 left-12 z-10 max-w-xl">
        <div className="text-left">
          <h1 className="text-white text-5xl font-black">
            COMMUNITY IN THE WORLD OF GAMING
          </h1>
          <p className="text-gray-300 font-extrabold mt-4">
            Your unique gaming community where the expertise of skilled players
            merges with the opportunity to acquire a variety of items in the
            most popular games!
          </p>
        </div>
      </div>

      {/* Additional heading at top-left */}
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
      <div className=" absolute top-[20%] flex justify-center items-center">
        <h1 className="custom-font capitalize font-medium text-[13rem] bg-gradient-to-t from-purple-400 to-stone-400 text-transparent bg-clip-text text-center">
          Blink Arena
        </h1>
      </div>
      <div className="z-50 absolute bottom-12 right-12 flex gap-5">
        <Link href="/all-tournaments" className="comic-button " role="button">
          Join
        </Link>
        <Link href="/create" className="comic-button " role="button">
          create
        </Link>
      </div>
    </div>
  );
};

export default Page;
