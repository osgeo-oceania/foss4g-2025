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
            title="Platinum Sponsor"
            cards={[
              {
                link: "https://www.ga.gov.au/",
                imgSrc: "./imgs/sponsors/geoscience_stacked.png",
                name: "Geoscience Australia",
                description: `Digital Earth Australia (DEA) is a program of Geoscience Australia, Australia’s national public-sector geoscience organisation. DEA began in 2018 and exists to leverage the power and free use of satellite imagery for the benefit of all Australians.

We know collaboration is key and that the best way to collaborate is to connect with open science.   
We provide freely available Earth observation (EO) images and data at continental scale for the whole of Australia. We provide data in near real-time, as well as more the refined analysis ready data that provides incredible insight into how our environment changes through time. 

Our scientists and engineers work to create imaginative applications of the EO data supplied by our partners. Our innovative products and services are freely shared with industry, academy and community for use across Australia and even beyond our shores. 

DEA makes nearly four decades of landscape imagery and data freely available on interactive maps, to download, and to access via web tools and services. DEA users can use this data as they choose.  
Delivered through our freely available products and services, we process and provide national-scale imagery that shows Australian landscapes in unprecedented detail, revealing how our lands, waters, coasts and broader environments have changed over four decades.

We equip government, industry and communities with organised, analysis ready data and high-performance computing infrastructure, unlocking the value of satellite observations for planning, monitoring and problem solving. Across environmental management, agriculture, emergency management, government and the natural resources sector, satellite data products and services are increasing efficiency, improving productivity, and opening-up new ways of working with Australian lands and waters.  

DEA’s mission is to embed EO imagery and data into decisions that support a sustainable Australian environment, resilient society and communities, and a strong economy.

Find out more about DEA at [ga.gov.au/dea](https://www.ga.gov.au/scientific-topics/dea).`,
              },
            ]}
          />
          <SponsorshipLevel
            title="Gold Sponsor"
            cards={[
              {
                link: "https://mra.gov.pg/",
                imgSrc: "./imgs/sponsors/mra.jpeg",
                name: "Mineral Resources Authority of Papua New Guinea",
              },
              {
                link: "https://www.esri.com/en-us/home/",
                imgSrc: "./imgs/sponsors/esri.png",
                name: "Esri",
                description: `Esri, the global market leader in geographic information system (GIS) software, location intelligence, and mapping, helps leaders around the world unlock the full potential of data, and to understand and address important challenges such as climate change, disaster response, public health and education. Founded in 1969 in Redlands, California, USA, Esri software is deployed in more than 350,000 organizations globally and in over 200,000 institutions in the Americas, Asia Pacific, Europe, Africa, and the Middle East, including government agencies, nonprofits, and universities. With its pioneering commitment to geospatial information technology, Esri engineers the most innovative solutions to help solve the world’s most complex problems.  \n\nVisit us at [esri.com](http://www.esri.com/).`,
              },
            ]}
          />
          <SponsorshipLevel
            title="Silver Sponsor"
            cards={[
              {
                link: "https://www.terria.io/",
                imgSrc: "./imgs/sponsors/terria-logo.png",
                name: "Terria",
                description: `Terria's mission is to organise and connect the world’s spatial data, making it accessible and useful for everyone. We’re pioneering spatial digital twins—digital replicas of natural and built environments—to address complex challenges like understanding the impact of rising sea levels on coastal cities and planning resilient infrastructure. While digital twins are often costly and complicated, Terria is changing that by making them accessible, powerful, and easy to use. We empower researchers, government leaders, industry experts and open-source developers to leverage spatial data and digital twins for smarter solutions, from building resilient communities to advancing sustainable food and energy systems.\n\nGo to [terria.io](https://www.terria.io/) to learn more!`,
              },
              {
                link: "https://www.spc.int/",
                imgSrc: "./imgs/sponsors/spc.svg",
                name: "SPC",
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
              {
                link: "https://eskspatial.com.au",
                imgSrc: "./imgs/sponsors/esk.png",
                name: "Esk Spatial",
              },
              {
                link: "https://www.meta.com/au/",
                imgSrc: "./imgs/sponsors/meta.png",
                name: "Meta",
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
          <SponsorshipLevel
            title="Event Sponsors"
            cards={[
              {
                link: "https://north-road.com/",
                imgSrc: "./imgs/sponsors/northroad.png",
                name: "North Road",
              },
              {
                link: "https://www.novasystems.com/au",
                imgSrc: "./imgs/sponsors/nova.png",
                name: "Nova Systems",
              },
              {
                link: "https://www.esri.com/en-us/home/",
                imgSrc: "./imgs/sponsors/esri.png",
                name: "Esri",
              },
            ]}
          />
          <SponsorshipLevel
            title="Conference Partners"
            cards={[
              {
                link: "https://osgeo-oceania.org/",
                imgSrc: "./imgs/sponsors/osgeo-oceania.png",
                name: "OSGeo Oceania",
              },
              {
                link: "https://osmfoundation.org/",
                imgSrc: "./imgs/sponsors/osmf.png",
                name: "OpenStreetMap Foundation",
              },
            ]}
          />
        </div>
      </section>
    </>
  );
};
export default SponsorshipLevels;
