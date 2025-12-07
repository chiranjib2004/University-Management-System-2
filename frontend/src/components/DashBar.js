import React from "react";
import { Link, useNavigate } from "react-router-dom";

function DashBar({ role, setToken, setRole }) {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    if (setToken) setToken(null);
    if (setRole) setRole(null);
    navigate("/");
  }

  return (
    <nav className="main-navbar">
      <button className="main-link logout-btn" onClick={handleLogout}>Logout</button>
      <style>
        {`
        .main-navbar {
          width: 100vw;
          background: linear-gradient(90deg, #263778, #171c3c 88%);
          display: flex;
          gap: 1rem;
          align-items: center;
          justify-content: flex-end;
          padding: 10px 34px 7px 0;
          border-bottom: 3px solid #253e6b66;
        }
        .main-link {
          color: #ffecb3;
          font-weight: 600;
          text-decoration: none;
          font-size: 1.06rem;
          background: none;
          border: none;
          padding: 5px 20px;
          border-radius: 6px;
          transition: background 0.18s, color 0.15s;
          cursor: pointer;
        }
        .main-link:hover, .main-link:focus {
          background: #ffe082;
          color: #2a3366;
        }
        .logout-btn {
          background: #e478d6;
          color: #fff;
          margin-left: 1.5rem;
        }
        .logout-btn:hover, .logout-btn:focus {
          background: #5533d6;
          color: #ffe082;
        }
        `}
      </style>
    </nav>
  );
}

export default DashBar;
