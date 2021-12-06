import React, { useState, useEffect } from "react";
import ChosenImages from "./ChosenImages";
import PredefinedImages from "./PredefinedImages";

const BackgroundSetting = () => {

  //* "I have no idea how this works, but it does."

  const [checkboxes, setCheckboxes] = useState(false);

  const checkboxClickHandler = (checked: boolean) => {
        setCheckboxes(checked)
        chrome.storage.sync.set({backgroundSetting: checked})
  };

  useEffect(() => {
    chrome.storage.sync.get(["backgroundSetting"], (storage) => {
      setCheckboxes(storage.backgroundSetting);
    });
  }, []);

  return (
    <>
      <main className="flex justify-between">
        <PredefinedImages
          enabled={checkboxes}
          onClick={(checked: boolean) => checkboxClickHandler(checked)}
        />
        <ChosenImages
          enabled={!checkboxes}
          onClick={(checked: boolean) => checkboxClickHandler(!checked)}
        />
      </main>
    </>
  );
};

export default BackgroundSetting;
