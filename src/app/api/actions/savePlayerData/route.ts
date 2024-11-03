import prisma from "@/lib/db";
import {
  ActionError,
  CompletedAction,
  ACTIONS_CORS_HEADERS,
} from "@solana/actions";

import nodemailer from "nodemailer";

export const GET = async () => {
  return Response.json(
    { message: "Method not supported" },
    {
      headers: ACTIONS_CORS_HEADERS,
    }
  );
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export const OPTIONS = GET;

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const url = new URL(req.url);
    const playerPubKey = body.account;
    const playerName = url.searchParams.get("playerName") ?? "";
    const playerEmail = url.searchParams.get("playerEmail") ?? "";
    const teamType = url.searchParams.get("teamType") ?? "";
    const teamMembers = url.searchParams.get("teamMembers") ?? "";
    const tournamentId = url.searchParams.get("tournamentId") ?? "";
    const playerId = crypto.randomUUID();

    const orgData = await prisma.tournament.findUnique({
      where: { tournamentId },
    });

    await prisma.player.create({
      data: {
        playerId,
        tournamentId,
        playerName,
        playerEmail,
        playerPubKey,
        teamType,
        teamMembers,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: playerEmail,
      subject: "Tournament Registration Successful",
      text: `Hello ${playerName},\n\nYou have successfully registered for the tournament with ID: ${tournamentId}.\n\nGood luck!`,
      html: `<p>Hello ${playerName},</p><p>You have successfully registered for the tournament with ID: <strong>${tournamentId}</strong>.</p><p>Good luck!</p>`,
    });

    const payload: CompletedAction = {
      type: "completed",
      title: "Registration Successful",
      icon: `${orgData?.image}`,
      label: "Completed",
      description: `You have successfully joined the tournament`,
    };

    return new Response(JSON.stringify(payload), {
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch (err) {
    console.error("General error:", err);
    const actionError: ActionError = { message: "An unknown error occurred" };
    if (typeof err === "string") actionError.message = err;
    return new Response(JSON.stringify(actionError), {
      status: 400,
      headers: ACTIONS_CORS_HEADERS,
    });
  }
};
