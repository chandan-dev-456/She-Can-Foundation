import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <>
        <div className="container-fluid bg-light px-0 ">
            <div className="p-3 shadow bg-white text-center mb-4">
                <h1
                    className="fw-bold text-primary"
                    style={{ letterSpacing: "1px" }}
                >
                    Admin Dashboard
                </h1>
                <p className="text-secondary mt-2">
                    Manage messages, users, and activities.
                </p>
            </div>
        </div>
        <Outlet />
        </>
    );
}
export default Layout;