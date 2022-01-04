import React, { useState, useEffect,useRef } from "react";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";
import "./TodoAnimation.css";

interface Props {}

const TodoList = (props: Props) => {
  const todoListRef = useRef<HTMLDivElement>(null)
  const [todos, setTodos] =
    useState<{ id: string; title: string; completed: boolean }[]>();

  useEffect(() => {
    chrome.storage.sync.get(["todoList"], (storage) => {
      if (storage.todoList === undefined) {
        setTodos([
          { id: "1", title: "Recommend Spark to a friend", completed: false },
        ]);
      }
      setTodos(storage.todoList);
    });

    // Slowly increase size animation
    for (let i = 0; i < 48; i++) {
      setTimeout(() => {
        todoListRef.current!.style.height = `${i / 2}rem`;
      }, i * 5);
    }
  }, []);

  // Add a new todo item
  const addTodo = (title: string) => {
    let newTodo = {
      id: Math.random().toString() + Math.random().toString(),
      title, // new in ES6: same as title: title
      completed: false,
    };

    // [...] = spread operator (copy items)
    // Used because we can't (and shouldn't) change state values directly
    if (todos) {
      setTodos([...todos, newTodo]);
      chrome.storage.sync.set({ todoList: [...todos, newTodo] });
    } else {
      setTodos([newTodo]);
      chrome.storage.sync.set({ todoList: [newTodo] });
    }
  };

  // Delete a todo item
  const deleteTodo = (id: string) => {
    const newTodos = todos?.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    chrome.storage.sync.set({ todoList: newTodos });
  };

  // Toggle completed state of todo item
  const markComplete = (id: string) => {
    const todosWithCompletedTodo = todos?.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(todosWithCompletedTodo);
    chrome.storage.sync.set({ todoList: todosWithCompletedTodo });
  };

  return (
    <div className="todo-animation" ref={todoListRef} style={{ minHeight: "10rem" }}>
      <AddTodo addTodo={addTodo} />

      <div className="mx-4 my-6 overflow-auto">
        {todos && todos.length > 0 ? (
          // If there are todo items, show them in a list
          <ul className="mt-4" data-testid="todos-list">
            {todos?.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                markComplete={markComplete}
                deleteTodo={deleteTodo}
              />
            ))}
          </ul>
        ) : (
          // No todo items, all caught up
          <p
            className="my-16 text-lg text-center text-gray-500"
            data-testid="empty-todos-message"
          >
            You're all caught up!
          </p>
        )}
      </div>
    </div>
  );
};

export default TodoList;
