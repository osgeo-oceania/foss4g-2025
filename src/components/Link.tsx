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
      rel="noreferrer"
    >
      {children}
    </a>
  );
};

export default Link;
