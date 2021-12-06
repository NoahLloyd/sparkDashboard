import React, { useState, useEffect } from "react";
// import ExpandIcon from "../../../../assets/icons/ExpandIcon";
// import GroupsSetting from "./GroupsSetting";

interface Props {
  newGroup: { title: string; sites: string[] } | undefined;
}

const ShowGroups = (props: Props) => {
  type groupType = { title: string; sites: string[] };
  const [groups, setGroups] = useState<groupType[]>([
    // { title: "Group", sites: ["site", "site", "site"] },
    // { title: "Group", sites: ["site", "site", "site"] },
    // { title: "Group", sites: ["site", "site", "site"] },
  ]);
  //   const [groupsOpen, setGroupsOpen] = useState<boolean[]>([false]);

  useEffect(() => {
    chrome.storage.sync.get(["tabGroups"], (storage) => {
      if (props.newGroup) {
        setGroups([...storage.tabGroups, props.newGroup]);
      } else {
        setGroups(storage.tabGroups);
      }
      // Set false for every group in the groupsOpen
      //   let amountOfGroups: boolean[] = [];
      //   storage.tabGroups.forEach((group: groupType) => {
      //   groups.forEach((group: groupType) => {
      //     amountOfGroups.push(false);
      //   });
      //   console.log(amountOfGroups);
      //   setGroupsOpen(amountOfGroups);
    });
  }, [setGroups, props]);

  //   const changeGroupOpen = (index: number) => {
  //     if (groupsOpen) {
  //       const tmpGroups = groupsOpen;
  //       tmpGroups[index] = !tmpGroups[index];
  //       setGroupsOpen(tmpGroups);
  //       setGroups(groups)
  //       console.log(tmpGroups);
  //     }
  //   };

  const removeGroup = (group: groupType) => {
    const index = groups.indexOf(group);
    const tmp = groups;
    tmp.splice(index, 1);
    const groupsWithoutClicked = tmp;
    if (groupsWithoutClicked) setGroups([...groupsWithoutClicked]);
    chrome.storage.sync.set({ tabGroups: groupsWithoutClicked });
  };

  // If a url is too long to be displayed, this shorts it and adds 3 dots
  const shortenUrl = (url: string) => {
    if (url.length > 35) {
      return url.slice(0, 32) + "...";
    }
    return url;
  };

  return (
    <div className="w-1/2 m-4 mr-0">
      <div className="w-full text-light text-center rounded bg-primary text-lg py-2">
        Your groups
      </div>
      {groups &&
        groups.map((group, i) => {
          return (
            <div className="bg-secondary bg-opacity-50 rounded mt-4 py-2 px-3">
              <div className="flex justify-between">
                <h3
                  className="text-lg hover:line-through uppercase font-light"
                  onClick={() => removeGroup(group)}
                >
                  {group.title}
                </h3>
                {/* <div
                onClick={() => changeGroupOpen(i)}
                className="cursor-pointer"
              >
                <ExpandIcon />
              </div> */}
              </div>
              {/* {groupsOpen[i] && ( */}
              <ul className="list-disc list-inside text-left">
                {group.sites.map((site) => {
                  return (
                    <li className="ml-3 text-md list-item">
                      {shortenUrl(site)}
                    </li>
                  );
                })}
              </ul>
              {/* )} */}
            </div>
          );
        })}
    </div>
  );
};

export default ShowGroups;
