import React from "react";
import "./Footer.scss";

export default function Footer() {
  const currentYear = new Date().getFullYear(); // Obtener el año actual

  return (
    <footer className="p-4 fs-6 position-absolute bottom-0 end-0">
      © {currentYear} Paolo Saavedra & Guillermo Baldán. Todos los derechos
      reservados.
    </footer>
  );
}
