import React, { useState, useEffect } from "react";

interface Props {}

const Groups = (props: Props) => {
  const [groups, setGroups] = useState<{ title: string; sites: string[] }[]>();
  useEffect(() => {
    chrome.storage.sync.get(["tabGroups"], (storage) => {
      setGroups(storage.tabGroups);
    });
  }, []);

  const openGroup = (title: string) => {
    const group = groups?.find((group) => group.title === title);
    closeAllTabs();
    group?.sites.forEach((site) => chrome.tabs.create({ url: site }));
  };
  const closeAllTabs = () => {
    chrome.tabs.query({}, (tabs) => {
      const allTabs = tabs.map((tab) => tab.id!);
      chrome.tabs.remove(allTabs);
      console.log(tabs);
    });
  };
  const IconSize = window.screen.width / 50;

  return (
    <div style={{bottom: IconSize}} className="absolute mb-8  left-0 m-2 flex flex-col">
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
};

export default Groups;
