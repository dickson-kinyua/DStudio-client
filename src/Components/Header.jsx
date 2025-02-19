import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../Features/Slices/UserSlice";
import { Link } from "react-router-dom";
import { deleteAllTasks, logout } from "../Features/Slices/taskSlice";

const Header = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.user);

  const logout = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
      credentials: "include",
      method: "POST",
    });

    const data = await response.json();

    if (!response.ok) {
      console.log("Logout error:", data);
      return;
    }

    // Clear Redux state
    dispatch(logout()); 
    dispatch(updateUser({})); 

    // Prevent stale data on refresh
    dispatch(deleteAllTasks()); 

  } catch (error) {
    console.error("Error during logout:", error);
  }
};
  

  return (
    <div className="flex flex-row items-center justify-between bg-gray-200 rounded-2xl p-2">
      <div className="font-bold">
        <p>DStudio</p>
      </div>
      <div className="flex flex-row gap-4 items-center">
        <p>{new Date().toLocaleDateString()}</p>
        {authUser?.isAuthenticated (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </div>
    </div>
  );
};

export default Header;
