import { uploadImage } from "@/lib/cloudinary";
import prisma from "@/lib/db";
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

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const organizationName = formData.get("organizationName")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const totalSlot = Number(formData.get("totalSlot") || 1);
    const publicKey = formData.get("publicKey")?.toString() || "";
    const prizePool = formData.get("prizePool")?.toString() || "";
    const date = formData.get("date")?.toString() || "";
    const time = formData.get("time")?.toString() || "";
    const location = formData.get("location")?.toString() || "";
    const totalTeamMembers = Number(formData.get("totalTeamMembers") || 0);
    const joinFees = Number(formData.get("joinFees") || 0);
    const joinFeesType = formData.get("joinFeesType")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    const tournamentId = crypto.randomUUID();
    const blinkLink = `${process.env.FRONTEND_URL}/api/actions/join/${tournamentId}`;
    const joinLink = `${process.env.FRONTEND_URL}/admin/${tournamentId}`;

    const image = formData.get("image") as File;
    let imageUrl = "";
    if (image) {
      imageUrl = await uploadImage(image, "tournament");
    }

    const data = await prisma.tournament.create({
      data: {
        tournamentId,
        organizationName,
        email,
        image: imageUrl,
        description,
        publicKey,
        totalSlot,
        prizePool,
        date,
        time,
        location,
        totalTeamMembers,
        joinFees,
        joinFeesType,
        password,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Tournament Created Successfully",
      text: `Dear ${organizationName},\n\nYou have successfully created a tournament with ID: ${tournamentId}.\n\nHere is your blink link: ${blinkLink}\n\nPlease visit the below link 1 hour before the game starts to provide the room ID, password, or any other method for participants to join: ${joinLink}.\nWe will then send the necessary information to the registered users.\n\nIf you want to delete the tournament, go to: https://www.blinkarena.xyz/delete\n\nBest regards,\nTeam Blink Arena`,
      html: `
        <p>Dear ${organizationName},</p>
        <p>You have successfully created a tournament with ID: <strong>${tournamentId}</strong>.</p>
        <p>Here is your blink link: <a href="${blinkLink}">${blinkLink}</a></p>
        <p>Please visit the below link 1 hour before the game starts to provide the room ID, password, or any other method for participants to join: <a href="${joinLink}">${joinLink}</a>.</p>
        <p>We will then send the necessary information to the registered users.</p>
        <p>If you want to delete the tournament, go to: <a href="https://www.blinkarena.xyz/delete">this link</a>.</p>
        <p>Best regards,<br>Team Blink Arena</p>
      `,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Tournament created successfully",
        data,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.log("error:", error);

    return new Response(
      JSON.stringify({
        success: false,
        message: error || "Something went wrong",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
