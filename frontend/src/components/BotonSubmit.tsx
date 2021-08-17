import React from "react";

// Interfaces
type nameButton = { name: string };

const Boton: React.FC<nameButton> = (props) => {
  return (
    <button type="submit" className="btn btn__more mt-5" style={{ marginBottom: "5rem" }}>
      {props.name}
    </button>
  );
};

export default Boton;
