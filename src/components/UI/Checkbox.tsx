import React, { useRef, useState, useEffect } from "react";
import "./Checkbox.css";

interface Props {
  enabled: boolean;
  onClick: (checked: boolean) => void;
}

const Checkbox = (props: Props) => {
  const checkbox = useRef<HTMLInputElement>(null);

  const id = Math.random().toString() + Math.random().toString();

  const toggleEnabled = () => {
    let checkedValue = checkbox.current!.checked;
    props.onClick(checkedValue);
  };

  // Tried for an hour and this is the only way I can make it work
  setTimeout(() => {
    checkbox.current!.checked = props.enabled;
  }, 0);

  return (
    <label
      className="ml-3 toggle inline-block"
      htmlFor={id}
      onClick={toggleEnabled}
    >
      <input type="checkbox" className="toggle__input" id={id} ref={checkbox} />
      <span className="toggle-track">
        <span className="toggle-indicator">
          <span className="checkMark">
            <svg
              viewBox="0 0 24 24"
              id="ghq-svg-check"
              role="presentation"
              aria-hidden="true"
            >
              <path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
            </svg>
          </span>
        </span>
      </span>
    </label>
  );
};

export default Checkbox;
