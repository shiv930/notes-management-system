import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import DashboardLayout from "../layout/DashboardLayout";

const EditNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    axiosInstance.get(`/note/single/${id}`).then((res) => {
      reset(res.data.data); // 👈 form me data set karo
    });
  }, [id, reset]);

  const onSubmit = async (data) => {
    await axiosInstance.patch(`/note/update/${id}`, data);
    navigate("/notes");
  };

  return (
    <DashboardLayout>
      <h2 className="text-3xl font-bold mb-6 text-blue-600">Edit Note</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl shadow w-full max-w-5xl"
      >
        <label className="font-semibold">Title</label>
        <input
          type="text"
          {...register("title")}
          className="w-full mt-2 mb-4 px-4 py-2 border rounded-lg"
        />

        <label className="font-semibold">Content</label>
        <textarea
          {...register("description")}
          className="w-full mt-2 px-4 py-2 border rounded-lg h-40"
        />

        <div className="flex gap-4 mt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-5 py-2 rounded-lg bg-slate-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-blue-600 text-white"
          >
            Update Note
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default EditNote;
