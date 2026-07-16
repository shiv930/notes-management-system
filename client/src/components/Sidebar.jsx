import {
  LayoutDashboard,
  NotebookPen,
  PlusCircle,
  User,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import axiosInstance from "../api/axiosInstance";
import { useDispatch } from "react-redux";
import { removeUser } from "../features/authReducer";

const Sidebar = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const linkClass =
    "flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition";

  const handleLogout = async () => {
    await axiosInstance.post("/auth/logout");
    dispatch(removeUser());
    navigate("/");
  };

  return (
    <div className="w-72 bg-gradient-to-b from-black via-slate-950 to-blue-950 text-white p-6 flex flex-col">
      <h1 className="text-3xl font-bold mb-10">📝 Notes App</h1>

      <nav className="flex flex-col gap-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-blue-600" : ""}`
          }
        >
          <LayoutDashboard size={22} />
          Dashboard
        </NavLink>

        <NavLink
          to="/notes"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-blue-600" : ""}`
          }
        >
          <NotebookPen size={22} />
          My Notes
        </NavLink>

        <NavLink
          to="/add-note"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-blue-600" : ""}`
          }
        >
          <PlusCircle size={22} />
          Add Note
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-blue-600" : ""}`
          }
        >
          <User size={22} />
          Profile
        </NavLink>

        <button
          onClick={() => handleLogout()}
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-600 mt-auto"
        >
          <LogOut size={22} />
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
