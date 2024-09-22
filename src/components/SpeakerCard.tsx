import Markdown from "markdown-to-jsx";
import React, { useEffect, useState } from "react";
import { markdownCommonStyles } from "../utils/markdownCommonStyles";

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
        className="cursor-pointer w-full max-w-xs overflow-hidden bg-gray-900 rounded-lg shadow-lg"
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
          <div className="block text-xl font-bold text-white">{title}</div>
          <span className="text-sm text-gray-200">{shortDescription}</span>
        </div>
      </div>

      <div
        className="fixed top-0 left-0 p-2 items-center justify-center overflow-hidden z-40 bg-white bg-opacity-60 h-screen w-screen"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        style={{
          transition: "opacity .15s ease-in-out",
          display: modelOpen ? "flex" : "none",
          opacity: modelOpen ? 1 : 0,
        }}
        onClick={() => setModelOpen(!modelOpen)}
      >
        <div className="flex items-center justify-center text-center">
          <div
            style={{ flex: "1 1 auto", maxWidth: "800px" }}
            className="relative p-4 overflow-scroll text-left align-bottom transition-all transform rounded-lg shadow-xl bg-gray-900 sm:align-middle sm:max-w-md sm:w-full sm:p-6 h-full max-h-[calc(100vh-1rem)]"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="flex flex-wrap justify-center">
              <div className="md:w-1/3 max-h-96">
                <img
                  style={{
                    height: imgExpandedHeight,
                    width: "250px",
                    objectPosition: `${imgExpandedPositionX} ${imgExpandedPositionY}`,
                  }}
                  className="object-cover rounded-md"
                  src={imgSrc}
                  alt=""
                />
              </div>

              <div className="md:w-2/3 mt-8 md:mt-0 px-4 flex flex-wrap">
                <h3
                  className="font-medium leading-6 capitalize text-white text-2xl lg:text-3xl"
                  id="modal-title"
                >
                  {title}
                </h3>

                <div className="mx-auto mt-8 prose-base max-w-none">
                  <Markdown
                    options={{
                      overrides: {
                        ...markdownCommonStyles,
                        p: { props: { className: "text-gray-200 mt-0" } },
                      },
                    }}
                    children={mddText}
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 sm:flex sm:items-center sm:-mx-2">
              <button
                onClick={() => setModelOpen(!modelOpen)}
                className="w-full px-4 py-2 text-sm font-medium tracking-wide capitalize transition-colors duration-300 transform border rounded-md sm:mx-2 text-gray-200 border-gray-700 hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpeakerCard;
