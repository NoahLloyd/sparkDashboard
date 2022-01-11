import React, { useEffect, useState } from "react";
import Checkbox from "../../../UI/Checkbox";

interface Props {
  day: string;
}

const AutoToggleFocusDay = (props: Props) => {
  const [enabled, setEnabled] = useState(false);

  const setDay = (enabled: boolean) => {
    setEnabled(enabled);
    switch (props.day) {
      case "Monday":
        chrome.storage.sync.set({ focusMonday: enabled });
        break;
      case "Tuesday":
        chrome.storage.sync.set({ focusTuesday: enabled });
        break;
      case "Wednesday":
        chrome.storage.sync.set({ focusWednesday: enabled });
        break;
      case "Thursday":
        chrome.storage.sync.set({ focusThursday: enabled });
        break;
      case "Friday":
        chrome.storage.sync.set({ focusFriday: enabled });
        break;
      case "Saturday":
        chrome.storage.sync.set({ focusSaturday: enabled });
        break;
      case "Sunday":
        chrome.storage.sync.set({ focusSunday: enabled });
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    chrome.storage.sync.get([props.day + "Setting"], (storage) => {
      setEnabled(storage[props.day + "Setting"]);
    });
  }, []);

  return (
    <li className="flex justify-between text-lg text-primary py-2 px-3  border-solid border-2 border-primary border-b-0">
      {props.day}
      <Checkbox enabled={enabled} onClick={(checked) => setDay(enabled)} />
    </li>
  );
};

export default AutoToggleFocusDay;
