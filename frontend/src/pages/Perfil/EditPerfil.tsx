import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useUsuario } from "../../auth/UsuarioProvider";
import { API } from "../../config/config";
// Sweetalert
import swal from "sweetalert";

// Components
import Badge from "../../components/Badge";
import FormEditPerfil from "./FormEditPerfil";

// Interfaces
interface Password {
  newPassword: string;
  oldPassword: string;
  confirmPassowrd: string;
}

const EditPerfil: React.FC = () => {
  const { usuario, setUsuario } = useUsuario();

  const [profileImg, setProfileImg] = useState<string | ArrayBuffer>(usuario.url_foto_usuario + "");
  const [password, setPassword] = useState<Password>({ newPassword: "", oldPassword: "", confirmPassowrd: "" });

  const cardPass = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setProfileImg(usuario.url_foto_usuario + "");
    return () => {};
  }, [usuario.url_foto_usuario]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    return () => {};
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };
  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.confirmPassowrd === "" || password.newPassword === "") return swal({ title: "Advertencia", text: "Campos incompletos", icon: "warning" });
    if (password.newPassword !== password.confirmPassowrd) return swal({ title: "Advertencia", text: "Contraseñas no coinciden", icon: "warning" });
    const res = await axios.put(`${API}/api/v0/usuarios/password/${usuario.id_usuario}`, password);
    if (res.data.error) return swal({ title: "Ups!", text: res.data.error, icon: "error" });

    setPassword({ newPassword: "", oldPassword: "", confirmPassowrd: "" });
    swal({ title: "Hecho", text: res.data.success, icon: "success" });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const tipos = ["image/gif", "image/png", "image/jpeg", "image/bmp", "image/webp"];
    if (!(e.dataTransfer.files instanceof FileList)) return swal({ title: "Error", text: "Archivo no leido", icon: "error" });
    if (!tipos.includes(e.dataTransfer.files[0].type)) return swal({ title: "Advertencia", text: "Subir un formato de imagen", icon: "warning" });
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        if (reader.result) setProfileImg(reader.result);
      }
    };
    reader.readAsDataURL(e.dataTransfer.files[0]);
    const form = new FormData();
    form.append("fotoPerfil", e.dataTransfer.files[0]);
    const res = await axios.put(`${API}/api/v0/usuarios/img/${usuario.id_usuario}`, form);

    if (res.data.error) return swal({ title: "Ups!", text: res.data.error, icon: "error" });
    swal({ title: "¡Hecho!", text: res.data.success, icon: "success" });
    setUsuario({ ...usuario, url_foto_usuario: res.data.url_foto_usuario });
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const tipos = ["image/gif", "image/png", "image/jpeg", "image/bmp", "image/webp"];
    if (!(e.target.files instanceof FileList)) return swal({ title: "Error", text: "Archivo no leido", icon: "error" });
    if (!tipos.includes(e.target.files[0].type)) return swal({ title: "Advertencia", text: "Subir un formato de imagen", icon: "warning" });

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        if (reader.result) setProfileImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    const form = new FormData();
    form.append("fotoPerfil", e.target.files[0]);
    const res = await axios.put(`${API}/api/v0/usuarios/img/${usuario.id_usuario}`, form);
    if (res.data.error) return swal({ title: "Ups!", text: res.data.error, icon: "error" });
    swal({ title: "¡Hecho!", text: res.data.success, icon: "success" });
    setUsuario({ ...usuario, url_foto_usuario: res.data.url_foto_usuario });
  };

  const changePassword = () => cardPass.current?.classList.toggle("d-none");

  return (
    <>
      <Badge name="Editar Perfil" />

      <div className="">
        <div className="container bg-light mt-5" style={{ marginBottom: "4.5rem" }}>
          <div className="row">
            <div className="col-12 col-lg-5 col-md-12">
              <div draggable="true" className="cuadroEditPerfil" onDragOver={handleDragOver} onDrop={handleDrop}>
                <figure className="editProfile-img">
                  <img id="avatar" src={profileImg.toString()} className="loadPerfil img-fluid" alt="Mi avatar" width="200" height="200" />
                </figure>
                <div style={{ color: "#696969" }}>
                  <input type="file" id="inputFile" style={{ display: "none" }} onChange={handleChange} />
                  Arrastra aquí tu imagen de perfil
                  <br /> o
                  <a href="/" className="ms-1" role="button">
                    <label htmlFor="inputFile" style={{ cursor: "pointer" }}>
                      Sube una foto
                    </label>
                  </a>
                </div>
              </div>
              <div className="fw-bold mb-md-3 mb-lg-0" style={{ color: "#0049af", cursor: "pointer" }} onClick={changePassword}>
                Cambiar contraseña
              </div>
              <div className="card card-body mt-2 d-none mb-md-5 mb-lg-0" ref={cardPass}>
                <form onSubmit={handleSubmitForm}>
                  <div className="row">
                    <div className="col-12">
                      <label htmlFor="oldPassword">Contraseña anterior</label>
                      <input onChange={handleInputChange} type="password" value={password.oldPassword} name="oldPassword" id="oldPassword" className="form-control rgt__form-control mt-2" />
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-12">
                      <label htmlFor="newPassword">Nueva contraseña</label>
                      <input onChange={handleInputChange} type="password" value={password.newPassword} name="newPassword" id="newPassword" className="form-control rgt__form-control mt-2" />
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-12">
                      <label htmlFor="confirmPassowrd">Confirmar nueva contraseña</label>
                      <input onChange={handleInputChange} type="password" value={password.confirmPassowrd} name="confirmPassowrd" id="confirmPassowrd" className="form-control rgt__form-control mt-2" />
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="rgt__button">
                      <button type="submit" className="btn btn__more" style={{ padding: "0.5rem 1.5rem", textTransform: "none" }}>
                        Guardar
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-12 col-lg-6 col-md-12 offset-lg-1">
              <FormEditPerfil />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPerfil;
