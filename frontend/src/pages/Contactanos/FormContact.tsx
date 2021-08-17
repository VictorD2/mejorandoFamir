import React, { useEffect, useState } from "react";
import swal from "sweetalert";

//Componentes
import Boton from "../../components/BotonSubmit";

// Interface
import { Contacto } from "../../interfaces/Contacto";

// Services
import * as contactoServices from "../../services/ContactoServices";

const initialState: Contacto = {
  name: "",
  email: "",
  message: "",
};
const FormContact: React.FC = () => {
  const [contacto, setContacto] = useState<Contacto>(initialState);

  useEffect(() => {
    return () => setContacto(initialState);
  }, []);

  const inputHandleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContacto({ ...contacto, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await contactoServices.createContacto(contacto);
    if (res.data.success) {
      swal({ title: "¡Hecho!", text: res.data.success, icon: "success" });
      setContacto(initialState);
      return;
    }
    if (res.data.error) return swal({ title: "¡Ups!", text: res.data.error, icon: "error" });
  };

  return (
    <div className="cts__form">
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <input onChange={inputHandleChange} name="name" value={contacto.name} type="text" className="form-control cts__form-control" placeholder="Nombres" />
        </div>
        <div className="mb-3">
          <input onChange={inputHandleChange} name="email" value={contacto.email} type="email" className="form-control cts__form-control" placeholder="Correo" />
        </div>
        <textarea onChange={inputHandleChange} name="message" value={contacto.message} className="form-control cts__form-control" cols={30} rows={10} placeholder="Mensaje"></textarea>
        <Boton name="Contactar" />
      </form>
    </div>
  );
};

export default FormContact;
