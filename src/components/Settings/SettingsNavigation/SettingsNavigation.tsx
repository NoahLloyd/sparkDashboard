import React from "react";
import Backdrop from "../../UI/Backdrop";
import "./SettingsNavigation.css";
import SettingsNavigationCategory from "./SettingsNavigationCategory";

interface Props {
  onBackdropClick: () => void;
  onCategoryClick: (arg0: string) => void;
}

export default function SettingsNagiation(props: Props) {
  const categories = [
    { name: "Background", key: "background" },
    { name: "Focus mode", key: "focus" },
    { name: "Alarm", key: "alarm" },
    { name: "Quick links", key: "links" },
    { name: "Tab groups", key: "groups" },
    // { name: "Calendar", key:"calendar" },
    { name: "To-do list", key: "todo" },
    { name: "Notes", key: "notes" },
    { name: "Apps", key:"apps" },
  ];

  return (
    <>
      <Backdrop
        index="1"
        opacity="0.4"
        color="black"
        onClick={() => props.onBackdropClick()}
      />
      <table className="settings-navigation-animation relative z-10">
        <tbody className="flex flex-col justify-between p-2 bg-white rounded">
          {categories.map((category) => (
            <SettingsNavigationCategory
              key={category.key}
              onClick={() => props.onCategoryClick(category.key)}
            >
              {category.name}
            </SettingsNavigationCategory>
          ))}
        </tbody>
      </table>
    </>
  );
}
