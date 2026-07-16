import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import DashboardLayout from "../layout/DashboardLayout";
import axiosInstance from "../api/axiosInstance";
import { removeUser } from "../features/authReducer";


const Profile = () => {
  const navigate = useNavigate();


  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your profile?")) return;

    try {
      await axiosInstance.delete(`/auth/delete/${user._id}`);
      dispatch(removeUser());   // <-- Redux se user remove
      alert("Profile deleted successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error deleting profile", error);
    }
  };

  if (!user)
    return (
      <DashboardLayout title="Profile">
        <p>Loading...</p>
      </DashboardLayout>
    );
const handleSubmit = async () => {
  const formData = new FormData();

  formData.append("image", image);

  await axiosInstance.post("/api/post", formData);
};


  return (
    <DashboardLayout title="Profile" subtitle="Manage your account details">
      <div className="max-w-5xl bg-white shadow rounded-2xl p-8">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 bg-slate-300 rounded-full flex items-center justify-center text-3xl font-bold text-slate-700">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-800">{user.name}</h2>
            <p className="text-slate-500">{user.email}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="font-semibold">Full Name</label>
            <input
              type="text"
              value={user.name}
              readOnly
              className="w-full mt-2 px-4 py-2 border rounded-lg bg-slate-100"
            />
          </div>

          <div>
            <label className="font-semibold">Email</label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="w-full mt-2 px-4 py-2 border rounded-lg bg-slate-100"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button className="px-5 py-2 rounded-lg bg-slate-300">
              Cancel
            </button>

            <button
              onClick={handleDelete}
              className="px-5 py-2 rounded-lg bg-red-600 text-white"
            >
              Delete Profile
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
