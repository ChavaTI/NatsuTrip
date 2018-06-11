create database natsutrip;

use natsutrip;

--- Creacion de tablas 

CREATE TABLE admin (
    idAdmin INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(15) NOT NULL,
    aPaterno VARCHAR(15) NOT NULL,
    aMaterno VARCHAR(15) NOT NULL,
    username VARCHAR(20) NOT NULL,
    pass VARCHAR(20) NOT NULL,
    tipo INT NOT NULL,
    PRIMARY KEY(idAdmin)
);

CREATE TABLE usuario (
    idUsuario INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(15) NOT NULL,
    aPaterno VARCHAR(15) NOT NULL,
    aMaterno VARCHAR(15) NOT NULL,
    fNacimiento DATE NOT NULL,
    telefono VARCHAR(12) NOT NULL,
    correo VARCHAR(30) NOT NULL,
    pass VARCHAR(20) NOT NULL,
    sexo CHAR(1) NOT NULL,
    calle VARCHAR(30) NOT NULL,
    numero int NOT NULL,
    estado VARCHAR(20) NOT NULL,
    ciudad VARCHAR(20) NOT NULL,
    cp VARCHAR(5) NOT NULL,
    noTargetaDebito VARCHAR(20),
    noTargetaCredito VARCHAR(20),
    CURP VARCHAR(13) NOT NULL,
    imagen_name VARCHAR(100),
    imagen BLOB NOT NULL,
    PRIMARY KEY(idUsuario)
);

CREATE TABLE paquete (
    idPaquete INT NOT NULL AUTO_INCREMENT,
    idHotel INT NOT NULL,
    idAerolinea INT NOT NULL,
    nombre VARCHAR(15) NOT NULL,
    descripcion VARCHAR(250) NOT NULL,
    total FLOAT NOT NULL,
    imagen_name VARCHAR(100) NOT NULL,
    imagen BLOB NOT NULL,
    PRIMARY KEY(idPaquete)
);

CREATE TABLE hotel (
    idHotel INT NOT NULL AUTO_INCREMENT,
    nombreCadena VARCHAR(15) NOT NULL,
    nombreHotel VARCHAR(15) NOT NULL,
    calle VARCHAR(30) NOT NULL,
    numero int NOT NULL,
    estado VARCHAR(20) NOT NULL,
    ciudad VARCHAR(20) NOT NULL,
    estrellas int NOT NULL,
    imagen_name VARCHAR(100) NOT NULL,
    imagen BLOB NOT NULL,
    PRIMARY KEY(idHotel)
);

CREATE TABLE habitacion (
    idHabitacion INT NOT NULL AUTO_INCREMENT,
    capacidad INT NOT NULL,
    costo FLOAT NOT NULL,
    tipo VARCHAR(2) NOT NULL,
    idHotel INT NOT NULL,
    imagen_name VARCHAR(255) NOT NULL,
    imagen BLOB NOT NULL,
    PRIMARY KEY(idHabitacion)
);

CREATE TABLE ventaPaquete (
    idVenta INT NOT NULL AUTO_INCREMENT,
    idUsuario INT NOT NULL,
    idPaquete INT NOT NULL,
    fecha DATE NOT NULL,
    costoTotal FLOAT NOT NULL,
    estatusCompra  VARCHAR(2) NOT NULL,
    PRIMARY KEY(idVenta)
);

CREATE TABLE aerolinea (
    idAerolinea INT NOT NULL AUTO_INCREMENT,
    ciudad VARCHAR(20) NOT NULL,
    nombre VARCHAR(20) NOT NULL,
    destino VARCHAR(20) NOT NULL,
    costo FLOAT NOT NULL,
    imagen_name VARCHAR(100) NOT NULL,
    imagen BLOB NOT NULL,
    PRIMARY KEY(idAerolinea)
);


CREATE TABLE pago (
    folio INT NOT NULL AUTO_INCREMENT,
    cantidad INT NOT NULL,
    fecha DATE NOT NULL,
    formaPago VARCHAR(1) NOT NULL,
    idVenta INT NOT NULL,
    PRIMARY KEY(folio)
);


-- creacion de FKs

-- fk paquete - hotel
ALTER TABLE paquete ADD CONSTRAINT fk_paquete_hotel FOREIGN KEY paquete(idHotel) REFERENCES hotel(idHotel);
-- fk paquete - aerolinea
ALTER TABLE paquete ADD CONSTRAINT fk_paquete_aerolinea FOREIGN KEY paquete(idAerolinea) REFERENCES aerolinea(idAerolinea);
-- fk habitacion - hotel
ALTER TABLE habitacion ADD CONSTRAINT fk_habitacion_hotel FOREIGN KEY habitacion(idHotel) REFERENCES hotel(idHotel);
-- fk venta - usuario
ALTER TABLE ventaPaquete ADD CONSTRAINT fk_venta_usuario FOREIGN KEY ventaPaquete(idUsuario) REFERENCES usuario(idUsuario);
-- fk venta - paquete  
ALTER TABLE ventaPaquete ADD CONSTRAINT fk_venta_paquete FOREIGN KEY ventaPaquete(idPaquete) REFERENCES paquete(idPaquete);
-- fk pago - venta
ALTER TABLE pago ADD CONSTRAINT fk_pago_venta FOREIGN KEY pago(idVenta) REFERENCES ventaPaquete(idVenta);


