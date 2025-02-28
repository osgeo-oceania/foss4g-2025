import React from "react";

type LinkProps = {
  children: React.ReactNode;
  href?: string;
  className?: string;
};

const Link: React.FC<LinkProps> = ({ children, href, className }) => {
  return (
    <a
      className={"text-blue-500 underline " + (className ?? "")}
      href={href}
      target={
        !href?.startsWith("/#") && !href?.startsWith("#") ? "_blank" : undefined
      }
      onClick={(e) => {
        // Scroll to top on SPA navigation
        if (href?.startsWith("/#/")) {
          window.scrollTo(0, 0);
        } else if (href?.startsWith("#")) {
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
    </a>
  );
};

export default Link;
