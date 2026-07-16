import { Bell } from "lucide-react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const Navbar = ({ title = "Dashboard" }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex justify-between items-center mb-10">
      <div>
        <h1 className="text-4xl font-bold text-slate-800">{title}</h1>
        <p className="text-slate-500">
          {user ? `Welcome back, ${user.name} 👋` : "Loading..."}
        </p>
      </div>

      <div className="flex items-center gap-6">
        <Bell size={28} className="cursor-pointer text-slate-700" />

        <div
          onClick={() => navigate("/profile")}
          className="w-12 h-12 rounded-full bg-slate-300 flex items-center justify-center text-xl font-bold text-slate-700 cursor-pointer"
        >
          {user ? user.name.charAt(0).toUpperCase() : "?"}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
