/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useRef } from "react";

// Iconos
import { FaChevronDown } from "react-icons/fa";

// Interfaces
interface Props {
  comentario: string;
}

const CajaComentario:React.FC<Props> = (props) => {
  const refComentario = useRef<HTMLParagraphElement | null>();
  const refBtn = useRef<HTMLButtonElement | null>();
  const refDifumino = useRef<HTMLDivElement | null>();

  const setDimention = () => {
    if (refComentario.current) {
      if (props.comentario.length > 1200) {
        refComentario.current.classList.add("hide-comentario");
        return;
      }
      if (refDifumino.current) refDifumino.current.classList.add("d-none");
      if (refBtn.current) refBtn.current.classList.add("d-none");
    }
  };

  const verMas = () => {
    if (refComentario.current) {
      refComentario.current.classList.remove("hide-comentario");
      if (refBtn.current) refBtn.current.classList.add("d-none");
      if (refDifumino.current) refDifumino.current.classList.add("d-none");
    }
  };

  useEffect(() => {
    if (refComentario.current) {
      const newDescripcion = props.comentario.replace(/\n/g, "<br/>");
      refComentario.current.innerHTML = newDescripcion;
    }
    setDimention();
    return () => {};
  }, []);

  return (
    <>
      <div className="comentario position-relative">
        <p className="pe-4" style={{ textAlign: "justify" }} ref={(node) => (refComentario.current = node)}></p>
        <div ref={(node) => (refDifumino.current = node)} className="position-absolute difumino"></div>
      </div>
      <button onClick={() => verMas()} className="btn btn-sm ms-4" ref={(node) => (refBtn.current = node)} style={{ color: "var(--azul-oscuro)" }}>
        <FaChevronDown /> Ver más
      </button>
    </>
  );
};

export default CajaComentario;
