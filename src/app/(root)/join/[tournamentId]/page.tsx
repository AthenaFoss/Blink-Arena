"use client";

import LoadingScreen from "@/components/ui/loading";
import { useState, useEffect } from "react";

interface Tournament {
  organizationName: string;
  email: string;
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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      {tournamentData ? (
        <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">
            Join Tournament: {tournamentData.organizationName}
          </h1>
          <p className="text-lg mb-2">
            <strong>Description:</strong> {tournamentData.description}
          </p>
          <p className="text-lg mb-2">
            <strong>Total Slot:</strong> {tournamentData.totalSlot}
          </p>
          <p className="text-lg mb-2">
            <strong>Prize Pool:</strong>{" "}
            {tournamentData.prizePool ?? "Not specified"}
          </p>
          <p className="text-lg mb-2">
            <strong>Join Fees:</strong> {tournamentData.joinFees}{" "}
            {tournamentData.joinFeesType}
          </p>
          <p className="text-lg mb-2">
            <strong>Total Team Members:</strong>{" "}
            {tournamentData.totalTeamMembers}
          </p>
          <p className="text-lg mb-2">
            <strong>Date:</strong> {tournamentData.date}
          </p>
          <p className="text-lg mb-2">
            <strong>Time:</strong> {tournamentData.time}
          </p>
          <p className="text-lg mb-2">
            <strong>Location:</strong> {tournamentData.location}
          </p>
        </div>
      ) : (
        <p>Tournament not found</p>
      )}
    </div>
  );
}
