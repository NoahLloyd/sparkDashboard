import React, { useState, useRef, useEffect } from "react";
import Checkbox from "../../../UI/Checkbox";

interface Props {
  enabled: boolean;
  onClick: (checked: boolean) => void;
}

export default function ChosenImages(props: Props) {
  const chosenUrlInput = useRef<HTMLInputElement>(null);

  const [chosenUrls, setChosenUrls] = useState<string[]>([]);

  const addUrlHandler = () => {
    let url = chosenUrlInput.current!.value;
    const listWithAddedUrl = [...chosenUrls, url];
    if (url) {
      setChosenUrls(listWithAddedUrl);
    }
    chrome.storage.sync.set({ backgroundImages: listWithAddedUrl });
    chosenUrlInput.current!.value = "";
  };

  const removeUrlHandler = (url: string) => {
    const urlIndex = chosenUrls.indexOf(url);
    let tmpChosenUrls = chosenUrls;
    tmpChosenUrls.splice(urlIndex, 1);
    const urlsWithoutClickedUrl = tmpChosenUrls;
    if (urlsWithoutClickedUrl) setChosenUrls([...urlsWithoutClickedUrl]);
    chrome.storage.sync.set({ backgroundImages: urlsWithoutClickedUrl });
  };

  useEffect(() => {
    chrome.storage.sync.get(["backgroundImages"], (storage) => {
      if (storage.backgroundImages) setChosenUrls(storage.backgroundImages);
    });
  }, []);

  // If a url is too long to be displayed, this shorts it and adds 3 dots
  const shortenUrl = (url: string) => {
    if (url.length >  40) {
      return url.slice(0,37) + "..."
    }
    return url
  }

  return (
    <section className="w-1/2 m-4">
      <div className="w-full flex justify-between border-b-4 border-solid border-secondary pb-4 mb-4">
        <h2 className="text-2xl inline-block mr-3.5 align-top font-light ">
          Choose your own images
        </h2>
        <Checkbox
          enabled={props.enabled}
          onClick={(checked: boolean) => props.onClick(!checked)}
        />
      </div>
      <div className="mb-4 flex justify-between w-full">
        <input
          ref={chosenUrlInput}
          type="text"
          placeholder="Image url"
          className="text-primary shadow-lg py-2 px-3 rounded mr-4 w-8/12 text-grey-darkest inline-block border-primary border-solid border-2"
        />
        <button
          className="rounded-sm py-2 px-3 bg-primary text-white shadow-lg w-3/12"
          onClick={addUrlHandler}
        >
          Add Image
        </button>
      </div>
      <table className="w-full">
        <tbody>
          {chosenUrls.map((url: string) => (
            <tr className="p-4 mb-3 w-full">
              <td
                className="overflow-hidden border-solid border-2 border-primary shadow-lg hover:line-through p-2 w-full text-lg"
                onClick={() => removeUrlHandler(url)}
              >
                {shortenUrl(url)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
