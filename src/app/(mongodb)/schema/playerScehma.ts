import { IPlayer } from "@/types/SchemaTypes/playerSchemaTypes";
import mongoose, { Schema } from "mongoose";

// Define the schema
const playerSchema: Schema = new Schema<IPlayer>(
  {
    playerId: {
      type: String,
      required: true,
    },
    tournamentId: {
      type: String,
      required: true,
    },
    playerName: {
      type: String,
      required: true,
    },
    playerEmail: {
      type: String,
      required: true,
    },
    playerPubKey: {
      type: String,
      required: true,
    },
    teamType: {
      type: String,
      required: true,
    },
    teamMembers: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Player = mongoose.models.Player || mongoose.model("Player", playerSchema);

export default Player;
