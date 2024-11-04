"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function DeleteTournamentPage() {
  const [tournamentId, setTournamentId] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleDelete = async () => {
    if (confirmation !== "DELETE") {
      setMessage("Type 'DELETE' in the confirmation field to proceed.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tournamentId, publicKey, password }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("Tournament deleted successfully.");
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage("An error occurred while deleting the tournament.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen relative"
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full z-10 bg-gradient-to-b from-stone-900 to-purple-900">
        <Image
          src="/blink-img-1.png"
          layout="fill"
          alt="alt"
          className="object-cover w-full h-full blur-md"
        />
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-20"
          style={{
            backgroundImage: "url('/noise.png')",
            opacity: 0.8,
            mixBlendMode: "overlay",
          }}
        />
      </div>
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
          //   onSubmit={handleSubmit}
          className="space-y-6 flex items-center justify-center h-full"
        >
          <div className="form-container">
            <div className="form">
              <span className="heading text-lg font-bold">Delete</span>

              <label htmlFor="roomId" className="mb-2 font-semibold">
                Tournament ID:
              </label>
              <input
                type="text"
                placeholder="61avf9yy-zqc5-d7ku-u10b-xqmmuh44c99n"
                className="input mt-4 w-full px-3 py-2 border border-gray-300 rounded-md"
                id="roomId"
                value={tournamentId}
                onChange={(e) => setTournamentId(e.target.value)}
                required
              />

              <label htmlFor="roomId" className="mb-2 font-semibold">
                Wallet Address:
              </label>
              <input
                type="text"
                placeholder="R6Qth28PgG9k59xNBQ6HjUuWbbYVDCDw"
                className="input mt-4 w-full px-3 py-2 border border-gray-300 rounded-md"
                id="roomId"
                value={publicKey}
                onChange={(e) => setPublicKey(e.target.value)}
                required
              />

              <label htmlFor="roomId" className="mb-2 font-semibold">
                Password:
              </label>
              <input
                type="text"
                placeholder="1234567890"
                className="input mt-4 w-full px-3 py-2 border border-gray-300 rounded-md"
                id="roomId"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <label htmlFor="roomId" className="mb-2 font-semibold">
                Conformation:
              </label>
              <input
                type="text"
                placeholder="Type 'DELETE' to confirm"
                className="input mt-4 w-full px-3 py-2 border border-gray-300 rounded-md"
                id="roomId"
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
                required
              />

              <button
                onClick={handleDelete}
                disabled={loading}
                className={`w-full py-2 px-4 text-white ${
                  loading ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
                } rounded`}
              >
                {loading ? "Deleting..." : "Delete Tournament"}
              </button>

              {message && (
                <p className="mt-4 text-center text-red-500">{message}</p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
