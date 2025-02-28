import React from 'react';

type BlockquoteProps = {
  children: React.ReactNode;
};

const Blockquote: React.FC<BlockquoteProps> = ({ children }) => {
  return (
    <div className="flex w-full max-w-sm overflow-hidden rounded-lg shadow-md bg-gray-800">
    <div className="w-2 bg-gray-900"></div>

    <div className="flex items-center px-2 py-3">
      <div className="mx-3">
        <div className="text-gray-200">
          {children}
        </div>
      </div>
    </div>
  </div>
  );
};

export default Blockquote;
