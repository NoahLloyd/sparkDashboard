import React, { useState, useRef } from "react";
import PlusIcon from "../../../../assets/icons/PlusIcon";

interface Props {}

const AddGroup = (props: Props) => {
  const [addedSites, setAddedSites] = useState<string[]>([]);
  const siteInput = useRef<HTMLInputElement>(null);
  const titleInput = useRef<HTMLInputElement>(null);

  const siteAddHandler = () => {
    const newSite = siteInput.current!.value;
    if (newSite) {
      console.log(addedSites);

      if (addedSites) {
        setAddedSites([...addedSites, newSite]);
      } else {
        setAddedSites([newSite]);
      }
      siteInput.current!.value = "";
    }
  };

  const addGroup = () => {
    chrome.storage.sync.get(["tabGroups"], (storage) => {
      const { tabGroups } = storage;

      const sites = addedSites;
      // In case they did not press plus icon on last url
      if (siteInput.current!.value != "") {
        sites.push(siteInput.current!.value)
        siteInput.current!.value = ""
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
              {url}
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
    </div>
  );
};

export default AddGroup;
