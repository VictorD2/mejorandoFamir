import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../partials/Footer";
import NavBar from "../partials/NavBar";

const NotFound = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
    return () => {};
  }, []);
  return (
    <>
      <NavBar />
      <div className="bg-light" style={{ padding: "10rem 0" }}>
        <h1 className="title-error">No se encontró la página</h1>
        <section className="error-container">
          <span>4</span>
          <span>
            <span className="screen-reader-text">0</span>
          </span>
          <span>4</span>
        </section>
        <div className="link-container">
          <Link className="btn btn-warning" to="/">
            Ir a pagina de inicio
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
