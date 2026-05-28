import Navbar from "../Navbar";
import "../Navbar.css"
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <section className="home">
            <Navbar />
            <div className="overlay">
                <Outlet />
            </div>
        </section>
    );
}

export default Layout;