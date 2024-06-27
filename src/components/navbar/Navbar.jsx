import React from "react";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar_main glass_bg">
      <ul>
        <li>Movie List</li>
        <li>
          <i className="fa-solid fa-circle-user"></i>{" "}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
