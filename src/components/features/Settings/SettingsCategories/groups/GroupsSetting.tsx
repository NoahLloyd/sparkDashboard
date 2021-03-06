import React, { useState, useEffect } from "react";
import Checkbox from "../../../../UI/Checkbox";
import AddGroup from "./AddGroup";
import ShowGroups from "./ShowGroups";

interface Props {}

const GroupsSetting = (props: Props) => {
  const [newGroup, setNewGroup] = useState()
  const [groupsEnabled, setGroupsEnabled] = useState(true);
  useEffect(() => {
    chrome.storage.sync.get(["groupsSetting"], (storage) => {
      setGroupsEnabled(storage.groupsSetting);
    });
  }, []);

  const updateGroup = (group: {title: string; sites: string[]} | undefined) => {
     
  }

  return (
    <div className="text-center w-3/4 mx-auto mt-4">
      <Checkbox
        enabled={groupsEnabled}
        onClick={(checked: boolean) => {
          chrome.storage.sync.set({ groupsSetting: checked });
        }}
      />
      <h2 className="text-2xl text-center border-b-4 border-solid border-secondary mb-4 pb-4">
        Group your tabs to quickly access different environments
      </h2>
      <div className="flex w-full justify-between">
        <AddGroup updateGroup={(group) => updateGroup(group)} />
        <ShowGroups newGroup={newGroup} />
      </div>
    </div>
  );
};
export default GroupsSetting;
