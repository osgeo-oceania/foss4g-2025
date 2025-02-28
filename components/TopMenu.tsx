import Link from "next/link";
import React, { useState } from "react";

interface MenuItem {
  href: string;
  text: string;
}

interface RootMenuItem extends MenuItem {
  href: string;
  text: string;
  items: MenuItem[];
}

type RootMenuItems = RootMenuItem[];

const TopMenu = ({ menuItems }: { menuItems: RootMenuItems }) => {
  const [hoverMenuItem, setHoverMenuItem] = useState<false | string>(false);

  const renderedMenuItems = menuItems.map((menuItem, index) => (
    <React.Fragment key={index}>
      {/* Desktop menu - top level item (no sub items) */}
      {menuItem.items.length === 0 && (
        <Link
          href={menuItem.href}
          className="font-semibold block text-sky transition-colors duration-300 md:px-2 lg:px-6 text-sm lg:text-base hover:text-secondary-base text-center uppercase"
        >
          {menuItem.text}
        </Link>
      )}
      {menuItem.items.length > 0 && (
        <div
          onMouseEnter={() => setHoverMenuItem(menuItem.text)}
          onMouseLeave={() => setHoverMenuItem(false)}
          className="relative"
        >
          {/* Desktop menu - top level item (with sub items) */}
          <Link
            href={menuItem.href}
            className="hidden md:block font-semibold text-sky transition-colors duration-300 md:px-2 lg:px-6 text-sm lg:text-base hover:text-secondary-base text-center min-w-full uppercase"
          >
            {menuItem.text}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 inline ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M6 8l4 4 4-4H6z" />
            </svg>
          </Link>
          {/* Mobile menu - top level item
              Note: we disable top-level links on mobile
          */}
          <button className="block md:hidden font-semibold text-sky transition-colors duration-300 md:px-4 lg:px-6 hover:text-secondary-base text-center min-w-full">
            {menuItem.text}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 inline ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M6 8l4 4 4-4H6z" />
            </svg>
          </button>
          {/* Desktop menu - sub items */}
          <div className="hidden md:block">
            <div
              style={{
                display: menuItem.text === hoverMenuItem ? "block" : "none",
                left: "50%",
                transform: "translateX(-50%)",
              }}
              className="absolute bg-primary-600 rounded-md shadow-lg min-w-full w-fit text-center pt-4 pb-1 hidden md:inline-block z-50"
            >
              {menuItem.items.map((subMenuItem, subIndex) => (
                <Link
                  key={subIndex}
                  href={subMenuItem.href}
                  className="block px-4 py-2 hover:text-secondary-base whitespace-nowrap capitalize"
                >
                  {subMenuItem.text}
                </Link>
              ))}
            </div>
          </div>
          {/* Mobile menu - sub items */}
          <div className="block md:hidden">
            <div
              style={{
                display: menuItem.text === hoverMenuItem ? "block" : "none",
              }}
            >
              {menuItem.items.map((subMenuItem, subIndex) => (
                <Link
                  key={subIndex}
                  href={subMenuItem.href}
                  className="block px-4 py-2 text-sky hover:bg-blue-900 text-center capitalize"
                >
                  {subMenuItem.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  ));

  return <>{renderedMenuItems}</>;
};
export default TopMenu;
