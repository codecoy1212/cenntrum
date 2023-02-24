import React from "react";
import menu from "../../img/menu.png";
import setting from "../../img/setting.png";
import logo from "../../img/logo.png";

import "./header.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="header">
      <div>
        <Link to="menu">
          <img src={menu} alt="" />
        </Link>
      </div>
      <hr />
      <div>
        <Link to="/">
          <img src={logo} alt="" style={{ height: "150px" }} />
        </Link>
      </div>
      <hr />
      <div>
        <Link to="profile">
          <img src={setting} alt="" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
