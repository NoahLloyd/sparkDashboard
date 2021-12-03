import React, { useEffect, useState } from "react";
import Checkbox from "../../../UI/Checkbox";

interface Props {}

const TopSites = (props: Props) => {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    chrome.storage.sync.get(["topSitesEnabled"], (storage) => {
      if (storage.topSitesEnabled === undefined) {
        setEnabled(true);
      } else {
        setEnabled(storage.topSitesEnabled);
      }
    });
  }, []);

  const checkboxClickHandler = (enabled: boolean) => {
    chrome.storage.sync.set({ topSitesEnabled: enabled });
  };

  return (
    <div className="w-1/2 m-4">
      <div className="flex justify-between border-b-4 border-solid border-secondary mb-4 pb-4">
        <h2 className="text-2xl text-left">
          Show the sites you visit the most
        </h2>
        <Checkbox
          enabled={enabled}
          onClick={(enabled) => checkboxClickHandler(!enabled)}
        />
        
      </div>
    </div>
  );
};

export default TopSites;
