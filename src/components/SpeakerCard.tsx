import React, { useEffect, useState } from "react";
import { SimpleModal } from "./SimpleModal";

type SpeakerCardProps = {
  imgSrc: string;
  imgHeight?: string;
  imgPositionX?: string;
  imgPositionY?: string;
  imgExpandedHeight?: string;
  imgExpandedPositionX?: string;
  imgExpandedPositionY?: string;
  title: string;
  shortDescription: string;
  longDescriptionMd: string;
};

const SpeakerCard: React.FC<SpeakerCardProps> = ({
  imgSrc,
  imgHeight,
  imgPositionX,
  imgPositionY,
  imgExpandedHeight,
  imgExpandedPositionX,
  imgExpandedPositionY,
  title,
  shortDescription,
  longDescriptionMd,
}) => {
  const [modelOpen, setModelOpen] = useState(false);
  const [mddText, setMddText] = useState("");
  // Fetch Terms of Use
  useEffect(() => {
    fetch(longDescriptionMd)
      .then((res) => res.text())
      .then((text) => setMddText(text))
      .catch((error) => console.error(error));
  }, [longDescriptionMd]);

  return (
    <>
      <div
        onClick={() => setModelOpen(!modelOpen)}
        className="cursor-pointer w-full max-w-xs overflow-hidden bg-gray-900 rounded  hover:scale-105 keynote-card"
      >
        <div className="w-full h-64 overflow-hidden">
          <img
            style={{
              height: imgHeight,
              objectPosition: `${imgPositionX} ${imgPositionY}`,
            }}
            className="min-h-[16rem] object-cover"
            src={imgSrc}
            alt="avatar"
          />
        </div>
        <div className="py-5 px-3 text-center">
          <div className="block text-xl font-bold text-slate-50">{title}</div>
          <span className="text-sm text-gray-200">{shortDescription}</span>
        </div>
      </div>
      <SimpleModal
        {...{
          mddText,
          title,
          open: modelOpen,
          setOpen: setModelOpen,
          imgSrc,
          imgHeight: imgExpandedHeight,
          imgPositionX: imgExpandedPositionX,
          imgPositionY: imgExpandedPositionY,
        }}
      />
    </>
  );
};

export default SpeakerCard;
