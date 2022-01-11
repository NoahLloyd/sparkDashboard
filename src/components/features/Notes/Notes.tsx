import React, { useState, useEffect } from "react";
import NotesOpen from "./NotesOpen";

interface Props {}

const Notes = (props: Props) => {
  // Display the notes section on load
  const [showNotes, setShowNotes] = useState(false);
  // Is the notes tab open? Is the user using it?
  const [notesOpen, setNotesOpen] = useState(false);
  // For the hacky position fix if todo isn't shown
  const [marginRight, setMarginRight] = useState("20%");

  useEffect(() => {
    chrome.storage.sync.get(["notesSetting"], (storage) => {
      if (storage.notesSetting === undefined) {
        setShowNotes(true);
      } else {
        setShowNotes(storage.notesSetting);
      }
    });

    // Hacky fix in the case that todo is not open, and notes have to replace the position
    chrome.storage.sync.get(["todoSetting"], (storage) => {
      if (!storage.todoSetting && storage.todoSetting !== undefined) {
        setMarginRight("1rem");
      }
    });
  }, []);

  if (showNotes) {
    return (
      <div
        onMouseEnter={() => {
          setNotesOpen(true);
          setTimeout(() => {
          document.getElementById("notes-section--forHover")?.focus();
          },10)
        }}
        onMouseLeave={() => setNotesOpen(false)}
        style={{ marginRight: marginRight }}
        className="absolute bottom-0 right-0 rounded bg-primaryTransparent text-light w-1/6"
      >
        <h2 className="text-2xl py-1 px-2 text-center mx-4">Notes</h2>
        {notesOpen && <NotesOpen />}
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Notes;
