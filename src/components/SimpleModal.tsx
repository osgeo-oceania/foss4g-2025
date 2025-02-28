import Markdown from "markdown-to-jsx";
import { useRef, useEffect } from "react";
import { markdownCommonStyles } from "../utils/markdownCommonStyles";

export const SimpleModal: React.FC<{
  mddText: string;
  title: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  imgSrc: string;
  imgHref?: string | undefined;
  imgHeight?: string | undefined;
  imgPositionX?: string | undefined;
  imgPositionY?: string | undefined;
  light?: boolean;
}> = ({
  mddText,
  title,
  open,
  setOpen,
  imgSrc,
  imgHref,
  imgHeight,
  imgPositionX,
  imgPositionY,
  light,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      containerRef.current?.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  const overlayBg = light
    ? "bg-black bg-opacity-40"
    : "bgbg-slate-50 bg-opacity-60";
  const bg = light ? "bgbg-slate-50" : "bg-gray-900";
  const titleText = light ? "text-black" : "text-slate-50";
  const text = light ? "text-gray-900" : "text-gray-200";
  const btnText = light ? "text-gray-500" : "text-gray-400";
  const btnTextHover = light ? "hover:text-gray-800" : "hover:text-gray-300";
  const btnBorder = light ? "border-gray-300" : "border-gray-700";
  const btnHover = light ? "hover:bg-gray-300" : "hover:bg-gray-800";

  return (
    <div
      className={`fixed top-0 left-0 p-2 items-center justify-center overflow-hidden z-40 ${overlayBg} h-screen w-screen`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      style={{
        transition: "opacity .15s ease-in-out",
        display: open ? "flex" : "none",
        opacity: open ? 1 : 0,
      }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-center text-center">
        <div
          ref={containerRef}
          style={{ flex: "1 1 auto", maxWidth: "800px" }}
          className={`relative p-4 overflow-scroll text-left align-bottom transition-all transform rounded-lg shadow-xl ${bg} sm:align-middle sm:max-w-md sm:w-full sm:p-6 h-full max-h-[calc(100vh-1rem)]`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="flex flex-wrap justify-center">
            <div className="md:w-1/3 max-h-96">
              <a href={imgHref} target="_blank" rel="noopener noreferrer">
                <img
                  style={{
                    height: imgHeight,
                    width: "250px",
                    objectPosition: `${imgPositionX} ${imgPositionY}`,
                  }}
                  className="object-cover rounded-md"
                  src={imgSrc}
                  alt=""
                />
              </a>
            </div>

            <div className="md:w-2/3 mt-8 md:mt-0 px-4 flex flex-wrap">
              <h3
                className={`font-medium leading-6 capitalize ${titleText} text-2xl lg:text-3xl`}
                id="modal-title"
              >
                {title}
              </h3>

              <div className="mx-auto mt-8 prose-base max-w-none">
                <Markdown
                  options={{
                    overrides: {
                      ...markdownCommonStyles,
                      p: { props: { className: `${text} mt-0` } },
                      span: { props: { className: `${text} mt-0` } },
                    },
                  }}
                  children={mddText}
                />
              </div>
            </div>
          </div>
          <div className="mt-5 sm:flex sm:items-center sm:-mx-2">
            <button
              onClick={() => setOpen(!open)}
              className={`w-full px-4 py-2 text-sm font-medium tracking-wide capitalize transition-colors duration-300 transform border rounded-md mb-16 sm:mb-0 sm:mx-2 ${btnText} ${btnBorder} ${btnHover} focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40`}
            >
              Close
            </button>
            <button
              onClick={() => setOpen(!open)}
              className={`absolute right-4 top-4 w-4 h-4 transition-colors rounded duration-300 transform ${btnText} ${btnTextHover} focus:outline-none focus:ring focus:ring-gray-700 focus:ring-opacity-40`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8">
                <title>Shape + Shape</title>
                <g fill-rule="evenodd">
                  <path
                    d="M2.048.77l5.18 5.182L5.953 7.23.77 2.048 2.048.77z"
                    fill="currentColor"
                  />
                  <path
                    d="M5.952.77L7.23 2.05 2.048 7.23.77 5.952 5.953.772z"
                    fill="currentColor"
                  />
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
