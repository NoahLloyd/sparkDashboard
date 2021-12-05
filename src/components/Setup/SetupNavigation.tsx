import React from "react";

interface Props {
  setSetupSection: (number: number) => void;
  currentSection: number;
}

const SetupNavigation = (props: Props) => {
  const last = props.currentSection === 4;
  const numberStyles =
    "mr-4 rounded-full bg-white p-2 text-center h-12 w-12 text-lg bg-opacity-70 text-black cursor-pointer text-opacity-60 select-none";
  return (
    <div className="absolute bottom-0 right-0 m-4 flex justify-end">
      <button
        onClick={() => props.setSetupSection(0)}
        className="rounded-lg py-2 px-8 text-lg text-white bg-secondary bg-opacity-70 mr-8 cursor-pointer"
      >
        {last ? "Finish" : "Next"}
      </button>
      <div style={props.currentSection === 1 ? {color: "white", backgroundColor: "black"} : {}} onClick={() => props.setSetupSection(1)} className={numberStyles}>
        1
      </div>
      <div style={props.currentSection === 2 ? {color: "white", backgroundColor: "black"} : {}} onClick={() => props.setSetupSection(2)} className={numberStyles}>
        2
      </div>
      <div style={props.currentSection === 3 ? {color: "white", backgroundColor: "black"} : {}} onClick={() => props.setSetupSection(3)} className={numberStyles}>
        3
      </div>
      <div style={props.currentSection === 4 ? {color: "white", backgroundColor: "black"} : {}} onClick={() => props.setSetupSection(4)} className={numberStyles}>
        4
      </div>
    </div>
  );
};

export default SetupNavigation;
