import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";
import "./Nav.scss";

export default function Nav() {
  const { setActiveModal } = useModal();
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <nav className="nav">
      <Link to={"/"} className="nav__header">
        Remainder
      </Link>
      <div className="right-links">
        {isLoggedIn ? (
          <button onClick={handleLogout} className="right-links__logout">
            Logout
          </button>
        ) : (
          <>
            <button
              onClick={() => setActiveModal("login")}
              className="right-links__login"
            >
              Login
            </button>
            <button
              onClick={() => setActiveModal("signup")}
              className="right-links__signup"
            >
              Sign up
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
