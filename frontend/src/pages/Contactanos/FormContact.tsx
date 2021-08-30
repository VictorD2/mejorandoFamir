import React, { useEffect, useState, RefObject, useRef } from "react";
import swal from "sweetalert";

//Componentes
import Boton from "../../components/BotonSubmit";

// Interface
import { Contacto } from "../../interfaces/Contacto";

// Services
import * as contactoServices from "../../services/ContactoServices";

// Regular Expression
import exprRegular from "../../helpers/encrypt/regularExpr";

// Method BadWords
import badwords from "../../helpers/badWords/MethodBadWords";

const initialState: Contacto = {
  name: "",
  email: "",
  message: "",
};

const FormContact: React.FC = () => {
  // States
  const [contacto, setContacto] = useState<Contacto>(initialState);

  // References
  const refContactName = useRef<HTMLParagraphElement>(null);
  const refContactEmail = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    return () => setContacto(initialState);
  }, []);

  const validation = (
    expr: RegExp,
    event: EventTarget & (HTMLInputElement | HTMLTextAreaElement),
    msg: RefObject<HTMLParagraphElement>
  ) => {
    if (expr.test(event.value)) {
      event.classList.remove("is-invalid");
      msg.current?.classList.add("d-none");
      return;
    }
    event.classList.add("is-invalid");
    msg.current?.classList.remove("d-none");
  };

  const inputHandleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContacto({ ...contacto, [e.target.name]: e.target.value });
    switch (e.target.name) {
      case "name":
        validation(exprRegular.nombre, e.target, refContactName);
        break;
      case "email":
        validation(exprRegular.correo, e.target, refContactEmail);
        break;
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !(
        exprRegular.nombre.test(contacto.name) &&
        exprRegular.correo.test(contacto.email) &&
        contacto.message
      )
    )
      return swal("Oops!", "Campos invalidos", "error");

    if (badwords(contacto.message)) return badwords(contacto.message);

    const res = await contactoServices.createContacto(contacto);
    if (res.data.error)
      return swal({ title: "¡Ups!", text: res.data.error, icon: "error" });
    swal({ title: "¡Hecho!", text: res.data.success, icon: "success" });
    setContacto(initialState);
  };

  return (
    <div className="cts__form">
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <input
            onChange={inputHandleChange}
            name="name"
            value={contacto.name}
            type="text"
            className="form-control cts__form-control"
            placeholder="Nombres"
          />
          <p
            className="text-danger text-start fw-light d-none mt-2"
            ref={refContactName}
            style={{ fontSize: "0.75rem" }}
          >
            El nombre solo puede contener letras y espacios.
          </p>
        </div>
        <div className="mb-3">
          <input
            onChange={inputHandleChange}
            name="email"
            value={contacto.email}
            type="email"
            className="form-control cts__form-control"
            placeholder="Correo"
          />
          <p
            className="text-danger text-start fw-light d-none mt-2"
            ref={refContactEmail}
            style={{ fontSize: "0.75rem" }}
          >
            El email debe tener formato name@example.com
          </p>
        </div>
        <textarea
          onChange={inputHandleChange}
          style={{ resize: "none" }}
          name="message"
          value={contacto.message}
          className="form-control cts__form-control"
          cols={30}
          rows={10}
          placeholder="Mensaje"
        ></textarea>
        <Boton name="Contactar" />
      </form>
    </div>
  );
};

export default FormContact;
