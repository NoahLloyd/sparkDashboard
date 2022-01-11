import React from "react";
import Checkbox from "../../UI/Checkbox";

interface Props {}

const Setup3 = (props: Props) => {
  // Sets all settings to enabled
  chrome.storage.sync.set({ todoSetting: true });
  chrome.storage.sync.set({ focusSetting: true });
  chrome.storage.sync.set({ alarmSetting: true });
  chrome.storage.sync.set({ linksSetting: true });
  chrome.storage.sync.set({ groupsSetting: true });
  chrome.storage.sync.set({ notesSetting: true });
  chrome.storage.sync.set({ appsSetting: true });


  // Toggles a setting
  const toggleEnabled = (feature: string, enabled: boolean) => {
    switch (feature) {
      case "todo":
        chrome.storage.sync.set({ todoSetting: enabled });
        break;
      case "focus":
        chrome.storage.sync.set({ focusSetting: enabled });
        break;
      case "alarm":
        chrome.storage.sync.set({ alarmSetting: enabled });
        break;
      case "links":
        chrome.storage.sync.set({ linksSetting: enabled });
        break;
      case "groups":
        chrome.storage.sync.set({ groupsSetting: enabled });
        break;
      case "notes":
        chrome.storage.sync.set({ notesSetting: enabled });
        break;
      case "apps":
        chrome.storage.sync.set({ appsSetting: enabled });
        break;
      default:
        break;
    }
    chrome.storage.sync.set({ [feature]: enabled });
  };
  const featureStyling =
    "flex justify-between py-3 px-3 bg-white bg-opacity-70 rounded-lg inline-block";
  const featureTextStyling = "text-xl";
  return (
    <div>
      <h1 className="text-4xl text-center mb-4">
        What features would you like to use?
      </h1>
      <div className="grid grid-cols-2 grid-rows-3 gap-4">
        <div className={featureStyling}>
          <p className={featureTextStyling}>Todo list</p>
          <Checkbox
            enabled
            onClick={(checked) => toggleEnabled("todo", checked)}
          />
        </div>
        <div className={featureStyling}>
          <p className={featureTextStyling}>Google Apps</p>
          <Checkbox
            enabled
            onClick={(checked) => toggleEnabled("apps", checked)}
          />
        </div>
        <div className={featureStyling}>
          <p className={featureTextStyling}>Tab groups</p>
          <Checkbox
            enabled
            onClick={(checked) => toggleEnabled("groups", checked)}
          />
        </div>
        <div className={featureStyling}>
          <p className={featureTextStyling}>Focus mode</p>
          <Checkbox
            enabled
            onClick={(checked) => toggleEnabled("focus", checked)}
          />
        </div>
        <div className={featureStyling}>
          <p className={featureTextStyling}>Alarm</p>
          <Checkbox
            enabled
            onClick={(checked) => toggleEnabled("alarm", checked)}
          />
        </div>
        <div className={featureStyling}>
          <p className={featureTextStyling}>Quick links</p>
          <Checkbox
            enabled
            onClick={(checked) => toggleEnabled("links", checked)}
          />
        </div>
        <div className={featureStyling}>
          <p className={featureTextStyling}>Notes</p>
          <Checkbox
            enabled
            onClick={(checked) => toggleEnabled("notes", checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default Setup3;
