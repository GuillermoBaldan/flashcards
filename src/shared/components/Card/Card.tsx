import React from "react";
import "./Card.scss";
import { CardProps } from "@types";

const Card: React.FC<CardProps> = ({ isSelected, children }) => {
  const truncatedText =
    children.length > 55 && !isSelected
      ? `${children.slice(0, 55)}...`
      : children;

  return (
    <div
      className={`Card text-center h-100 fs-5 p-3 ${isSelected ? "isSelected" : ""}`}
    >
      {truncatedText}
    </div>
  );
};

export default Card;
