import React, { useEffect, useState } from "react";
import Checkbox from "../../../UI/Checkbox";
import AutoToggleFocus from "./AutoToggleFocus";
import BlockSites from "./BlockSites";

interface Props {}

const FocusSetting = (props: Props) => {
  const [showFocusEnabled, setShowFocusEnabled] = useState(true);

  const showFocusClickHandler = (checked: boolean) => {
    // Have absolutely no idea why I have to inverse the checked
    chrome.storage.sync.set({ showFocus: !checked });
  };

  useEffect(() => {
    chrome.storage.sync.get(["showFocus"], (storage) => {
      if (storage.showFocus === undefined) {
        setShowFocusEnabled(true);
      } else {
        setShowFocusEnabled(storage.showFocus);
      }
    });
  }, []);

  return (
    <div>
      <section className="text-center w-full">
        <Checkbox
          enabled={showFocusEnabled}
          onClick={(checked) => showFocusClickHandler(checked)}
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
