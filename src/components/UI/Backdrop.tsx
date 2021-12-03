import React from "react";
import ReactDOM from "react-dom";

interface Props {
  color: string;
  opacity: string;
  index: string;
  onClick: () => void
}

export default function Backdrop(props: Props) {
  const backdropParent = document.getElementById("overlay")! as HTMLDivElement;

  return ReactDOM.createPortal(
    <div
      className="absolute top-0 left-0 h-full w-full"
      style={{
        backgroundColor: props.color,
        opacity: props.opacity,
        zIndex: + props.index
      }}
      onClick={() => {
        props.onClick();
      }}
    ></div>,
    backdropParent
  );
}
