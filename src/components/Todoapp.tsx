import React from "react";
import Todos from "./Todos";
import Todoapp1 from "./Todoapp1";

const Todoapp = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 w-full min-h-screen flex flex-col items-center gap-y-10">
      {/* <h1 className="text-2xl font-semibold text-zinc-100 mt-10">
        Todos with Poetry
      </h1> */}
      {/* <Todos /> */}
      <Todoapp1 />
    </div>
  );
};

export default Todoapp;
