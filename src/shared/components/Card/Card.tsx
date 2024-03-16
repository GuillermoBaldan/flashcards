import React, { ReactNode } from "react";
import "./Card.scss";

interface CardProps {
  children: ReactNode;
}

export default function Card({ children }: CardProps) {
  return <div className="Card h-100 py-4 px-5">{children}</div>;
}
