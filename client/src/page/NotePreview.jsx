import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import DashboardLayout from "../layout/DashboardLayout";

const NotePreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);

  useEffect(() => {
    axiosInstance.get(`/note/single/${id}`).then((res) => {
      setNote(res.data.data);
    });
  }, [id]);
  if(!note)return <DashboardLayout><p>Loading....</p></DashboardLayout>

  return (
    <DashboardLayout title={note?.title}>
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-slate-300 px-4 py-2 rounded-lg"
      >
        ← Back
      </button>

      <div className="bg-white p-6 rounded-xl shadow max-w-3xl">
        <h2 className="text-2xl font-bold mb-4">{note?.title}</h2>
        <p className="text-slate-600 whitespace-pre-line">
  {note?.description}
</p>

        
      </div>
    </DashboardLayout>
  );
};

export default NotePreview;
