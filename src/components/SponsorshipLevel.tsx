import React, { useState } from "react";
import { SimpleModal } from "./SimpleModal";

interface SponsorCardProps {
  name: string;
  link: string;
  imgSrc: string;
  description?: string;
}

type SponsorshipLevelProps = {
  title: string;
  cards: SponsorCardProps[];
};

const SponsorCard: React.FC<SponsorCardProps> = ({
  name,
  link,
  imgSrc,
  description,
}: SponsorCardProps) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="relative w-64 h-40 sm:w-52 sm:h-32 m-2.5">
      {description && (
        <SimpleModal
          open={showModal}
          setOpen={setShowModal}
          title={name}
          mddText={description}
          imgSrc={imgSrc}
          imgHref={link}
          light
        />
      )}
      <a
        href={description ? "#terria" : link}
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
        <img
          src={imgSrc}
          alt={name}
          className="p-3 max-w-full max-h-full object-contain"
        />
      </a>
    </div>
  );
};

const SponsorshipLevel: React.FC<SponsorshipLevelProps> = ({
  title,
  cards,
}) => {
  return (
    <>
      <h2 className="text-l font-medium text-gray-800 md:text-xl lg:text-2xl mb-5">
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-5  justify-items-center sm:justify-items-normal">
        {cards.map((card, index) => (
          <SponsorCard {...card} key={index} />
        ))}
      </div>
    </>
  );
};

export default SponsorshipLevel;
