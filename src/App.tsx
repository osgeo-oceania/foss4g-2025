import { HashRouter, Route, Routes } from "react-router-dom";
import AccommodationMD from "./documents/attend/accommodation.md";
import AdventuresMD from "./documents/attend/adventures.md";
import OurConferenceVenueMD from "./documents/attend/our-conference-venue.md";
import RegisterMD from "./documents/attend/register.md";
import TravelGrantProgramMD from "./documents/attend/travel-grant-program.md";
import CallForPapersMD from "./documents/call-for-papers.md";
import CodeOfConduct from "./documents/code-of-conduct.md";
import CommunityDayMD from "./documents/community-day.md";
import GetInvolvedMD from "./documents/get-involved.md";
import ScheduleMd from "./documents/schedule-placeholder.md";
// import LogoCompetitionMD from "./documents/logo-competition.md";
import OrganisersMD from "./documents/organisers.md";
import PresentMD from "./documents/present.md";
import ProductShowcaseMD from "./documents/product-showcase.md";
import ProgramOutlineMD from "./documents/program-outline.md";
import SponsorshipMD from "./documents/sponsorship.md";
import WorkshopsMD from "./documents/workshops.md";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import { MailingList } from "./pages/MailingList";
import { MarkdownPage } from "./pages/MarkdownPage";
import NoPage from "./pages/NoPage";
import ProgramMD from "./pages/Program";
import SocialEvents from "./pages/SocialEvents";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="code-of-conduct"
            element={
              <MarkdownPage
                markdownUrl={CodeOfConduct}
                headerImg={{ url: "/imgs/office_with_paper_work.png" }}
              />
            }
          />
          <Route
            path="call-for-papers"
            element={
              <MarkdownPage
                markdownUrl={CallForPapersMD}
                headerImg={{
                  url: "/imgs/present-header.jpg",
                  positionY: "30%",
                }}
              />
            }
          />
          <Route
            path="program/schedule"
            element={
              <MarkdownPage
                markdownUrl={ScheduleMd}
                headerImg={{
                  url: "/imgs/present-header.jpg",
                  positionY: "30%",
                }}
              />
            }
          />
          {/* <Route
            path="logo-competition"
            element={
              <MarkdownPage
                markdownUrl={LogoCompetitionMD}
                headerImg={{
                  url: "/imgs/Logo_design_sketching.jpg",
                  positionY: "60%",
                }}
              />
            }
          /> */}
          <Route
            path="attend/present"
            element={
              <MarkdownPage
                markdownUrl={PresentMD}
                headerImg={{ url: "/imgs/group photo.jpeg", positionY: "40%" }}
              />
            }
          />
          <Route
            path="attend/travel-grant-program"
            element={
              <MarkdownPage
                markdownUrl={TravelGrantProgramMD}
                headerImg={{ url: "/imgs/group photo.jpeg", positionY: "40%" }}
              />
            }
          />
          <Route
            path="attend/our-conference-venue"
            element={
              <MarkdownPage
                markdownUrl={OurConferenceVenueMD}
                headerImg={{ url: "/imgs/group photo.jpeg", positionY: "40%" }}
              />
            }
          />
          <Route
            path="attend/accommodation"
            element={
              <MarkdownPage
                markdownUrl={AccommodationMD}
                headerImg={{ url: "/imgs/group photo.jpeg", positionY: "40%" }}
              />
            }
          />
          <Route
            path="attend/adventures"
            element={
              <MarkdownPage
                markdownUrl={AdventuresMD}
                headerImg={{
                  url: "/imgs/sunset.jpeg",
                  positionY: "20%",
                }}
              />
            }
          />
          <Route
            path="attend"
            element={
              <MarkdownPage
                markdownUrl={RegisterMD}
                headerImg={{
                  url: "/imgs/group photo.jpeg",
                  positionY: "40%",
                  height: "20rem",
                }}
              />
            }
          />
          <Route path="program" element={<ProgramMD />} />
          <Route
            path="program/outline"
            element={
              <MarkdownPage
                markdownUrl={ProgramOutlineMD}
                headerImg={{
                  url: "/imgs/workshop-lunch.jpg",
                  positionY: "40%",
                }}
              />
            }
          />
          <Route path="program/social-events" element={<SocialEvents />} />
          <Route
            path="program/workshops"
            element={
              <MarkdownPage
                markdownUrl={WorkshopsMD}
                headerImg={{
                  url: "/imgs/workshop_crop_01.png",
                  positionY: "0px",
                }}
              />
            }
          />
          <Route
            path="program/get-involved"
            element={
              <MarkdownPage
                markdownUrl={GetInvolvedMD}
                headerImg={{
                  url: "/imgs/workshop_crop_01.png",
                  positionY: "0px",
                }}
              />
            }
          />
          <Route
            path="program/community-day"
            element={
              <MarkdownPage
                markdownUrl={CommunityDayMD}
                headerImg={{
                  url: "/imgs/present_crop_01.png",
                  positionY: "0px",
                }}
              />
            }
          />
          <Route
            path="program/product-showcase"
            element={
              <MarkdownPage
                markdownUrl={ProductShowcaseMD}
                headerImg={{
                  url: "/imgs/present_crop_01.png",
                  positionY: "0px",
                }}
              />
            }
          />
          <Route
            path="sponsorship"
            element={
              <MarkdownPage
                markdownUrl={SponsorshipMD}
                headerImg={{
                  url: "/imgs/sponsor-header.jpeg",
                  positionY: "50%",
                }}
              />
            }
          />
          <Route
            path="organisers"
            element={
              <MarkdownPage
                markdownUrl={OrganisersMD}
                headerImg={{
                  url: "/imgs/auck_build_3D.jpeg",
                  positionY: "0px",
                }}
              />
            }
          />

          <Route path="mailing-list" element={<MailingList />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
