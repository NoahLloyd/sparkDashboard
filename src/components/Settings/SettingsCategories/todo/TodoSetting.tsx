import React, { useState, useEffect } from "react";
import Checkbox from "../../../UI/Checkbox";

interface Props {}

const TodoSetting = (props: Props) => {
  const [todoEnabled, setTodoEnabled] = useState(true);
  useEffect(() => {
    chrome.storage.sync.get(["todoSetting"], (storage) => {
      if (storage.todoSetting === undefined) {
        setTodoEnabled(true);
      } else {
        setTodoEnabled(storage.todoSetting);
      }
    });
  }, []);

  return (
    <div className="text-center">
      <Checkbox
        enabled={todoEnabled}
        onClick={(checked: boolean) => {
          chrome.storage.sync.set({ todoSetting: !checked });
          setTodoEnabled(!checked);
        }}
      />
    </div>
  );
};

export default TodoSetting;
