// eslint-disable-next-line no-unused-vars

import React, { useState } from "react";
import FooterNav from "./Footer";
import { useSelector } from "react-redux";
import LoginPage from "../Pages/LoginPage";
import { Link } from "react-router-dom";

const CreatePost = () => {
  const [todo, setTodo] = useState("");
  const [priority, setPriority] = useState("normal");
  const userInfo = useSelector((state) => state.user.user);

  const handlePriority = (e) => {
    console.log(e.target.value);
    setPriority(e.target.value);
  };

  const handleCreateTask = async (e) => {
    const newPost = { todo, priority };

    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/createPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
        credentials: "include",
      });
      if (!response.ok) {
        const error = await response.json();
        console.log(error);
        return;
      }
      const res = await response.json();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[90vh] flex flex-col gap-5 p-3">
      <Link to={"/home"} className="underline">
        Back to homepage
      </Link>
      {userInfo?.userName ? (
        <form
          onSubmit={handleCreateTask}
          className="flex flex-col items-center w-3/5 mx-auto gap-4 p-3"
        >
          <input
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            type="text"
            className="p-2 text-black bg-white"
            placeholder="Task title"
          />
          <select
            onChange={(e) => handlePriority(e)}
            className="bg-white text-gray-900 w-full p-2"
          >
            <option value="normal">Piority(Normal)</option>
            <option value="medium">Priority(Medium)</option>
            <option value="high">Priority(High)</option>
          </select>
          <button className="bg-orange-600 w-full p-3">Add to list </button>
        </form>
      ) : (
        <LoginPage />
      )}

      {/* <FooterNav /> */}
    </div>
  );
};

export default CreatePost;
