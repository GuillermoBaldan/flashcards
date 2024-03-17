import React, { useState, useEffect, useRef, ReactNode } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Menu from "./Menu/Menu";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [menuWidth, setMenuWidth] = useState<number>(0);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Función para obtener el ancho del menú
    const getMenuWidth = () => {
      const menuElement = document.querySelector("#menu") as HTMLElement;
      if (menuElement) {
        setMenuWidth(menuElement.clientWidth);
      }
    };

    getMenuWidth(); // Obtener el ancho del menú inicialmente

    // Escuchar cambios en el tamaño de la ventana para ajustar el ancho del menú
    const handleResize = () => {
      getMenuWidth();
    };

    window.addEventListener("resize", handleResize);

    // Limpiar el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Ajustar el tamaño del main
    if (mainRef.current) {
      mainRef.current.style.marginLeft = `${menuWidth}px`;
    }
  }, [menuWidth]);

  return (
    <div>
      <Header />
      <Menu />
      <main ref={mainRef}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
