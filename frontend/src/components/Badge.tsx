import React from "react";

// Interfaces
type myProps = { name: string };

const Badge: React.FC<myProps> = (props) => {
  return (
    <div className="Badge__container show">
      <div className="Box">
        <span className="fw-bold fs-1">{props.name}</span>
      </div>
    </div>
  );
};

export default Badge;
