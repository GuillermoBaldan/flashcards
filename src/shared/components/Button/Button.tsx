import React, { ReactNode, useState } from "react";
import "./Button.scss";
import { Button as BsButton } from "react-bootstrap";
import { ButtonProps } from "@types";

const Button: React.FC<ButtonProps> = ({ className, onClick, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleMouseDown = () => {
    setIsActive(true);
  };

  const handleMouseUp = () => {
    setIsActive(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <BsButton
      className={`${className} custom-button`}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </BsButton>
  );
};

export default Button;
