import React, { useEffect, useState } from "react";
import Checkbox from "../../../../UI/Checkbox";
interface Props {}

const AppsSetting = (props: Props) => {
  const [appsEnabled, setAppsEnabled] = useState(true);
  useEffect(() => {
    chrome.storage.sync.get(["appsSetting"], (storage) => {
        setAppsEnabled(storage.appsSetting);
    });
  }, []);

  return (
    <div className="text-center">
      <Checkbox
        enabled={appsEnabled}
        onClick={(checked: boolean) => {
          chrome.storage.sync.set({ appsSetting: checked });
          setAppsEnabled(checked);
        }}
      />
    </div>
  );
};

export default AppsSetting;
