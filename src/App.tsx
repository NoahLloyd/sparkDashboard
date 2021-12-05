import React, { useState, useEffect, lazy, Suspense } from "react";
import "./App.css";

import Focus from "./components/Focus/Focus";
import Time from "./components/Time";
import Background from "./components/UI/Background";
import Alarm from "./components/Alarm/Alarm";
import Todo from "./components/Todo/Todo";
import Notes from "./components/Notes/Notes";
import Links from "./components/Links/Links";
import Groups from "./components/Groups/Groups";
import Apps from "./components/Apps/Apps";
import Setup from "./components/Setup/Setup";
import Settings from "./components/Settings/Settings";

function App() {
  const [setup, setSetup] = useState(false);
  useEffect(() => {
    chrome.storage.sync.get(["setup"], (storage) => {
      if (storage.setup) {
        setSetup(true);
      }
    });
  }, [setSetup]);
  if (!setup) {
    return (
      <div className="app">
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
