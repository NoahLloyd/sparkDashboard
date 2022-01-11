import React, { useState } from "react";

interface Props {}

const Setup2 = (props: Props) => {
  const [description, setDescription] = useState(
    "Hover one of the features displayed above, and a description will appear here"
  );
  const descriptions = {
    todo: "A to-do list will be in the bottom right of your browser that will pop up when you hover and display the tasks you have put in, it saves across multiple devices",
    focus:
      "Focus mode is a togglable mode for concetration that let's you block websites while it's enabled. It's great for productivity and keeps you away from time wasting sites",
    alarm:
      "With alarms, you can add an alarm for a time, and a notification will appear on your computer by the time you've put the alarm. You can access it in the bottom left",
    links:
      "Quick links (bookmarks) will display with each site in an individual box. You can either choose the sites yourself, or the sites will be the ones you visit the most",
    groups:
      "Group your tabs in order to quicky access different environments, simply add sites to the group, and you can click the group on your New Tab page",
    notes:
      "Notes show up next to the to-do list and allows you to scribble down information you may want to remember. It also saves across multiple devices",
    apps: "An icon will appear in the top right which will redirect you to the chrome apps page when you click it, it's an easy way to access them, and also exists by default",
  };
  const featureStyling =
    "rounded py-1 px-4 text-lg mx-2 bg-white bg-opacity-60 font-bold select-none";
  return (
    <div>
      <div className="flex justify-center items-center border-b-4 border-white p-3">
        <div
          onMouseEnter={() => setDescription(descriptions.todo)}
          className={featureStyling}
        >
          Todo
        </div>
        <div
          onMouseEnter={() => setDescription(descriptions.focus)}
          className={featureStyling}
        >
          Focus
        </div>
        <div
          onMouseEnter={() => setDescription(descriptions.alarm)}
          className={featureStyling}
        >
          Alarm
        </div>
        <div
          onMouseEnter={() => setDescription(descriptions.links)}
          className={featureStyling}
        >
          Links
        </div>
        <div
          onMouseEnter={() => setDescription(descriptions.groups)}
          className={featureStyling}
        >
          Groups
        </div>
        <div
          onMouseEnter={() => setDescription(descriptions.notes)}
          className={featureStyling}
        >
          Notes
        </div>
        <div
          onMouseEnter={() => setDescription(descriptions.apps)}
          className={featureStyling}
        >
          Apps
        </div>
      </div>
      <p className="mt-4 mx-6 text-6xl text-center font-light text-opacity-70">
        {description}
      </p>
    </div>
  );
};

export default Setup2;
