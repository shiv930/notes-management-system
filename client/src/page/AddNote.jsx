import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import axiosInstance from "../api/axiosInstance";
import DashboardLayout from "../layout/DashboardLayout";

const AddNote = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      let res = await axiosInstance.post("/note/create", data);
      
      navigate("/notes");
    } catch (error) {
      console.log("error from creating note", error);
    }
  };

  return (
    <DashboardLayout>
      <h2 className="text-3xl font-bold mb-6 text-blue-600">Add New Note</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl shadow w-full max-w-5xl"
      >
        <label className="font-semibold">Title</label>
        <input
          type="text"
          {...register("title")}
          placeholder="Enter note title"
          className="w-full mt-2 mb-4 px-4 py-2 border rounded-lg"
        />

        <label className="font-semibold">Content</label>
        <textarea
          {...register("description")}
          placeholder="Write your note here..."
          className="w-full mt-2 px-4 py-2 border rounded-lg h-40"
        />

        <div className="flex gap-4 mt-6">
          <button className="px-5 py-2 rounded-lg bg-slate-300">Cancel</button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-blue-600 text-white"
          >
            Save Note
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default AddNote;
