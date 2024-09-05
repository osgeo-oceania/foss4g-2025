import Markdown from "markdown-to-jsx";
import { useEffect, useState } from "react";
import { MapComponent } from "../components/Map";
import SocialEventsIntroMD from "../documents/attend/social-events-intro.md";
import SocialEventsMD from "../documents/attend/social-events.md";
import { markdownCommonStyles } from "../utils/markdownCommonStyles";

const SocialEvents = () => {
  const [introMddText, setIntroMddText] = useState("");
  const [eventsMddText, setEventsMddText] = useState("");

  // Fetch Social preamble
  useEffect(() => {
    fetch(SocialEventsIntroMD)
      .then((res) => res.text())
      .then((text) => setIntroMddText(text));
  }, []);

  // Fetch Social events
  useEffect(() => {
    fetch(SocialEventsMD)
      .then((res) => res.text())
      .then((text) => setEventsMddText(text));
  }, []);

  return (
    <>
      <section
        style={{
          backgroundImage: "url('/imgs/dinner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 25%",
        }}
        className="relative flex items-center justify-center h-64 bg-gray-100 bg-no-repeat bg-cover bg-center"
      ></section>
      <div className="container mx-auto p-6">
        <section className="mx-auto mt-8 prose-base max-w-none">
          <Markdown
            options={{
              overrides: markdownCommonStyles,
            }}
            children={introMddText}
          />
        </section>
        <div style={{ marginLeft: "calc((-100vw + 100%) / 2)" }}>
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
        <section className="mx-auto mt-8 prose-base max-w-none">
          <Markdown
            options={{
              overrides: markdownCommonStyles,
            }}
            children={eventsMddText}
          />
        </section>
      </div>
    </>
  );
};

export default SocialEvents;
