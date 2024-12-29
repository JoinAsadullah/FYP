import React, { useState } from "react";
import copy from 'clipboard-copy'

interface CopyIconProps {
  text: String;
}

export default function CopyIcon ({ text }: CopyIconProps){
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {

      e.stopPropagation();
      copy(e.currentTarget.textContent?.replaceAll(" ", "") || '');
    setIsCopied(true);
  };

  return (

    <button onClick={handleClick} title={isCopied ? "Copied!" : "Copy"}>
      {isCopied ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 8.25v-3a2.25 2.25 0 00-2.25-2.25h-6A2.25 2.25 0 005.25 5.25v12A2.25 2.25 0 007.5 19.5h6a2.25 2.25 0 002.25-2.25v-3M15.75 8.25H18a2.25 2.25 0 012.25 2.25v6a2.25 2.25 0 01-2.25 2.25h-2.25M15.75 8.25v7.5"
          />
        </svg>
      )}
    </button>
  );
};

