import React, { useEffect, useState } from "react";

interface Props {}

const Focus = (props: Props) => {
  const [styles, setStyles] = useState(" text-light");
  const [showFocus, setShowFocus] = useState(false);

  const toggleFocusMode = () => {
    chrome.storage.sync.get(["focusSetting"], (storage) => {
      setFocusMode(!storage.focusSetting);
    });
  };

  const setFocusMode = (enabled: boolean) => {
    chrome.storage.sync.set({ focusSetting: enabled });
    setStyles(enabled ? " text-secondary" : " text-light");
  };

  const focusSettingTrue = () => {
    chrome.storage.sync.get(["focusSetting"], (storage) => {
      if (storage.focusSetting) {
        setFocusMode(true);
      }
    });
  };

  useEffect(() => {
    // Inputs the focus text
    chrome.storage.sync.get(["showFocus"], (storage) => {
      if (storage.showFocus === undefined) {
        setShowFocus(true);
      } else {
        setShowFocus(storage.showFocus);
      }
    });
    // Checks if the auto toggle is on, and if it's in the time period
    chrome.storage.sync.get(["autoToggleFocus"], (storage) => {
      if (storage.autoToggleFocus) {
        chrome.storage.sync.get(["autoFocusTimes"], (storage) => {
          if (storage.autoFocusTimes) {
            const { autoFocusTimes } = storage;
            const now = new Date().getHours();
            if (now >= autoFocusTimes[0] && now < autoFocusTimes[1]) {
              setFocusMode(true);
            } else {
              focusSettingTrue();
            }
          } else {
            focusSettingTrue();
          }
        });
      } else {
        focusSettingTrue();
      }
    });
  }, []);

  if (showFocus) {
    return (
      <h1
        className={
          "select-none text-4xl block text-center cursor-pointer" + styles
        }
        onClick={toggleFocusMode}
      >
        Focus
      </h1>
    );
  }
  return <div></div>;
};

export default Focus;
