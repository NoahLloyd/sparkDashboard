import React, { useState, useRef, useEffect } from "react";
import PlusIcon from "../../../../assets/icons/PlusIcon";
import Checkbox from "../../../UI/Checkbox";

interface Props {
  updateGroup: (group: {title: string; sites: string[]} | undefined) => void;
}

const AddGroup = (props: Props) => {
  const [addedSites, setAddedSites] = useState<string[]>([]);
  const [closeTabs, setCloseTabs] = useState(true)
  const siteInput = useRef<HTMLInputElement>(null);
  const titleInput = useRef<HTMLInputElement>(null);

  const closeTabsClickHandler = (enabled: boolean) => {
    chrome.storage.sync.set({closeTabs: enabled})
  }
  useEffect(() => {
    chrome.storage.sync.get(['closeTabs'], (storage) => {
        if (storage.closeTabs === undefined) {
          setCloseTabs(true)
        } else {
          setCloseTabs(storage.closeTabs)
        }
    })
  },[setCloseTabs])

  const siteAddHandler = () => {
    const newSite = siteInput.current!.value;
    if (newSite) {
      if (addedSites) {
        setAddedSites([...addedSites, newSite]);
      } else {
        setAddedSites([newSite]);
      }
      siteInput.current!.value = "";
    }
  };

  // If a url is too long to be displayed, this shorts it and adds 3 dots
  const shortenUrl = (url: string) => {
    if (url.length > 35) {
      return url.slice(0, 32) + "...";
    }
    return url;
  };

  const addGroup = () => {
    chrome.storage.sync.get(["tabGroups"], (storage) => {
      const { tabGroups } = storage;

      const sites = addedSites;
      // In case they did not press plus icon on last url
      if (siteInput.current!.value != "") {
        sites.push(siteInput.current!.value);
        siteInput.current!.value = "";
      }

      const newGroup = {
        title: titleInput.current!.value,
        sites: addedSites,
      };
      titleInput.current!.value = "";
      if (!tabGroups) {
        chrome.storage.sync.set({ tabGroups: [newGroup] });
        return;
      }
      const groupsWithNew = [...tabGroups, newGroup];
      chrome.storage.sync.set({ tabGroups: groupsWithNew });

      setTimeout(() => {
        props.updateGroup(newGroup);
      }, 200);
    });

    setAddedSites([]);
  };
  return (
    <div className="w-1/2 m-4 ml-0 flex flex-col justify-start">
      <input
        className="mb-2 text-lg py-2 px-3 font-bold text-grey-darkest inline-block border-primary border-solid border-2 rounded"
        type="text"
        placeholder="Group title"
        ref={titleInput}
      />
      {addedSites?.map((url) => {
        return (
          <ul>
            <li className="mb-2 w-full py-2 px-3 text-left text-grey-darkest inline-block border-primary border-solid border-2 rounded">
              {shortenUrl(url)}
            </li>
          </ul>
        );
      })}
      <input
        className="w-full py-2 px-3 text-grey-darkest font-bold inline-block border-primary border-solid border-2 rounded"
        type="text"
        placeholder="Url"
        ref={siteInput}
      />
      <div
        className="text-center cursor-pointer w-full mt-2"
        onClick={siteAddHandler}
      >
        <PlusIcon />
      </div>
      <button
        onClick={addGroup}
        className="mt-2 rounded bg-primary text-light py-2 text-center cursor-pointer text-lg"
      >
        Add group
      </button>
      <p className="text-primary text-opacity-60 mt-2 text-left">Reopen this setting to see your new groups on "Your Groups"</p>
      <div className="border-t-4 pt-4 border-solid border-secondary mt-8 flex justify-between">
        <h2 className="text-base text-left">
        Close other tabs when clicking a group
        </h2>
        <Checkbox enabled={closeTabs} onClick={(enabled) => closeTabsClickHandler(enabled)} />
      </div>
    </div>
  );
};

export default AddGroup;
