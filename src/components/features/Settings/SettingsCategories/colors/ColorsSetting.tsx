import React, { useEffect, useState } from "react";
import Checkbox from "../../../UI/Checkbox";
interface Props {}

const ColorsSetting = (props: Props) => {
  const [colorTheme, setColorTheme] = useState("1");
  useEffect(() => {
    chrome.storage.sync.get(["colorTheme"], (storage) => {
      setColorTheme(storage.colorTheme);
    });
  }, [setColorTheme]);
  const themes = [
    ["1", "#F59E0B", "#00002b"],
    ["2", "#35005F", "#00A198"],
    ["3", "#D72A2A", "#3F0000"],
    ["4", "#BC5E00", "#3f1700"],
    ["5", "#3447F1", "#032D19"],
  ];
  const clickHandler = (enabled: boolean, theme: string) => {
    if (enabled) {
      setColorTheme(theme);
      chrome.storage.sync.set({ colorTheme: theme });
    } else {
      setColorTheme("1");
      chrome.storage.sync.set({ colorTheme: "1" });
    }
  };
  return (
    <div className="text-center">
      <h2 className="text-2xl">Choose a theme</h2>
      <div className="w-full border-b-4 border-solid border-secondary pb-4 mb-4"></div>
      <div className="flex justify-around">
        {themes.map((theme) => (
          <div className="flex flex-col">
            <h4 className="text-xl">{`Theme ${theme[0]}`}</h4>
            <div className="text-center ml-3">
              <Checkbox
                enabled={theme[0] === colorTheme}
                onClick={(enabled) => {
                  clickHandler(enabled, theme[0]);
                }}
              />
            </div>
            <div style={{backgroundColor: theme[1]}} className=" w-28 h-28 mt-4 mb-2"></div>
            <div style={{backgroundColor: theme[2]}} className="w-28 h-28"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorsSetting;
