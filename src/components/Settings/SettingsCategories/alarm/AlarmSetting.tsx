import React, { useState, useEffect } from "react";
import Checkbox from "../../../UI/Checkbox";

interface Props {}

const AlarmSetting = (props: Props) => {
  const [alarmEnabled, setAlarmEnabled] = useState(true);
  useEffect(() => {
    chrome.storage.sync.get(["alarmSetting"], (storage) => {
        setAlarmEnabled(storage.alarmSetting);
    });
  }, []);

  return (
    <div className="text-center">
      <Checkbox
        enabled={alarmEnabled}
        onClick={(checked: boolean) => {
          chrome.storage.sync.set({ alarmSetting: checked });
          setAlarmEnabled(checked);
        }}
      />
    </div>
  );
};

export default AlarmSetting;
