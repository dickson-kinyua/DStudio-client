import React from "react";
import { useSelector } from "react-redux";

const Welcoming = () => {
  const userInfo = useSelector((state) => state.user.user);
  const tasks = useSelector((state) => state.task.tasks) || [];
  const totalTasks = tasks.length;
  const completedTasks = tasks.reduce(
    (count, task) => count + (task.completed ? 1 : 0),
    0
  );

  return (
    <div className="w-full mt-5">
      <p className="text-xl font-semibold text-center">
        {completedTasks >= 0.5 * totalTasks
          ? "Yuhuu, your work is almost done!"
          : `Welcome back, ${userInfo.userName}!`}
      </p>
    </div>
  );
};

export default Welcoming;
