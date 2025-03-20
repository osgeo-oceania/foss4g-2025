import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
// import { SimpleModal } from "../2024-site-to-be-merged-in/components/SimpleModal";

export interface SponsorCardProps {
  name: string;
  link: string;
  image: StaticImport;
  description?: string;
}

type SponsorshipLevelProps = {
  title: string;
  // Note description not supported until SimpleModal is implemented
  // description?: string;
  cards: SponsorCardProps[];
};

export const SponsorCard: React.FC<SponsorCardProps> = ({
  name,
  link,
  image,
  description,
}: SponsorCardProps) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="relative w-64 h-40 sm:w-52 sm:h-32 m-2.5">
      {/* {description && (
        <SimpleModal
          open={showModal}
          setOpen={setShowModal}
          title={name}
          mddText={description}
          imgSrc={imgSrc}
          imgHref={link}
          light
        />
      )} */}
      <Link
        href={description ? "#info" : link}
        onClick={(evt) => {
          if (description) {
            setShowModal(true);
            evt.preventDefault();
          }
        }}
        target="_blank"
        rel="noopener noreferrer"
        className="flex cursor-pointer w-full h-full bg-white rounded overflow-hidden hover:scale-105 sponsor-card justify-center"
      >
        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
        <Image
          src={image}
          alt={name}
          className="p-3 max-w-full max-h-full object-contain m-0"
        />
      </Link>
    </div>
  );
};

const SponsorshipLevel: React.FC<SponsorshipLevelProps> = ({
  title,
  // description,
  cards,
}) => {
  return (
    <>
      <h2>{title}</h2>

      {/* {description && (
        <p className="text-sm text-gray-600 mb-5">{description}</p>
      )} */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-5 justify-items-center sm:justify-items-normal">
        {cards.map((card, index) => (
          <SponsorCard {...card} key={index} />
        ))}
      </div>
    </>
  );
};

export default SponsorshipLevel;
