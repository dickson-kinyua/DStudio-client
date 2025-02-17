import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteAllTasks, fetchTodo } from "../Features/Slices/taskSlice";
import { Link } from "react-router-dom";

const DisplayAllTasks = () => {
  const tasks = useSelector((state) => state.task.tasks);
  console.log(tasks);
  const dispatch = useDispatch();
  const isChecked = false;

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  const handleCompleted = async (id) => {
    const response = await fetch(`http://localhost:5000/editPost/${id}`, {
      method: "PUT",
    });
    if (!response.ok) {
      const error = await response.json();
      console.log(error);
      return;
    }
    const res = await response.json();
    console.log(res);
    dispatch(fetchTodo());
  };

  const clearTasks = async () => {
    const response = await fetch(`http://localhost:5000/deleteAllPosts`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok) {
      const error = await response.json();
      console.log(error);
      return;
    }
    const res = await response.json();
    console.log(res);
    dispatch(deleteAllTasks());
    dispatch(fetchTodo());
  };

  return (
    <div className="flex flex-col gap-5 p-5 h-[90vh]">
      <Link to={"/home"} className="underline">
        Back to homepage
      </Link>
      <p className="font-bold text-2xl">
        {tasks?.length === 0
          ? "Make your day productive"
          : "Today you have {tasks.length} tasks!"}
      </p>
      <div className="flex flex-col gap-2 bg-gray-600 h-[20vh] p-1">
        <p className="font-semibold text-xl h-[4vh]">High priority🔥</p>
        <ul className="pl-1 grid grid-cols-2 gap-y-1 max-h-[20vh] overflow-x-hidden">
          {tasks
            ?.filter((task) => task.priority === "high")
            .map((task) => (
              <li
                className={`flex flex-row gap-2 task.completed ? "line-through text-gray-100" : ""`}
                key={task._id}
              >
                <input
                  type="checkbox"
                  value={task.completed}
                  checked={task.completed || isChecked}
                  onChange={() => handleCompleted(task._id)}
                />
                <p>{task.todo}</p>
              </li>
            ))}
        </ul>
      </div>
      <div className="flex flex-col gap-2 bg-gray-600 h-[25vh] p-1 overflow-x-hidden">
        <p className="font-semibold text-xl">All other tasks</p>
        <ul className="pl-1">
          {tasks
            ?.filter((task) => task.priority !== "high")
            .map((task) => (
              <li
                className={`flex flex-row gap-2 task.completed ? "line-through text-gray-100" : ""`}
                key={task.todo}
              >
                <input
                  type="checkbox"
                  value={task.completed}
                  checked={task.completed || isChecked}
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
            ?.filter((task) => task.completed === true)
            .map((task) => (
              <li
                className={`flex flex-row gap-2 task.completed ? "line-through text-gray-100" : ""`}
                key={task._createdAt}
              >
                <input
                  type="checkbox"
                  value={task.completed}
                  checked={task.completed || isChecked}
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
