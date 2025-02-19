import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, invalidateUser} from "../Features/Slices/UserSlice";
import { Link } from "react-router-dom";
import { deleteAllTasks, logout } from "../Features/Slices/taskSlice";

const Header = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.user);

  const logout = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
      credentials: "include",
      method: "POST",
    });

    if (!response.ok) {
      const error=await response.json()
      console.log("Logout error:", error);
      return;
    }
    const data = await response.json()
    console.log(data)

    // Clear Redux state
    dispatch(invalidateUser())

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
        {userInfo?.userName ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </div>
    </div>
  );
};

export default Header;
