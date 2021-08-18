/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { API } from "../../config/config";
import { Usuario } from "../../interfaces/Usuario";
import { useUsuario } from "../../auth/UsuarioProvider";
const initialState: Usuario = {
  id_usuario: "",
  nombre: "",
  id_pais_residencia: "AF",
  id_pais_nacimiento: "AF",
  apellido: "",
  profesion: "",
  correo: "",
  telefono: "",
  habilitado_u: 1,
  rut: "",
  id_rango: 2,
  url_foto_usuario: "",
  authenticate: false,
};
interface Pais {
  nombre_pais: string;
  id_pais: string;
  url_foto_pais: string;
}
const FormEditPerfil: React.FC = () => {
  const { setUsuario } = useUsuario();

  const [usuarioPerfil, setUsuarioPerfil] = useState<Usuario>(initialState);
  const [paises, setPaises] = useState<Pais[]>([]);
  const [paisNaci, setPaisNaci] = useState<Pais>({ nombre_pais: "Afganistan", id_pais: "AF", url_foto_pais: "/uploads/paises/afganistan.png" });
  const [paisResi, setPaisResi] = useState<Pais>({ nombre_pais: "Afganistan", id_pais: "AF", url_foto_pais: "/uploads/paises/afganistan.png" });
  useEffect(() => {
    getDatos();
    return () => {
      setPaises([]);
      setUsuarioPerfil(initialState);
    };
  }, []);

  const getDatos = async () => {
    const datos = await axios.get(`${API}/api/v0/usuarios/whoami`);
    if (datos.data.user) {
      setUsuarioPerfil(datos.data.user);
      setPaisNaci({ ...paisNaci, url_foto_pais: datos.data.user.url_foto_nacimiento });
      setPaisResi({ ...paisResi, url_foto_pais: datos.data.user.url_foto_residencia });
    }
    const res = await axios.get(`${API}/api/v0/pais`);
    if (res.data.error) return;
    setPaises(res.data.paises);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUsuarioPerfil({ ...usuarioPerfil, [e.target.name]: e.target.value });
    switch (e.target.name) {
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

  const enviarDatos = async (user: any, id: string, paisN: string, paisR: string) => {
    user.url_foto_residencia = paisR;
    user.url_foto_nacimiento = paisN;
    return await axios.put(`${API}/api/v0/usuarios/${id}`, user);
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await enviarDatos(usuarioPerfil, usuarioPerfil.id_usuario + "", paisNaci.url_foto_pais, paisResi.url_foto_pais);
    if (res.data.error) return swal({ title: "Ups!", text: res.data.error, icon: "error" });

    swal({ title: "¡Hecho!", text: res.data.success, icon: "success" });
    setUsuarioPerfil(res.data.usuario);
    setUsuario(res.data.usuario);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h4 className="fw-bold m-0 p-1">Tus Datos</h4>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmitForm}>
          <div className="row">
            <div className="col-12 col-sm-6 mb-3">
              <label htmlFor="nombre">Nombres</label>
              <input onChange={handleInputChange} type="text" id="nombre" name="nombre" className="form-control rgt__form-control" value={usuarioPerfil.nombre} />
            </div>
            <div className="col-12 col-sm-6 mb-3">
              <label htmlFor="correo">Correo</label>
              <input onChange={handleInputChange} type="text" id="correo" name="correo" className="form-control rgt__form-control" value={usuarioPerfil.correo} />
            </div>
            <div className="col-12 col-sm-6 mb-3">
              <label htmlFor="apellido">Apellidos</label>
              <input onChange={handleInputChange} type="text" id="apellido" name="apellido" className="form-control rgt__form-control" value={usuarioPerfil.apellido} />
            </div>
            <div className="col-12 col-sm-6 mb-3">
              <label htmlFor="profesion">Profesión</label>
              <input onChange={handleInputChange} type="text" id="profesion" name="profesion" className="form-control rgt__form-control" value={usuarioPerfil.profesion} />
            </div>
            <div className="col-md-6">
              <div className="input-group mb-3">
                <p className="w-100 mb-0"> Pais de Nacimiento</p>
                <label className="input-group-text" htmlFor="inputGroupSelect01">
                  <img src={paisNaci.url_foto_pais} className="img__pais register" alt="" />
                </label>
                <select value={usuarioPerfil.id_pais_nacimiento} onChange={handleInputChange} className="form-control rgt__form-control" name="id_pais_nacimiento" id="inputGroupSelect01">
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
                <label className="input-group-text" htmlFor="inputGroupSelect02">
                  <img src={paisResi.url_foto_pais} className="img__pais register" alt="" />
                </label>
                <select value={usuarioPerfil.id_pais_residencia} onChange={handleInputChange} className="form-control rgt__form-control" name="id_pais_residencia" id="inputGroupSelect02">
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

            <div className="col-12 col-sm-6 mb-3">
              <label htmlFor="telefono">Teléfono Móvil</label>
              <input onChange={handleInputChange} type="text" id="telefono" name="telefono" className="form-control rgt__form-control" value={usuarioPerfil.telefono} />
            </div>
            <div className="col-12 col-sm-6 mb-3">
              <label htmlFor="rut">RUT / DNI</label>
              <input onChange={handleInputChange} type="text" id="rut" name="rut" className="form-control rgt__form-control" value={usuarioPerfil.rut} />
            </div>
            <button type="submit" className="btn btn__more w-50 mx-auto mt-5" style={{ padding: "0.4rem", textTransform: "none" }}>
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormEditPerfil;
