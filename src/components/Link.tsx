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
      target={!href?.startsWith("/#") ? "_blank" : undefined}
      onClick={() => {
        // Scroll to top on SPA navigation
        if (href?.startsWith("/#/")) {
          window.scrollTo(0, 0);
        }
      }}
      rel="noreferrer"
    >
      {children}
    </a>
  );
};

export default Link;
