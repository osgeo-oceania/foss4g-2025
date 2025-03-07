import {
  faFacebook,
  faLinkedin,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import AcknowledgeMd from "../content/acknowledgement-country.md";

const Footer = () => {
  return (
    <div>
      <section className="bg-primary-800 text-sm text-primary-100">
        <div className="container mx-auto px-4 py-8 text-italic text-center prose-sm">
          <AcknowledgeMd />
        </div>
      </section>
      <footer className="bg-primary-500">
        <div className="container p-6 mx-auto">
          <div className="lg:flex">
            <div className="w-full -mx-6 lg:w-2/5">
              <div className="px-6">
                {/* <Link href="/">
                <img
                  className="w-auto h-24"
                  src="/imgs/FOSS4G-2024-Logo-White.png "
                  alt=""
                />
              </Link> */}
                <p className="max-w-sm mt-2 text-primary-50">
                  Join us as we discover what's new in FOSS4G!
                </p>
                <div className="flex mt-6 -mx-2">
                  <Link
                    href="https://x.com/foss4g"
                    target="_blank"
                    rel="noreferrer"
                    className="mx-2 transition-colors duration-300 text-primary-100 hover:text-primary-800"
                    aria-label="Twitter"
                  >
                    <FontAwesomeIcon icon={faTwitter} />
                  </Link>
                  <Link
                    href="https://www.youtube.com/c/FOSS4G"
                    target="_blank"
                    rel="noreferrer"
                    className="mx-2 transition-colors duration-300 text-primary-100 hover:text-primary-800"
                    aria-label="YouTube"
                  >
                    <FontAwesomeIcon icon={faYoutube} />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/company/foss4g2025/"
                    target="_blank"
                    rel="noreferrer"
                    className="mx-2 transition-colors duration-300 text-primary-100 hover:text-primary-800"
                    aria-label="LinkedIn"
                  >
                    <FontAwesomeIcon icon={faLinkedin} />
                  </Link>
                  <Link
                    href="https://www.facebook.com/foss4g2025"
                    target="_blank"
                    rel="noreferrer"
                    className="mx-2 transition-colors duration-300 text-primary-100 hover:text-primary-800"
                    aria-label="Facebook"
                  >
                    <FontAwesomeIcon icon={faFacebook} />
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-6 lg:mt-0 lg:flex-1">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <div>
                  <h3 className="uppercase text-slate-50">About</h3>
                  <Link
                    href="https://www.osgeo.org/"
                    target="_blank"
                    rel="noreferrer"
                    className="block mt-2 text-sm text-primary-50 hover:underline"
                  >
                    Open Source Geospatial Foundation (OSGeo)
                  </Link>
                  <Link
                    href="https://osgeo-oceania.org/"
                    target="_blank"
                    rel="noreferrer"
                    className="block mt-2 text-sm text-primary-50 hover:underline"
                  >
                    OSGeo Oceania
                  </Link>
                </div>
                <div>
                  <h3 className="uppercase text-slate-50">
                    Related Conferences
                  </h3>
                  <Link
                    href="https://pgrsc.org/"
                    target="_blank"
                    rel="noreferrer"
                    className="block mt-2 text-sm text-primary-50 hover:underline"
                  >
                    Pacific GIS and Remote Sensing User Conference
                  </Link>
                </div>
                <div>
                  <h3 className="uppercase text-slate-50">Event Resources</h3>
                  <Link
                    href="/attend/code-of-conduct"
                    className="block mt-2 text-sm text-primary-50 hover:underline"
                  >
                    Code of Conduct
                  </Link>
                  <Link
                    href="/attend/terms-and-conditions"
                    className="block mt-2 text-sm text-primary-50 hover:underline"
                  >
                    Terms and Conditions
                  </Link>
                  <Link
                    href="/attend/privacy-policy"
                    className="block mt-2 text-sm text-primary-50 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </div>
                <div>
                  <h3 className="uppercase text-slate-50">Contact</h3>
                  <Link
                    href="https://mailchi.mp/foss4g/mailing-list"
                    className="block mt-2 text-sm text-primary-50 hover:underline"
                  >
                    Join our Mailing List
                  </Link>
                  <Link
                    href="mailto:chair@foss4g.org"
                    className="block mt-2 text-sm text-primary-50 hover:underline"
                  >
                    chair@foss4g.org
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <hr className="h-px my-6 border-none bg-primary-600" />
          <div>
            <p className="text-center text-primary-50">
              © FOSS4G - All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Footer;
