import { Document, Model } from "mongoose";

export interface IPlayer extends Document {
  playerId: string;
  tournamentId: string;
  playerName: string;
  playerEmail: string;
  playerPubKey: string;
  teamType: string;
  teamMembers: string;
}

export interface IPlayerModel extends Model<IPlayer> {}
