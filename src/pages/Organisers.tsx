import Markdown from "markdown-to-jsx";
import { useEffect, useState } from "react";
import OrganisersIntroMD from "../documents/organisers-intro.md";
import { markdownCommonStyles } from "../utils/markdownCommonStyles";
import SponsorshipLevel, {
  SponsorCardProps,
} from "../components/SponsorshipLevel";

const organisers: {
  name: string;
  role: string;
  description: string;
  image?: string;
  links?: { name: string; link: string }[];
}[] = [
  {
    name: "Alex Leith",
    description: `Alex is an open geospatial technologist with extensive expertise in software development, cloud infrastructure, and program governance. Throughout his career, Alex's focus has been on making data more easily accessible. By enabling simpler access to data, he believes we can drive positive change and continue to develop sustainably.`,
    role: "Conference Chair",
    image: "/imgs/team/alex.jpg",
    links: [
      {
        name: "Auspatious",
        link: "https://auspatious.com",
      },
    ],
  },
  {
    name: "Dorothy Pion",
    description: `Dorothy works in Geological Survey at the Mineral Resources Authority in Papua New Guinea, specialising in GIS analysis, remote sensing, and geological mapping. She is passionate about mentoring and actively participates in the GCA mentoring program each year and is involved in training of new staff at the MRA in QGIS, ensuring everyone stays up to date with the latest advances in GIS/RS technology. Outside of work, she enjoys cooking, reading, and spending time gardening.`,
    role: "Chair: Travel Grant Program",
    image: "/imgs/team/dorothy.jpg",
    links: [
      {
        name: "Mineral Resources Authority (PNG)",
        link: "https://ww.mra.gov.pg ",
      },
    ],
  },
  {
    name: "Em Hain",
    description: `Em works at North Road where she assists in the development and integration of QGIS. This is her 3rd year as Program Chair - not planned as she has subbed in for the amazing Simon Nitz who unfortunately needed to step away whilst he got more amazing (#becoming-bionic-man). She is also the contact for QGIS Australia and helps wrangle that group. Herding cats through spreadsheets is her superpower.`,
    role: "Chair: Program, Website, Volunteers",
    image: "/imgs/team/em.jpg",
    links: [
      {
        name: " North Road",
        link: "https://north-road.com/",
      },
      {
        name: "QGIS Australia",
        link: "https://qgis-australia.org/",
      },
    ],
  },
  {
    name: "Nick Forbes-Smith",
    description: `Nick is a Technical Leader and Software Engineer specialising in building Web platforms for data visualisation. He focuses on making data accessible and understandable to all, regardless of expertise.

Nick is committed to open data and open-source tools, and actively contributes to these communities. He’s driven by projects that create meaningful, positive change.`,
    role: "Chair: Sponsorship, Venues/Events, Website",
    image: "/imgs/team/nick.jpg",
    links: [
      {
        name: "Self Employed",
        link: "https://www.linkedin.com/in/nick-forbes-smith/",
      },
      {
        name: "Terria",
        link: "https://terria.io/",
      },
    ],
  },
  {
    name: "Dawn Hendrick",
    description: `I have more than 40 years of cartographic experience starting my professional career as a geologist/seismic geophysicist. Since moving to Tasmania fourteen years ago I have continued to run my own consultancy DH Geodata Services compiling maps for mining, engineering and environmental companies both in Australia and overseas. I am a retired Spatial Science Teacher from TafeNSW.  I have run courses using QGIS for the SSSI (now GCA) and for commercial operations with Alex Leith.
I attended the first FOSS4G SotM Oceania conference in Melbourne back in 2018 and have attended every year (except 2022 in Fiji) since then.  During COVID I organised the Hobart Hub for 2020 and 2021. I use QGIS software with two volunteer organisations who would not have a mapping capability otherwise.`,
    role: "Communications, Merch",
    image: "/imgs/team/dawn.jpg",
  },
  {
    name: "Leo Ghignone",
    description: `Leo is a Data Engineer with a background in Machine Learning, currently working for the Australian Integrated Marine Observing System to manage data from the seas all around Australia. He loves new challenges and new technologies, and strives to make data open and available to all.
He had his first experience with FOSS4G last year, got fascinated by the community and is now trying to contribute to it.`,
    role: "Volunteers, Program, Merch",
    image: "/imgs/team/leo.jpg",
    links: [
      {
        name: "Integrated Marine Observing System (IMOS)",
        link: "https://imos.org.au/",
      },
    ],
  },
  {
    name: "Elisa Puccioni",
    description: `Elisa is the current chair of OsGeo Oceania board and has been contributing to the community since 2019, serving first as board member, then as Grant committee chair and now as the board chair.

Elisa was born in Italy and moved to New Zealand in 2008, where she currently resides. She has over 18 years of experience in GIS and database administration and has been working with most of the proprietors and open-source GIS packages. She is a great supporter of GIS open-source software as she strongly believes that everybody should be able to know and use GIS, especially people belonging to minority groups or living in remote areas.`,
    role: "Travel Grant Program",
    image: "/imgs/team/eli.jpg",
    links: [
      {
        name: "Kenex",
        link: "https://kenex.com.au/",
      },
    ],
  },
  {
    name: "Colin Mazengarb",
    description: `Colin is a semi-retired geologist and GIS specialist based in Hobart.

Colin has worked for geological survey organisations in New Zealand, Oklahoma and Tasmania, undertaking regional mapping and natural hazards studies. Since 2016 he has run in-person and online training courses teaching QGIS to geotechnical practitioners in Australia, New Zealand and Nepal. He is currently undertaking a geological mapping project in NZ and will be presenting a talk on this at the conference.`,
    role: "Committee Member",
    image: "/imgs/team/colin.jpg",
    links: [
      {
        name: "Email",
        link: "mailto:gis4geotechs@outlook.com",
      },
    ],
  },
  {
    name: "Michel M Nzikou",
    description: `Michel works as a research fellow at the Center of Exploration Targeting (CET), at the University of Western Australia (UWA).  He is a data enthusiast with a focus on building QGIS plugins for Geological and Geophysical 3D modelling. A part being an organising committee member, he is the ASEG WA Branch president and part of the MAG 24 committee. Outside work, he enjoys playing volleyball and is also a team member of Fury River Dragon boat for 4 years.`,
    role: "Committee Member",
    image: "/imgs/team/michel.jpg",
    links: [
      {
        name: "Centre for Exploration Targeting (cet.edu.au)",
        link: "https://www.cet.edu.au/personnel/michel-nzikou-mamboukou/",
      },
    ],
  },
  {
    name: "Ponciano da Costa de Jesus",
    description: `Ponciano, or Ponsy, is the CEO and founder of the Geographic Information System Group (G-SIG). He founded G-SIG in 2022 as a youth-led organization dedicated to advancing geospatial technology in addressing critical environmental challenges such as natural disasters, climate change, and biodiversity conservation in Timor-Leste. Within G-SIG, he also serves as the principal GIS consultant, specializing in QGIS, OpenStreetMap (OSM), and ArcGIS, and facilitates training for NGOs, youth, and students interested in utilizing this technology.`,
    role: "Volunteer",
    image: "/imgs/team/ponciano.jpg",
    links: [
      {
        name: "Geographic Information System Group (G-SIG).",
        link: "https://gis.tl/",
      },
    ],
  },
];

const supportingOrganisations: SponsorCardProps[] = [
  {
    link: "https://auspatious.com/",
    imgSrc: "./imgs/sponsors/auspatious.png",
    name: "Auspatious",
  },
  {
    link: "https://mra.gov.pg/",
    imgSrc: "./imgs/sponsors/mra.jpeg",
    name: "Mineral Resources Authority of Papua New Guinea",
  },
  {
    link: "https://north-road.com/",
    imgSrc: "./imgs/sponsors/northroad.png",
    name: "North Road",
  },
];

const Organisers = () => {
  const [introMddText, setIntroMddText] = useState("");

  // Fetch Organisers preamble
  useEffect(() => {
    fetch(OrganisersIntroMD)
      .then((res) => res.text())
      .then((text) => setIntroMddText(text));
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
        <section className="mx-auto mt-8 prose-sm max-w-none">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {organisers.map((organiser) => (
              <div
                key={organiser.name}
                className="p-4 bg-white rounded-lg shadow-md"
              >
                <div className="flex items-center justify-center">
                  {organiser.image ? (
                    <img
                      src={organiser.image}
                      alt={organiser.name}
                      className="w-48 h-48 rounded-full object-cover m-0"
                    />
                  ) : (
                    <div className="w-48 h-48 rounded-full bg-gray-200"></div>
                  )}
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-bold">{organiser.name}</h3>
                  <p className="text-sm text-gray-600">{organiser.role}</p>
                  <Markdown
                    options={{
                      overrides: markdownCommonStyles,
                    }}
                    children={organiser.description}
                  />
                  {organiser.links && (
                    <div className="mt-4 flex gap-2 flex-col">
                      {organiser.links.map((link) => (
                        <a
                          key={link.name}
                          href={link.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {link.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="mx-auto mt-8 prose-base max-w-none">
          <SponsorshipLevel
            title="Supporting Organisations"
            description="We would like to extend our thanks to these companies for supporting their employees who have been involved in the planning of this conference."
            cards={supportingOrganisations}
          />
        </section>
      </div>
    </>
  );
};

export default Organisers;
