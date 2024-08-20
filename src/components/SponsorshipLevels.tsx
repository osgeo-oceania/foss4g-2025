import SponsorshipLevel from "./SponsorshipLevel";
const SponsorshipLevels = () => {
  return (
    <>
      <section className="container px-6 py-8 mx-auto lg:py-16">
        <div className="container">
          <h1 className="text-xl font-medium text-gray-800 md:text-2xl lg:text-3xl mb-10">
            Our sponsors and partners
          </h1>

          {/* <SponsorshipLevel
            title="Platinum Sponsors"
            cards={[
              {
                link: "https://www.meta.com/au/",
                imgSrc: "./imgs/sponsorship-levels/platinum/platinum_meta_logo.png",
              },
            ]}
          /> */}
          {/* <SponsorshipLevel
            title="Gold Sponsors"
            cards={[
              {
                link: "https://www.linz.govt.nz/",
                imgSrc: "./imgs/sponsorship-levels/platinum/linz.png",
              },
              {
                link: "https://www.linz.govt.nz/",
                imgSrc: "./imgs/sponsorship-levels/platinum/linz.png",
              },
            ]}
          /> */}
          <SponsorshipLevel
            title="Silver Sponsors"
            cards={[
              {
                link: "https://mra.gov.pg/",
                imgSrc: "./imgs/sponsors/mra.jpeg",
              },
            ]}
          />
          <SponsorshipLevel
            title="Bronze Sponsors"
            cards={[
              {
                link: "https://north-road.com/",
                imgSrc: "./imgs/sponsors/northroad.png",
              },
              {
                link: "https://auspatious.com/",
                imgSrc: "./imgs/sponsors/auspatious.png",
              },
              {
                link: "https://www.tomtom.com/",
                imgSrc: "./imgs/sponsors/tomtom.png",
              },
              {
                link: "https://www.openwork.nz/",
                imgSrc: "./imgs/sponsors/openwork.png",
              },
            ]}
          />
          <SponsorshipLevel
            title="Venue Sponsors"
            cards={[
              {
                link: "https://www.utas.edu.au/",
                imgSrc: "./imgs/sponsors/utas.svg",
              },
              {
                link: "https://c3conventioncentre.com.au/",
                imgSrc: "./imgs/sponsors/c3.png",
              },
            ]}
          />
        </div>
      </section>
    </>
  );
};
export default SponsorshipLevels;
