import React, { ReactElement } from "react";
import "./SettingAnimation.css";
import Backdrop from "../../../UI/Backdrop";

import BackgroundSetting from "./background/BackgroundSetting";
import AlarmSetting from "./alarm/AlarmSetting";
import LinksSetting from "./links/LinksSetting";
import CalendarSetting from "./calendar/CalendarSetting";
import TodoSetting from "./todo/TodoSetting";
import NotesSetting from "./notes/NotesSetting";
import EmailsSetting from "./email/EmailSetting";
import FocusSetting from "./focus/FocusSetting";
import GroupsSetting from "./groups/GroupsSetting";
import AppsSetting from "./Apps/AppsSetting";
import ColorsSetting from "./colors/ColorsSetting";

interface Props {
  category: string;
  children: React.ReactNode;
  onBackdropClick: () => void;
}

export default function Setting(props: Props) {
  const categoryWithFirstLetterUpper =
    props.category[0].toUpperCase() + props.category.slice(1);

  let settingContent: ReactElement;
  switch (props.category) {
    case "background":
      settingContent = <BackgroundSetting />;
      break;
    case "focus":
      settingContent = <FocusSetting />;
      break;
    case "alarm":
      settingContent = <AlarmSetting />;
      break;
    case "links":
      settingContent = <LinksSetting />;
      break;
    case "groups":
      settingContent = <GroupsSetting />;
      break;
    case "calendar":
      settingContent = <CalendarSetting />;
      break;
    case "todo":
      settingContent = <TodoSetting />;
      break;
    case "notes":
      settingContent = <NotesSetting />;
      break;
    case "email":
      settingContent = <EmailsSetting />;
      break;
    case "apps":
      settingContent = <AppsSetting />;
      break;
    case "colors":
      settingContent = <ColorsSetting />;
      break;

    default:
      settingContent = <div></div>;
      break;
  }

  return (
    <>
      <Backdrop
        index="20"
        opacity="0.4"
        color="black"
        onClick={() => props.onBackdropClick()}
      />
      <div className="setting-category-parent shadow w-2/3 h-2/3 bg-white z-30 rounded-2xl overflow-y-auto p-4">
        <h1 className="text-gray-800 text-4xl font-extrabold text-center m-3 tracking-wide">
          {categoryWithFirstLetterUpper}
        </h1>
        {settingContent}
      </div>
    </>
  );
}
