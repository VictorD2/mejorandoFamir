-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-08-2021 a las 23:11:32
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

--
-- Volcado de datos para la tabla `comentario`
--


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

--
-- Volcado de datos para la tabla `material_clase`
--

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
('CI', 'Cote D\'Ivoire', '/uploads/paises/CoteDIvoire.svg'),
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
('LA', 'Lao People\'s Democratic Republic', '/uploads/paises/LaoPeople\'sDemocraticRepublic.png'),
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
(1, 'Administrador', 'admin', 'admin', 'admin@gmail.com', '999999999', '99999999', 1, '/defaultProfile.PNG', '$2a$10$JASgHsEzLjtjbkD7SMga8uCzsYyTFxtmOAZNOjeHV6Cj1YFQ0sZRO', 1, 'CV', 'ZA');

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
  MODIFY `id_comentario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=145;

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
  MODIFY `id_material_clase` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=176;

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
  MODIFY `id_tema` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=155;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

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
