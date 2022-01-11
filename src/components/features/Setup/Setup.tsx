import React, { useState } from "react";
import Background from "../UI/Background";
import SetupNavigation from "./SetupNavigation";
import "./Setup.css";
import Setup1 from "./Setup1";
import Setup2 from "./Setup2";
import Setup3 from "./Setup3";
import Setup4 from "./Setup4";

interface Props {}

const Setup = (props: Props) => {
  // Color theme set to 1
  chrome.storage.sync.set({ colorTheme: "1" });

  const [currentPage, setCurrentPage] = useState(1);
  let setupSection = <Setup1 />;
  switch (currentPage) {
    case 1:
      break;
    case 2:
      setupSection = <Setup2 />;
      break;
    case 3:
      setupSection = <Setup3 />;
      break;
    case 4:
      setupSection = <Setup4 />;
      break;

    default:
      chrome.storage.sync.set({ setup: false });
      setTimeout(() => {
        chrome.tabs.update({ active: true, url: "chrome://newtab" });
      }, 0);
      break;
  }
  const setSetupSection = (number: number) => {
    // If "Next" is pressed 0 returns
    if (number === 0) {
      setCurrentPage((previousValue) => previousValue + 1);
    } else {
      setCurrentPage(number);
    }
  };

  return (
    <div className="">
      <Background />

      <main className="setup-main">
        <div className="flex justify-start mb-5">
          <h1 className="mr-6 text-5xl text-white font-extrabold">
            Welcome to Spark Dashboard!
          </h1>
          <h3 className="setup-title-tilted text-white text-3xl font-normal">
            Let's get you started
          </h3>
        </div>

        <section className="setup-box rounded-lg bg-white bg-opacity-70 relative py-4 px-4">
          {setupSection}
          <SetupNavigation
            setSetupSection={(number: number) => setSetupSection(number)}
            currentSection={currentPage}
          />
        </section>
      </main>
    </div>
  );
};

export default Setup;
