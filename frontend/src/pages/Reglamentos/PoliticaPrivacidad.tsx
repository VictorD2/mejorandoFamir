import React, { useEffect } from 'react'
import Badge from '../../components/Badge'
import ScrollReveal from "scrollreveal";

function PoliticaPrivacidad() {

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
            <Badge name="Política de Privacidad" />

            <div className="Main__container">
                <div className="container text-center mt-5" style={{ marginBottom: "4.5rem" }}>
                    <p className="text-justify text__container lh-lg show">Respetando lo establecido en la legislación vigente, Famir Centro (en adelante, también Sitio Web) se compromete a adoptar las medidas técnicas y organizativas necesarias, según el nivel de seguridad adecuado al riesgo de los datos recogidos.</p>
                    <div className="text-start mt-5">
                        <h3 className="fw-bold fs-4">Leyes que incorpora esta política de privacidad</h3>
                        <p className="text-justify text__container lh-lg show">Esta política de privacidad está adaptada a la normativa española y europea vigente en materia de protección de datos personales en internet. En concreto, la misma respeta las siguientes normas:</p>
                        <ol className="text__container text-justify">
                            <li className="mb-3 lh-lg">
                                El reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016, relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales y a la libre circulación de estos datos (RGPD).
                            </li>
                            <li className="mb-3 lh-lg">
                                La Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPD-GDD).
                            </li>
                            <li className="mb-3 lh-lg">
                                El Real Decreto 1720/2007, de 21 de diciembre, por el que se aprueba el Reglamento de desarrollo de la Ley Orgánica 15/1999, de 13 de diciembre, de Protección de Datos de Carácter Personal (RDLOPD).
                            </li>
                            <li className="lh-lg">
                                La Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE).
                            </li>
                        </ol>
                    </div>
                    <div className="text-start mt-5">
                        <h3 className="fw-bold fs-4">Identidad del responsable del tratamiento de los datos personales</h3>
                        <p className="text-justify text__container lh-lg show">
                            El responsable del tratamiento de los datos personales recogidos en Famir Centro es: *****, con DNI: ***** (en adelante, responsable del tratamiento). Sus datos de contacto son los siguientes:
                        </p>
                        <p className="text-justify text-font lh-lg show">
                            Dirección: Chile, Perú
                        </p>
                        <p className="text-justify text-font lh-lg show">
                            Télefono de contacto: 987456321
                        </p>
                        <p className="text-justify text-font lh-lg show">
                            Email de contacto: <a href="mailto:centrofamir@gmail.com" className="fw-bold" target="_blank" rel="noopener noreferrer">
                                centrofamir@gmail.com
                            </a>
                        </p>
                    </div>
                    <div className="text-start mt-5">
                        <h3 className="fw-bold fs-4">Registro de Datos de Carácter Personal</h3>
                        <p className="text-justify text__container lh-lg show">
                            En cumplimiento de lo establecido en el RGPD y la LOPD-GDD, le informamos que los datos personales recabados por Famir Centro mediante los formularios extendidos en sus páginas quedarán incorporados y serán tratados en nuestro fichero con el fin de poder facilitar, agilizar y cumplir los compromisos establecidos entre Famir Centro y el Usuario o el mantenimiento de la relación que se establezca en los formularios que este rellene, o para atender una solicitud o consulta del mismo. Asimismo, de conformidad con lo previsto en el RGPD y la LOPD-GDD, salvo que sea de aplicación la excepción prevista en el artículo 30.5 del RGPD, se mantiene un registro de actividades de tratamiento que especifica, según sus finalidades, las actividades de tratamiento llevadas a cabo y las demás circunstancias establecidas en el RGPD.
                        </p>
                    </div>
                    <div className="text-start mt-5">
                        <h3 className="fw-bold fs-4">Principios aplicables al tratamiento de los datos personales</h3>
                        <p className="text-justify text__container lh-lg show">
                            El tratamiento de los datos personales del Usuario se someterá a los siguientes principios recogidos en el artículo 5 del RGPD y en el artículo 4 y siguientes de la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales:
                        </p>
                        <ol className="text__container text-justify">
                            <li className="mb-3 lh-lg">
                                Principio de licitud, lealtad y transparencia: se requerirá en todo momento el consentimiento del Usuario previa información completamente transparente de los fines para los cuales se recogen los datos personales.
                            </li>
                            <li className="mb-3 lh-lg">
                                Principio de limitación de la finalidad: los datos personales serán recogidos con fines determinados, explícitos y legítimos.
                            </li>
                            <li className="mb-3 lh-lg">
                                Principio de minimización de datos: los datos personales recogidos serán únicamente los estrictamente necesarios en relación con los fines para los que son tratados.
                            </li>
                            <li className="mb-3 lh-lg">
                                Principio de exactitud: los datos personales deben ser exactos y estar siempre actualizados.
                            </li>
                            <li className="mb-3 lh-lg">
                                Principio de limitación del plazo de conservación: los datos personales solo serán mantenidos de forma que se permita la identificación del Usuario durante el tiempo necesario para los fines de su tratamiento.
                            </li>
                            <li className="mb-3 lh-lg">
                                Principio de integridad y confidencialidad: los datos personales serán tratados de manera que se garantice su seguridad y confidencialidad.
                            </li>
                            <li className="lh-lg">
                                Principio de responsabilidad proactiva: el Responsable del tratamiento será responsable de asegurar que los principios anteriores se cumplen.
                            </li>
                        </ol>
                    </div>
                    <div className="text-start mt-5">
                        <h3 className="fw-bold fs-4">Categorías de datos personales</h3>
                        <p className="text-justify text__container lh-lg show">
                            Las categorías de datos que se tratan en Famir Centro son únicamente datos identificativos. En ningún caso, se tratan categorías especiales de datos personales en el sentido del artículo 9 del RGPD.
                        </p>
                    </div>
                    <div className="text-start mt-5">
                        <h3 className="fw-bold fs-4">Períodos de retención de los datos personales</h3>
                        <p className="text-justify text__container lh-lg show">
                            Los datos personales solo serán retenidos durante el tiempo mínimo necesario para los fines de su tratamiento y, en todo caso, únicamente durante el siguiente plazo: 24 meses, o hasta que el Usuario solicite su supresión.
                            <br />
                            <br />
                            En el momento en que se obtengan los datos personales, se informará al Usuario acerca del plazo durante el cual se conservarán los datos personales o, cuando eso no sea posible, los criterios utilizados para determinar este plazo.
                        </p>
                    </div>
                    <div className="text-start mt-5">
                        <h3 className="fw-bold fs-4">Secreto y seguridad de los datos personales</h3>
                        <p className="text-justify text__container lh-lg show">
                            Famir Centro se compromete a adoptar las medidas técnicas y organizativas necesarias, según el nivel de seguridad adecuado al riesgo de los datos recogidos, de forma que se garantice la seguridad de los datos de carácter personal y se evite la destrucción, pérdida o alteración accidental o ilícita de datos personales transmitidos, conservados o tratados de otra forma, o la comunicación o acceso no autorizados a dichos datos.
                            <br />
                            <br />
                            Sin embargo, debido a que Famir Centro no puede garantizar la inexpugnabilidad de internet ni la ausencia total de hackers u otros que accedan de modo fraudulento a los datos personales, el Responsable del tratamiento se compromete a comunicar al Usuario sin dilación indebida cuando ocurra una violación de la seguridad de los datos personales que sea probable que entrañe un alto riesgo para los derechos y libertades de las personas físicas. Siguiendo lo establecido en el artículo 4 del RGPD, se entiende por violación de la seguridad de los datos personales toda violación de la seguridad que ocasione la destrucción, pérdida o alteración accidental o ilícita de datos personales transmitidos, conservados o tratados de otra forma, o la comunicación o acceso no autorizados a dichos datos.
                            <br />
                            <br />
                            Los datos personales serán tratados como confidenciales por el Responsable del tratamiento, quien se compromete a informar y a garantizar por medio de una obligación legal o contractual que dicha confidencialidad sea respetada por sus empleados, asociados, y toda persona a la cual le haga accesible la información.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PoliticaPrivacidad
