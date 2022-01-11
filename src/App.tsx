import React, { useState, useEffect, lazy, Suspense } from "react";
import "./App.css";

import Focus from "./components/features/Focus/Focus";
import Time from "./components/features/Time/Time";
import Background from "./components/UI/Background";
import Alarm from "./components/features/Alarm/Alarm";
import Todo from "./components/features/Todo/Todo";
import Notes from "./components/features/Notes/Notes";
import Links from "./components/features/Links/Links";
import Groups from "./components/features/Groups/Groups";
import Apps from "./components/features/Apps/Apps";
import Setup from "./components/features/Setup/Setup";
import Settings from "./components/features/Settings/Settings";

function App() {
  const [setup, setSetup] = useState(false);
  const [colorTheme, setColorTheme] = useState("1");
  useEffect(() => {
    // If the extension was just installed or setup has not been completed
    chrome.storage.sync.get(["setup"], (storage) => {
      if (storage.setup) {
        setSetup(true);
      }
    });
    chrome.storage.sync.get(["colorTheme"], (storage) => {
      if (storage.colorTheme === undefined) {
        setColorTheme("1");
      } else {
        setColorTheme(storage.colorTheme);
      }
    });
  }, [setSetup, setColorTheme]);
  if (!setup) {
    return (
      <div className={"theme-" + colorTheme}>
        <Background />
        <Apps />
        <Groups />
        <section className="links">
          <Links />
        </section>
        <main className="main">
          <Focus />
          <Time />
        </main>
        <Settings />
        <Alarm />
        <Notes />
        <Todo />
      </div>
    );
  } else {
    return <Setup />;
  }
}

export default App;
