import Link from "next/link";
import React from "react";
import cx from "classnames";

type ButtonProps = {
  children: React.ReactNode;
  target?: string;
  className?: string;
  center?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  target,
  className,
  center,
}) => {
  return (
    <button
      className={cx(
        "not-prose px-6 py-2 font-medium tracking-wide text-slate-50 transition-colors duration-300 transform bg-secondary-base rounded-lg hover:bg-secondary-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80",
        className,
        center && "block mx-auto"
      )}
    >
      <Link href={target ?? ""} target={"_blank"} rel="noreferrer">
        {children}
      </Link>
    </button>
  );
};

export default Button;
