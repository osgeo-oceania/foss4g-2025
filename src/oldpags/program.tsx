import DayView from "../components/DayView";
import IntroMD from "../content/schedule-preamble.md";

import DayViewSmall from "../components/DayViewSmall";

import { ReactNode, useEffect, useState } from "react";
import { MapComponent } from "../components/Map";

const getToday = (): string => {
  const today = new Date();
  const yyyy = today.getFullYear().toString();
  const mm = (today.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
  const dd = today.getDate().toString().padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
};

const dayTitleMap: { [key: string]: string } = {
  "2024-11-05": "Tuesday 5th (Workshops)",
  "2024-11-06": "Wednesday 6th (Conference)",
  "2024-11-07": "Thursday 7th (Conference)",
  "2024-11-08": "Friday 8th (Community Day)",
};

export const noEventsMap: { [key: string]: ReactNode } = {
  "2024-11-05": "No workshops today",
  "2024-11-06": "No events today",
  "2024-11-07": "No events today",
  "2024-11-08": (
    <>
      <p>
        We have some great events in the pipeline including a field trip to Mt
        Wellington.
      </p>
      <p>
        If you would like to propose a hackathon or something, let us know
        via&nbsp;
        <a
          href="mailto:program@foss4g-oceania.org"
          className="text-blue-500 underline"
        >
          program@foss4g-oceania.org
        </a>
      </p>
    </>
  ),
};

const ProgramPage = () => {
  const [allDaysData, setAllDaysData] = useState<any>([]);
  const [days, setDays] = useState<any>([]);
  const [activeDay, setActiveDay] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the data only when the component mounts
    fetch(
      "https://talks.osgeo.org/foss4g-sotm-oceania-2024/schedule/export/schedule.json"
    )
      .then(async (response) => await response.json())
      .then((data) => {
        const fetchedDays = data.schedule.conference.days;
        setAllDaysData(data.schedule.conference.days);
        const today = getToday();
        let todayIndex = fetchedDays.findIndex(
          (day: any) => day.date === today
        );

        // If today is not found in the fetched days, default to 0
        todayIndex = todayIndex === -1 ? 0 : todayIndex;

        setDays(fetchedDays.map((day: any) => dayTitleMap[day.date]));
        setActiveDay(todayIndex);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching program, please try again later.");
      });
  }, []);

  useEffect(() => {
    if (loading) return;
    const target = window.document.getElementById("schedule-top");
    // Scroll to top of target
    target?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    // Don't trigger on load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDay]);

  return (
    <>
      <section
        style={{
          backgroundImage: "url('/imgs/workshop-lunch.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 35%",
        }}
        className="relative flex items-center justify-center h-64 bg-gray-100 bg-no-repeat bg-cover bg-center"
      ></section>
      <div className="container mx-auto p-6">
        <section className="mx-auto mt-8 prose-base max-w-none">
          <IntroMD />
        </section>
        <a
          type="hidden"
          id="schedule-top"
          href="#schedule-top"
          className="h-0 overflow-hidden block"
        >
          &nbsp;
        </a>

        <section className="mx-[calc((-100vw+100%)/2)] xl:mx-auto mt-8 prose-base max-w-none bg-gray-50 rounded-none xl:rounded-lg py-4">
          {error ? (
            <div className="flex items-center justify-center h-64 font-mono text-red-700 text-4xl">
              {error}
            </div>
          ) : loading ? (
            <div className="flex items-center justify-center h-64 font-mono text-xl font-light">
              Loading program...
            </div>
          ) : (
            <>
              <div className="sticky top-16 z-20 bg-gray-50 mb-8 overflow-x-auto overflow-y-visible h-10 md:px-4">
                <div className="flex justify-around whitespace-nowrap w-fit mx-auto">
                  {days.map((day: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => {
                        setActiveDay(index);
                      }}
                      className={`inline-flex items-center h-10 px-4 -mb-px text-sm text-center text-gray-700 bg-transparent border-b-2 xl:text-base whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400 ${
                        activeDay === index
                          ? "border-blue-950 text-gray-800 font-bold"
                          : "border-transparent text-gray-700"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              <div className="hidden md:block md:px-4">
                {allDaysData[activeDay] && (
                  <DayView day={allDaysData[activeDay]} />
                )}
              </div>
              <div className="block md:hidden">
                {allDaysData[activeDay] && (
                  <DayViewSmall day={allDaysData[activeDay]} />
                )}
              </div>
            </>
          )}
        </section>
        <div
          style={{ marginLeft: "calc((-100vw + 100%) / 2)" }}
          className="-mb-6 mt-6"
        >
          <MapComponent
            width={"100vw"}
            height={400}
            initialViewState={{
              longitude: 147.32031,
              latitude: -42.88898,
              zoom: 12.3,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ProgramPage;
