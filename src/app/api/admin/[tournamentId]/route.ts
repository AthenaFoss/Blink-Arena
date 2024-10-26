import { connectToDatabase } from "@/app/(mongodb)/connectdb";
import Player from "@/app/(mongodb)/schema/playerScehma";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

export async function POST(
  req: Request,
  { params }: { params: { tournamentId: string } }
) {
  const { tournamentId } = params;
  await connectToDatabase();

  try {
    const { roomId, password } = await req.json();

    if (!roomId || !password) {
      return NextResponse.json(
        { message: "Room ID and password are required." },
        { status: 400 }
      );
    }

    const url = new URL(req.url);
    const playerName = url.searchParams.get("playerName") ?? "";

    const registeredPlayers = await Player.find({ tournamentId });

    if (registeredPlayers.length === 0) {
      return NextResponse.json(
        { message: "No players found for this tournament." },
        { status: 404 }
      );
    }
    for (const player of registeredPlayers) {
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: player.playerEmail,
        subject: `Room Details for Tournament ${tournamentId}`,
        text: `Room ID: ${roomId}\nPassword: ${password}`,
        html: `<p>Dear ${playerName},</p>
      <p>The tournament you registered for is starting soon. Here are the room details:</p>
      <p><strong>Room ID:</strong> ${roomId}</p>
      <p><strong>Password:</strong> ${password}</p>
      <p>Best regards,<br>Team Blink Arena</p>`,
      });
    }

    return NextResponse.json(
      { message: "Emails sent to all registered players." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending emails:", error);
    return NextResponse.json(
      { error: "Failed to send emails to players." },
      { status: 500 }
    );
  }
}
