import { useState, useRef } from "react";
import logo from "asset/logo.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { logout } from "services";
import { useAuth } from "context";
import { useOutsideClick } from "hooks";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, dispatch } = useAuth();
  const dropdownRef = useRef();
  useOutsideClick(dropdownRef, () => setIsOpen(false), isOpen);

  const handleLogoutClick = () => {
    setIsOpen(false);
    logout(dispatch);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${query}`);
  };

  const handleClear = (e) => {
    setQuery("");
    if (pathname === "search") navigate("/explore");
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
          <li className="nav-menu-item ml-3 mr-2">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="nav-menu-item mr-2">
            <NavLink to="/explore">Explore</NavLink>
          </li>
        </ul>
      </div>
      <div className="nav-section right nav-menu">
        <form onSubmit={handleSubmit}>
          <div className="input-icon ml-auto mr-1">
            <input
              width={"700px"}
              className="input"
              type="text"
              placeholder="Search"
              value={query}
              required
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                type="button"
                className="btn text-light"
                onClick={handleClear}
              >
                <i class="fa-solid fa-x"></i>
              </button>
            )}
            <button type="submit" className="btn icon-only text-light">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </form>

        {user ? (
          <div className="dropdown" ref={dropdownRef}>
            <button
              className="btn icon-only text-light"
              onClick={() => {
                setIsOpen((isOpen) => !isOpen);
              }}
            >
              <i className="fs-2 fa-solid fa-user"></i>
            </button>
            <ul className={`dropdown-menu ${isOpen && "expanded"}`}>
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
