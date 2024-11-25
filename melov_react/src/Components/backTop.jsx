import React, { useState, useEffect } from "react";
import "./backTop.css";

const BackTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calcula si el desplazamiento supera el 110% de la altura de la ventana
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      setIsVisible(scrollPosition > windowHeight * 0.1);
    };

    // Agrega el evento de desplazamiento
    window.addEventListener("scroll", handleScroll);

    // Limpia el evento al desmontar el componente
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      className={`btn bd-purple text-white px-2 back-to-top ${
        isVisible ? "visible" : ""
      }`}
      onClick={scrollToTop}
    >
      <i class="fs-5 bi bi-arrow-up-short"></i>
    </button>
  );
};

export default BackTop;
