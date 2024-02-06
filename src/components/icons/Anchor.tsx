import React from "react";

export const Anchor = ({
  fill,
  className,
}: {
  fill?: string;
  className?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}
    >
      <g
        id="Group_3888"
        data-name="Group 3888"
        transform="translate(-4739 20361)"
      >
        <path
          id="anchor"
          d="M18.994,13h-2a1,1,0,1,0,0,2h.91A6,6,0,0,1,13,19.9V11h1a1,1,0,0,0,0-2H13V7.818a3,3,0,1,0-2,0V9H10a1,1,0,0,0,0,2h1V19.9a6,6,0,0,1-4.908-4.908H7a1,1,0,1,0,0-2H5a1,1,0,0,0-1,1,8,8,0,0,0,15.993,0A1,1,0,0,0,18.994,13ZM12,6a1,1,0,1,1,1-1A1,1,0,0,1,12,6Z"
          transform="translate(4739 -20360.992)"
          fill={fill || "#7a7e9f"}
        />
        <g
          id="Group_3880"
          data-name="Group 3880"
          transform="translate(4739 -20361)"
        >
          <rect
            id="Rectangle_644"
            data-name="Rectangle 644"
            width="24"
            height="24"
            fill="none"
          />
        </g>
      </g>
    </svg>
  );
};

export default Anchor;
