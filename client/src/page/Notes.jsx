import { useNavigate } from "react-router";
import DashboardLayout from "../layout/DashboardLayout";
import { Pencil, Trash2 } from "lucide-react";
import axiosInstance from "../api/axiosInstance";
import { useState } from "react";
import { useEffect } from "react";

const Notes = () => {
  const navigate = useNavigate();
  const [notes, setnotes] = useState([])

  const deleteNote = async (id) => {
    await axiosInstance.delete(`/note/delete/${id}`);
    alert("Note deleted");
    getNotes();
  };

let getNotes= async()=>{
  let res= await axiosInstance.get("/note/read")
  setnotes(res.data.data)
}
useEffect(()=>{
  getNotes()
},[])
  return (
    <DashboardLayout>
      <div className="flex justify-between mb-6">
        <input
          type="text"
          placeholder="Search notes..."
          className="w-1/2 px-4 py-2 border rounded-lg"
        />

        <button
        onClick={()=>navigate("/add-note")}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg">
          + Add Note
        </button>
      </div>

      <div className="space-y-4">
        {notes.map((note) => (
          <div
  key={note._id}
  onClick={() => navigate(`/note/${note._id}`)} // 👈 preview open
  className="bg-white shadow rounded-xl p-5 flex justify-between items-center hover:shadow-lg cursor-pointer transition"
>
  <div>
    <h3 className="font-bold text-xl text-blue-700">{note.title}</h3>
    <p className="text-slate-500 line-clamp-2">{note.description}</p>
  </div>

  <div className="flex gap-4">
    <Pencil
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/edit-note/${note._id}`);
      }}
      className="text-blue-600 cursor-pointer"
    />
    <Trash2
      onClick={(e) => {
        e.stopPropagation();
        deleteNote(note._id);
      }}
      className="text-red-600 cursor-pointer"
    />
  </div>
</div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Notes;
