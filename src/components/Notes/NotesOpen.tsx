import React, { useEffect, useRef } from "react";

interface Props {
}

const NotesOpen = (props: Props) => {
  const textInput = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    chrome.storage.sync.get(["notesText"], (storage) => {
      if (storage.notesText) textInput.current!.value = storage.notesText;
    });
  }, []);

  const textChangeHandler = () => {
    const text = textInput.current!.value;
    chrome.storage.sync.set({ notesText: text });
  };

  return (
    <div>
      <textarea
        onMouseLeave={textChangeHandler}
        ref={textInput}
        className="resize-none bg-transparent text-white m-auto p-3 w-full focus:outline-none h-96 text-lg"
      ></textarea>
    </div>
  );
};

export default NotesOpen;
