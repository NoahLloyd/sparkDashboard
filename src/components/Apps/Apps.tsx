import React, { useState, useEffect } from "react";
import AppsIcon from "../../assets/icons/AppsIcon";

interface Props {}

const Apps = (props: Props) => {
  const [appsEnabled, setAppsEnabled] = useState(true);
  useEffect(() => {
    chrome.storage.sync.get(["appsSetting"], (storage) => {
      if (storage.appsSetting === undefined) {
        setAppsEnabled(true);
      } else {
        setAppsEnabled(storage.appsSetting);
      }
    });
  }, []);

  const openApps = () => {
    chrome.tabs.update({
      url: "chrome://apps",
    });
  };

  if (appsEnabled) {
    return (
      <div
        className="absolute z-10 top-0 right-0 cursor-pointer m-4"
        onClick={openApps}
      >
        <AppsIcon />
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Apps;
