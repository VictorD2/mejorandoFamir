import React from "react";

// Componentes
import { Link } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "animate.css/animate.min.css";

const DashBoard: React.FC = () => {
  return (
    <>
      <div className="content-wrapper show" style={{ minHeight: 643 }}>
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Dashboard</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link className="link-normal" to="/">
                      Inicio
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">Dashboard</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <section className="col-lg-7 connectedSortable ui-sortable"></section>

              <section className="col-lg-5 connectedSortable ui-sortable"></section>
            </div>
          </div>
        </section>
      </div>
      <ToastContainer />
    </>
  );
};

export default DashBoard;
