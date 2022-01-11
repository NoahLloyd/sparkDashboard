import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

interface Props {
  addTodo: (title: string) => void;
}

const AddTodo = (props: Props) => {
  const [title, setTitle] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Stop form being submmited to same file and reloading the page
    event.preventDefault();

    // Validate todo text
    if (!title) {
      alert("Please add a task description.");
      return;
    }

    props.addTodo(title);

    // Clear task text in component state
    setTitle("");
  };

  return (
    <div className="mx-4 mt-6">
      <form
        onSubmit={onSubmit}
        className="flex items-center transition duration-500 ease-in-out py-2 border-b-2 border-gray-300 focus-within:border-b-2 focus-within:border-secondary"
      >
        <input
        id="todo-section--forHover"
          name="task-title"
          type="text"
          placeholder="Add task..."
          value={title}
          onChange={(evt) => setTitle(evt.target.value)}
          className="flex-1 px-2.5 bg-gray-200 placeholder-gray-500 focus:outline-none"
          data-testid="task-input-field"
        />
        <button
          type="submit"
          className="transition duration-200 ease-in-out text-gray-400 focus:outline-none hover:text-secondary text-lg px-2 cursor-pointer"
          data-testid="task-submit-btn"
        >
          <FaEdit />
        </button>
      </form>
    </div>
  );
};
export default AddTodo;
