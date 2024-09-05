import Markdown from "markdown-to-jsx";
import { useEffect, useState } from "react";

import TopMenuMD from "../documents/top-menu.md";
import { HeaderLogo } from "./HeaderLogo";
import TopMenu from "./TopMenu";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const [mddText, setMddText] = useState("");

  // Fetch Terms of Use
  useEffect(() => {
    fetch(TopMenuMD)
      .then((res) => res.text())
      .then((text) => setMddText(text));
  }, []);

  return (
    <header className="shadow-sm bg-white sticky top-0 z-40 flex-none w-full mx-auto">
      <nav className="container relative flex px-6 py-1 mx-auto text-black h-16">
        <a href="/" className="flex items-center justify-start">
          <div>
            <HeaderLogo />

            <p className="hidden">FOSS4G SotM Oceania 2024</p>
          </div>
        </a>
        <div className="flex items-center justify-end flex-grow">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-4"
          >
            <span style={{ display: !menuOpen ? "inline" : "none" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </span>
            <span style={{ display: menuOpen ? "inline" : "none" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>
          <div
            className={`${
              menuOpen
                ? "translate-x-0 opacity-100"
                : "opacity-0 -translate-x-full"
            } absolute inset-x-0 z-30 w-full px-4 py-8 mt-4 space-y-6 transition-all duration-300 ease-in-out text-black bg-white top-10 md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:space-y-0 md:-mx-6 md:flex md:items-center md:justify-center`}
          >
            <Markdown
              options={{
                overrides: {
                  ul: {
                    component: (props) => (
                      <TopMenu {...props} setMenuOpen={setMenuOpen} />
                    ),
                  },
                },
              }}
              children={mddText}
            />
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;
