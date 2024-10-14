import Markdown from "markdown-to-jsx";
import { useMemo, useState } from "react";
import { noEventsMap } from "../pages/Program";
import { markdownCommonStyles } from "../utils/markdownCommonStyles";
import { EventModal } from "./EventModal";

const INTERVAL_HEIGHT = 30;

export type Event = {
  id: number;
  start: string; // HH:mm
  duration: string; // HH:mm
  title: string;
  track?: string;
  date?: string;
  url?: string;
  logo?: string;
  room?: string;
  abstract?: string;
  description?: string;
  persons?: { public_name: string; biography: string; avatar: string }[];
};

type EventsByRoomAndDate = {
  [roomName: string]: {
    [date: string]: Event;
  };
};

export type Day = {
  date: string;
  rooms: { [key: string]: Event[] };
};

export const EVENT_COLORS: Record<string, string> & { default: string } = {
  Workshop: "#ef8427",
  Ceremony: "#4ca57b",
  Keynote: "#aa1456",
  Talk: "#1f4182",
  Panel: "#6ac2ea",
  "Lightning talk": "#fab919",
  "Associated Event": "#9a5bd7",
  "Community Day Event": "#ea4ced",
  Mapathon: "#d62e2e",
  lunch: "#16a34a",
  Break: "#AC75EF",
  default: "rgb(23 37 84)",
};

const getBackgroundColor = (type: string | undefined): string => {
  return (type && EVENT_COLORS[type]) || EVENT_COLORS["default"];
};

// Convert time to minutes for easy calculations
export const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

// Decide interval based on event duration and gap to next event
const decideInterval = (duration: number): number => {
  if (duration < 0.125) return 1;
  // if (duration < 0.5) return 5;
  if (duration <= 1) return 5;

  return 30;
};

export const toAmPm = (minute: number) => {
  const hours = Math.floor(minute / 60);
  const minutes = minute % 60;

  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${
    minutes === 0 ? "00" : minutes.toString().padStart(2, "0")
  } ${ampm}`;
};

export const toHours = (duration: string) => {
  const [hours, minutes] = duration.split(":").map(Number);
  if (hours === 0) return `${minutes}min`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h${minutes}min`;
};

// const handleClick = (url: string) => {
//   if (url) {
//     window.open(url, "_blank");
//   }
// };

export const EventCard = ({
  event,
  time,
  height,
  className,
  showRoom,
  showAbstract,
  onClick,
}: {
  event: Event;
  time: number;
  height: number | string;
  className?: string;
  showRoom?: boolean;
  showAbstract?: boolean;
  onClick: () => void;
}) => {
  const [hover, setHover] = useState(false);

  const bgColor = getBackgroundColor(event.track);

  return (
    <div
      onClick={onClick}
      key={event.id}
      className={`bg-white border-[1px] border-solid rounded-md ${className} cursor-pointer z-10`}
      style={{
        top: `0px`,
        height,
        width: "95%",
        zIndex: 10,
        userSelect: "none",
        marginTop: "3px",
        color: "white",
        borderColor: hover ? bgColor : "rgb(229 231 235)",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {event.id > 0 ? (
        <>
          <div
            className={`text-xs text-white py-1 px-2 rounded-t flex flex-nowrap items-center justify-center`}
            style={{ backgroundColor: bgColor }}
          >
            <span className="font-bold flex-1 flex-grow">{toAmPm(time)}</span>
            {showRoom && event.room && (
              <span className="font-medium flex-1 flex-grow text-center">
                {event.room}
              </span>
            )}
            <span className="flex-1 flex-grow text-right">
              {toHours(event.duration)}
            </span>
          </div>
          <div className="font-semibold text-gray-900 px-2 pt-2 mb-2 text-xs xl:text-sm line-clamp-3">
            {event.title}
          </div>

          {showAbstract && event?.abstract && (
            <div className="max-w-none m-0 text-gray-600 p-2 prose pt-0 text-xs leading-5">
              <Markdown
                options={{
                  overrides: {
                    ...markdownCommonStyles,
                  },
                }}
                children={event.abstract.replace("\n", "\n\n")}
              />
            </div>
          )}

          {event.persons && event.persons.length > 0 && (
            <div className="text-gray-900 font-medium text-xs sm:test-base px-2 mb-2 pr-20 line-clamp-2">
              {event.persons && event.persons.length > 0
                ? event.persons
                    .map((person: any) => person.public_name)
                    .join(", ")
                : ""}
            </div>
          )}
          <div
            className={`absolute text-xs font-bold p-2 bottom-0 right-0`}
            style={{ color: bgColor }}
          >
            {event.track}
          </div>
        </>
      ) : (
        <span>{event.title}</span>
      )}
    </div>
  );
};

type Interval = {
  startTime: number;
  endTime: number;
  timeSlotInterval: number;
};

function parseDays(day: Day): {
  timeSlots: { time: number; interval: number }[];
  events: EventsByRoomAndDate;
} {
  let eventsByRoomAndDate: EventsByRoomAndDate = {};

  Object.keys(day.rooms).forEach((roomName) => {
    day.rooms[roomName].forEach((event) => {
      // Add room to event
      event.room = roomName;

      let time = "";

      if (event.date !== undefined) {
        time = event.date.split("T")[1];
      }

      if (event.start !== null) {
        time = event.start;
      }

      // Extract hours and minutes from the string
      const [hours, minutes] = time.split(":").map(Number);

      // Determine AM or PM
      const isPm = hours >= 12;
      const adjustedHours = hours % 12 || 12; // Convert 0 to 12 for 12AM

      // Format the hours and minutes with AM/PM
      const amPmTime = `${adjustedHours}:${String(minutes).padStart(2, "0")} ${
        isPm ? "PM" : "AM"
      }`;

      if (!eventsByRoomAndDate[roomName]) {
        eventsByRoomAndDate[roomName] = {};
      }

      if (!eventsByRoomAndDate[roomName][amPmTime]) {
        eventsByRoomAndDate[roomName][amPmTime] = event;
      }
    });
  });

  const events = Object.values(day["rooms"]).reduce((acc, curr) => {
    return acc.concat(curr);
  }, []);

  events.sort((a, b) => timeToMinutes(a.start) - timeToMinutes(b.start));

  const intervals: Interval[] = [];

  for (let i = 0; i < events.length; i++) {
    const startTime = timeToMinutes(events[i].start) / 60;
    const duration = timeToMinutes(events[i].duration) / 60;
    const endTime =
      i === events.length - 1
        ? startTime + duration
        : timeToMinutes(events[i + 1].start) / 60;

    const intervalSize = decideInterval(duration);

    // Check if the interval already exists
    if (
      !intervals.some(
        (interval) =>
          interval.startTime === startTime && interval.endTime === endTime
      )
    ) {
      if (startTime !== endTime)
        intervals.push({
          startTime,
          endTime,
          timeSlotInterval: intervalSize,
        });
    }

    if (i === events.length - 1) {
      intervals.push({
        startTime: endTime,
        endTime: endTime + (intervalSize / 60) * 2,
        timeSlotInterval: intervalSize,
      });
    }
  }

  const mergedIntervals: Interval[] = [];
  let currentInterval: Interval | null = null;

  for (const interval of intervals) {
    if (currentInterval === null) {
      currentInterval = interval;
    } else {
      if (
        currentInterval.timeSlotInterval === interval.timeSlotInterval &&
        currentInterval.endTime === interval.startTime
      ) {
        currentInterval.endTime = interval.endTime;
      } else {
        mergedIntervals.push(currentInterval);
        currentInterval = interval;
      }
    }
  }

  // push the last interval if there is one
  if (currentInterval !== null) {
    mergedIntervals.push(currentInterval);
  }

  // Generate time slots for each period
  const timeSlots: { time: number; interval: number }[] =
    mergedIntervals.flatMap(({ startTime, endTime, timeSlotInterval }) => {
      const totalMinutes = (endTime - startTime) * 60;
      return Array.from(
        { length: totalMinutes / timeSlotInterval },
        (_, i) => ({
          time: Math.round(startTime * 60 + i * timeSlotInterval),
          interval: timeSlotInterval,
        })
      );
    });

  return { timeSlots, events: eventsByRoomAndDate };
}

const DayView = ({ day }: { day: Day }) => {
  const { events, timeSlots } = useMemo(() => parseDays(day), [day]);
  const [modelOpen, setModelOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  return (
    <>
      <table
        className="min-w-full border-separate"
        cellPadding={0}
        cellSpacing={0}
      >
        <thead>
          <tr
            className={`sticky top-[103px] bg-gray-50 z-20 border-b`}
            style={{ height: `${INTERVAL_HEIGHT}px` }}
          >
            <th className="p-2 w-[100px] border-b"></th>
            {Object.keys(day.rooms).map((roomName, index) => (
              <th
                key={index}
                className="p-2 text-lg font-light text-gray-800 border-b"
              >
                {roomName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.length === 0 && (
            <tr>
              <td
                colSpan={Object.keys(day.rooms).length + 1}
                className="text-center text-xl"
              >
                {noEventsMap[day.date] || "No events"}
              </td>
            </tr>
          )}
          {timeSlots.map(({ time, interval }, index) => (
            <tr key={time} style={{ height: `${INTERVAL_HEIGHT}px` }}>
              {time % 15 === 0 ? (
                <td className="border-t text-left pb-0 align-top">
                  {toAmPm(time)}
                </td>
              ) : (
                <td />
              )}

              {Object.keys(events).map((roomName, index) => {
                const event = events?.[roomName]?.[toAmPm(time)];

                return (
                  <td
                    key={index}
                    className={`${time % 15 === 0 ? "border-t" : ""} relative`}
                  >
                    {event && (
                      <EventCard
                        event={event}
                        height={
                          (timeToMinutes(event.duration) / interval) *
                            INTERVAL_HEIGHT -
                          6
                        }
                        time={time}
                        className="absolute"
                        onClick={() => {
                          setSelectedEvent(event);
                          setModelOpen(true);
                        }}
                      />
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <EventModal
        open={modelOpen}
        setIsOpen={setModelOpen}
        event={selectedEvent}
      />
    </>
  );
};

export default DayView;
