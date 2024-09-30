import React from "react";

type SponsorshipLevelProps = {
  title: string;
  cards: {
    name: string;
    link: string;
    imgSrc: string;
  }[];
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
          <a
            key={index}
            href={card.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex cursor-pointer w-64 h-40 sm:w-52 sm:h-32 bg-white rounded overflow-hidden hover:scale-105 m-2.5 sponsor-card justify-center"
          >
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <img
              src={card.imgSrc}
              alt={card.name}
              className="p-3 max-w-full max-h-full object-contain"
            />
          </a>
        ))}
      </div>
    </>
  );
};

export default SponsorshipLevel;
