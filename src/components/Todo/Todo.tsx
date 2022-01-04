import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";

interface Props {}

const Todo = (props: Props) => {
  // Display the todo section on load
  const [showTodo, setShowTodo] = useState(false);
  // Is the todo tab open? Is the user using it?
  const [todoOpen, setTodoOpen] = useState(false);

  useEffect(() => {
    chrome.storage.sync.get(["todoSetting"], (storage) => {
      if (storage.todoSetting === undefined) {
        setShowTodo(true);
      } else {
        setShowTodo(storage.todoSetting);
      }
    });
  }, []);

  const notHoveringMoreHandler = () => {
    //* When you enter a value, it may close since it got smaller by removing "All caught up!".
    // chrome.storage.sync.get(["todoList"], (storage) => {
    //   if (storage.todoList.length < 2) {
    //     setTimeout(() => {
    //       setTodoOpen(false);
    //     }, 100);
    //   } else {
    setTodoOpen(false);
    //   }
    // });
  };

  if (showTodo) {
    return (
      <div
        onMouseEnter={() => {
          setTodoOpen(true);
          setTimeout(() => {
            document.getElementById("todo-section--forHover")?.focus();
          }, 10);
        }}
        onMouseLeave={notHoveringMoreHandler}
        className="absolute bottom-0 right-0 mr-4 rounded bg-primaryTransparent text-light mx-4 w-1/6"
      >
        <h2 className="text-2xl py-1 px-2 text-center">Todo</h2>
        {todoOpen && <TodoList />}
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Todo;
