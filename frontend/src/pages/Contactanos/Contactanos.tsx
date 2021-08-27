import React, { useEffect } from "react";

// Components
import Badge from "../../components/Badge";
import FormContact from "./FormContact";

// ScrollReveal
import ScrollReveal from "scrollreveal";

// Icons
import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlinePhone } from "react-icons/ai";
import { CgMail } from "react-icons/cg";
import { FiFacebook } from "react-icons/fi";

const Contactanos: React.FC = () => {

  useEffect(() => {
    window.scrollTo({ top: 0 });
    //Para los efectos de aparicion
    const config = { duration: 1000, delay: 150, easing: "ease" };
    ScrollReveal().reveal(".show", config);
    return () => { };
  }, []);

  return (
    <>
      <Badge name="Contáctanos" />
      <div className="Main__container">
        <div className="container text-center mt-5">
          <div className="row mt-5 cts__content show" style={{ marginBottom: "5rem" }}>
            <div className="col-md-6 text-start">
              <span className="fw-light fs-6 text-secondary">HOLA</span>
              <br />
              <h3 className="fw-bold fs-1 mt-3">Contáctanos</h3>
              <p className="mt-4 lh-lg" style={{ fontSize: "0.875rem" }}>
                Lacinia, lacinia la cus non, fermen tum nisi. Donec et sollicitudin. Morbi vel arcu gravida, iaculis lacus vel, posuere ipsum. Sed faucibus mauris vitae urna consectetur, sit amet maximus nisl sagittis. Ut in iaculis enim, et pulvinar mauris.
              </p>
              <div className="content__icons show">
                <a href="https://www.facebook.com/famircentro" target="_BLANK" rel="noreferrer" className="cts__icons">
                  <FiFacebook className="mb-1 fs-6" />
                </a>
                <a href="https://www.instagram.com/famircentro/" target="_BLANK" rel="noreferrer" className="cts__icons">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="https://wa.me/56973952562" target="_blank" rel="noreferrer" className="cts__icons">
                  <FontAwesomeIcon icon={faWhatsapp} />
                </a>
              </div>
              <IoLocationOutline className="me-2 fs-4 cts__icons-unique" />
              <p className="cts__parrafo lh-lg" style={{ fontSize: "0.875rem" }}>
                4127/ 5B-C Mislane Road, <br />
                Gibraltar, UK
              </p>
              <br />
              <AiOutlinePhone className="me-2 fs-4 cts__icons-unique" />
              <p className="cts__parrafo lh-lg" style={{ fontSize: "0.875rem" }}>
                Main: 203-808-8613 <br />
                Office: 203-808-8648
              </p>
              <br />
              <CgMail className="me-2 fs-4 cts__icons-unique" />
              <p className="cts__parrafo lh-lg" style={{ fontSize: "0.875rem" }}>
                <a href="mailto:centrofamir@gmail.com" style={{color: "#212529"}} target="_blank" rel="noopener noreferrer">centrofamir@gmail.com</a>
              </p>
            </div>
            <div className="col-md-6 show">
              <FormContact />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contactanos;
