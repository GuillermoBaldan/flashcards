import React, { useState, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./EditorMD.scss"; // Importa tu archivo CSS personalizado para el estilo

interface EditorMDProps {
  showModal: boolean;
  onClose: () => void;
  onSave: (content: string) => void;
  initialContent?: string; // Prop opcional para el contenido inicial
}

const EditorMD: React.FC<EditorMDProps> = ({
  showModal,
  onClose,
  onSave,
  initialContent = "",
}) => {
  const [editorValue, setEditorValue] = useState(initialContent);
  const quillRef = useRef<ReactQuill.Quill>(null); // Ref para acceder a la instancia de ReactQuill

  // Configuración completa de la barra de herramientas (incluye todas las funcionalidades)
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }], // H1, H2, H3, H4, H5, H6, normal paragraph
      ["bold", "italic", "underline", "strike", "blockquote"], // Formato básico
      [{ font: [] }], // Opciones de fuente (considera agregar fuentes específicas deseadas)
      [{ size: ["small", false, "large", "huge"] }], // Opciones de tamaño de fuente (considera agregar tamaños específicos deseados)
      [{ color: [] }, { background: [] }], // Seleccionadores de color y fondo
      [{ list: "ordered" }, { list: "bullet" }], // Lista ordenada y viñetas
      [{ indent: "-1" }, { indent: "+1" }], // Sangría izquierda y derecha
      [{ direction: "rtl" }], // Dirección del texto (de izquierda a derecha o de derecha a izquierda)
      [{ align: [] }], // Alineación (izquierda, centro, derecha, justificada)
      ["link", "image", "video"], // Inserción de enlaces, imágenes y vídeos
      ["clean"], // Botón para limpiar el formato
      ["code-block"], // Bloque de código
      ["formula"], // Fórmula
      ["table"], // Tabla
      ["history"], // Deshacer y rehacer
      ["fullscreen"], // Pantalla completa
      ["help"], // Ayuda
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "direction",
    "align",
    "link",
    "image",
    "video",
    "color",
    "background",
    "code-block",
    "formula",
    "table",
    "history",
  ];

  const handleSave = () => {
    const cleanedContent = quillRef.current?.getEditorContents?.(); // Accede al contenido usando useRef (más confiable)
    if (cleanedContent) {
      onSave(cleanedContent); // Pasa el contenido limpio a la función onSave
      onClose();
    }
  };

  return (
    <Modal show={showModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar tarjeta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ReactQuill
          ref={quillRef} // Asigna el ref para acceder a la instancia de ReactQuill
          value={editorValue}
          onChange={setEditorValue}
          modules={modules}
          formats={formats}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditorMD;
