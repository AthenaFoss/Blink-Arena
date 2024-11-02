import {
  Transaction,
  PublicKey,
  SystemProgram,
  Connection,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import {
  ACTIONS_CORS_HEADERS,
  createPostResponse,
  ActionGetResponse,
  ActionPostResponse,
} from "@solana/actions";
import prisma from "@/lib/db";

const organizerPubKey = "6rSrLGuhPEpxGqmbZzV1ZttwtLXzGx8V2WEACXd4qnVH";
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export const GET = async (req: Request) => {
  const { pathname } = new URL(req.url);
  const pathSegments = pathname.split("/");
  const tournamentId = pathSegments[4];

  const orgData = await prisma.tournament.findUnique({
    where: {
      tournamentId,
    },
  });

  if (!orgData) {
    return new Response(JSON.stringify({ error: "Tournament not found" }), {
      status: 404,
      headers: ACTIONS_CORS_HEADERS,
    });
  }

  try {
    const payload: ActionGetResponse = {
      icon: `${orgData.image}`,
      title: `Join ${orgData.organizationName} tournament`,
      description: `${orgData.description}\nAvailable Slots: ${orgData.totalSlot}\nJoin Fees: ${orgData.joinFees} SOL (per member)`,

      label: "Join Now",
      links: {
        actions: [
          {
            label: "Join Now",
            href: `/api/actions/join/${tournamentId}?name={name}&email={email}&teamType={teamType}&members={members}`,
            parameters: [
              {
                type: "text",
                name: "name",
                label: "Enter Leader Name",
                required: true,
              },
              {
                type: "email",
                name: "email",
                label: "Enter Leader Email",
                required: true,
              },
              {
                type: "select",
                name: "teamType",
                label: "Select Team Type",
                options: [
                  { label: "Team", value: "team" },
                  { label: "Solo", value: "solo" },
                ],
                required: true,
              },
              {
                type: "radio",
                name: "members",
                label: `Select Team Member (Select 1 if Selected Solo) - Available Slots: ${orgData.totalSlot}`,
                options: [
                  { label: "1", value: "1" },
                  { label: "2", value: "2" },
                  { label: "3", value: "3" },
                  { label: "4", value: "4" },
                ].filter(
                  (option) => parseInt(option.value) <= orgData.totalSlot
                ),
                required: true,
              },
            ],
            type: "transaction",
          },
        ],
      },
    };
    return new Response(JSON.stringify(payload), {
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch (error) {
    console.error("Error processing GET request:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      {
        status: 500,
        headers: ACTIONS_CORS_HEADERS,
      }
    );
  }
};

export const OPTIONS = GET;

export const POST = async (req: Request) => {
  try {
    const { pathname } = new URL(req.url);
    const pathSegments = pathname.split("/");
    const tournamentId = pathSegments[4];
    const body = await req.json();
    const playerPubKey = new PublicKey(body.account);
    const url = new URL(req.url);
    const playerName = url.searchParams.get("name") ?? "";
    const playerEmail = url.searchParams.get("email") ?? "";
    const teamType = url.searchParams.get("teamType") ?? "";
    const teamMembers = parseInt(url.searchParams.get("members") ?? "0");

    const tournament = await prisma.tournament.findUnique({
      where: { tournamentId },
    });
    if (!tournament) {
      return new Response(JSON.stringify({ error: "Tournament not found" }), {
        status: 404,
        headers: ACTIONS_CORS_HEADERS,
      });
    }

    const joinFees = tournament.joinFees;
    const totalFees = joinFees * teamMembers;

    const availableSlots = tournament.totalSlot;
    if (teamMembers > availableSlots) {
      return new Response(
        JSON.stringify({ error: "Not enough slots available" }),
        {
          status: 400,
          headers: ACTIONS_CORS_HEADERS,
        }
      );
    }

    const updatedTournament = await prisma.tournament.update({
      where: { tournamentId },
      data: {
        totalSlot: { decrement: teamMembers },
      },
    });

    if (!updatedTournament) {
      throw new Error("Failed to update tournament data");
    }

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: playerPubKey,
        toPubkey: new PublicKey(organizerPubKey),
        lamports: totalFees * LAMPORTS_PER_SOL,
      })
    );

    transaction.feePayer = playerPubKey;
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        type: "transaction",
        transaction,
        message: `Successfully joined the tournament! Remaining slots: ${updatedTournament.totalSlot}`,
        links: {
          next: {
            type: "post",
            href: `/api/actions/savePlayerData?playerName=${playerName}&playerEmail=${playerEmail}&teamType=${teamType}&teamMembers=${teamMembers}&tournamentId=${tournamentId}`,
          },
        },
      },
    });

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch (error) {
    console.error("Error processing POST request:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      {
        status: 500,
        headers: ACTIONS_CORS_HEADERS,
      }
    );
  }
};
