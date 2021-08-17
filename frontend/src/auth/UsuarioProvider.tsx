import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Usuario } from "../interfaces/Usuario";
import auth from "./auth";
import { API } from "../config/config";
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
  url_foto_residencia: "",
  url_foto_nacimiento: "",
  authenticate: false,
};

const UsuarioContext = React.createContext({
  usuario: initialState,
  loadUser: false,
  setUsuario: (usuario: Usuario) => {},
});

export const UsuarioProvider = (props: any) => {
  const [usuario, setUsuario] = useState<Usuario>(initialState);
  const [loadUser, setLoadUser] = useState(false);

  useEffect(() => {
    cargarUsuario();
  }, []);

  const cargarUsuario = async () => {
    try {
      const datos = await axios.get(`${API}/api/v0/usuarios/whoami`);
      if (datos.data.user) {
        setUsuario(datos.data.user);
        auth.sigIn();
        auth.setRango(datos.data.user.id_rango);
      }
    } catch (error) {
      setUsuario(initialState);
      auth.setRango(2);
      auth.logOut();
    }
    setLoadUser(true);
  };

  const value = useMemo(() => {
    return {
      usuario,
      loadUser,
      setUsuario,
    };
  }, [usuario, loadUser, setUsuario]);

  return <UsuarioContext.Provider value={value} {...props} />;
};

export function useUsuario() {
  const context = React.useContext(UsuarioContext);
  if (!context) throw new Error("useUsuario debe estar dentro del proveedor usuario context");
  return context;
}
