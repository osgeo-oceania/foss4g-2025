import Link from "next/link";
import React, { useState } from "react";

interface MenuItem {
  href: string;
  text: string;
}

export interface RootMenuItem extends MenuItem {
  href: string;
  text: string;
  items?: MenuItem[];
}

type RootMenuItems = RootMenuItem[];

const TopMenu = ({
  menuItems,
  className,
}: {
  menuItems: RootMenuItems;
  className: string;
}) => {
  const [hoverMenuItem, setHoverMenuItem] = useState<false | string>(false);

  return (
    <div className={"flex flex-col gap-4 lg:gap-8 md:flex-row " + className}>
      {menuItems.map((menuItem, index) => {
        const hasItems = menuItem.items && menuItem.items.length > 0;
        return (
          <React.Fragment key={index}>
            <div
              onMouseEnter={() => hasItems && setHoverMenuItem(menuItem.text)}
              onMouseLeave={() => hasItems && setHoverMenuItem(false)}
              className="relative"
            >
              <Link
                href={menuItem.href}
                className="hidden md:block font-semibold text-sky transition-colors duration-300 text-xs lg:text-sm xl:text-base hover:text-secondary-base text-center min-w-full uppercase"
              >
                {menuItem.text}
                {hasItems && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 inline ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M6 8l4 4 4-4H6z" />
                  </svg>
                )}
              </Link>
              {hasItems && (
                <>
                  <div className="hidden md:block">
                    <div
                      style={{
                        display:
                          menuItem.text === hoverMenuItem ? "block" : "none",
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                      className="absolute bg-primary-600 rounded-md shadow-lg min-w-full w-fit text-center text-sm pt-4 pb-1 hidden md:inline-block z-50"
                    >
                      {menuItem.items?.map((subMenuItem, subIndex) => (
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
                </>
              )}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};
export default TopMenu;
