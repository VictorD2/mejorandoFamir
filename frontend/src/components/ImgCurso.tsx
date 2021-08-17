import React from "react";

// Interfaces
type gravatar = { className: string; url: string };

const ImgCurso: React.FC<gravatar> = (props) => {
  return <img className={props.className} src={props.url} alt="Foto Curso" />;
};

export default ImgCurso;
