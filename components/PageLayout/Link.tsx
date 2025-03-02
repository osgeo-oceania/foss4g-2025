import React from "react";
import { default as NextLink } from "next/link";

type LinkProps = {
  children: React.ReactNode;
  href?: string;
  className?: string;
};

const Link: React.FC<LinkProps> = ({ children, href, className }) => {
  return (
    <NextLink
      className={"text-blue-500 underline " + (className ?? "")}
      href={href ?? "#"}
      target={
        !href?.startsWith("/#") && !href?.startsWith("#") ? "_blank" : undefined
      }
      onClick={(e) => {
        if (href?.startsWith("#")) {
          const element = document.querySelector(href);
          if (element) {
            // scroll to top of element with 100px offset
            window.scrollTo({
              top: element.getBoundingClientRect().top + window.scrollY - 100,
              behavior: "smooth",
            });
          }
          e.preventDefault();
        }
      }}
      rel="noreferrer"
    >
      {children}
    </NextLink>
  );
};

export default Link;
