import prisma from "@/lib/db";

export async function GET() {
  try {
    const data = await prisma.tournament.findMany();
    console.log("data:", data);

    return new Response(
      JSON.stringify({
        success: true,
        message: "All Tournaments",
        data,
      }),
      {
        status: 200,
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

export const dynamic = "force-dynamic";
