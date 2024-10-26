"use client";
import { TournamentCard } from "@/components/tournament-card";
import LoadingScreen from "@/components/ui/loading";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Button from "@/components/ui/arrow-right";
import ButtonLeft from "@/components/ui/arrow-left";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface Tournament {
  _id: string;
  organizationName: string;
  description: string;
  totalSlot: number;
  prizePool: string;
  tournamentId: string;
  date: string;
  time: string;
  image: string;
  location: string;
  totalTeamMembers: number;
  joinFees: number;
  joinFeesType: string;
}

const NextArrow = ({ onClick }: { onClick: React.MouseEventHandler }) => {
  return (
    <div
      className="absolute right-[-90px] top-1/2 transform -translate-y-1/2 z-40 text-white text-6xl cursor-pointer"
      onClick={onClick}
    >
      <Button />
    </div>
  );
};

const PrevArrow = ({ onClick }: { onClick: React.MouseEventHandler }) => {
  return (
    <div
      className="absolute left-[-90px] top-1/2 transform -translate-y-1/2 z-40 text-white text-6xl cursor-pointer"
      onClick={onClick}
    >
      <ButtonLeft />
    </div>
  );
};

const onClick = () => {};

const Page = () => {
  const [data, setData] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/all-tournaments", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        setData(result.data);
      } else {
        console.error("Error fetching tournaments");
      }
    } catch (err) {
      console.error("Failed to fetch tournaments", err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  const settings = {
    infinite: true,
    centerMode: true,
    centerPadding: "0",
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    nextArrow: <NextArrow onClick={onClick} />,
    prevArrow: <PrevArrow onClick={onClick} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: "100px",
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          centerPadding: "50px",
        },
      },
    ],
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen relative"
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full z-10 bg-gradient-to-b from-stone-900 to-purple-900">
        <Image
          src="/blink-img-1.png"
          layout="fill"
          alt="alt"
          className="object-cover w-full h-full blur-md"
        />
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-20"
          style={{
            backgroundImage: "url('/noise.png')",
            opacity: 0.8,
            mixBlendMode: "overlay",
          }}
        />
      </div>
      <Link href="/">
        <div className="absolute top-12 left-12 z-50 max-w-xl">
          <div className="text-left">
            <h1 className="text-white text-2xl font-medium">
              blink{" "}
              <span className="px-2 py-1 bg-gradient-to-r from-purple-600 via-fuchsia-700 to-purple-900  rounded-md text-slate-200">
                arena
              </span>
            </h1>
          </div>
        </div>
      </Link>
      <div className="relative z-30 w-full max-w-[100rem]">
        <Slider {...settings}>
          {data.map((tournament) => (
            <div key={tournament._id} className="px-[250px]">
              <TournamentCard
                tournamentId={tournament.tournamentId}
                title={tournament.organizationName}
                description={tournament.description}
                totalSlot={tournament.totalSlot}
                image={tournament.image}
                date={tournament.date}
                time={tournament.time}
                location={tournament.location}
                prizePool={tournament.prizePool}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Page;
