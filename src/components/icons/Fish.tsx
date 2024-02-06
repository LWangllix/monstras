import React from "react";

export const Fish = ({
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
        id="Group_3887"
        data-name="Group 3887"
        transform="translate(-4744 20334)"
      >
        <g
          id="Group_873"
          data-name="Group 873"
          transform="translate(4745 -20314.947) rotate(-79)"
        >
          <path
            id="Path_444"
            data-name="Path 444"
            d="M3.533,3.554A21.859,21.859,0,0,0,3.017.85C2.907.591,2.931.154,2.724,0,1.821.405.891.71,0,1.135a8.644,8.644,0,0,1,3.33,5.33A7.877,7.877,0,0,0,3.533,3.554Z"
            transform="translate(13.801 0.394)"
            fill={fill || "#7a7e9f"}
          />
          <path
            id="Path_445"
            data-name="Path 445"
            d="M1.718.112C1.938-.133.252.109,0,.048.847,1.329.793,1.09,1.718.112Z"
            transform="translate(9.637 9.36)"
            fill={fill || "#7a7e9f"}
          />
          <path
            id="Path_446"
            data-name="Path 446"
            d="M17.008,17.938c-.083-1.228-1.005-2.086-1.556-3.112-.68-1.56.857-3.175,1.138-4.535A8.438,8.438,0,0,0,10.851.457C7.225-.7,3.049.465,0,2.579,1.768,5.367,4.533,8.233,7.822,8.966c1.463-1.449,1.35-3.9.358-5.566.325-.123.968.436,1.181.809a6.95,6.95,0,0,1,1.594.127,5.792,5.792,0,0,1,4.5,4.712c-.89-2.142-3.325-4.476-5.733-3.628A4.338,4.338,0,0,1,8.836,9.2c1.475,0,3.089-.362,4.447.385,1.31.835,2.379,2.744,1.461,4.182-.8,1.426-4.094,1.495-3.609,3.5.628-.21,1.38-.325,2.036-.572.345-.012,1.05-.635,1.172-.187C14.587,17.455,17.433,20.636,17.008,17.938ZM5.061,3.916A1.042,1.042,0,0,1,4.043,2.872a1.022,1.022,0,0,1,1.468-.915A1.046,1.046,0,0,1,5.061,3.916Z"
            transform="translate(0 0)"
            fill={fill || "#7a7e9f"}
          />
        </g>
        <g
          id="Group_3883"
          data-name="Group 3883"
          transform="translate(4744 -20334)"
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

export default Fish;
