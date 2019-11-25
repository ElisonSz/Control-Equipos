

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `Control_Equipos`
--
CREATE DATABASE IF NOT EXISTS `Control_Equipos` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `Control_Equipos`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `CATEGORIAS`
--

DROP TABLE IF EXISTS `CATEGORIAS`;
CREATE TABLE IF NOT EXISTS `CATEGORIAS` (
  `ID_CATEGORIA` int(11) NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(40) NOT NULL,
  `ACTIVO` tinyint(4) NOT NULL DEFAULT '1',
  `DESCRIPCION` text,
  PRIMARY KEY (`ID_CATEGORIA`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `CATEGORIAS`
--

INSERT INTO `CATEGORIAS` (`ID_CATEGORIA`, `NOMBRE`, `ACTIVO`, `DESCRIPCION`) VALUES
(1, 'EQUIPO DE TRANSPORTE', 1, 'EQUIPO DE TRANSPORTE TERRESTRE'),
(2, 'EQUIPO DE OFICINA', 1, 'EQUIPO DE OFICINA UTILIZADO PARA PROCESOS');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `EQUIPOS`
--

DROP TABLE IF EXISTS `EQUIPOS`;
CREATE TABLE IF NOT EXISTS `EQUIPOS` (
  `ID_EQUIPO` int(11) NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(40) NOT NULL,
  `CARACTERISTICAS` text NOT NULL,
  `NUMERO_SERIE` varchar(25) NOT NULL,
  `ID_CATEGORIA` int(11) DEFAULT NULL,
  `ACTIVO` tinyint(4) NOT NULL DEFAULT '1',
  `DISPONIBLE` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID_EQUIPO`),
  KEY `ID_TIPO` (`ID_CATEGORIA`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `EQUIPOS`
--

INSERT INTO `EQUIPOS` (`ID_EQUIPO`, `NOMBRE`, `CARACTERISTICAS`, `NUMERO_SERIE`, `ID_CATEGORIA`, `ACTIVO`, `DISPONIBLE`) VALUES
(1, 'LAPTOP DELL', '4 GB RAM, 1 TB ALMACENAMIENTO, PROCESADOR CORE I5 °8 GENERACION.', 'DELLAP01', 2, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `PRESTAMOS`
--

DROP TABLE IF EXISTS `PRESTAMOS`;
CREATE TABLE IF NOT EXISTS `PRESTAMOS` (
  `ID_PRESTAMO` int(11) NOT NULL AUTO_INCREMENT,
  `ID_USUARIO` int(11) NOT NULL,
  `ESTADO_SALIDA` text,
  `ESTADO_ENTRADA` text,
  `FECHA_ENTRADA` datetime NOT NULL,
  `FECHA_SALIDA` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ID_EQUIPO` int(11) NOT NULL,
  `ESTADO` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID_PRESTAMO`),
  KEY `ID_USUARIO` (`ID_USUARIO`),
  KEY `ID_EQUIPO` (`ID_EQUIPO`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `PRESTAMOS`
--

INSERT INTO `PRESTAMOS` (`ID_PRESTAMO`, `ID_USUARIO`, `ESTADO_SALIDA`, `ESTADO_ENTRADA`, `FECHA_ENTRADA`, `FECHA_SALIDA`, `ID_EQUIPO`, `ESTADO`) VALUES
(1, 1, 'asd', NULL, '2019-11-10 00:00:00', '2019-11-09 10:56:31', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ROLES`
--

DROP TABLE IF EXISTS `ROLES`;
CREATE TABLE IF NOT EXISTS `ROLES` (
  `ID_ROL` int(11) NOT NULL AUTO_INCREMENT,
  `NOMBRE_ROL` varchar(20) NOT NULL,
  `ACTIVO` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID_ROL`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `ROLES`
--

INSERT INTO `ROLES` (`ID_ROL`, `NOMBRE_ROL`, `ACTIVO`) VALUES
(1, 'DEV', 1),
(2, 'ADMINISTRADOR', 1),
(3, 'EMPLEADO', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `USUARIOS`
--

DROP TABLE IF EXISTS `USUARIOS`;
CREATE TABLE IF NOT EXISTS `USUARIOS` (
  `ID_USUARIO` int(11) NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(40) NOT NULL,
  `APELLIDO` varchar(40) NOT NULL,
  `CODIGO_EMPLEADO` varchar(6) NOT NULL,
  `TELEFONO` varchar(8) DEFAULT NULL,
  `CORREO` varchar(30) DEFAULT NULL,
  `USUARIO` varchar(20) NOT NULL,
  `PASS` text NOT NULL,
  `ROL` int(11) DEFAULT NULL,
  `ACTIVO` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID_USUARIO`),
  KEY `ROL` (`ROL`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `USUARIOS`
--

INSERT INTO `USUARIOS` (`ID_USUARIO`, `NOMBRE`, `APELLIDO`, `CODIGO_EMPLEADO`, `TELEFONO`, `CORREO`, `USUARIO`, `PASS`, `ROL`, `ACTIVO`) VALUES
(1, 'JORGE LUIS', 'MONGE HERNANDEZ', '019819', '78945612', 'MONGE@GMAIL.COM', 'MONGE', 'monge.01', 2, 1),
(2, 'ISAI ELISON', 'SANCHEZ GONZALEZ', '029819', '78542136', 'ELISON@GMAIL.COM', 'ELI', 'elison', 2, 1);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `EQUIPOS`
--
ALTER TABLE `EQUIPOS`
  ADD CONSTRAINT `EQUIPOS_ibfk_1` FOREIGN KEY (`ID_CATEGORIA`) REFERENCES `CATEGORIAS` (`ID_CATEGORIA`);

--
-- Filtros para la tabla `PRESTAMOS`
--
ALTER TABLE `PRESTAMOS`
  ADD CONSTRAINT `PRESTAMOS_ibfk_1` FOREIGN KEY (`ID_USUARIO`) REFERENCES `USUARIOS` (`ID_USUARIO`),
  ADD CONSTRAINT `PRESTAMOS_ibfk_2` FOREIGN KEY (`ID_EQUIPO`) REFERENCES `EQUIPOS` (`ID_EQUIPO`);

--
-- Filtros para la tabla `USUARIOS`
--
ALTER TABLE `USUARIOS`
  ADD CONSTRAINT `USUARIOS_ibfk_1` FOREIGN KEY (`ROL`) REFERENCES `ROLES` (`ID_ROL`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;