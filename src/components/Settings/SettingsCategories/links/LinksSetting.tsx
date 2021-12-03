import React, { useState, useEffect } from "react";
import Checkbox from "../../../UI/Checkbox";
import ChooseLinks from "./ChooseLinks";
import TopSites from "./TopSites";

interface Props {}

const LinksSetting = (props: Props) => {
  const [linksEnabled, setLinksEnabled] = useState(true);
  useEffect(() => {
    chrome.storage.sync.get(["linksSetting"], (storage) => {
      setLinksEnabled(storage.linksSetting);
    });
  }, []);

  return (
    <div className="text-center">
      <Checkbox
        enabled={linksEnabled}
        onClick={(checked: boolean) => {
          chrome.storage.sync.set({ linksSetting: !checked });
          setLinksEnabled(!checked);
        }}
      />
      <main className="flex justify-between">
        <ChooseLinks />
        <TopSites />
      </main>
    </div>
  );
};

export default LinksSetting;
