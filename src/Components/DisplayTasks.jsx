import { useDispatch, useSelector } from "react-redux";
import { fetchTodo } from "../Features/Slices/taskSlice";
import React, { useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Link } from "react-router-dom";

const DisplayTasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks) || [];
  // const tasks = [];

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.reduce(
    (count, task) => count + (task.completed ? 1 : 0),
    0
  );
  const completedPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const pieData = [
    { name: "Completed", value: completedPercentage },
    { name: "Remaining", value: 100 - completedPercentage },
  ];
  const colors = ["#0088FE", "#DDDDDD"]; // Blue for completed, gray for remaining

  return (
    <div className="flex flex-col gap-5 h-[72vh] p-2">
      <div className="h-auto flex justify-center w-full">
        <PieChart width={300} height={160} className="h-[20vh]">
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={30}
            outerRadius={60}
            fill="#8884d8"
            paddingAngle={2}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
      <div className="w-full flex items-center justify-center text-black mt-4">
        <Link
          className="bg-white rounded-2xl w-fit text-center p-2"
          to="/addTask"
        >
          + Create new goal
        </Link>
      </div>
      <div className="flex flex-row gap-4">
        <Link to="/tasks" className="underline">
          View all ↗
        </Link>
        <Link to="/priority" className="underline">
          High priority ↗
        </Link>
      </div>

      <div className="h-[20vh] border-solid border-2 border-gray-100">
        <p className="bg-white text-gray-900 p-1">Today's Advice</p>
        <ul className="p-1">
          <li>Remember to get some sunlight ☀️</li>
          <li>Spend time with nature 🌿</li>
          <li>Learn something new 📖</li>
        </ul>
      </div>
    </div>
  );
};

export default DisplayTasks;
