import React, { useState, useEffect } from "react";
import Backdrop from "../../UI/Backdrop";
import CurrentAlarms from "./CurrentAlarms";
import MakeAlarm from "./MakeAlarm";

interface Props {
  onBackdropClick: () => void;
}

const AlarmOpen = (props: Props) => {
  const [alarms, setAlarms] =
    useState<{ name: string; scheduledTime: number }[]>();

  useEffect(() => {
    addAlarmHandler()
  }, []);

  const removeAlarm = (identifier: string) => {
    chrome.alarms.clear(identifier);
    setAlarms(alarms?.filter((alarm) => alarm.name !== identifier));
  };

  const addAlarmHandler = () => {
      chrome.alarms.getAll(alarms => {
          setAlarms(alarms)
      })
  }

  return (
    <div>
      <Backdrop
        onClick={props.onBackdropClick}
        color="black"
        opacity="0.4"
        index="2"
      />
      <div className="relative rounded-lg bg-white p-4 z-10 make-alarm-animation">
        <MakeAlarm addAlarmHandler={addAlarmHandler} />
        <CurrentAlarms alarms={alarms} removeAlarm={(identifier) => removeAlarm(identifier)} />
      </div>
    </div>
  );
};

export default AlarmOpen;
