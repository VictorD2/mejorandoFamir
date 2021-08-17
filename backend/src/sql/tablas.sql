-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-08-2021 a las 21:14:42
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_famir`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentario`
--

CREATE TABLE `comentario` (
  `id_comentario` int(11) NOT NULL,
  `comentario` text NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_usuario` int(11) NOT NULL,
  `id_curso` int(11) DEFAULT NULL,
  `id_tema` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comprobante`
--

CREATE TABLE `comprobante` (
  `id_comprobante` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_curso` int(11) NOT NULL,
  `url_foto_comprobante` varchar(255) NOT NULL,
  `fecha_enviado` datetime NOT NULL,
  `estado` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `comprobante`
--

INSERT INTO `comprobante` (`id_comprobante`, `id_usuario`, `id_curso`, `url_foto_comprobante`, `fecha_enviado`, `estado`) VALUES
(85, 85, 43, '/uploads/fotosComprobantes/2-7-2021-115432Tableau-Editado.png', '2021-08-02 11:54:32', 'Aceptado'),
(86, 85, 45, '/uploads/fotosComprobantes/2-7-2021-183716fondito.jpg', '2021-08-02 18:37:16', 'Aceptado'),
(87, 84, 51, '/uploads/fotosComprobantes/2-7-2021-184122codigos.PNG', '2021-08-02 18:41:22', 'Aceptado'),
(88, 85, 51, '/uploads/fotosComprobantes/2-7-2021-191231defaultProfile.PNG', '2021-08-02 19:12:31', 'Aceptado'),
(89, 87, 43, '/uploads/fotosComprobantes/2-7-2021-19159fondito.jpg', '2021-08-02 19:15:09', 'Aceptado'),
(90, 87, 46, '/uploads/fotosComprobantes/2-7-2021-192038fondito.jpg', '2021-08-02 19:20:38', 'Aceptado'),
(91, 87, 50, '/uploads/fotosComprobantes/2-7-2021-192121codigos.PNG', '2021-08-02 19:21:21', 'Aceptado'),
(92, 85, 46, '/uploads/fotosComprobantes/2-7-2021-19245defaultProfile.PNG', '2021-08-02 19:24:05', 'Aceptado'),
(93, 85, 50, '/uploads/fotosComprobantes/2-7-2021-19428codigos.PNG', '2021-08-02 19:42:08', 'Aceptado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contactos`
--

CREATE TABLE `contactos` (
  `id_contacto` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `mensaje` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `contactos`
--

INSERT INTO `contactos` (`id_contacto`, `nombre`, `correo`, `mensaje`) VALUES
(35, 'xddd', 'admin@gmail.com', 'xdd'),
(39, 'Victor Hernandez', 'victor-2027@hotmail.com', 'xdddd');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso`
--

CREATE TABLE `curso` (
  `id_curso` int(11) NOT NULL,
  `nombre_curso` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `capacidad` int(11) DEFAULT NULL,
  `calificacion` int(11) DEFAULT NULL,
  `precio` float NOT NULL,
  `horario` datetime DEFAULT NULL,
  `url_foto_curso` varchar(255) DEFAULT NULL,
  `tipo` varchar(20) NOT NULL,
  `modalidad` varchar(20) NOT NULL,
  `enlace` varchar(255) DEFAULT NULL,
  `habilitado` tinyint(1) NOT NULL,
  `duracion` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `curso`
--

INSERT INTO `curso` (`id_curso`, `nombre_curso`, `descripcion`, `capacidad`, `calificacion`, `precio`, `horario`, `url_foto_curso`, `tipo`, `modalidad`, `enlace`, `habilitado`, `duracion`, `id_usuario`) VALUES
(43, 'PHP Desde Cero', 'Aprende PHP, el lenguaje de programación backend más importante de toda la web.', 0, NULL, 15000, '0000-00-00 00:00:00', '/uploads/fotosCursos/2-7-2021-72824php.jpg', 'Taller', 'Asincrónico', 'null', 1, 0, 4),
(45, 'Interfaces gráficas en Java', 'Implementa interfaces gráficas en tus proyectos con Java.', 0, NULL, 12000, '0000-00-00 00:00:00', '/uploads/fotosCursos/2-7-2021-72913java.jpg', 'Taller', 'Asincrónico', 'null', 1, 0, 4),
(46, 'Laravel 8', 'Domina el framework más usado y amigable de PHP en su última versión.', 30, NULL, 94000, '2021-06-11 16:08:00', '/uploads/fotosCursos/2-7-2021-64416Laravel 8.png', 'Taller', 'Sincrónico', 'https://us04web.zoom.us/j/4751858299?pwd=NXRwWHJlOWUyMnJoSnRpZmJQM25PZz09', 1, 6, 47),
(47, 'Concurrencia en Go', 'Aprende como funciona la concurrencia en Go y a implementarla con buenas prácticas para mejorar el rendimiento de tus aplicaciones.', 0, NULL, 12555, '0000-00-00 00:00:00', '/uploads/fotosCursos/2-7-2021-7306go.png', 'Taller', 'Asincrónico', 'null', 1, 0, 4),
(49, 'Preparación y limpieza de datos para análisis', 'Usa Python y Google Colab para preparar y limpiar los datos de diversas fuentes y asegura su calidad para su posterior análisis.', 50, NULL, 12311, '2021-06-26 05:36:00', '/uploads/fotosCursos/2-7-2021-7014Base de Datos.png', 'Taller', 'Sincrónico', 'https://zoom.us/j/7624548251?pwd=aEtlZWV5SFJBTzMzdlF3MU9ERGY0UT09&uname=pirulin+pinpon', 1, 2, 47),
(50, 'Dart desde cero', 'Aprende a programar en el único lenguaje de Google para desarrollo móvil, web y escritorio.', 30, NULL, 15000, '2021-06-18 21:18:00', '/uploads/fotosCursos/2-7-2021-72514dart.png', 'Taller', 'Sincrónico', 'https://zoom.us/j/7624548251?pwd=aEtlZWV5SFJBTzMzdlF3MU9ERGY0UT09&uname=pirulin+pinpon', 1, 5, 47),
(51, 'Algoritmos en la programación', 'Desarrolla el pensamiento lógico y aprende a resolver problemas como un programador.', 0, NULL, 15000, '0000-00-00 00:00:00', '/uploads/fotosCursos/2-7-2021-82121algoritmos.png', 'Taller', 'Asincrónico', 'null', 1, 0, 47);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `material_clase`
--

CREATE TABLE `material_clase` (
  `id_material_clase` int(11) NOT NULL,
  `url_material` varchar(255) NOT NULL,
  `nombre_material` varchar(255) NOT NULL,
  `id_tema` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `material_tarea`
--

CREATE TABLE `material_tarea` (
  `id_material_tarea` int(11) NOT NULL,
  `url_material` varchar(255) NOT NULL,
  `nombre_material_tarea` varchar(255) NOT NULL,
  `fecha_entrega` datetime NOT NULL,
  `id_tarea` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modulo`
--

CREATE TABLE `modulo` (
  `id_modulo` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `id_curso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `modulo`
--

INSERT INTO `modulo` (`id_modulo`, `titulo`, `id_curso`) VALUES
(59, 'Conceptos y Claves', 43),
(60, 'Formación Socioemocional', 43),
(61, 'Conflictos', 43),
(62, 'Estrategias de Disciplina Formativa', 43),
(63, 'Introducción', 46),
(64, 'Introducción', 45),
(65, 'Conceptos y Claves', 46),
(66, 'Introducción', 51),
(67, 'Introducción', 47);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pais`
--

CREATE TABLE `pais` (
  `id_pais` varchar(100) NOT NULL,
  `nombre_pais` varchar(100) NOT NULL,
  `url_foto_pais` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pais`
--

INSERT INTO `pais` (`id_pais`, `nombre_pais`, `url_foto_pais`) VALUES
('AD', 'Andorra', '/uploads/paises/andorra.png'),
('AE', 'United Arab Emirates', '/uploads/paises/unitedArabEmirates.png'),
('AF', 'Afghanistan', '/uploads/paises/afganistan.png'),
('AG', 'Antigua and Barbuda', '/uploads/paises/AntiguaandBarbuda.png'),
('AI', 'Anguilla', '/uploads/paises/Anguilla.jpg'),
('AL', 'Albania', '/uploads/paises/Albania.png'),
('AM', 'Armenia', '/uploads/paises/Armenia.jpg'),
('AO', 'Angola', '/uploads/paises/Angola.png'),
('AQ', 'Antarctica', '/uploads/paises/Antartica.PNG'),
('AR', 'Argentina', '/uploads/paises/argentina.svg'),
('AS', 'American Samoa', '/uploads/paises/AmericanSamoa.png'),
('AT', 'Austria', '/uploads/paises/Austria.jpg'),
('AU', 'Australia', '/uploads/paises/Australia.png'),
('AW', 'Aruba', '/uploads/paises/Aruba.png'),
('AX', 'Aland Islands', '/uploads/paises/AlandIslands.svg'),
('AZ', 'Azerbaijan', '/uploads/paises/Azerbaijan.png'),
('BA', 'Bosnia and Herzegovina', '/uploads/paises/BosniaandHerzegovina.png'),
('BB', 'Barbados', '/uploads/paises/Barbados.png'),
('BD', 'Bangladesh', '/uploads/paises/bangladesh.png'),
('BE', 'Belgium', '/uploads/paises/Belgium.png'),
('BF', 'Burkina Faso', '/uploads/paises/BurkinaFaso.png'),
('BG', 'Bulgaria', '/uploads/paises/Bulgaria.png'),
('BH', 'Bahrain', '/uploads/paises/Bahrain.svg'),
('BI', 'Burundi', '/uploads/paises/Burundi.png'),
('BJ', 'Benin', '/uploads/paises/Benin.svg'),
('BL', 'Saint Barthelemy', '/uploads/paises/SaintBarthelemy.png'),
('BM', 'Bermuda', '/uploads/paises/Bermuda.png'),
('BN', 'Brunei Darussalam', '/uploads/paises/BruneiDarussalam.svg'),
('BO', 'Bolivia', '/uploads/paises/Bolivia.png'),
('BQ', 'Bonair', '/uploads/paises/bonair.png'),
('BR', 'Brazil', '/uploads/paises/Brazil.png'),
('BS', 'Bahamas', '/uploads/paises/Bahamas.png'),
('BT', 'Bhutan', '/uploads/paises/Bhutan.svg'),
('BW', 'Botswana', '/uploads/paises/Botswana.png'),
('BY', 'Belarus', '/uploads/paises/Belarus.png'),
('BZ', 'Belize', '/uploads/paises/Belize.png'),
('CA', 'Canada', '/uploads/paises/Canada.jpg'),
('CC', 'Cocos (Keeling) Islands', '/uploads/paises/Cocos(Keeling)Islands.png'),
('CF', 'Central African Republic', '/uploads/paises/CentralAfricanRepublic.png'),
('CG', 'Congo', '/uploads/paises/Congo.png'),
('CH', 'Switzerland', '/uploads/paises/Switzerland.png'),
('CI', "Cote D\ 'Ivoire", '/uploads/paises/CoteDIvoire.svg'),
('CK', 'Cook Islands', '/uploads/paises/CookIslands.png'),
('CL', 'Chile', '/uploads/paises/Chile.png'),
('CM', 'Cameroon', '/uploads/paises/Cameroon.png'),
('CN', 'China', '/uploads/paises/China.png'),
('CO', 'Colombia', '/uploads/paises/Colombia.png'),
('CR', 'Costa Rica', '/uploads/paises/CostaRica.png'),
('CU', 'Cuba', '/uploads/paises/Cuba.png'),
('CV', 'Cape Verde', '/uploads/paises/CapeVerde.png'),
('CW', 'Curacao', '/uploads/paises/Curacao.png'),
('CX', 'Christmas Island', '/uploads/paises/ChristmasIsland.jpg'),
('CY', 'Cyprus', '/uploads/paises/Cyprus.png'),
('CZ', 'Czech Republic', '/uploads/paises/CzechRepublic.png'),
('DE', 'Germany', '/uploads/paises/Germany.png'),
('DJ', 'Djibouti', '/uploads/paises/Djibouti'),
('DK', 'Denmark', '/uploads/paises/Denmark.png'),
('DM', 'Dominica', '/uploads/paises/Dominica.png'),
('DO', 'Dominican Republic', '/uploads/paises/DominicanRepublic.png'),
('DZ', 'Algeria', '/uploads/paises/Algeria.png'),
('EC', 'Ecuador', '/uploads/paises/Ecuador.png'),
('EE', 'Estonia', '/uploads/paises/Estonia.png'),
('EG', 'Egypt', '/uploads/paises/Egypt.png'),
('EH', 'Western Sahara', '/uploads/paises/WesternSahara.png'),
('ER', 'Eritrea', '/uploads/paises/Eritrea.png'),
('ES', 'Spain', '/uploads/paises/Spain.png'),
('ET', 'Ethiopia', '/uploads/paises/Ethiopia.png'),
('FI', 'Finland', '/uploads/paises/Finland.png'),
('FJ', 'Fiji', '/uploads/paises/Fiji.png'),
('FK', 'Falkland Islands (Malvinas)', '/uploads/paises/FalklandIslands(Malvinas).png'),
('FM', 'Micronesi', '/uploads/paises/Micronesi.svg'),
('FO', 'Faroe Islands', '/uploads/paises/FaroeIslands.png'),
('FR', 'France', '/uploads/paises/France.png'),
('GA', 'Gabon', '/uploads/paises/Gabon.png'),
('GB', 'United Kingdom', '/uploads/paises/unitedkigdom.png'),
('GD', 'Grenada', '/uploads/paises/Grenada.svg'),
('GE', 'Georgia', '/uploads/paises/Georgia.png'),
('GF', 'French Guiana', '/uploads/paises/FrenchGuiana.jpg'),
('GG', 'Guernsey', '/uploads/paises/Guernsey.png'),
('GH', 'Ghana', '/uploads/paises/Ghana.png'),
('GI', 'Gibraltar', '/uploads/paises/Gibraltar.png'),
('GL', 'Greenland', '/uploads/paises/Greenland.png'),
('GM', 'Gambia', '/uploads/paises/Gambia.png'),
('GN', 'Guinea', '/uploads/paises/Guinea.png'),
('GP', 'Guadeloupe', '/uploads/paises/Guadeloupe.png'),
('GQ', 'Equatorial Guinea', '/uploads/paises/EquatorialGuinea.png'),
('GR', 'Greece', '/uploads/paises/Greece.jpg'),
('GS', 'South Georgia and the South Sandwich Islands', '/uploads/paises/SouthGeorgiaandtheSouthSandwichIslands.jpg'),
('GT', 'Guatemala', '/uploads/paises/Guatemala.png'),
('GU', 'Guam', '/uploads/paises/Guam.png'),
('GW', 'Guinea-Bissau', '/uploads/paises/GuineaBissau.svg'),
('GY', 'Guyana', '/uploads/paises/Guyana.svg'),
('HK', 'Hong Kong', '/uploads/paises/HongKong.png'),
('HN', 'Honduras', '/uploads/paises/Honduras.png'),
('HR', 'Croatia', '/uploads/paises/Croatia.svg'),
('HT', 'Haiti', '/uploads/paises/Haiti.png'),
('HU', 'Hungary', '/uploads/paises/Hungary.png'),
('ID', 'Indonesia', '/uploads/paises/Indonesia.png'),
('IE', 'Ireland', '/uploads/paises/Ireland.png'),
('IL', 'Israel', '/uploads/paises/israel.png'),
('IM', 'Isle of Man', '/uploads/paises/IsleofMan.png'),
('IN', 'India', '/uploads/paises/India.png'),
('IQ', 'Iraq', '/uploads/paises/Iraq.png'),
('IR', 'Ira', '/uploads/paises/Ira.png'),
('IS', 'Iceland', '/uploads/paises/Iceland.png'),
('IT', 'Italy', '/uploads/paises/Italy.png'),
('JE', 'Jersey', '/uploads/paises/Jersey.png'),
('JM', 'Jamaica', '/uploads/paises/Jamaica.png'),
('JO', 'Jordan', '/uploads/paises/Jordan.png'),
('JP', 'Japan', '/uploads/paises/Japan.png'),
('KE', 'Kenya', '/uploads/paises/Kenya.png'),
('KG', 'Kyrgyzstan', '/uploads/paises/Kyrgyzstan.png'),
('KH', 'Cambodia', '/uploads/paises/Cambodia.svg'),
('KI', 'Kiribati', '/uploads/paises/Kiribati.png'),
('KM', 'Comoros', '/uploads/paises/Comoros.svg'),
('KN', 'Saint Kitts and Nevis', '/uploads/paises/SaintKittsandNevis.png'),
('KP', 'Korea del Norte', '/uploads/paises/KoreadelNorte.png'),
('KR', 'Korea del Sur', '/uploads/paises/KoreadelSur.png'),
('KW', 'Kuwait', '/uploads/paises/Kuwait.svg'),
('KY', 'Cayman Islands', '/uploads/paises/CaymanIslands.svg'),
('KZ', 'Kazakhstan', '/uploads/paises/Kazakhstan.svg'),
('LA', "Lao People\'s Democratic Republic", "/uploads/paises/LaoPeople\'sDemocraticRepublic.png"),
('LB', 'Lebanon', '/uploads/paises/Lebanon.jpg'),
('LC', 'Saint Lucia', '/uploads/paises/SaintLucia.svg'),
('LI', 'Liechtenstein', '/uploads/paises/Liechtenstein.svg'),
('LK', 'Sri Lanka', '/uploads/paises/SriLanka.png'),
('LR', 'Liberia', '/uploads/paises/Liberia.png'),
('LS', 'Lesotho', '/uploads/paises/Lesotho.png'),
('LT', 'Lithuania', '/uploads/paises/Lithuania.svg'),
('LU', 'Luxembourg', '/uploads/paises/Luxemburgo.svg'),
('LV', 'Latvia', '/uploads/paises/Latvia.svg'),
('LY', 'Libya', '/uploads/paises/Libya.png'),
('MA', 'Morocco', '/uploads/paises/Morocco.png'),
('MC', 'Monaco', '/uploads/paises/Monaco.png'),
('MD', 'Moldov', '/uploads/paises/Moldov.svg'),
('ME', 'Montenegro', '/uploads/paises/Montenegro.png'),
('MG', 'Madagascar', '/uploads/paises/madagascar.png'),
('MH', 'Marshall Islands', '/uploads/paises/MarshallIslands.png'),
('MK', 'Macedonia', '/uploads/paises/Macedonia.png'),
('ML', 'Mali', '/uploads/paises/Mali.png'),
('MM', 'Myanmar', '/uploads/paises/Myanmar.jpg'),
('MN', 'Mongolia', '/uploads/paises/Mongolia.png'),
('MO', 'Macau', '/uploads/paises/Macau.png'),
('MP', 'Northern Mariana Islands', '/uploads/paises/NorthernMarianaIslands.png'),
('MQ', 'Martinique', '/uploads/paises/Martinique.png'),
('MR', 'Mauritania', '/uploads/paises/Mauritania.png'),
('MS', 'Montserrat', '/uploads/paises/Montserrat.png'),
('MT', 'Malta', '/uploads/paises/Malta.png'),
('MU', 'Mauritius', '/uploads/paises/Mauritius.png'),
('MV', 'Maldives', '/uploads/paises/maldivas.svg'),
('MW', 'Malawi', '/uploads/paises/Malawi.png'),
('MX', 'Mexico', '/uploads/paises/Mexico.png'),
('MY', 'Malaysia', '/uploads/paises/Malaysia.png'),
('MZ', 'Mozambique', '/uploads/paises/Mozambique.png'),
('NA', 'Namibia', '/uploads/paises/Namibia.png'),
('NC', 'New Caledonia', '/uploads/paises/NewCaledonia.jpg'),
('NE', 'Niger', '/uploads/paises/Niger.png'),
('NF', 'Norfolk Island', '/uploads/paises/NorfolkIsland.png'),
('NG', 'Nigeria', '/uploads/paises/Nigeria.svg'),
('NI', 'Nicaragua', '/uploads/paises/Nicaragua.jpg'),
('NL', 'Netherlands', '/uploads/paises/Netherlands.png'),
('NO', 'Norway', '/uploads/paises/Norway.png'),
('NP', 'Nepal', '/uploads/paises/Nepal.png'),
('NR', 'Nauru', '/uploads/paises/Nauru.svg'),
('NU', 'Niue', '/uploads/paises/Niue.jpg'),
('NZ', 'New Zealand', '/uploads/paises/NewZealand.svg'),
('OM', 'Oman', '/uploads/paises/Oman.png'),
('PA', 'Panama', '/uploads/paises/Panama.png'),
('PE', 'Peru', '/uploads/paises/Peru.png'),
('PF', 'French Polynesia', '/uploads/paises/FrenchPolynesia.png'),
('PG', 'Papua New Guinea', '/uploads/paises/PapuNewGuinea.png'),
('PH', 'Philippines', '/uploads/paises/Philippines.png'),
('PK', 'Pakistan', '/uploads/paises/Pakistan.png'),
('PL', 'Poland', '/uploads/paises/Poland.png'),
('PM', 'Saint Pierre and Miquelon', '/uploads/paises/SaintPierreandMiquelon.png'),
('PN', 'Pitcairn Islands', '/uploads/paises/PitcairnIslands.png'),
('PR', 'Puerto Rico', '/uploads/paises/PuertoRico.png'),
('PS', 'Palestinian Territory', '/uploads/paises/PalestinianTerritory.png'),
('PT', 'Portugal', '/uploads/paises/Portugal.png'),
('PW', 'Palau', '/uploads/paises/Palau.svg'),
('PY', 'Paraguay', '/uploads/paises/Paraguay.png'),
('QA', 'Qatar', '/uploads/paises/Qatar.png'),
('RE', 'Reunion', '/uploads/paises/Reunion.png'),
('RO', 'Romania', '/uploads/paises/Romania.png'),
('RS', 'Serbia', '/uploads/paises/Serbia.png'),
('RU', 'Russian Federation', '/uploads/paises/RussianFederation.png'),
('RW', 'Rwanda', '/uploads/paises/Rwanda.svg'),
('SA', 'Saudi Arabia', '/uploads/paises/SaudiArabia.png'),
('SB', 'Solomon Islands', '/uploads/paises/SolomonIslands.png'),
('SC', 'Seychelles', '/uploads/paises/Seychelles.png'),
('SD', 'Sudan', '/uploads/paises/Sudan.png'),
('SE', 'Sweden', '/uploads/paises/Sweden.jpg'),
('SG', 'Singapore', '/uploads/paises/Singapore.jpg'),
('SH', 'Saint Helena', '/uploads/paises/SaintHelena.png'),
('SI', 'Slovenia', '/uploads/paises/Slovenia.svg'),
('SJ', 'Svalbard and Jan Mayen', '/uploads/paises/SvalbardandJanMayen.png'),
('SK', 'Slovakia', '/uploads/paises/Slovakia.png'),
('SL', 'Sierra Leone', '/uploads/paises/SierraLeone.png'),
('SM', 'San Marino', '/uploads/paises/SanMarino.svg'),
('SN', 'Senegal', '/uploads/paises/Senegal.png'),
('SO', 'Somalia', '/uploads/paises/Somalia.png'),
('SR', 'Suriname', '/uploads/paises/Suriname.png'),
('SS', 'South Sudan', '/uploads/paises/SouthSudan.png'),
('ST', 'Sao Tome and Principe', '/uploads/paises/SaoTomeandPrincipe.svg'),
('SV', 'El Salvador', '/uploads/paises/ElSalvador.png'),
('SX', 'Sint Maarten (Dutch part)', '/uploads/paises/SintMaarten(Dutchpart).png'),
('SY', 'Syrian Arab Republic', '/uploads/paises/SyrianArabRepublic.png'),
('SZ', 'Swaziland', '/uploads/paises/Swaziland.png'),
('TC', 'Turks and Caicos Islands', '/uploads/paises/TurksandCaicosIslands.png'),
('TD', 'Chad', '/uploads/paises/Chad.png'),
('TF', 'French Southern Territories', '/uploads/paises/FrenchSouthernTerritories.png'),
('TG', 'Togo', '/uploads/paises/Togo.svg'),
('TH', 'Thailand', '/uploads/paises/Thailand.png'),
('TJ', 'Tajikistan', '/uploads/paises/Tajikistan.png'),
('TK', 'Tokelau', '/uploads/paises/Tokelau.png'),
('TL', 'Timor-Leste', '/uploads/paises/Timor-Leste.svg'),
('TM', 'Turkmenistan', '/uploads/paises/Turkmenistan.png'),
('TN', 'Tunisia', '/uploads/paises/Tunisia.jpg'),
('TO', 'Tonga', '/uploads/paises/Tonga.png'),
('TR', 'Turkey', '/uploads/paises/Turkey.png'),
('TT', 'Trinidad and Tobago', '/uploads/paises/TrinidadandTobago.png'),
('TV', 'Tuvalu', '/uploads/paises/Tuvalu.svg'),
('TW', 'Taiwan', '/uploads/paises/Taiwan.png'),
('TZ', 'Tanzani', '/uploads/paises/Tanzani.svg'),
('UA', 'Ukraine', '/uploads/paises/Ukraine.png'),
('UG', 'Uganda', '/uploads/paises/Uganda.png'),
('US', 'United States', '/uploads/paises/UnitedStates.png'),
('UY', 'Uruguay', '/uploads/paises/Uruguay.png'),
('UZ', 'Uzbekistan', '/uploads/paises/Uzbekistan.png'),
('VA', 'Holy See (Vatican City State)', '/uploads/paises/HolySee(VaticanCityState).svg'),
('VC', 'Saint Vincent and the Grenadines', '/uploads/paises/SaintVincentandtheGrenadines.png'),
('VE', 'Venezuela', '/uploads/paises/Venezuela.png'),
('VN', 'Vietnam', '/uploads/paises/Vietnam.png'),
('VU', 'Vanuatu', '/uploads/paises/Vanuatu.png'),
('WS', 'Samoa', '/uploads/paises/Samoa.svg'),
('YE', 'Yemen', '/uploads/paises/Yemen.svg'),
('ZA', 'South Africa', '/uploads/paises/SouthAfrica.svg'),
('ZM', 'Zambia', '/uploads/paises/Zambia.png'),
('ZW', 'Zimbabwe', '/uploads/paises/Zimbabwe.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rango`
--

CREATE TABLE `rango` (
  `id_rango` int(11) NOT NULL,
  `nombre_rango` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `rango`
--

INSERT INTO `rango` (`id_rango`, `nombre_rango`) VALUES
(1, 'admin'),
(2, 'user'),
(3, 'profesor');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('GwWzS5RoynkHjjjDIj6ZNc77edF9Ycl8', 1628078664, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{}}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarea`
--

CREATE TABLE `tarea` (
  `id_tarea` int(11) NOT NULL,
  `titulo_tarea` varchar(255) NOT NULL,
  `descripcion_tarea` text NOT NULL,
  `id_modulo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tarea`
--

INSERT INTO `tarea` (`id_tarea`, `titulo_tarea`, `descripcion_tarea`, `id_modulo`) VALUES
(8, 'Tarea 1', 'Estimados Estudiantes\n\nCompletar el análisis interno considerando la guía proporcionada en la sesión del dia jueves 24 , haciendo énfasis en el proceso para definir situaciones esperadas o lineamientos y el instrumento que permita obtener las respuestas a partir de lasd cuales se identifiquen  fortalezas y debilidades asociadas al objeto de estudio u organización ', 63),
(10, 'Tarea 2', 'Subir material', 63),
(11, 'Tarea 1', 'xd', 67);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tema`
--

CREATE TABLE `tema` (
  `id_tema` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `url_video` varchar(266) NOT NULL,
  `id_modulo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tema`
--

INSERT INTO `tema` (`id_tema`, `titulo`, `descripcion`, `url_video`, `id_modulo`) VALUES
(150, 'Conceptos y Claves', 'xdddd', '/videos/582494685', 65),
(151, 'Introducción', 'xddddd', '/videos/582637581', 65),
(152, 'tema 2', 'xdddddd', '/videos/582639246', 65),
(153, 'tema 1 xdddddddd', 'xddd', '/videos/582640180', 65);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `profesion` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `telefono` varchar(30) NOT NULL,
  `rut` varchar(30) NOT NULL,
  `habilitado_u` tinyint(1) NOT NULL,
  `url_foto_usuario` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `id_rango` int(11) NOT NULL,
  `id_pais_nacimiento` varchar(100) NOT NULL,
  `id_pais_residencia` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `apellido`, `profesion`, `correo`, `telefono`, `rut`, `habilitado_u`, `url_foto_usuario`, `password`, `id_rango`, `id_pais_nacimiento`, `id_pais_residencia`) VALUES
(4, 'Marco', 'Antonio', '123', 'marco@gmail.com', '123', '123', 1, '/defaultProfile.PNG', '$2a$10$C43Y0JBtLdWQAIOZFF/vbeACtytacVmg3LAJ4ylVNqQwlz.HMMPfy', 3, 'AT', 'BD'),
(45, 'Administrador', 'admin', 'admin', 'admin@gmail.com', '999999999', '99999999', 1, '/defaultProfile.PNG', '$2a$10$Qklryy2ZkeRuz29DQQGUKeqx3.0mRPmpbXi.srCGD3lvgpKRYjqTO', 1, 'BE', 'ZA'),
(47, 'Victor Antonio', 'Villacorta', 'xd', 'villa-2027@gmail.com', '+51990978736', '121', 1, '/defaultProfile.PNG', '$2a$10$reYkiic2jnB11/p5TKKXH.Kb9LoJXhE/Rdxo0IeVnRA5eP7JOEspa', 3, 'BB', 'BS'),
(84, 'Victor', 'Hernández Villalobos', '', 'victorhv2729@gmail.com', '', '', 1, 'https://lh3.googleusercontent.com/a-/AOh14GjENB-7MZUeTukpsAyY9ONQLZXKZoSIDNAOWY9UyQ=s96-c', '', 2, 'AU', 'BD'),
(85, 'Victor Gabriel', 'Hernandez Villalobos', 'Ing. Sistemas', 'vhernandezv1@upao.edu.pe', '990978736', '77071945', 1, 'https://lh3.googleusercontent.com/a-/AOh14GjhQEQDcAMvXSkW53gz9a8_B6pwwnmaZBbJ1LCL=s96-c', '', 2, 'PE', 'PE'),
(86, 'Victor ', 'Hernandez', 'Ing Sistemas', 'victor-2027@hotmail.com', '990978736', '77071945', 1, '/defaultProfile.PNG', '$2a$10$PiiCSc15h5eHfAZgHvJrteYgWvbDUTrWI8mAOpLmfB8rQUsfc26o2', 2, 'PE', 'PE'),
(87, 'Joseph', 'De La Cruz Rivas', 'Ing Sistemas', 'razorij20@gmail.com', '990978736', '77071945', 1, '/defaultProfile.PNG', '$2a$10$3QaNoagbbQ3VQZLcxAmjs.jq.6xCozfm4l70CAaGXN4xDlepN9NeK', 2, 'AL', 'PE');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_curso`
--

CREATE TABLE `usuario_curso` (
  `id_usuario_curso` int(11) NOT NULL,
  `favorito` int(11) NOT NULL,
  `url_comprobante` varchar(255) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_curso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario_curso`
--

INSERT INTO `usuario_curso` (`id_usuario_curso`, `favorito`, `url_comprobante`, `id_usuario`, `id_curso`) VALUES
(51, 0, '/uploads/fotosComprobantes/2-7-2021-115432Tableau-Editado.png', 85, 43),
(52, 0, '/uploads/fotosComprobantes/2-7-2021-183716fondito.jpg', 85, 45),
(53, 0, '/uploads/fotosComprobantes/2-7-2021-184122codigos.PNG', 84, 51),
(54, 0, '/uploads/fotosComprobantes/2-7-2021-191231defaultProfile.PNG', 85, 51),
(55, 0, '/uploads/fotosComprobantes/2-7-2021-19159fondito.jpg', 87, 43),
(56, 0, '/uploads/fotosComprobantes/2-7-2021-192038fondito.jpg', 87, 46),
(57, 0, '/uploads/fotosComprobantes/2-7-2021-192121codigos.PNG', 87, 50),
(58, 0, '/uploads/fotosComprobantes/2-7-2021-19245defaultProfile.PNG', 85, 46),
(60, 0, '/uploads/fotosComprobantes/2-7-2021-19428codigos.PNG', 85, 50);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comentario`
--
ALTER TABLE `comentario`
  ADD PRIMARY KEY (`id_comentario`),
  ADD KEY `id_curso` (`id_curso`),
  ADD KEY `id_tema` (`id_tema`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `comprobante`
--
ALTER TABLE `comprobante`
  ADD PRIMARY KEY (`id_comprobante`),
  ADD KEY `id_curso` (`id_curso`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `contactos`
--
ALTER TABLE `contactos`
  ADD PRIMARY KEY (`id_contacto`);

--
-- Indices de la tabla `curso`
--
ALTER TABLE `curso`
  ADD PRIMARY KEY (`id_curso`),
  ADD UNIQUE KEY `nombre_curso` (`nombre_curso`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `material_clase`
--
ALTER TABLE `material_clase`
  ADD PRIMARY KEY (`id_material_clase`),
  ADD KEY `id_tema` (`id_tema`);

--
-- Indices de la tabla `material_tarea`
--
ALTER TABLE `material_tarea`
  ADD PRIMARY KEY (`id_material_tarea`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_tarea` (`id_tarea`);

--
-- Indices de la tabla `modulo`
--
ALTER TABLE `modulo`
  ADD PRIMARY KEY (`id_modulo`),
  ADD KEY `id_curso` (`id_curso`);

--
-- Indices de la tabla `pais`
--
ALTER TABLE `pais`
  ADD PRIMARY KEY (`id_pais`);

--
-- Indices de la tabla `rango`
--
ALTER TABLE `rango`
  ADD PRIMARY KEY (`id_rango`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD PRIMARY KEY (`id_tarea`),
  ADD KEY `id_modulo` (`id_modulo`);

--
-- Indices de la tabla `tema`
--
ALTER TABLE `tema`
  ADD PRIMARY KEY (`id_tema`),
  ADD KEY `id_modulo` (`id_modulo`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD KEY `id_rango` (`id_rango`),
  ADD KEY `id_pais_nacimiento` (`id_pais_nacimiento`),
  ADD KEY `id_pais_residencia` (`id_pais_residencia`);

--
-- Indices de la tabla `usuario_curso`
--
ALTER TABLE `usuario_curso`
  ADD PRIMARY KEY (`id_usuario_curso`),
  ADD KEY `id_curso` (`id_curso`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comentario`
--
ALTER TABLE `comentario`
  MODIFY `id_comentario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=144;

--
-- AUTO_INCREMENT de la tabla `comprobante`
--
ALTER TABLE `comprobante`
  MODIFY `id_comprobante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- AUTO_INCREMENT de la tabla `contactos`
--
ALTER TABLE `contactos`
  MODIFY `id_contacto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de la tabla `curso`
--
ALTER TABLE `curso`
  MODIFY `id_curso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT de la tabla `material_clase`
--
ALTER TABLE `material_clase`
  MODIFY `id_material_clase` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=173;

--
-- AUTO_INCREMENT de la tabla `material_tarea`
--
ALTER TABLE `material_tarea`
  MODIFY `id_material_tarea` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `modulo`
--
ALTER TABLE `modulo`
  MODIFY `id_modulo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT de la tabla `rango`
--
ALTER TABLE `rango`
  MODIFY `id_rango` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tarea`
--
ALTER TABLE `tarea`
  MODIFY `id_tarea` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `tema`
--
ALTER TABLE `tema`
  MODIFY `id_tema` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=154;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT de la tabla `usuario_curso`
--
ALTER TABLE `usuario_curso`
  MODIFY `id_usuario_curso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comentario`
--
ALTER TABLE `comentario`
  ADD CONSTRAINT `comentario_ibfk_1` FOREIGN KEY (`id_curso`) REFERENCES `curso` (`id_curso`),
  ADD CONSTRAINT `comentario_ibfk_2` FOREIGN KEY (`id_tema`) REFERENCES `tema` (`id_tema`),
  ADD CONSTRAINT `comentario_ibfk_3` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `comprobante`
--
ALTER TABLE `comprobante`
  ADD CONSTRAINT `comprobante_ibfk_1` FOREIGN KEY (`id_curso`) REFERENCES `curso` (`id_curso`),
  ADD CONSTRAINT `comprobante_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `curso`
--
ALTER TABLE `curso`
  ADD CONSTRAINT `curso_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `material_clase`
--
ALTER TABLE `material_clase`
  ADD CONSTRAINT `material_clase_ibfk_1` FOREIGN KEY (`id_tema`) REFERENCES `tema` (`id_tema`);

--
-- Filtros para la tabla `material_tarea`
--
ALTER TABLE `material_tarea`
  ADD CONSTRAINT `material_tarea_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `material_tarea_ibfk_2` FOREIGN KEY (`id_tarea`) REFERENCES `tarea` (`id_tarea`);

--
-- Filtros para la tabla `modulo`
--
ALTER TABLE `modulo`
  ADD CONSTRAINT `modulo_ibfk_1` FOREIGN KEY (`id_curso`) REFERENCES `curso` (`id_curso`);

--
-- Filtros para la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD CONSTRAINT `tarea_ibfk_1` FOREIGN KEY (`id_modulo`) REFERENCES `modulo` (`id_modulo`);

--
-- Filtros para la tabla `tema`
--
ALTER TABLE `tema`
  ADD CONSTRAINT `tema_ibfk_1` FOREIGN KEY (`id_modulo`) REFERENCES `modulo` (`id_modulo`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`id_rango`) REFERENCES `rango` (`id_rango`),
  ADD CONSTRAINT `usuario_ibfk_3` FOREIGN KEY (`id_pais_nacimiento`) REFERENCES `pais` (`id_pais`),
  ADD CONSTRAINT `usuario_ibfk_4` FOREIGN KEY (`id_pais_residencia`) REFERENCES `pais` (`id_pais`);

--
-- Filtros para la tabla `usuario_curso`
--
ALTER TABLE `usuario_curso`
  ADD CONSTRAINT `usuario_curso_ibfk_1` FOREIGN KEY (`id_curso`) REFERENCES `curso` (`id_curso`),
  ADD CONSTRAINT `usuario_curso_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
