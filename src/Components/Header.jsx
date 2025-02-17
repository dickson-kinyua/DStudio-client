import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../Features/Slices/UserSlice";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const logged = useSelector((state) => state.user.user);
  const logout = async () => {
    try {
      const response = await fetch("http://localhost:5000/logout", {
        credentials: "include",
        method: "POST",
      });
      if (!response.ok) {
        const error = await response.json();
        console.log(error);
        return;
      }

      const res = await response.json();
      console.log(res);
      dispatch(updateUser({}));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-row items-center justify-between text-white">
      <div className="font-bold">
        <p>DStudio</p>
      </div>
      <div className="flex flex-row gap-4 items-center">
        <p>{new Date().toLocaleDateString()}</p>
        {logged?.userName ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </div>
    </div>
  );
};

export default Header;
