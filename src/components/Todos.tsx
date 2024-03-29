"use client";

import { fetchTodos, checkTodo, sendTodo } from "@/data/data";
import { useState, useEffect } from "react";
import { BiCheck } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";
type Todo = {
  id: number;
  text: string;
  is_complete: boolean;
};
type todoToSend = {
  text: string;
  is_complete: boolean;
};

const Todos = () => {
  const [todos, setTodos] = useState<Array<Todo>>([]);
  /**This is for the text to be displayed */
  const [text, setText] = useState("");
  const [textDisplay, setTextDisplay] = useState<string>("");
  useEffect(() => {
    fetchTodos().then((data) => {
      setTodos(data);
    });
  }, []);
  //console.log("THESE ARE THE TODOS", todos);
  const handleCheck = async (id: number) => {
    console.log("Item id is", id);
    const response = await checkTodo(id);
    const newList = await fetchTodos();
    setTodos(newList);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(text);
    const todo: todoToSend = {
      text: text,
      is_complete: false,
    };
    setTextDisplay(text);
    setText("");
    const response = await sendTodo({ ...todo });
    /**For debugging */
    // console.log(response);
    //!!After adding new todo refresh the display
    const newList = await fetchTodos();
    setTodos(newList);
  };

  return (
    <div className="w-full">
      <form
        className="mx-auto flex items-center justify-center gap-x-2"
        action="POST"
        onSubmit={handleSubmit}>
        <input
          className="p-2 w-1/3 bg-transparent rounded-md border-2 border-zinc-100 focus:border-teal-500 focus:outline-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="Todo"
          placeholder="Add Todo"
        />
        <button
          type="submit"
          className="bg-zinc-100 p-2 text-green-500 rounded-md">
          Add Task
        </button>
      </form>

      <ul className="mx-auto p-4 w-1/3 ">
        {todos.map((item) => (
          <li
            className={`p-2 mb-1 bg-zinc-100 text-zinc-900 border-l-8 ${
              item.is_complete ? "border-green-500" : "border-red-500"
            }  shadow-md flex items-center justify-between`}
            key={item.id}>
            {item.text}
            <div className="flex items-center gap-x-1">
              <button
                onClick={() => handleCheck(item.id)}
                className="bg-zinc-800 text-zinc-50 text-lg font-semibold p-2 rounded-md">
                <BiCheck />
              </button>
              <button className="bg-zinc-800 text-zinc-50 text-lg font-semibold p-2 rounded-md">
                <BiTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
