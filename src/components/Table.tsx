import React from "react";

type TableProps = {
  children: React.ReactNode;
};

const Table: React.FC<TableProps> = ({ children }) => {
  return (
    <div
      className="flex flex-col mt-6 not-prose w-screen left-0 md:px-6 px-3 overflow-x-auto "
      style={{ marginLeft: "calc((-100vw + 100%)/2)" }}
    >
      <div className="m-auto max-w-7xl w-fit overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg">
        <table className="divide-y divide-gray-700">{children}</table>
      </div>
    </div>
  );
};

export default Table;
