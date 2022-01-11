import React, { useState, useEffect } from "react";
import Checkbox from "../../../../UI/Checkbox";

interface Props {}

const AlarmSetting = (props: Props) => {
  const [alarmEnabled, setAlarmEnabled] = useState(false);
  useEffect(() => {
    chrome.storage.sync.get(["alarmSetting"], (storage) => {
        setAlarmEnabled(storage.alarmSetting);
    });
  }, [setAlarmEnabled]);

  return (
    <div className="text-center">
      <Checkbox
        enabled={alarmEnabled}
        onClick={(checked: boolean) => {
          chrome.storage.sync.set({ alarmSetting: checked });
        }}
      />
    </div>
  );
};

export default AlarmSetting;
