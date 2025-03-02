import Link from "next/link";
import { useRouter } from "next/router";
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

const PopupMenu = ({
  menuItems,
  className,
  setOpen,
}: {
  menuItems: RootMenuItems;
  className: string;
  setOpen: (open: boolean) => void;
}) => {
  const router = useRouter();
  const [hoverMenuItem, setHoverMenuItem] = useState<false | string>(false);

  return (
    <div
      className={
        "flex flex-col gap-10 absolute inset-x-0 z-30 w-screen left-0 top-10 h-screen py-12 overflow-y-auto transition-all duration-300 ease-in-out bg-primary-600 " +
        className
      }
    >
      {menuItems.map((menuItem, index) => {
        const hasItems = menuItem.items && menuItem.items.length > 0;
        return (
          <React.Fragment key={index}>
            <div
              onMouseEnter={() => hasItems && setHoverMenuItem(menuItem.text)}
              onMouseLeave={() => hasItems && setHoverMenuItem(false)}
              className="relative"
            >
              {/* Mobile menu - top level item
                Note: we disable top-level links on mobile
            */}
              <button
                className="relative block font-semibold text-sky transition-colors duration-300 text-base hover:text-secondary-base text-center min-w-full uppercase"
                onClick={() => {
                  if (!hasItems) {
                    router.push(menuItem.href);
                    setOpen(false);
                  }
                }}
              >
                {menuItem.text}
                {hasItems && (
                  <div className="w-0 inline-block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 inline ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M6 8l4 4 4-4H6z" />
                    </svg>
                  </div>
                )}
              </button>
              {hasItems && menuItem.text === hoverMenuItem && (
                <div className="block">
                  {menuItem.items?.map((subMenuItem, subIndex) => (
                    <Link
                      key={subIndex}
                      href={subMenuItem.href}
                      className="block px-4 py-2 text-sky text-base text-center capitalize"
                      onClick={() => setOpen(false)}
                    >
                      {subMenuItem.text}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};
export default PopupMenu;
