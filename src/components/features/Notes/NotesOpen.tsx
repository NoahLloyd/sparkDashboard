import React, { useEffect, useRef } from "react";

interface Props {}

const NotesOpen = (props: Props) => {
  const textInput = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    chrome.storage.sync.get(["notesText"], (storage) => {
      if (storage.notesText) textInput.current!.value = storage.notesText;
    });

    // Slowly increase size animation
    for (let i = 0; i < 48; i++) {
    setTimeout(() => {
      textInput.current!.style.height = `${i/2}rem`
    },i*5)
    }
  }, []);

  const textChangeHandler = () => {
    const text = textInput.current!.value;
    chrome.storage.sync.set({ notesText: text });
  };

  return (
    <div>
      <textarea
        id="notes-section--forHover"
        onMouseLeave={textChangeHandler}
        ref={textInput}
        className="resize-none overflow bg-transparent text-white m-auto p-3 w-full focus:outline-none text-lg"
      ></textarea>
    </div>
  );
};

export default NotesOpen;
