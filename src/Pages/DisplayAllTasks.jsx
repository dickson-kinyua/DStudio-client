import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteAllTasks,
  updateTasks,
  fetchTodo,
} from "../Features/Slices/taskSlice";
import { Link } from "react-router-dom";

const DisplayAllTasks = () => {
  const tasks = useSelector((state) => state.task.tasks);
  console.log(tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  const handleCompleted = async (id) => {
    const updated = tasks?.map((task) =>
      task._id === id ? { ...task, completed: "!completed" } : task
    );
    console.log(updated);
    dispatch(updateTasks(updated));

    try {
      console.log(id);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/editPost/${id}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      dispatch(fetchTodo()); // Refresh tasks only if update succeeds
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const clearTasks = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/deleteAllPosts`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete all tasks");
      }

      dispatch(deleteAllTasks());
      dispatch(fetchTodo());
    } catch (error) {
      console.error("Error clearing tasks:", error);
    }
  };

  return (
    <div className="flex flex-col gap-5 p-5 h-[90vh]">
      <Link to={"/home"} className="underline">
        Back to homepage
      </Link>
      <p className="font-bold text-2xl">
        {tasks?.length === 0
          ? "Make your day productive"
          : `Today you have ${tasks.length} tasks!`}
      </p>
      <div className="flex flex-col gap-2 bg-gray-600 h-[20vh] p-1">
        <p className="font-semibold text-xl h-[4vh]">High priority🔥</p>
      </div>
      <div className="flex flex-col gap-2 bg-gray-600 h-[25vh] p-1 overflow-x-hidden">
        <p className="font-semibold text-xl">Today tasks</p>
        <ul className="pl-1">
          {tasks.map((task) => (
            <li
              className={`flex flex-row gap-2 ${
                task.completed ? "line-through text-gray-100" : ""
              }`}
              key={task._id}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleCompleted(task._id)}
              />
              {task.todo}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-2 bg-gray-600 h-[25vh] p-1 overflow-x-hidden">
        <p className="font-semibold text-xl h-[3vh]">Completed tasks</p>
        <ul className="pl-1 h-[22vh]">
          {tasks
            ?.filter((task) => task.completed)
            .map((task, index) => (
              <li
                className={`flex flex-row gap-2 ${
                  task.completed ? "line-through text-gray-100" : ""
                }`}
                key={index}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleCompleted(task._id)}
                />
                {task.todo}
              </li>
            ))}
        </ul>
      </div>
      <button className="bg-gray-200 text-gray-950 p-2" onClick={clearTasks}>
        Clear list
      </button>
    </div>
  );
};

export default DisplayAllTasks;
