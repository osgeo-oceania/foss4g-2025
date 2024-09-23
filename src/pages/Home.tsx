import Markdown from "markdown-to-jsx";
import { useEffect, useState } from "react";
import { MapComponent } from "../components/Map";
import SponsorshipLevels from "../components/SponsorshipLevels";
import Intro from "../documents/home-preamble.md";
import { markdownCommonStyles } from "../utils/markdownCommonStyles";
import KeynoteSpeakers from "../components/KeynoteSpeakers";

const Home = () => {
  const [introMddText, setIntroMddText] = useState("");

  useEffect(() => {
    fetch(Intro)
      .then((res) => res.text())
      .then((text) => setIntroMddText(text));
  }, []);

  return (
    <div>
      <section className="bg-white">
        <div
          style={{
            backgroundImage: "url('/imgs/2024/home-view.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
            margin: "auto",
          }}
        >
          <div className="container mx-auto px-4 grid md:grid-cols-[300px_1fr] lg:grid-cols-[600px_1fr] items-center md:py-16">
            <div className="flex flex-col">
              <div className="p-4 lg:text-6xl md:text-5xl text-3xl font-bold text-white mx-auto md:mx-0">
                <img
                  src="/imgs/2024/2024_logo_round.png"
                  alt="FOSS4G SotM Oceania 2024"
                  className="w-auto h-36 md:h-64 lg:h-96"
                />
              </div>
            </div>
            <div
              className="hidden md:block text-center md:text-left text-lg md:text-2xl font-display font-['Roboto Serif']"
              style={{ lineHeight: "3rem" }}
            >
              <div>
                Join us for{" "}
                <span className="text-xl md:text-4xl">FOSS4G SotM Oceania</span>{" "}
                in <span className="text-xl md:text-4xl">Hobart, Tasmania</span>{" "}
              </div>
              <div>
                from{" "}
                <span className="text-xl md:text-4xl">5 - 8 November 2024</span>
                .
              </div>
            </div>
            <div className="md:hidden text-center text-2xl font-bold mb-4 text-white">
              5 - 8 November 2024
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto py-8 px-4">
        <div className="prose-base max-w-none">
          <p className="text-lg">
            FOSS4G SotM Oceania is a gathering for our vibrant open geospatial
            community to come together and geek out over all things open
            geospatial.
          </p>
          <p>
            FOSS4G events are part of a conference series run by the OSGeo
            community with the objective of fostering and promoting the adoption
            of open source geospatial technology. SotM refers to the conference
            of the OpenStreetMap Foundation (OSMF), supporting the development
            of the OpenStreetMap project. FOSS4G SotM Oceania is part of the
            larger global community, and merges the two conferences into one
            exciting Oceania centered event.
          </p>
        </div>
      </section>

      <KeynoteSpeakers />

      <section className="container mx-auto px-4">
        <div className="prose-base max-w-none">
          <Markdown
            options={{
              overrides: markdownCommonStyles,
            }}
            children={introMddText}
          />
        </div>
      </section>

      <SponsorshipLevels />

      <MapComponent width={"100vw"} height={400} />
    </div>
  );
};
export default Home;
