import SponsorshipLevel from "./SponsorshipLevel";
const SponsorshipLevels = () => {
  return (
    <>
      <section className="container px-6 py-8 mx-auto lg:py-16">
        <div className="container">
          <h1 className="text-xl font-medium text-gray-800 md:text-2xl lg:text-3xl mb-10">
            Our sponsors and partners
          </h1>

          <SponsorshipLevel
            title="Platinum Sponsors"
            cards={[
              {
                link: "https://www.ga.gov.au/",
                imgSrc: "./imgs/sponsors/geoscience_stacked.png",
                name: "Geoscience Australia",
              },
            ]}
          />
          <SponsorshipLevel
            title="Gold Sponsors"
            cards={[
              {
                link: "https://mra.gov.pg/",
                imgSrc: "./imgs/sponsors/mra.jpeg",
                name: "Mineral Resources Authority of Papua New Guinea",
              },
            ]}
          />
          <SponsorshipLevel
            title="Silver Sponsors"
            cards={[
              {
                link: "https://www.terria.io/",
                imgSrc: "./imgs/sponsors/terria-logo.png",
                name: "Terria",
                description: `Terria's mission is to organise and connect the world’s spatial data, making it accessible and useful for everyone. We’re pioneering spatial digital twins—digital replicas of natural and built environments—to address complex challenges like understanding the impact of rising sea levels on coastal cities and planning resilient infrastructure. While digital twins are often costly and complicated, Terria is changing that by making them accessible, powerful, and easy to use. We empower researchers, government leaders, industry experts and open-source developers to leverage spatial data and digital twins for smarter solutions, from building resilient communities to advancing sustainable food and energy systems.\n\nGo to [terria.io](https://www.terria.io/) to learn more!`,
              },
            ]}
          />
          <SponsorshipLevel
            title="Bronze Sponsors"
            cards={[
              {
                link: "https://north-road.com/",
                imgSrc: "./imgs/sponsors/northroad.png",
                name: "North Road",
              },
              {
                link: "https://auspatious.com/",
                imgSrc: "./imgs/sponsors/auspatious.png",
                name: "Auspatious",
              },
              {
                link: "https://www.tomtom.com/",
                imgSrc: "./imgs/sponsors/tomtom.png",
                name: "TomTom",
              },
              {
                link: "https://www.openwork.nz/",
                imgSrc: "./imgs/sponsors/openwork.png",
                name: "OpenWork",
              },
              {
                link: "https://pozi.com/",
                imgSrc: "./imgs/sponsors/pozi.png",
                name: "Pozi",
              },
              {
                link: "https://nre.tas.gov.au/",
                imgSrc: "./imgs/sponsors/tas_gov.jpg",
                name: "Tasmanian Government",
              },
            ]}
          />
          <SponsorshipLevel
            title="Venue Sponsors"
            cards={[
              {
                link: "https://www.utas.edu.au/",
                imgSrc: "./imgs/sponsors/utas.svg",
                name: "University of Tasmania",
              },
              {
                link: "https://c3conventioncentre.com.au/",
                imgSrc: "./imgs/sponsors/c3.png",
                name: "C3 Convention Centre",
              },
            ]}
          />
        </div>
      </section>
    </>
  );
};
export default SponsorshipLevels;
