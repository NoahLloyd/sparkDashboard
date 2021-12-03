import React, { useRef,useEffect } from "react";
import Backdrop from "../UI/Backdrop";
import "./MakeAlarmAnimation.css";

interface Props {
  addAlarmHandler: () => void;
}

const MakeAlarm = (props: Props) => {
  const hoursInput = useRef<HTMLInputElement>(null);
  const minutesInput = useRef<HTMLInputElement>(null);

  const addAlarmHandler = () => {
    let hours = +hoursInput.current!.value;
    let minutes = +minutesInput.current!.value;
    if (!hours && !minutes) return;
    hoursInput.current!.value = "";
    minutesInput.current!.value = "";

    if (!hours) hours = 0;
    if (!minutes) minutes = 0;

    chrome.alarms.create("Alarm!", {
      delayInMinutes: hours * 60 + minutes,
    });
    props.addAlarmHandler()
  };

  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') addAlarmHandler()
    })
  }, [])

  return (
    <h2 className="border-b-4 border-solid border-secondary pb-2 mb-4 flex ">
      <span className="text-lg align-middle mt-auto mr-4">Alarm in</span>
      <div className="flex flex-col">
        <label htmlFor="alarmDelayHours" className="text-center">Hours</label>
        <input
          type="number"
          id="alarmDelayHours"
          className="py-1 px-2 bg-light text-primary rounded-sm ml-1.5 mr-0.5 w-12"
          ref={hoursInput}
        ></input>
      </div>
      <div className="flex flex-col">
        <label htmlFor="alarmDelayMinutes" className="text-center">Minutes</label>
        <input
          type="number"
          id="alarmDelayMinutes"
          className="py-1 px-2 bg-light rounded-sm text-primary ml-1.5 mr-0.5 w-12"
          ref={minutesInput}
        ></input>
      </div>
      <button
        className="bg-secondary text-primary rounded-sm ml-3 py-1 px-3"
        onClick={addAlarmHandler}
      >
        Set alarm
      </button>
    </h2>
  );
};

export default MakeAlarm;
