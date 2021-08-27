import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { UsuarioProvider } from "../auth/UsuarioProvider";

// Pages
import Home from "../pages/Inicio/Home";
import EditPerfil from "../pages/Perfil/EditPerfil";
import Perfil from "../pages/Perfil/Perfil";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Contactanos from "../pages/Contactanos/Contactanos";
import Programa from "../pages/Programa/Programa";
import AboutUs from "../pages/Nosotros/AboutUs";
import CursoFullPage from "../pages/Programa/CursoFullPage";
import TareaFullPage from "../pages/Programa/TareaFullPage";
import TemaFullPage from "../pages/Programa/TemaFullPage";
import ComprarCurso from "../pages/Programa/ComprarCurso";
import NotFound from "../pages/NotFound";

// Dashboard
import DashBoard from "../pages/Dashboard/DashBoard";
import Usuarios from "../pages/Dashboard/Estudiantes/Estudiantes";
import Profesores from "../pages/Dashboard/Profesores/Profesores";
import FormProfesor from "../pages/Dashboard/Profesores/FormProfesor";
import Comprobantes from "../pages/Dashboard/Comprobantes/Comprobantes";
import ContactoDash from "../pages/Dashboard/Contacto/ContactoDash";
import Tareas from "../pages/Dashboard/Cursos/Tareas/Tareas";
import MaterialCurso from "../pages/Dashboard/Cursos/MaterialCurso";
import VerTema from "../pages/Dashboard/Cursos/Temas/VerTema";
import Cursos from "../pages/Dashboard/Cursos/Cursos";
import FormCurso from "../pages/Dashboard/Cursos/FormCurso";
import VerCurso from "../pages/Dashboard/Cursos/VerCurso";

// Layout
import LayoutUsuario from "../partials/LayoutUsuario";
import LayoutDash from "../partials/LayoutDash";


function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* Vistas */}
        <LayoutUsuario exact path="/" component={Home} />
        <LayoutUsuario exact path="/Perfil" component={Perfil} />
        <LayoutUsuario exact path="/Perfil/Editar" component={EditPerfil} />
        <LayoutUsuario exact path="/Nosotros" component={AboutUs} />
        <LayoutUsuario exact path="/Contactanos" component={Contactanos} />
        <LayoutUsuario exact path="/Clases/:tipo/:modalidad" component={Programa} />
        <LayoutUsuario exact path="/Clase/:idCurso" component={CursoFullPage} />
        <LayoutUsuario exact path="/Clase/:idCurso/Tarea/:idTarea" component={TareaFullPage} />
        <LayoutUsuario exact path="/Clase/:idCurso/:idTema" component={TemaFullPage} />
        <LayoutUsuario exact path="/Comprar/:idCurso" component={ComprarCurso} />
        <Route exact component={Login} path="/Iniciar" />
        <Route exact component={Register} path="/Registrarse" />

        {/* Dashboard */}
        <LayoutDash exact path="/DashBoard" component={DashBoard} />

        {/* Usuarios */}
        <LayoutDash exact path="/DashBoard/Usuarios" component={Usuarios} />

        {/* Profesores */}
        <LayoutDash exact path="/DashBoard/Profesores" component={Profesores} />
        <LayoutDash exact path="/DashBoard/Profesores/nuevo" component={FormProfesor} />
        <LayoutDash exact path="/DashBoard/Profesores/update/:id" component={FormProfesor} />

        {/* Comprobantes */}
        <LayoutDash exact path="/DashBoard/Comprobantes" component={Comprobantes} />

        {/* Contactos */}
        <LayoutDash exact path="/DashBoard/Contacto" component={ContactoDash} />

        {/* Cursos */}
        <LayoutDash exact path="/DashBoard/:tipo/:modalidad/material/:id/Tarea/:idTarea" component={Tareas} />
        <LayoutDash exact path="/DashBoard/:tipo/:modalidad/material/:id" component={MaterialCurso} />
        <LayoutDash exact path="/DashBoard/:tipo/:modalidad/material/:id/:idTema" component={VerTema} />
        <LayoutDash exact path="/DashBoard/:tipo/:modalidad/nuevo" component={FormCurso} />
        <LayoutDash exact path="/DashBoard/:tipo/:modalidad/update/:id" component={FormCurso} />
        <LayoutDash exact path="/DashBoard/:tipo/:modalidad" component={Cursos} />
        <LayoutDash exact path="/DashBoard/:tipo/:modalidad/:idCurso" component={VerCurso} />

        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
const prev = () => (
  <UsuarioProvider>
    <App></App>
  </UsuarioProvider>
);
export default prev;
