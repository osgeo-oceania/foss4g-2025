import { RootMenuItem } from "../components/TopMenu";
import NoPage from "./_error";
export default NoPage;

export const MENU: RootMenuItem[] = [
  {
    text: "Logo Competition",
    href: "/logo-competition",
  },
  {
    text: "Attend",
    href: "/attend/register",
    items: [
      {
        text: "Register",
        href: "/attend/register",
      },
      {
        text: "Call for Papers",
        href: "/attend/call-for-papers",
      },
      {
        text: "Travel Grant Program",
        href: "/attend/travel-grant-program",
      },
      {
        text: "Conference Venue",
        href: "/attend/conference-venue",
      },
      {
        text: "Travel Guide",
        href: "/attend/nz-travel-guide",
      },
      {
        text: "Adventure Guide",
        href: "/attend/nz-adventures",
      },
      {
        text: "Terms and Conditions",
        href: "/attend/terms-and-conditions",
      },
      {
        text: "Code of Conduct",
        href: "/attend/code-of-conduct",
      },
      {
        text: "Privacy Policy",
        href: "/attend/privacy-policy",
      },
    ],
  },
  {
    text: "Program",
    href: "/program/outline",
    items: [
      {
        text: "Outline",
        href: "/program/outline",
      },
    ],
  },
  {
    text: "Sponsorship",
    href: "/sponsorship",
  },
];
