import { ITournament } from "@/types/SchemaTypes/createTournamentTypes";
import mongoose from "mongoose";

const createTournamentSchema = new mongoose.Schema<ITournament>(
  {
    tournamentId: {
      type: String,
      required: true,
    },
    organizationName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    totalSlot: {
      type: Number,
      required: true,
    },
    prizePool: {
      type: String,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    totalTeamMembers: {
      type: Number,
      required: true,
    },
    joinFees: {
      type: Number,
      required: true,
    },
    joinFeesType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.createTournamentSchema ||
  mongoose.model("createTournamentSchema", createTournamentSchema);
