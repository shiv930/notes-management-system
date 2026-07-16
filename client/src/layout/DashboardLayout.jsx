import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 p-10">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
