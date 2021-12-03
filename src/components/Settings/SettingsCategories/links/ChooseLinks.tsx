import React, { useRef, useState, useEffect } from "react";
import Checkbox from "../../../UI/Checkbox";

interface Props {}

const ChooseLinks = (props: Props) => {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    chrome.storage.sync.get(["chosenLinksEnabled"], (storage) => {
      if (storage.chosenLinksEnabled === undefined) {
        setEnabled(true);
      } else {
        setEnabled(storage.chosenLinksEnabled);
      }
    });
  }, []);

  const checkboxClickHandler = (enabled: boolean) => {
    chrome.storage.sync.set({ chosenLinksEnabled: enabled });
  };

  const linkTitleInput = useRef<HTMLInputElement>(null);
  const linkUrlInput = useRef<HTMLInputElement>(null);
  const [chosenLinks, setChosenLinks] =
    useState<{ title: string; url: string; favicon: string }[]>();

  useEffect(() => {
    chrome.storage.sync.get(["chosenLinks"], (storage) => {
      setChosenLinks(storage.chosenLinks);
    });
  }, []);

  const addNewLinkHandler = () => {
    const title = linkTitleInput.current!.value;
    const url = linkUrlInput.current!.value;
    linkTitleInput.current!.value = "";
    linkUrlInput.current!.value = "";

    // Hostname is the main part of the url or simply the "domain".
    // fx https://www.docs.google.com/document/id/whatever becomes docs.google.com
    const hostname = new URL(url).hostname;

    // Google api for favicons
    const favicon = `https://www.google.com/s2/favicons?sz=64&domain_url=${hostname}`;

    // New syntax in es6, same as saying { title: title, url: url, favicon: favicon }
    const newLink = { title, url, favicon };

    if (chosenLinks) {
      setChosenLinks([...chosenLinks, newLink]);
      chrome.storage.sync.set({
        chosenLinks: [...chosenLinks, newLink],
      });
    } else {
      setChosenLinks([newLink]);
      chrome.storage.sync.set({
        chosenLinks: [newLink],
      });
    }
  };

  const removeSiteHandler = (link: {
    title: string;
    url: string;
    favicon: string;
  }) => {
    const titles = chosenLinks?.map((link) => link.title);
    const index = titles?.indexOf(link.title);
    let tmpchosenLinks = chosenLinks;
    if (typeof index === "number") tmpchosenLinks?.splice(index, 1);
    const linksWithoutClickedLink = tmpchosenLinks;
    setChosenLinks(linksWithoutClickedLink);
    chrome.storage.sync.set({ chosenLinks: linksWithoutClickedLink });
  };

  return (
    <div className="w-1/2 m-4">
      <div className="flex justify-between border-b-4 border-solid border-secondary mb-4 pb-4">
        <h2 className="text-2xl text-left">
          Choose your own sites
        </h2>
        <Checkbox
          enabled={enabled}
          onClick={(enabled) => checkboxClickHandler(!enabled)}
        />
      </div>
      <div className="h-50px flex justify-between">
        <input
          className="w-3/12 mr-0.5 h-full py-2 px-3 text-grey-darkest inline-block border-primary border-solid border-2 rounded"
          type="text"
          placeholder="Site title"
          ref={linkTitleInput}
        />
        <input
          className="w-5/12 mr-0.5 h-full py-2 px-3 text-grey-darkest inline-block border-primary border-solid border-2 rounded"
          type="text"
          placeholder="Site url"
          ref={linkUrlInput}
        />
        <button
          onClick={addNewLinkHandler}
          className="w-3/12 h-full bg-primary hover:bg-teal-dark text-white inline-block py-2 px-3 rounded"
        >
          Add link
        </button>
      </div>
      <table className="w-full mt-4">
        <tbody className="w-full">
          {chosenLinks?.map((link) => {
            return (
              <tr className=" p-4 mb-3 w-full">
                <td
                  className="text-left border-solid border-2 border-primary shadow-lg hover:line-through p-2 w-full text-lg"
                  onClick={() => removeSiteHandler(link)}
                >
                  {link.title}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ChooseLinks;
