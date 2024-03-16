import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChartLine,
  faTableCellsLarge,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import "./Menu.scss";

// Interface for event handlers
interface MenuProps {
  onHomeClick: () => void;
  onChartClick: () => void;
  onTableClick: () => void;
  onPlusClick: () => void;
}

const Menu: React.FC<MenuProps> = ({
  onHomeClick,
  onChartClick,
  onTableClick,
  onPlusClick,
}) => {
  return (
    <aside
      id="menu"
      className="menu d-flex flex-column align-items-center justify-content-center position-absolute"
    >
      <div className="d-flex flex-column align-items-center justify-content-center p-3 gap-5">
        <FontAwesomeIcon
          className="clickable shadow-word"
          size="2xl"
          icon={faHome}
          onClick={onHomeClick}
          inverse
        />
        <FontAwesomeIcon
          className="clickable shadow-word"
          size="2xl"
          icon={faChartLine}
          onClick={onChartClick}
          inverse
        />
        <FontAwesomeIcon
          className="clickable shadow-word"
          size="2xl"
          icon={faTableCellsLarge}
          onClick={onTableClick}
          inverse
        />
        <FontAwesomeIcon
          className="clickable shadow-word"
          size="2xl"
          icon={faSquarePlus}
          onClick={onPlusClick}
          inverse
        />
      </div>
    </aside>
  );
};

export default Menu;
