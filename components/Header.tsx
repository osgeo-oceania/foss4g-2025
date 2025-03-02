import Link from "next/link";
import { useState } from "react";
import { MENU } from "../pages/_menu";
import { HeaderLogo } from "./HeaderLogo";
import PopupMenu from "./PopupMenu";
import TopMenu from "./TopMenu";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="shadow-sm bg-slate-800 text-slate-50 sticky top-0 z-40 flex-none w-full mx-auto">
      <nav className="container relative flex px-6 py-1 mx-auto h-16">
        <Link href="/" className="flex items-center justify-start">
          <div>
            <HeaderLogo />

            <p className="hidden">FOSS4G 2025</p>
          </div>
        </Link>
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

          <TopMenu menuItems={MENU} className="hidden md:flex" />
          {menuOpen && (
            <PopupMenu
              menuItems={MENU}
              className="flex md:hidden"
              setOpen={setMenuOpen}
            />
          )}
        </div>
      </nav>
    </header>
  );
};
export default Header;
