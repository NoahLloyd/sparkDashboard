import React, { useState, useEffect,useRef } from "react";
import Checkbox from "../../../../UI/Checkbox";
// import AutoToggleFocusDay from "./AutoToggleFocusDay";

interface Props {}

const AutoToggleFocus = (props: Props) => {
  const startAtInput = useRef<HTMLInputElement>(null)
  const endAtInput = useRef<HTMLInputElement>(null)

  const [autoToggle, setAutoToggle] = useState(false);

  useEffect(() => {
    chrome.storage.sync.get(["autoToggleFocus"], (storage) => {
      setAutoToggle(storage.autoToggleFocus || false);
    });

    // Sets the saved times when opened
    chrome.storage.sync.get(['autoFocusTimes'], (storage) => {
        if (storage.autoFocusTimes) {
          [startAtInput.current!.value, endAtInput.current!.value] = storage.autoFocusTimes
        }
    })
  }, []);

  const autoToggleClickHandler = () => {
    chrome.storage.sync.set({ autoToggleFocus: !autoToggle });
  };

  // const days = [
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday",
  //   "Sunday",
  // ];

  const autoFocusTimesChange = () => {
    const start = +startAtInput.current!.value
    const end = +endAtInput.current!.value

    chrome.storage.sync.set({autoFocusTimes: [start, end]})
  }

  //TODO:  Insert current  chosen times for start and end on load

  return (
    <div className="w-1/2 m-4">
      <div className="border-b-4 pb-4 border-solid border-secondary mb-4 flex justify-between">
        <h2 className="text-2xl">
          Automatically toggle focus mode
        </h2>
        <Checkbox enabled={autoToggle} onClick={autoToggleClickHandler} />
      </div>
      <h3 className="text-xl mb-6 flex justify-left">
        <div className="">
          <span>Start at</span>
          <input
            type="number"
            ref={startAtInput}
            onChange={autoFocusTimesChange}
            className="py-1 px-2 font-bold bg-light rounded-sm text-primary mx-1 w-16"
            placeholder="9"
          />
        </div>
        <div className="">
          <span className="">end at</span>
          <input
            type="number"
            ref={endAtInput}
            onChange={autoFocusTimesChange}
            className="py-1 font-bold px-2 bg-light rounded-sm text-primary mx-0.5 w-16"
            placeholder="16"
          />
        </div>
      </h3>
      {/* <ul className="flex flex-col border-b-2 border-primary border-solid">
        {days.map((day) => (
            <AutoToggleFocusDay day={day} />
        ))}
      </ul> */}
    </div>
  );
};

export default AutoToggleFocus;
