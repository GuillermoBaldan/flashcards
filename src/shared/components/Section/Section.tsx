import React from "react";
import "./Section.scss";
import { SectionProps } from "@types";

export default function Section({ children }: SectionProps) {
  return <div className="Section h-100 p-4">{children}</div>;
}
