import {
  BadgeDollarSign,
  BetweenVerticalStart,
  Clock,
  LocateIcon,
  Medal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface TournamentCardProps {
  tournamentId: string;
  title: string;
  description: string;
  totalSlot: number;
  publicKey: string;
  joinFees: number;
  date: string;
  time: string;
  image: string;
  location: string;
  prizePool: string;
}

export function TournamentCard({
  tournamentId,
  title,
  description,
  totalSlot,
  joinFees,
  date,
  time,
  image,
  location,
  prizePool,
}: TournamentCardProps) {
  return (
    <div className="card">
      <div className="card__border"></div>
      <div className="card_title__container">
        <span className="card_title">{title}</span>
        <p className="card_paragraph">{description}</p>
      </div>
      <div className="h-[300px] border border-white/10 rounded-lg mb-4">
        <Image
          src={image}
          alt={title}
          width={380}
          height={300}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <hr className="line" />
      <ul className="card__list">
        <li className="card__list_item">
          <span className="check">
            <Clock className="text-stone-200 h-4 w-4" />
          </span>
          <span className="list_text">
            {date} {time}
          </span>
        </li>
        <li className="card__list_item">
          <span className="check">
            <LocateIcon className="text-stone-200" />
          </span>
          <span className="list_text">{location}</span>
        </li>
        <li className="card__list_item">
          <span className="check">
            <BetweenVerticalStart className="text-stone-200 h-4 w-4" />
          </span>
          <span className="list_text">Available Slots : {totalSlot}</span>
        </li>
        <li className="card__list_item">
          <span className="check">
            <Medal className="text-stone-200 h-4 w-4" />
          </span>
          <span className="list_text">Prize Pool: {prizePool}</span>
        </li>
        <li className="card__list_item">
          <span className="check">
            <BadgeDollarSign className="text-stone-200 h-4 w-4" />
          </span>
          <span className="list_text">Join Fee: {joinFees} SOL</span>
        </li>
      </ul>
      <Link
        href={`https://dial.to/?action=solana-action%3Ahttps%3A%2F%2Fblinkarena.xyz%2Fapi%2Factions%2Fjoin%2F${tournamentId}&cluster=devnet`}
        // href={`https://dial.to/?action=solana-action%3Ahttp%3A%2F%2Flocalhost:3000%2Fapi%2Factions%2Fjoin%2F${tournamentId}&cluster=devnet`}
      >
        <Button className="button">Join Now</Button>
      </Link>
    </div>
  );
}
