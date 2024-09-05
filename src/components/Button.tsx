import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  target?: string;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ children, target, className }) => {
  return (
    <button
      className={
        "not-prose px-6 py-2 font-medium tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 " +
        className
      }
    >
      <a
        href={target}
        target={!target?.startsWith("/#") ? "_blank" : undefined}
        rel="noreferrer"
      >
        {children}
      </a>
    </button>
  );
};

export default Button;
