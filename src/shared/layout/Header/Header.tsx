import React from "react";
import "./Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const onBarsClick = () => {};

  return (
    <header
      id="header"
      className="d-flex align-items-center text-light py-3 px-4 position-relative shadow"
    >
      <FontAwesomeIcon
        className="clickable shadow-word"
        id="menu-icon"
        size="2xl"
        icon={faBars}
        onClick={onBarsClick}
      />
      <a className="ps-5 m-0 shadow-word fs-2 text-decoration-none text-white">
        FlashCards
      </a>
    </header>
  );
}
