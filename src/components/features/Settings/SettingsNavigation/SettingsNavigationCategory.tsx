import React from "react";

interface Props {
  onClick: () => void;
  children: React.ReactNode
}

export default function SettingsNavigationCategory(props: Props) {
  return (
    <tr>
      <td
        onClick={() => props.onClick()}
        className="text-primary border-b text-lg m-1 pb-0.5 mt-2 select-none cursor-pointer block"
      >
        {props.children}
      </td>
    </tr>
  );
}
