import React, { useEffect, useState } from "react";
import Checkbox from "../../../../UI/Checkbox";
import AutoToggleFocus from "./AutoToggleFocus";
import BlockSites from "./BlockSites";

interface Props {}

const FocusSetting = (props: Props) => {
  const [focusSettingEnabled, setfocusSettingEnabled] = useState(true);

  const focusSettingClickHandler = (checked: boolean) => {
    chrome.storage.sync.set({ focusSetting: checked });
  };

  
  useEffect(() => {
    chrome.storage.sync.get(["focusSetting"], (storage) => {
      setfocusSettingEnabled(storage.focusSetting);
    });
  }, [setfocusSettingEnabled]);

  return (
    <div>
      <section className="text-center w-full">
        <Checkbox
          enabled={focusSettingEnabled}
          onClick={(checked) => focusSettingClickHandler(checked)}
        />
      </section>
      <section className="w-full flex justify-between">
        <BlockSites />
        <AutoToggleFocus />
      </section>
    </div>
  );
};

export default FocusSetting;
