import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {

    const token = localStorage.getItem("token");

    if (!token) {
        toast("Admin access required");
        return <Navigate to="/admin" />;
    }

    return <Outlet />;

}