import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const { tournamentId, publicKey, password } = await req.json();

  if (!tournamentId || !publicKey || !password) {
    return NextResponse.json(
      {
        success: false,
        message: "tournamentId, wallet address and password are required",
      },
      { status: 400 }
    );
  }

  try {
    await prisma.player.deleteMany({
      where: {
        tournamentId,
      },
    });

    await prisma.tournament.delete({
      where: {
        tournamentId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Tournament deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting tournament:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
