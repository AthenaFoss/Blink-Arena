import { LocateIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface TournamentCardProps {
  tournamentId: string;
  title: string;
  description: string;
  totalSlot: number;
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="check_svg"
            >
              <path
                fillRule="evenodd"
                d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                clipRule="evenodd"
              ></path>
            </svg>
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
            <LocateIcon className="text-stone-200" />
          </span>
          <span className="list_text">Available Slots : {totalSlot}</span>
        </li>
        <li className="card__list_item">
          <span className="check"></span>
          <span className="list_text">Prize Pool: {prizePool}</span>
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
