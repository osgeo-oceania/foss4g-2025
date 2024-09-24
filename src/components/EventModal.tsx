import Markdown from "markdown-to-jsx";
import { Event, toHours } from "./DayView";
import { markdownCommonStyles } from "../utils/markdownCommonStyles";
import { useEffect, useRef } from "react";

export const EventModal = ({
  open,
  setIsOpen,
  event,
}: {
  open: boolean;
  setIsOpen: (open: boolean) => void;
  event: Event | null;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const day = new Date(event?.date ?? 0).toLocaleDateString("en-US", {
    weekday: "long",
  });

  const startTime = new Date(event?.date ?? 0).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const duration = toHours(event?.duration ?? "");

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      containerRef.current?.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  return (
    <div
      className="fixed top-0 left-0 p-2 items-center justify-center overflow-hidden z-40 bg-black bg-opacity-50 h-screen w-screen"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      style={{
        transition: "opacity .15s ease-in-out",
        display: open && event ? "flex" : "none",
        opacity: open && event ? 1 : 0,
      }}
      onClick={() => setIsOpen(!open)}
    >
      <div className="flex items-center justify-center text-center max-w-full">
        <div
          ref={containerRef}
          style={{ flex: "1 1 auto" }}
          className="relative p-4 overflow-y-auto text-left align-bottom transition-all transform rounded-lg shadow-xl bg-gray-50 sm:align-middle lg:max-w-6xl w-full sm:p-6 h-full max-h-[calc(100vh-1rem)]"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {event && (
            <>
              <div className="flex flex-wrap justify-center w-full gap-2">
                <div className="mt-4 md:mt-0 flex flex-col w-full gap-2">
                  <h3
                    className="m-0 font-bold leading-6 capitalize text-base sm:text-xl lg:text-2xl"
                    id="modal-title"
                  >
                    {event.title}
                  </h3>

                  <div className="p-0 prose-base md:prose-xl text-gray-500">
                    {day} {startTime} ({duration}) in the {event.room}
                  </div>

                  {event.abstract && (
                    <>
                      <div className="p-0 prose-sm md:prose-base font-semibold w-full overflow-x-auto">
                        <Markdown
                          options={{
                            overrides: {
                              ...markdownCommonStyles,
                            },
                          }}
                          children={event.abstract?.replace("\n", "\n\n")}
                        />
                      </div>
                      <div className="divide-y w-full h-1 border-gray-300 border-solid border-b" />
                    </>
                  )}
                  {event?.description && (
                    <div className="w-full m-0 prose-sm md:prose-base overflow-x-auto">
                      <Markdown
                        options={{
                          overrides: {
                            ...markdownCommonStyles,
                          },
                        }}
                        children={event.description.replace("\n", "\n\n")}
                      />
                    </div>
                  )}
                </div>
                <a
                  href={event.url}
                  target="_black"
                  className="text-left w-full underline text-blue-500"
                >
                  Open in pretalx
                </a>
                <div className="divide-y w-full h-1 border-gray-300 border-solid border-b" />
              </div>
              <div className="flex flex-col mt-10 gap-4">
                {event.persons?.map((person, i) => (
                  <div key={i} className="flex flex-row gap-4">
                    {person.avatar ? (
                      <img
                        className="hidden sm:inline object-cover rounded-md h-36 w-36 m-0 mt-2 flex-shrink-0"
                        src={person.avatar}
                        alt=""
                      />
                    ) : (
                      <div className="hidden sm:block rounded-md h-36 w-36 m-0 mt-2 bg-gray-300 flex-shrink-0">
                        &nbsp;
                      </div>
                    )}

                    <div className="flex flex-col prose-sm">
                      <h3 className="mt-0 p-0 font-bold">
                        {person.public_name}
                      </h3>
                      {person.avatar && (
                        <img
                          className="sm:hidden object-cover rounded-md h-36 w-36 my-2 flex-shrink-0"
                          src={person.avatar}
                          alt=""
                        />
                      )}
                      <div className="w-full m-0">
                        <Markdown
                          options={{
                            overrides: {
                              ...markdownCommonStyles,
                            },
                          }}
                          children={
                            person.biography?.replace("\n", "\n\n") ?? "No bio."
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="mt-5 sm:flex sm:items-center sm:-mx-2">
            <button
              onClick={() => setIsOpen(!open)}
              className="w-full px-4 py-2 text-sm font-medium tracking-wide capitalize transition-colors duration-300 transform border rounded-md mb-6 sm:mb-0 sm:mx-2 text-gray-700 border-gray-200 hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-700 focus:ring-opacity-40"
            >
              Close
            </button>
            <button
              onClick={() => setIsOpen(!open)}
              className="absolute right-4 top-4 w-4 h-4 transition-colors rounded duration-300 transform text-gray-400 hover:text-gray-700 focus:outline-none focus:ring focus:ring-gray-700 focus:ring-opacity-40"
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
