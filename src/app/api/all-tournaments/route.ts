import { connectToDatabase } from "@/app/(mongodb)/connectdb";
import createTournamentSchema from "@/app/(mongodb)/schema/createTournamentSchema";

export async function GET() {
  await connectToDatabase();
  try {
    const data = await createTournamentSchema.find();
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
