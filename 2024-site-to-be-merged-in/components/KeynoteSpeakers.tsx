import SpeakerCard from "./SpeakerCard";
import AndreaJalandoniMD from "../content/keynote-speakers/andrea-jalandoni.md";
import BriannaPaganMd from "../content/keynote-speakers/brianna-pagan.md";
import KateFickasMd from "../content/keynote-speakers/kate-fickas.md";
import LanietaRokoMd from "../content/keynote-speakers/lanieta-roko.md";

const KeynoteSpeakers = () => {
  return (
    <>
      <section className="container px-4 py-8 mx-auto lg:py-16">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-800 mb-6">
          Keynote Speakers
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-2 justify-center">
          <SpeakerCard
            imgSrc="./imgs/keynote-speakers/andrea.jpeg"
            title="Andrea Jalandoni"
            imgHeight="300px"
            imgExpandedHeight="400px"
            imgPositionX="50%"
            imgPositionY="0px"
            shortDescription="A pioneering digital archaeologist, Andrea specializes in rock art recording using photogrammetry, lidar, and unmanned aerial systems, with nearly 20 years of experience on World Heritage Sites across Australia, Southeast Asia, and Micronesia."
            longDescriptionMd={AndreaJalandoniMD}
          />
          <SpeakerCard
            imgSrc="./imgs/keynote-speakers/brianna.jpeg"
            title="Brianna Pagán"
            imgHeight="500px"
            imgPositionX="40%"
            imgPositionY="-70px"
            shortDescription="As Deputy Manager at NASA’s GES DISC and Adjunct Professor, Brianna enables science for the masses and brings her expertise in the fields of remote sensing, climate and informatics to lead large and diverse teams of software engineers and scientists to effectively distribute geospatial data."
            longDescriptionMd={BriannaPaganMd}
          />
          <SpeakerCard
            imgSrc="./imgs/keynote-speakers/kate.jpeg"
            title="Kate Fickas"
            shortDescription="As Esri Director of Imagery and Remote Sensing Solutions, Kate combines her interdisciplinary expertise in satellite, drone, and lidar remote sensing with GIS, statistical modeling, and machine learning, to develop user and solution driven approaches to cross-industry applications."
            longDescriptionMd={KateFickasMd}
          />
          <SpeakerCard
            imgSrc="./imgs/keynote-speakers/lani.jpeg"
            imgHeight="400px"
            imgPositionX="85%"
            imgPositionY="-70px"
            imgExpandedHeight="400px"
            imgExpandedPositionX="-220px"
            imgExpandedPositionY="0px"
            title="Lanieta Roko"
            shortDescription="An accomplished environmental scientist, Lanieta conducts climate risk assessments across Fiji and the Pacific, using geospatial tools to develop data-driven adaptation plans tailored to regional needs. She’s also active in voluntary geospatial work and passionate about community engagement."
            longDescriptionMd={LanietaRokoMd}
          />
        </div>
      </section>
    </>
  );
};
export default KeynoteSpeakers;
