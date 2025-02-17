import React from "react";
import { useSelector } from "react-redux";

const Welcoming = () => {
  const userInfo = useSelector((state) => state.user.user);
  console.log(userInfo);

  return (
    <div className="w-full mt-5">
      <p className="text-2xl font-semibold text-center">
        Welcome back, {userInfo.userName}!
      </p>
    </div>
  );
};

export default Welcoming;
