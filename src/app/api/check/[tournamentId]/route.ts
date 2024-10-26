// import createTournamentSchema from '@/app/(mongodb)/schema/createTournamentSchema';

import prisma from "@/lib/db";

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const pathSegments = url.pathname.split("/");
  const tournamentId = pathSegments[pathSegments.length - 1];

  if (!tournamentId) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Tournament ID not found",
      }),
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const tournament = await prisma.tournament.findUnique({
      where: { tournamentId },
    });

    if (tournament) {
      return new Response(
        JSON.stringify({
          success: true,
          data: tournament,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Tournament not found",
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal Server Error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
