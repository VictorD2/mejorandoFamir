import React, { useRef } from "react";

// Interfaces
interface Props {
  funcion: (text: string) => void;
  placeholder: string;
  tooltip: string;
}

const Buscador: React.FC<Props> = (props) => {
  const refInput = useRef<HTMLInputElement | null>();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (refInput.current) props.funcion(refInput.current.value);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") props.funcion(e.target.value);
  };
  return (
    <div className="d-flex justify-content-between input-group">
      <input onChange={handleInputChange} ref={(node) => (refInput.current = node)} name="buscar" data-bs-toggle="tooltip" data-bs-placement="top" title={props.tooltip} type="text" placeholder={props.placeholder} className="form-control" />
      <span className="input-group-append">
        <button onClick={handleClick} type="button" className="btn btn__blue btn-flat">
          <i className="fas fa-search"></i>
        </button>
      </span>
    </div>
  );
};

export default Buscador;
