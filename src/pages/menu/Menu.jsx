import React from "react";
import "./menu.css";
import user from "../../img/user.png";
import gift from "../../img/gift.png";
import incentive from "../../img/incentive.png";
import crypto from "../../img/crypto.png";
import point from "../../img/point.png";
import setting from "../../img/setting.png";
import sponsor from "../../img/sponsor.png";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../../redux/features/authSlice";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

const Menu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/");
    window.location.reload();
  };
  return (
    <div className="menu">
      <div className="menu-wrapper">
        <div className="menu-item">
          <Link to="/users">
            <div className="menu-link">
              <img src={user} alt="" />
              Users
            </div>
          </Link>
        </div>
        {/* <div className='menu-item'>
          <Link to='/sponsors'>
            <div className='menu-link'>
              <img src={sponsor} alt='' />
              Sponsors
            </div>
          </Link>
        </div> */}
        <div className="menu-item">
          <Link to="/earnedpoints">
            <div className="menu-link">
              <img src={point} alt="" />
              Earned Points
            </div>
          </Link>
        </div>
        <div className="menu-item">
          <Link to="/exchangedPoints">
            <div className="menu-link">
              <img src={point} alt="" />
              Exchange Points
            </div>
          </Link>
        </div>
        <div className="menu-item">
          <Link to="/createIncentive">
            <div className="menu-link">
              <img src={incentive} alt="" />
              Create Incentives
            </div>
          </Link>
        </div>
        <div className="menu-item">
          <Link to="/incentives">
            <div className="menu-link">
              <img src={incentive} alt="" />
              Incentives
            </div>
          </Link>
        </div>
        {/* <div className="menu-item">
          <Link to="/sendGift">
            <div className="menu-link">
              <img src={gift} alt="" />
              Send Gift Card
            </div>
          </Link>
        </div> */}
        <div className="menu-item">
          <Link to="/sendCrypto">
            <div className="menu-link">
              <img src={crypto} alt="" />
              Send Crypto Assets
            </div>
          </Link>
        </div>
        <div className="menu-item">
          <Link to="/coinPackages">
            <div className="menu-link">
              <img src={point} alt="" />
              Coin Packages
            </div>
          </Link>
        </div>
        <div className="menu-item">
          <Link to="/addSubscription">
            <div className="menu-link">
              <img src={point} alt="" />
              Add Subscriptions
            </div>
          </Link>
        </div>
       
        <div className="menu-item">
          <Link to="/businessList">
            <div className="menu-link">
              <img src={point} alt="" />
              Business List
            </div>
          </Link>
        </div>
        <div className="menu-item">
          <Link to="/createBusiness">
            <div className="menu-link">
              <img src={point} alt="" />
              Create Business
            </div>
          </Link>
        </div>
        <div className="menu-item">
          <Link to="/appSetting">
            <div className="menu-link">
              <img src={point} alt="" />
              App Setting
            </div>
          </Link>
        </div>
      </div>
      <div className="menu-logout" onClick={() => handleLogout()}>
        Logout
      </div>
    </div>
  );
};

export default Menu;
