import React, { useState, useEffect } from "react";

interface Props {}

const Groups = (props: Props) => {
  const [groups, setGroups] = useState<{ title: string; sites: string[] }[]>();
  const [closeTabs, setCloseTabs] = useState(true);
  const [showGroups, setShowGroups] = useState(false);
  useEffect(() => {
    // The groups themselves
    chrome.storage.sync.get(["tabGroups"], (storage) => {
      setGroups(storage.tabGroups);
    });
    // If enabled
    chrome.storage.sync.get(["groupsSetting"], (storage) => {
      setShowGroups(storage.groupsSetting);
    });
    // If tabs should be closed on click
    chrome.storage.sync.get(["closeTabs"], (storage) => {
      if (storage.closeTabs !== undefined) {
        setCloseTabs(storage.closeTabs);
      }
    });
  }, [setGroups, setShowGroups, setCloseTabs]);

  const openGroup = (title: string) => {
    const group = groups?.find((group) => group.title === title);
    if (closeTabs) closeAllTabs();
    group?.sites.forEach((site) => chrome.tabs.create({ url: site }));
  };
  const closeAllTabs = () => {
    chrome.tabs.query({}, (tabs) => {
      const allTabs = tabs.map((tab) => tab.id!);
      chrome.tabs.remove(allTabs);
    });
  };
  const IconSize = window.screen.width / 50;

  if (showGroups) {
    return (
      <div
        style={{ bottom: IconSize }}
        className="absolute mb-8  left-0 m-2 flex flex-col"
      >
        {groups?.map((group) => (
          <div
            onClick={() => openGroup(group.title)}
            className="text-white text-center text-xl bg-primary font-light bg-opacity-40 px-6 py-2 cursor-pointer m-1"
          >
            <h3>{group.title}</h3>
          </div>
        ))}
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Groups;
