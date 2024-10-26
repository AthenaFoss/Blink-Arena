"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const RoomDetailsForm = () => {
  const { tournamentId } = useParams();
  const [roomId, setRoomId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!roomId || !password) {
      setError("Room ID and password are required.");
      return;
    }

    try {
      const res = await fetch(`/api/admin/${tournamentId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roomId, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        setRoomId("");
        setPassword("");
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to send room details.");
    }
  };

  return (
    <div className="relative w-full h-screen mx-auto flex items-center justify-center bg-gradient-to-b from-stone-900 to-purple-900">
      <Image
        src="/blink-img-1.png"
        layout="fill"
        objectFit="cover"
        alt="background"
        className="absolute top-0 left-0 w-full h-full object-cover z-10 blur"
      />
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-20"
        style={{
          backgroundImage: "url('/noise.png')",
          opacity: 0.8,
          mixBlendMode: "overlay",
        }}
      />
      <Link href="/">
        <div className="absolute top-12 left-12 z-50 max-w-xl">
          <div className="text-left">
            <h1 className="text-white text-2xl font-medium">
              blink{" "}
              <span className="px-2 py-1 bg-gradient-to-r from-purple-600 via-fuchsia-700 to-purple-900 rounded-md text-slate-200">
                arena
              </span>
            </h1>
          </div>
        </div>
      </Link>
      <div className="h-screen transition-opacity duration-1000 relative z-30 bg-opacity-80 p-8 rounded-lg shadow-lg w-[1200px]">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 flex items-center justify-center h-full"
        >
          <div className="form-container">
            <div className="form">
              <span className="heading text-lg font-bold">
                Send Room Details
              </span>

              <div>
                <label htmlFor="roomId" className="mb-2 font-semibold">
                  Room ID:
                </label>
                <input
                  type="text"
                  className="input mt-4 w-full px-3 py-2 border border-gray-300 rounded-md"
                  id="roomId"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="mb-2 font-semibold">
                  Password:
                </label>
                <input
                  type="text"
                  id="password"
                  className="input mt-4 w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-purple-600 text-white py-2 px-4 rounded-md"
              >
                Send Details
              </button>

              {message && (
                <p style={{ color: "green" }} className="mt-4">
                  {message}
                </p>
              )}
              {error && (
                <p style={{ color: "red" }} className="mt-4">
                  {error}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomDetailsForm;
