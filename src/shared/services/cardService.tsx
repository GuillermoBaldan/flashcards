import React from "react";
import { render } from "react-dom";
import EditorMD from "@components/EditorMD/EditorMD";

export const addCard = () => {
  const container = document.createElement("div");
  document.body.appendChild(container);

  const onClose = () => {
    render(null, container);
  };

  const onSave = (content: string) => {
    console.log("Contenido guardado:", content);
  };

  render(
    <EditorMD showModal={true} onClose={onClose} onSave={onSave} />,
    container
  );
};
