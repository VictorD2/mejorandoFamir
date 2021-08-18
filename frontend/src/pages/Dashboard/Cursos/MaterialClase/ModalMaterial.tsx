import React, { useRef, useState } from "react";

//Services
import * as materialServices from "../../../../services/MaterialServices";

//Icons
import { FaPlus } from "react-icons/fa";

//Interfaces
import { Tema } from "../../../../interfaces/Tema";
import { MaterialClase } from "../../../../interfaces/MaterialClase";
import { toast } from "react-toastify";

interface Props {
  temaModal: Tema;
  count: number;
  setcount: (count: number) => void;
}

const initialState = {
  material: [new File([""], "filename")],
};

const ModalMaterial: React.FC<Props> = (props) => {
  const [material, setMaterial] = useState<MaterialClase>(initialState);

  const refProgresss = useRef<HTMLDivElement | null>();
  const refInput = useRef<HTMLInputElement | null>();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData();
    form.append("id_tema", props.temaModal.id_tema + "");

    for (let i = 0; i < material.material.length; i++) form.append("material", material.material[i]);

    const res = await materialServices.createMaterial(form, refProgresss.current);
    if (refProgresss.current) {
      refProgresss.current.innerHTML = "0%";
      refProgresss.current.style.width = "0%";
    }
    if (res.data.error) return toast.error(res.data.error);
    borrarInputFile(); //Borrando el valor del input file
    toast.success(res.data.success);
  };

  const borrarInputFile = () => {
    if (refInput.current) refInput.current.value = "";
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setMaterial({ ...material, [e.target.name]: e.target.files });
  };

  return (
    <div className="modal fade" id="crearMaterial" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header btn__blue">
            <h5 className="modal-title" id="exampleModalLabel">
              <FaPlus className="mb-1" /> Agregar Material
            </h5>
            <button type="button" onClick={() => borrarInputFile()} className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form onSubmit={handleFormSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="formFileMaterial" className="form-label">
                  Material
                </label>
                <input onChange={handleFile} ref={(node) => (refInput.current = node)} id="formFileMaterial" className="form-control" type="file" placeholder="Material" name="material" required multiple />
              </div>
              <div className="progress">
                <div className="progress-bar" ref={(node) => (refProgresss.current = node)} role="progressbar" style={{ width: "0%" }} aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}>
                  0%
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cerrar
              </button>
              <button type="submit" className="btn btn__blue">
                <FaPlus className="mb-1" /> Agregar Material
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalMaterial;
