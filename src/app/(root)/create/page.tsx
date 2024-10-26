//@typescript-eslint/no-explicit-any
"use client";

import LoadingScreen from "@/components/ui/loading";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaXTwitter } from "react-icons/fa6";

interface TournamentFormData {
  organizationName: string;
  email: string;
  image: File | null;
  description: string;
  totalSlot: number;
  prizePool?: string;
  date: string;
  time: string;
  location: string;
  totalTeamMembers: number;
  joinFees: number;
  joinFeesType: string;
}

const TournamentForm: React.FC = () => {
  const [formData, setFormData] = useState<TournamentFormData>({
    organizationName: "",
    email: "",
    image: null,
    description: "",
    totalSlot: 0,
    prizePool: "",
    date: "",
    time: "",
    location: "",
    totalTeamMembers: 0,
    joinFees: 0,
    joinFeesType: "",
  });

  const [, setImageUrl] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [, setTournamentUrl] = useState<string>("");
  const [tournamentId, setTournamentId] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name as keyof TournamentFormData]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
      setFormData({
        ...formData,
        image: file,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step < 3) {
      handleNext();
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === "image" && formData[key]) {
        formDataToSend.append("image", formData[key]);
      } else {
        formDataToSend.append(
          key,
          formData[key as keyof TournamentFormData] as any
        );
      }
    }

    try {
      const response = await fetch("/api/save-tournament", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        const data = await response.json();
        setImageUrl(data.url);
        const tournamentId = data.data.tournamentId;
        setTournamentId(tournamentId);
        setTournamentUrl(
          // `https://blink-arena.vercel.app/api/actions/join/tournaments/${tournamentId}`
          `http://localhost:3000/api/actions/join/tournaments/${tournamentId}`
        );

        setFormData({
          organizationName: "",
          email: "",
          image: null,
          description: "",
          totalSlot: 0,
          prizePool: "",
          date: "",
          time: "",
          location: "",
          totalTeamMembers: 0,
          joinFees: 0,
          joinFeesType: "",
        });

        handleNext();
      } else {
        console.error("Error creating tournament:", response.statusText);
      }
    } catch (err) {
      console.error("Failed to submit form:", err);
    }
  };

  const copyToClipboard = () => {
    const urlToCopy = `https://blink-arena.vercel.app/api/actions/join/${tournamentId}`;
    navigator.clipboard
      .writeText(urlToCopy)
      .then(() => {
        alert("URL copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy URL:", err);
      });
  };

  const shareOnTwitter = () => {
    const urlToShare = `https://blink-arena.vercel.app/api/actions/join/${tournamentId}`;
    const textToShare = `Check out this tournament!`;
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      textToShare
    )}&url=${encodeURIComponent(urlToShare)}`;

    window.open(twitterShareUrl, "_blank");
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <div className="relative w-full h-screen mx-auto flex items-center justify-center bg-gradient-to-b from-stone-900 to-purple-900">
        <Image
          src="/blink-img-1.png"
          width={1920}
          height={1080}
          alt="alt"
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
                <span className="px-2 py-1 bg-gradient-to-r from-purple-600 via-fuchsia-700 to-purple-900  rounded-md text-slate-200">
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
                  Create a Tournament
                </span>
                <span className="c1 block text-sm mt-2">Fill the form !</span>

                {step === 1 && (
                  <>
                    <label className="mb-2 font-semibold">
                      Organization Name
                    </label>
                    <input
                      type="text"
                      name="organizationName"
                      value={formData.organizationName}
                      onChange={handleInputChange}
                      className="input mt-4 w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Enter organization name"
                      required
                    />
                    <label className="mb-2 font-semibold">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input mt-4 w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Enter email"
                      required
                    />
                    <label className="mb-2 font-semibold">Upload Image</label>
                    <input
                      type="file"
                      name="image"
                      onChange={handleFileChange}
                      className="input mt-4 w-full px-3 py-2 border border-gray-300 rounded-md"
                      accept="image/*"
                      required
                    />
                    <label className="mb-2 font-semibold">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="input mt-4 w-full px-3 py-2 border border-gray-300 resize-none  rounded-md"
                      placeholder="Enter description"
                      required
                    />
                    <label className="mb-2 font-semibold">
                      Total Slot Available
                    </label>
                    <input
                      type="number"
                      name="totalSlot"
                      value={formData.totalSlot}
                      onChange={handleInputChange}
                      className="input mt-4 w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Enter slot available"
                    />
                  </>
                )}

                {step === 2 && (
                  <>
                    <label className="mb-2 font-semibold">
                      Prize Pool (optional)
                    </label>
                    <input
                      type="text"
                      name="prizePool"
                      value={formData.prizePool}
                      onChange={handleInputChange}
                      className="input mt-4 w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Enter Prize Pool"
                    />
                    <label className="mb-2 font-semibold">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="input mt-4 w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                    <label className="mb-2 font-semibold">Time</label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="input mt-4 w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                    <label className="mb-2 font-semibold">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="input mt-4 w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                      placeholder="Enter Tournament Location"
                    />
                  </>
                )}

                {step === 3 && (
                  <>
                    <label className="mb-2 font-semibold">
                      Total Team Members
                    </label>
                    <input
                      type="number"
                      name="totalTeamMembers"
                      value={formData.totalTeamMembers}
                      onChange={handleInputChange}
                      className="input mt-4 w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                    <label className="mb-2 font-semibold">Join Fees</label>
                    <input
                      type="number"
                      name="joinFees"
                      value={formData.joinFees}
                      onChange={handleInputChange}
                      className="input mt-4 w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                    <label className="mb-2 font-semibold">Fees Type</label>
                    <select
                      name="joinFeesType"
                      value={formData.joinFeesType}
                      onChange={handleInputChange}
                      className="input mt-4 w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    >
                      <option value="">Select Fees Type</option>
                      <option value="Per Team">Per Team</option>
                      <option value="Per Player">Per Player</option>
                    </select>
                  </>
                )}

                {step === 4 && (
                  <>
                    <label className="mb-2 font-semibold">Tournament URL</label>
                    <input
                      type="text"
                      value={`https://blink-arena.vercel.app/api/actions/join/${tournamentId}`}
                      readOnly
                      className="input mt-4 w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={copyToClipboard}
                        className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
                      >
                        Copy URL
                      </button>
                      <button
                        type="button"
                        onClick={shareOnTwitter}
                        className="bg-black text-white py-2 px-4 rounded-md mt-4"
                      >
                        <FaXTwitter className="h-6 w-6" />
                      </button>
                    </div>
                  </>
                )}

                <div className="button-container mt-4 flex justify-between">
                  {step < 4 && (
                    <>
                      <button
                        type="button"
                        id="reset-btn"
                        className="reset-button"
                        onClick={handlePrev}
                        disabled={step === 1}
                      >
                        Prev
                      </button>
                      <button
                        type="submit"
                        className="send-button bg-purple-600 text-white py-2 px-4 rounded-md"
                      >
                        Next
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TournamentForm;
