/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

//Iconos
import { FaTimes } from "react-icons/fa";

//Services
import * as materialServices from "../../../../services/MaterialServices";

//Interfaces
import { MaterialClase } from "../../../../interfaces/MaterialClase";
import { toast } from "react-toastify";

interface Props {
  material_clase: MaterialClase;
  setCountMaterial: (countMaterial: number) => void;
  countMaterial: number;
}
const MaterialClaseItem: React.FC<Props> = (props) => {
  const [material, setMaterial] = useState<MaterialClase>();

  useEffect(() => {
    setNombre(props.material_clase);
    return () => {};
  }, []);

  const setNombre = (material: MaterialClase) => {
    setMaterial(material);
  };

  const eliminarMaterial = async () => {
    const res = await materialServices.eliminarMaterial(props.material_clase.id_material_clase + "");
    if (res.data.error) return toast.error(res.data.error);
    props.setCountMaterial(props.countMaterial + 1);
  };

  return (
    <>
      <div className="d-flex my-1">
        <a download={material?.nombre_material} className="list-group-item list-group-item-action list-group-item-primary text-nowrap text-truncate" target="__blank" href={props.material_clase.url_material}>
          {material?.nombre_material}
        </a>
        <button onClick={() => eliminarMaterial()} className="btn btn-danger bg-gradient ms-1">
          <FaTimes className="fs-4" />
        </button>
      </div>
    </>
  );
};

export default MaterialClaseItem;
