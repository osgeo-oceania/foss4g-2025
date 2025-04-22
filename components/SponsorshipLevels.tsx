import SponsorshipLevel from "./SponsorshipLevel";
import GeoCatLogo from "../public/imgs/sponsors/geocat.png";
import AutLogo from "../public/imgs/sponsors/aut.png";
import OsgeoOceaniaLogo from "../public/imgs/sponsors/osgeo-oceania.png";
import OsgeoLogo from "../public/imgs/sponsors/osgeo.png";
import WdcLogo from "../public/imgs/sponsors/wdc.png";
import NZLogo from "../public/imgs/sponsors/newzealand-com-shared-white.png";
import QfieldCloudLogo from "../public/imgs/sponsors/qfieldcloud.png";
import Sotm2025Logo from "../public/imgs/sponsors/sotm2025.png";

import SparkGeoLogo from "../public/imgs/sponsors/sparkgeo.png";

const SponsorshipLevels = () => {
  return (
    <>
      {/* <SponsorshipLevel
            title="Platinum Sponsors"
            cards={[
              {
                link: "https://example.com/",
                image: SomeLogo,
                name: "Some Company",
              },
            ]}
          /> */}
      <SponsorshipLevel
        title="Gold Sponsors"
        cards={[
          {
            link: "https://www.geocat.net/",
            image: GeoCatLogo,
            name: "GeoCat",
          },
          {
            link: "https://www.newzealand.com/int/",
            image: NZLogo,
            name: "Tourism New Zealand",
          },
        ]}
      />
      <SponsorshipLevel
        title="Silver Sponsors"
        cards={[
          {
            link: "https://qfield.cloud/",
            image: QfieldCloudLogo,
            name: "QfieldCloud",
          },
          {
            link: "https://sparkgeo.com/",
            image: SparkGeoLogo,
            name: "SparkGeo",
          },
        ]}
      />
      {/* <SponsorshipLevel
            title="Bronze Sponsors"
            cards={[
              {
                link: "https://example.com/",
                image: SomeLogo,
                name: "Some Company",
              },
            ]}
          /> */}
      <SponsorshipLevel
        title="Childcare Programme Sponsors"
        cards={[
          {
            link: "https://sparkgeo.com/",
            image: SparkGeoLogo,
            name: "SparkGeo",
          },
        ]}
      />
      <SponsorshipLevel
        title="Venue Sponsors"
        cards={[
          {
            link: "https://www.aut.ac.nz/study/study-options/architecture-and-built-environment",
            image: AutLogo,
            name: "AUT School of Future Environments",
          },
        ]}
      />
      {/* <SponsorshipLevel
            title="Event Sponsors"
            cards={[
              {
                link: "https://example.com/",
                image: SomeLogo,
                name: "Some Company",
              },
            ]}
          /> */}
      <SponsorshipLevel
        title="Conference Partners"
        cards={[
          {
            link: "https://osgeo-oceania.org/",
            image: OsgeoOceaniaLogo,
            name: "OSGeo Oceania",
          },
          {
            link: "https://osgeo.org/",
            image: OsgeoLogo,
            name: "OSGeo Oceania",
          },
          {
            link: "https://geospatial.whanganui.govt.nz/",
            image: WdcLogo,
            name: "Whanganui District Council",
          },
        ]}
      />
      <SponsorshipLevel
        title="Supporters"
        cards={[
          {
            link: "https://2025.stateofthemap.org/",
            image: Sotm2025Logo,
            name: "State of the Map 2025 confernece, Manila, Philippines",
          },
        ]}
      />

    </>
  );
};
export default SponsorshipLevels;
