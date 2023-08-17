import { Fragment, useState } from "react";
import { MouseEvent } from "react";
import { Link } from "react-scroll";
import "../css/Header.css";

import vNumberLogo from "../assets/VNumberLogo.svg";
import FacebookIcon from "../assets/FacebookIcon.svg";
import InstagramIcon from "../assets/InstagramIcon.svg";

interface navItems {
  title: string;
  link: string;
}

interface HeaderProps {
  navItems: navItems[];
}

function Header(props: HeaderProps) {
  const navBar = (
    <ul id="nav-link" className="nav">
      {props.navItems.map((navItems, index) => (
        <li className="nav-item" key={navItems.link}>
          <Link
            className="nav-link"
            to={navItems.link}
            smooth={true}
            duration={80}
          >
            {navItems.title}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <div id="background_image">
        <div></div>
        <div className="container">
          <div className="row justify-content-center align-items-end">
            <div className="col-3">
              <img src={vNumberLogo} alt="V Number Logo" />
            </div>
            <div className="col-7"> {navBar}</div>
            <div className="col-2 icon-button">
              <div className="d-flex justify-content-end">
                <img
                  id="facebook_icon"
                  src={FacebookIcon}
                  alt="Facebook Icon"
                />
                <img src={InstagramIcon} alt="Instagram Icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
