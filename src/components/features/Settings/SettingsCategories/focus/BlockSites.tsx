import React, { useEffect, useRef, useState } from "react";

interface Props {}

const BlockSites = (props: Props) => {
  const addSiteInput = useRef<HTMLInputElement>(null);
  const [blockedSites, setBlockedSites] = useState([""]);

  useEffect(() => {
    chrome.storage.sync.get(["blockedSites"], (storage) => {
      setBlockedSites(storage.blockedSites);
    });
  }, []);

  const addBlockedSiteHandler = () => {
    const site = addSiteInput.current!.value;
    addSiteInput.current!.value = "";
    setBlockedSites([...blockedSites, site]);
    chrome.storage.sync.get(["blockedSites"], (storage) => {
      chrome.storage.sync.set({
        blockedSites: [...storage.blockedSites, site],
      });
    });
  };

  const removeSiteHandler = (name: string) => {
    const nameIndex = blockedSites.indexOf(name);
    let tmpBlockedSites = blockedSites;
    tmpBlockedSites.splice(nameIndex, 1);
    const sitesWithoutClickedSite = tmpBlockedSites;
    setBlockedSites(sitesWithoutClickedSite)
    chrome.storage.sync.set({ blockedSites: sitesWithoutClickedSite });
  };

  return (
    <div className="w-1/2 m-4">
      <div className="border-b-4 border-solid border-secondary mb-4 pb-4">
        <h2 className="text-2xl mr-2 inline-block">
          Block websites while focus mode is on
        </h2>
      </div>
      <div className="h-50px flex justify-between">
        <input
          className="w-7/12 h-full py-2 px-3 text-grey-darkest inline-block border-primary border-solid border-2 rounded"
          type="text"
          placeholder="site or keyword"
          ref={addSiteInput}
        />
        <button
          onClick={addBlockedSiteHandler}
          className="w-4/12 h-full bg-primary hover:bg-teal-dark text-white inline-block py-2 px-3 rounded"
        >
          Add site
        </button>
      </div>
      <table className="w-full mt-4">
        <tbody className="w-full">
          {blockedSites.map((site) => {
            return (
              <tr className="p-4 mb-3 w-full">
                <td
                  className="border-solid border-2 border-primary shadow-lg cursor-pointer hover:line-through p-2 w-full text-lg"
                  onClick={() => removeSiteHandler(site)}
                >
                  {site}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BlockSites;
