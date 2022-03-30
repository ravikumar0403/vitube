import { useState } from "react";
import logo from "asset/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "services";
import { useAuth } from "context/auth-context";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { dispatch } = useAuth();

  const handleLogoutClick = () => {
    setIsOpen(false);
    logout(dispatch);
  };

  return (
    <nav>
      <div className="nav-section left">
        <ul className="nav-menu">
          <li className="nav-logo nav-menu-item mr-2">
            <Link to="/">
              <img loading="lazy" src={logo} alt="logo" />
            </Link>
          </li>
        </ul>
      </div>
      <div className="nav-section right nav-menu">
        <div className="input-icon ml-auto mr-1">
          <input
            width={"700px"}
            className="input"
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn icon-only text-light">
            <i className="fa fa-search"></i>
          </button>
        </div>

        {"user" ? (
          <div className="dropdown">
            <button
              className="btn icon-only text-light"
              onClick={() => {
                setIsOpen((isOpen) => !isOpen);
              }}
            >
              <i className="fs-2 fa-solid fa-user"></i>
            </button>
            <ul
              className="dropdown-menu"
              style={isOpen ? { display: "block", right: 0 } : {}}
            >
              <li className="dropdown-item" onClick={handleLogoutClick}>
                Logout
              </li>
            </ul>
          </div>
        ) : (
          <li className="nav-menu-item mx-1">
            <button
              className="btn primary"
              onClick={() => navigate("/login", { state: { from: pathname } })}
            >
              Login
            </button>
          </li>
        )}
      </div>
      <div className="nav-menu-resp">
        <i className="fas fa-bars"></i>
      </div>
    </nav>
  );
};
