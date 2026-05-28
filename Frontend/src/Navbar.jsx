import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container">

        <Link className="navbar-brand brand" to="/">
          She Can Foundation
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarContent"
        >
          <ul className="navbar-nav gap-lg-4 text-center" style={{ fontSize: "1.2rem" }}>

            <li className="nav-item" >
              <Link className="nav-link nav-custom" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item" >
              <Link className="nav-link nav-custom" to="/admin" >
                Admin Panel
              </Link>
            </li>
            <li className="nav-item" >
              <Link className="nav-link nav-custom" to="/dashboard" >
                Dashboard
              </Link>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;