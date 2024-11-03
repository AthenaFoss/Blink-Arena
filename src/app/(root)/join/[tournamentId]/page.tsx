"use client";

import { TournamentCard } from "@/components/tournament-card";
import LoadingScreen from "@/components/ui/loading";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Tournament {
  tournamentId: string;
  image: string;
  organizationName: string;
  email: string;
  description: string;
  totalSlot: number;
  publicKey: string;
  prizePool?: string;
  date: string;
  time: string;
  location: string;
  totalTeamMembers: number;
  joinFees: number;
  joinFeesType: string;
}

export default function JoinTournament({
  params,
}: {
  params: { tournamentId: string };
}) {
  const { tournamentId } = params;

  const [tournamentData, setTournamentData] = useState<Tournament | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTournamentData = async () => {
      try {
        const response = await fetch(`/api/check/${tournamentId}`);
        if (!response.ok) {
          throw new Error("Tournament not found");
        }
        const data = await response.json();
        if (data.success) {
          setTournamentData(data.data);
        } else {
          throw new Error(data.message);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTournamentData();
  }, [tournamentId]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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
              <span className="px-2 py-1 bg-gradient-to-r from-purple-600 via-fuchsia-700 to-purple-900  rounded-md text-slate-200">
                arena
              </span>
            </h1>
          </div>
        </div>
      </Link>
      <div className="relative z-30">
        {tournamentData ? (
          <TournamentCard
            tournamentId={tournamentData.tournamentId}
            title={tournamentData.organizationName}
            description={tournamentData.description}
            totalSlot={tournamentData.totalSlot}
            publicKey={tournamentData.publicKey}
            image={tournamentData.image}
            date={tournamentData.date}
            time={tournamentData.time}
            location={tournamentData.location}
            joinFees={tournamentData.joinFees}
            prizePool={tournamentData.prizePool ?? ""}
          />
        ) : (
          <p className="text-white text-center">Tournament not found</p>
        )}
      </div>
    </div>
  );
}
