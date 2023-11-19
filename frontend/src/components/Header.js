import React from "react";

import HomeIcon from "@material-ui/icons/Home";
import FeaturedPlayListOutlinedIcon from "@material-ui/icons/FeaturedPlayListOutlined";
import {
  AssignmentTurnedInOutlined,
  // Close,
  NotificationsOutlined,
  PeopleAltOutlined,
  Search,
  // ExpandMore,
} from "@material-ui/icons";
import './css/Header.css'

import logo from "./../assets/smalllogo.ico";
import { Avatar } from "@material-ui/core";

function Header() {
  return (
    <div className="header">
      <div className="header-content">
        <div className="header__logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="header__icons">
          <div className="header__icon">
            <HomeIcon />
          </div>
          <div className="header__icon">
            <FeaturedPlayListOutlinedIcon />
          </div>
          <div className="header__icon">
            <AssignmentTurnedInOutlined />
          </div>
          <div className="header__icon">
            <PeopleAltOutlined />
          </div>
          <div className="header__icon">
            <NotificationsOutlined />
          </div>
        </div>
        <div className="header__input">
          <Search />
          <input type="text" placeholder="Search On CS" />
          <div className="header__Rem">
            <Avatar/>
        </div>
        </div>
       
      </div>
    </div>
  );
}

export default Header;
