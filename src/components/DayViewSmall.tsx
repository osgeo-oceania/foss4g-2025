import { useState } from "react";
import { noEventsMap } from "../pages/Program";
import { Day, Event, EventCard, timeToMinutes } from "./DayView";
import { EventModal } from "./EventModal";

const DayViewSmall = ({ day }: { day: Day }) => {
  const allEvents = Object.values(day.rooms)
    .flat()
    .sort((a, b) => {
      return a.track?.localeCompare(b.track ?? "") ?? 0;
    })
    .sort((a, b) => {
      return timeToMinutes(a.start) - timeToMinutes(b.start);
    });

  const [modelOpen, setModelOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  return (
    <>
      <div className="flex flex-col gap-3 items-center w-full">
        {allEvents.length === 0 && (
          <div className="text-center text-xl">
            {noEventsMap[day.date] || "No events"}
          </div>
        )}
        {allEvents.map((event, index) => (
          <EventCard
            key={index}
            event={event}
            height={"fit-content"}
            time={timeToMinutes(event.start)}
            className="relative"
            showRoom
            onClick={() => {
              setSelectedEvent(event);
              setModelOpen(true);
            }}
          />
        ))}
      </div>
      <EventModal
        open={modelOpen}
        setIsOpen={setModelOpen}
        event={selectedEvent}
      />
    </>
  );
};

export default DayViewSmall;
