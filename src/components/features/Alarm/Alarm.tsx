import React, { useState, useEffect } from "react";
import { FaStepBackward } from "react-icons/fa";
import AlarmIcon from "../../../assets/icons/AlarmIcon"
import AlarmOpen from "./AlarmOpen";

interface Props {}

const Alarm = (props: Props) => {
  const [showAlarm, setShowAlarm] = useState(false);
  const [alarmOpen, setAlarmOpen] = useState(false);

  useEffect(() => {
    chrome.storage.sync.get(["alarmSetting"], (storage) => {
      if (storage.alarmSetting === undefined) {
        setShowAlarm(true);
      } else {
        setShowAlarm(storage.alarmSetting);
      }
    });
  }, []);

  if (showAlarm) {
    return (
      <div className={"absolute bottom-0 m-4 left-12"}>
        {alarmOpen || <AlarmIcon onClick={() => setAlarmOpen(true)} />}
        {alarmOpen && <AlarmOpen onBackdropClick={() => setAlarmOpen(false)} /> }
      </div>
    );
  }
  return <div></div>;
};

export default Alarm;
