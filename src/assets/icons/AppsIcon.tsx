import React from "react";
import { FaBalanceScale } from "react-icons/fa";

interface Props {}

const AppsIcon = (props: Props) => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="50"
        height="50"
      >
        <defs>
          <pattern
            id="circle"
            patternUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="16.666"
            height="16.666"
          >
            <circle fill="#ffffff88" cx="9.375" cy="9.375" r="5" />
          </pattern>
        </defs>
        <rect fill="url(#circle)" x="0" y="0" width="50" height="50" />
      </svg>
    </div>
  );
};

export default AppsIcon;
