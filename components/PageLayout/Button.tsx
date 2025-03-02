import Link from "next/link";
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
        "not-prose px-6 py-2 font-medium tracking-wide text-slate-50 transition-colors duration-300 transform bg-secondary-base rounded-lg hover:bg-secondary-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 " +
        (className ?? "")
      }
    >
      <Link href={target ?? ""} target={"_blank"} rel="noreferrer">
        {children}
      </Link>
    </button>
  );
};

export default Button;
