import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import DashboardLayout from "../layout/DashboardLayout";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    try {
      let res = await axiosInstance.get("/note/read");
      setNotes(res.data.data);
    } catch (error) {
      console.log("error from fetching ", error);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <DashboardLayout>
      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-5xl font-bold text-blue-600">{notes.length}</h2>
          <p className="text-slate-600 mt-2">Total Notes</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-5xl font-bold text-green-600">
            {notes.length}
          </h2>
          <p className="text-slate-600 mt-2">Active Notes</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-5xl font-bold text-red-500">0</h2>
          <p className="text-slate-600 mt-2">Archived Notes</p>
        </div>
      </div>

      {/* Recent Notes */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-blue-600">Recent Notes</h2>
          <button
            onClick={() => navigate("/notes")}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            View All
          </button>
        </div>

        <div className="space-y-4">
          {notes.slice(0, 3).map((note) => (
            <div
              key={note._id}
              className="bg-white cursor-pointer shadow rounded-xl p-5 border-l-4 border-blue-600"
              onClick={() => navigate(`/note/${note._id}`)}
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold text-lg">{note.title}</h3>
                  <p className="text-slate-500">{note.description}</p>
                </div>
                <span className="text-slate-400">recent</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
