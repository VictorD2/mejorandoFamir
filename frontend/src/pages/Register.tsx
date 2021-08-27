import React, {
  ChangeEvent,
  FormEvent,
  useState,
  useRef,
  RefObject,
  useEffect,
} from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import auth from "../auth/auth";
import { API } from "../config/config";

import ReCAPTCHA from "react-google-recaptcha";
import logoRegister from "../images/Logo.svg";

//Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "animate.css/animate.min.css";

import { useUsuario } from "../auth/UsuarioProvider";
import exprRegular from "../encrypt/regularExpr";

// Interfaces
interface Usuario {
  name: string;
  surname: string;
  email: string;
  password: string;
  verifyPassword: string;
  rut: string;
  telefono: string;
  id_pais_nacimiento: string;
  id_pais_residencia: string;
  profesion: string;
}
interface Pais {
  id_pais: string;
  nombre_pais: string;
  url_foto_pais: string;
}
const Register: React.FC = () => {
  //Initial State
  const history = useHistory();
  const { setUsuario } = useUsuario();
  const [usuarioR, setUsuarioR] = useState<Usuario>({
    name: "",
    surname: "",
    email: "",
    rut: "",
    telefono: "",
    id_pais_nacimiento: "AF",
    id_pais_residencia: "AF",
    password: "",
    profesion: "",
    verifyPassword: "",
  });

  // CAPTCHA State
  const [captchaValidation, setCaptchaValidation] = useState<Boolean>();

  // REFERENCE
  const captcha: RefObject<ReCAPTCHA> = useRef(null);

  const parrafoName = useRef<HTMLParagraphElement>(null);
  const parrafoSurname = useRef<HTMLParagraphElement>(null);
  const parrafoEmail = useRef<HTMLInputElement>(null);
  const parrafoProfesion = useRef<HTMLParagraphElement>(null);
  const parrafoTelephone = useRef<HTMLParagraphElement>(null);
  const parrafoRut = useRef<HTMLParagraphElement>(null);

  const refPasswordVerify = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);
  const [paises, setPaises] = useState<Pais[]>([]);
  const [paisNaci, setPaisNaci] = useState<Pais>({
    nombre_pais: "Afganistan",
    id_pais: "AF",
    url_foto_pais: "/uploads/paises/afganistan.png",
  });
  const [paisResi, setPaisResi] = useState<Pais>({
    nombre_pais: "Afganistan",
    id_pais: "AF",
    url_foto_pais: "/uploads/paises/afganistan.png",
  });

  useEffect(() => {
    window.scrollTo({ top: 0 });
    getPaises();
    return () => {};
  }, []);

  const getPaises = async () => {
    const res = await axios.get(`${API}/api/v0/pais`);
    if (res.data.error) return;
    setPaises(res.data.paises);
  };

  // onChange ReCAPTCHA
  const onChange = () => {
    if (captcha.current?.getValue()) setCaptchaValidation(true);
  };

  // Validación de campos
  const validation = (
    expr: RegExp,
    input: EventTarget & (HTMLInputElement | HTMLSelectElement),
    msg: RefObject<HTMLParagraphElement>
  ) => {
    if (expr.test(input.value)) {
      input.classList.remove("is-invalid");
      msg.current?.classList.add("d-none");
      return;
    }
    input.classList.add("is-invalid");
    msg.current?.classList.remove("d-none");
  };

  const validationPassword = () => {
    if (refPassword.current?.value === refPasswordVerify.current?.value) {
      refPassword.current?.classList.remove("is-invalid");
      refPasswordVerify.current?.classList.remove("is-invalid");
      return;
    }
    refPassword.current?.classList.add("is-invalid");
    refPasswordVerify.current?.classList.add("is-invalid");
  };

  // Change Event
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUsuarioR({ ...usuarioR, [e.target.name]: e.target.value });
    switch (e.target.name) {
      case "name":
        validation(exprRegular.nombre, e.target, parrafoName);
        break;
      case "surname":
        validation(exprRegular.nombre, e.target, parrafoSurname);
        break;
      case "email":
        validation(exprRegular.correo, e.target, parrafoEmail);
        break;
      case "profesion":
        validation(exprRegular.nombre, e.target, parrafoProfesion);
        break;
      case "telefono":
        validation(exprRegular.telefono, e.target, parrafoTelephone);
        break;
      case "rut":
        validation(exprRegular.rut, e.target, parrafoRut);
        break;
      case "password":
        validationPassword();
        break;
      case "verifyPassword":
        validationPassword();
        break;
      case "id_pais_nacimiento":
        for (let i = 0; i < paises.length; i++) {
          const pais = paises[i];
          if (pais.id_pais === e.target.value) {
            setPaisNaci({ ...paisNaci, url_foto_pais: pais.url_foto_pais });
            return;
          }
        }
        break;
      case "id_pais_residencia":
        for (let i = 0; i < paises.length; i++) {
          const pais = paises[i];
          if (pais.id_pais === e.target.value) {
            setPaisResi({ ...paisResi, url_foto_pais: pais.url_foto_pais });
            return;
          }
        }
        break;
    }
  };

  const enviarDatos = async (
    user: any,
    url_foto_residencia: string,
    url_foto_nacimiento: string
  ) => {
    user.url_foto_residencia = url_foto_residencia;
    user.url_foto_nacimiento = url_foto_nacimiento;
    return await axios.post(`${API}/signup`, user);
  };

  //Submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (captcha.current?.getValue()) {
      if (
        exprRegular.nombre.test(usuarioR.name) &&
        exprRegular.nombre.test(usuarioR.surname) &&
        usuarioR.password === usuarioR.verifyPassword &&
        exprRegular.correo.test(usuarioR.email) &&
        exprRegular.nombre.test(usuarioR.profesion) &&
        exprRegular.telefono.test(usuarioR.telefono) &&
        usuarioR.id_pais_nacimiento &&
        usuarioR.id_pais_residencia &&
        exprRegular.rut.test(usuarioR.rut)
      ) {
        const datos = await enviarDatos(
          usuarioR,
          paisResi.url_foto_pais,
          paisNaci.url_foto_pais
        );
        if (datos.data.success) {
          setUsuario(datos.data.user);
          auth.setRango(datos.data.user.id_rango);
          auth.sigIn();
          history.push("/");
        }
        if (datos.data.error) return swal("Oops!", datos.data.error, "error");
        setCaptchaValidation(true);
        return;
      }
      return swal("Oops!", "Campos invalidos", "error");
    } else {
      setCaptchaValidation(false);
    }
  };

  return (
    <div className="rgt__main">
      <ToastContainer />
      <div className="card content__form animate__animated animate__flipInY">
        <Link to="/" className="card-header rgt__header">
          <img className="rgt__img" src={logoRegister} alt="logo-register" />
          <h5 className="rgt__title">FAMIR CENTRO</h5>
        </Link>
        <div className="card-body">
          <div className="row">
            <div className="col-12 rgt__form">
              <form
                className="needs-validation"
                noValidate
                onSubmit={handleSubmit}
              >
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Nombres</label>
                      <input
                        value={usuarioR.name}
                        onChange={handleInputChange}
                        className="form-control rgt__form-control"
                        type="text"
                        name="name"
                      />
                      <p
                        className="text-danger fw-light d-none mt-2"
                        ref={parrafoName}
                        style={{ fontSize: "0.75rem" }}
                      >
                        El nombre solo puede contener letras y espacios.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Apellidos</label>
                      <input
                        value={usuarioR.surname}
                        onChange={handleInputChange}
                        className="form-control rgt__form-control"
                        type="text"
                        name="surname"
                      />
                      <p
                        className="text-danger fw-light d-none mt-2"
                        ref={parrafoSurname}
                        style={{ fontSize: "0.75rem" }}
                      >
                        El apellido solo puede contener letras y espacios.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Correo</label>
                      <input
                        value={usuarioR.email}
                        onChange={handleInputChange}
                        className="form-control rgt__form-control"
                        type="email"
                        name="email"
                        placeholder="name@example.com"
                      />
                      <p
                        className="text-danger fw-light d-none mt-2"
                        ref={parrafoEmail}
                        style={{ fontSize: "0.75rem" }}
                      >
                        El email debe tener formato name@example.com
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Profesión</label>
                      <input
                        value={usuarioR.profesion}
                        onChange={handleInputChange}
                        className="form-control rgt__form-control"
                        type="text"
                        name="profesion"
                      />
                      <p
                        className="text-danger fw-light d-none mt-2"
                        ref={parrafoProfesion}
                        style={{ fontSize: "0.75rem" }}
                      >
                        La profesion debe contener letras y espacios
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-group mb-3">
                      <p className="w-100 mb-0">Pais de Nacimiento</p>
                      <label
                        className="input-group-text"
                        htmlFor="inputGroupSelect01"
                      >
                        <img
                          src={paisNaci.url_foto_pais}
                          className="img__pais register"
                          alt=""
                        />
                      </label>
                      <select
                        value={usuarioR.id_pais_nacimiento}
                        onChange={handleInputChange}
                        className="form-control rgt__form-control"
                        name="id_pais_nacimiento"
                        id="inputGroupSelect01"
                      >
                        {paises.map((pais) => {
                          return (
                            <option key={pais.id_pais} value={pais.id_pais}>
                              {pais.nombre_pais}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-group mb-3">
                      <p className="w-100 mb-0"> Pais de Residencia</p>
                      <label
                        className="input-group-text"
                        htmlFor="inputGroupSelect02"
                      >
                        <img
                          src={paisResi.url_foto_pais}
                          className="img__pais register"
                          alt=""
                        />
                      </label>
                      <select
                        value={usuarioR.id_pais_residencia}
                        onChange={handleInputChange}
                        className="form-control rgt__form-control"
                        name="id_pais_residencia"
                        id="inputGroupSelect02"
                      >
                        {paises.map((pais) => {
                          return (
                            <option key={pais.id_pais} value={pais.id_pais}>
                              {pais.nombre_pais}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Teléfono</label>
                      <input
                        value={usuarioR.telefono}
                        onChange={handleInputChange}
                        className="form-control rgt__form-control"
                        type="text"
                        name="telefono"
                        placeholder="Telefono"
                      />
                      <p
                        className="text-danger fw-light d-none mt-2"
                        ref={parrafoTelephone}
                        style={{ fontSize: "0.75rem" }}
                      >
                        El telefono solo debe tener 9 a 14 numeros
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">RUT / DNI</label>
                      <input
                        value={usuarioR.rut}
                        onChange={handleInputChange}
                        className="form-control rgt__form-control"
                        type="text"
                        name="rut"
                        placeholder="RUT o DNI"
                      />
                      <p
                        className="text-danger fw-light d-none mt-2"
                        ref={parrafoRut}
                        style={{ fontSize: "0.75rem" }}
                      >
                        El rut/dni solo debe tener 8 o 9 digitos
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Contraseña</label>
                      <input
                        value={usuarioR.password}
                        onChange={handleInputChange}
                        ref={refPassword}
                        className="form-control rgt__form-control"
                        type="password"
                        name="password"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        {" "}
                        Confirmar contraseña{" "}
                      </label>
                      <input
                        value={usuarioR.verifyPassword}
                        onChange={handleInputChange}
                        ref={refPasswordVerify}
                        className="form-control rgt__form-control"
                        type="password"
                        name="verifyPassword"
                      />
                    </div>
                  </div>
                  <div className="recaptcha d-flex justify-content-center">
                    <ReCAPTCHA
                      ref={captcha}
                      sitekey="6LejHikbAAAAADWr-hPzdVv7v7pU4m0M_ceI_6SB"
                      onChange={onChange}
                    />
                  </div>
                  {captchaValidation === false && (
                    <div className="text-center text-danger mt-2">
                      Por favor acepta el captcha
                    </div>
                  )}
                  <div className="col-md-12">
                    <div className="rgt__button">
                      <button
                        type="submit"
                        className="btn btn__more"
                        style={{ padding: "0.7rem 2rem" }}
                      >
                        Registrar
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
