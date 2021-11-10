import React, { useEffect } from 'react'
import Badge from '../../components/Badge'
import ScrollReveal from "scrollreveal";

function TerminosCondiciones() {

    useEffect(() => {
        window.scrollTo({ top: 0 });
        //Para los efectos de aparicion
        const config = {
            duration: 1000,
            delay: 150,
            easing: "ease",
        };
        ScrollReveal().reveal(".show", config);
        return () => { };
    }, []);

    return (
        <>
            <Badge name="Términos y Condiciones" />

            <div className="Main__container">
                <div className="container text-center mt-5" style={{ marginBottom: "4.5rem" }}>
                    <p className="text-justify text__container lh-lg show">
                        Es requisito necesario para la adquisición de los cursos que se ofrecen en este sitio, que lea y acepte los siguientes Términos y Condiciones que a continuación se redactan. El uso de nuestros servicios, así como la compra de nuestros cursos implicará que usted ha leído y aceptado los Términos y Condiciones de uso en el presente documento. Para adquirir un curso, será necesario el registro por parte del usuario, con ingreso de datos personales fidedignos y definición de una contraseña.
                        <br />
                        <br />
                        Si tiene alguna pregunta acerca de estos Términos y Condiciones de uso, o desea comunicarse con nosotros por cualquier razón, escriba a <a className="fw-bold" href="https://www.facebook.com/famircentro/" target="_blank" rel="noreferrer">https://www.facebook.com/famircentro/</a>; o envíe un correo electrónico a <a href="mailto:centrofamir@gmail.com" className="fw-bold" target="_blank" rel="noopener noreferrer">
                            centrofamir@gmail.com
                        </a>
                    </p>
                    <div className="text-start mt-5">
                        <h3 className="fw-bold fs-4">1. Licencia</h3>
                        <p className="text-justify text__container lh-lg show">
                            FamirCentro a través de su sitio web concede una licencia limitada, no exclusiva, no transferible para que los usuarios hagan uso personal, no comercial de los cursos que ha comprado en este sitio web de acuerdo a los Términos y Condiciones que se describen en este documento. Esta licencia no incluye la reventa ni el uso comercial de los cursos ni de los contenidos que se muestran en la plataforma.
                        </p>
                    </div>
                    <div className="text-start mt-5">
                        <h3 className="fw-bold fs-4">2. Uso no autorizado</h3>
                        <p className="text-justify text__container lh-lg show">
                            El usuario no puede copiar ninguno de los cursos o contenidos de FamirCentro, modificado o sin modificar, en un CD, sitio web o ningún otro medio, ni ofrecerlos para la redistribución gratuita o la reventa de ningún tipo para el beneficio de un tercero. De hacerlo, FamirCentro podrá cancelar su cuenta en nuestra plataforma de cursos.
                        </p>
                    </div>
                    <div className="text-start mt-5">
                        <h3 className="fw-bold fs-4">3. Propiedad</h3>
                        <p className="text-justify text__container lh-lg show">
                            El usuario no puede declarar propiedad intelectual o exclusiva a ninguno de los cursos o contenidos de FamirCentro, modificado o sin modificar. Todos los cursos y contenidos son propiedad de la empresa. En ningún caso esta compañía será responsable de ningún daño incluyendo, pero no limitado a, daños directos, indirectos, especiales, fortuitos o consecuentes u otras pérdidas resultantes del uso o de la imposibilidad de utilizar nuestros cursos.
                        </p>
                    </div>
                    <div className="text-start mt-5">
                        <h3 className="fw-bold fs-4">4. Modificación y cancelación de servicios</h3>
                        <p className="text-justify text__container lh-lg show">
                            FamirCentro cambia y mejora constantemente sus servicios para brindar una mejor experiencia y calidad a sus usuarios. La empresa puede agregar, modificar o eliminar funciones, características, requisitos, promociones y servicios si lo considera necesario.
                        </p>
                    </div>
                    <div className="text-start mt-5">
                        <h3 className="fw-bold fs-4">5. Términos adicionales</h3>
                        <p className="text-justify text__container lh-lg show">
                            FamirCentro cambia y mejora constantemente sus servicios para brindar una mejor experiencia y calidad a sus usuarios. La empresa puede agregar, modificar o eliminar funciones, características, requisitos, promociones y servicios si lo considera necesario.
                        </p>
                        <p className="text-justify text-font lh-lg show">
                            <b className="text-dark">Cuenta:</b> Forma de identificación creada por el usuario que consta con un ID de acceso y contraseña para que pueda acceder a los servicios de FamirCentro a través de la plataforma.
                        </p>
                        <p className="text-justify text-font lh-lg show">
                            <b className="text-dark">Cursos/Talleres:</b> Espacio en el que el profesor imparte conocimiento sobre un tema determinado a un número de usuarios mediante la plataforma y a través de clases.
                        </p>
                        <p className="text-justify text-font lh-lg show">
                            <b className="text-dark">Módulos:</b> Conjunto de cursos con una temática en común ordenados según un nivel de aprendizaje, con el fin de que los usuarios desarrollen capacidades sobre una temática específica.
                        </p>
                        <p className="text-justify text-font lh-lg show">
                            <b className="text-dark">Plataforma:</b> Se refiere al sitio web de cursos online de psicología y psicopedagogía que corresponde a FamirCentro en el cual se imparten las clases a los usuarios.
                        </p>
                        <p className="text-justify text-font lh-lg show">
                            <b className="text-dark">Condiciones:</b> Términos y condiciones particulares de cada suscripción.
                        </p>
                        <p className="text-justify text-font lh-lg show">
                            <b className="text-dark">Políticas:</b> Las políticas, tal como es la de Privacidad en conjunto de nuestros Términos y Condiciones rigen nuestra relación con el usuario dentro de nuestra plataforma.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TerminosCondiciones
