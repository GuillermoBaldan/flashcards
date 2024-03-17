import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChartLine,
  faTableCellsLarge,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import "./Menu.scss";

const Menu = () => {
  return (
    <aside
      id="menu"
      className="menu d-flex flex-column align-items-center justify-content-center position-absolute"
    >
      <div className="d-flex flex-column align-items-center justify-content-center p-3 gap-5">
        <NavLink to="/">
          <FontAwesomeIcon
            className="clickable shadow-word"
            size="2xl"
            icon={faHome}
            inverse
          />
        </NavLink>
        <NavLink to="/charts">
          <FontAwesomeIcon
            className="clickable shadow-word"
            size="2xl"
            icon={faChartLine}
            inverse
          />
        </NavLink>
        <NavLink to="/tables">
          <FontAwesomeIcon
            className="clickable shadow-word"
            size="2xl"
            icon={faTableCellsLarge}
            inverse
          />
        </NavLink>
        <FontAwesomeIcon
          className="clickable shadow-word"
          size="2xl"
          icon={faSquarePlus}
          inverse
        />
      </div>
    </aside>
  );
};

export default Menu;
