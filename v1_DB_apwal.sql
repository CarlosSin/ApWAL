  -- creeacion de la base de datos
CREATE DATABASE appwal; 
USE appwal;

-- creacion de las tablas 
-- tabla administrador 
CREATE TABLE administrador ( 
    no_decontrol_admin INT NOT NULL, 
    nombre_pila VARCHAR(255), 
    primer_apellido VARCHAR(255),   
    segunda_apellido VARCHAR(255), 
    nombre_usuario VARCHAR(255), 
    telefono INT, 
    extension INT,
    fechayhora VARCHAR(255),
    correo_electronico VARCHAR(255) NOT NULL,
    password varchar(255),
	CONSTRAINT PK_Admin PRIMARY KEY (no_decontrol_admin) 
); 

-- tabla departamento 
CREATE TABLE departamento (
    ID_departamento INT,
    nombre_departamento VARCHAR(255),
    disponibilidad_departamento BOOLEAN,
    PRIMARY KEY (ID_Departamento) 
);

-- tabla general de usuarios falta el usuario y contraseña
CREATE TABLE usuario ( 
    no_decontrol_usuario INT NOT NULL, -- si
    nombre_pila VARCHAR(255),  -- si
    primer_apellido VARCHAR(255), -- si  
    segunda_apellido VARCHAR(255), -- si
    telefono INT, -- si
    extension INT, -- si 
    fecha_registro VARCHAR(255), -- si
    grado_estudio VARCHAR(255), -- si 
    correo_electronico VARCHAR(255) NOT NULL, -- si
	nombre_usuario VARCHAR(255) NULL,  
    password VARCHAR(255) NULL,
    estado_usuario BOOLEAN,
    ID_departamento_usuario INT, -- si
    CONSTRAINT PK_usuario PRIMARY KEY (no_decontrol_usuario),  
    CONSTRAINT FK_usuario_Dep FOREIGN KEY (ID_departamento_usuario) REFERENCES departamento (ID_departamento) 
);

CREATE TABLE rol (
    id_rol INT PRIMARY KEY AUTO_INCREMENT,
    nombre_rol VARCHAR(50) UNIQUE
);

CREATE TABLE usuario_rol (
    no_decontrol_usuario INT,
    id_rol INT,
	puede_iniciar_sesion BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (no_decontrol_usuario, id_rol),
    FOREIGN KEY (no_decontrol_usuario) REFERENCES usuario(no_decontrol_usuario),
    FOREIGN KEY (id_rol) REFERENCES rol(id_rol)
);


-- tablas de especie, cepa, sexo, edad o peso 
-- especie
CREATE TABLE especie (  
    ID_registro_especie INT AUTO_INCREMENT,  
    nombre_especie VARCHAR(255),
    descripcion_especie TEXT, 
    disponibilidad_especie BOOLEAN,
    no_decontrol_admin INT NOT NULL,
	CONSTRAINT PK_especie PRIMARY KEY (ID_registro_especie), 
	CONSTRAINT FK_especie FOREIGN KEY (no_decontrol_admin) REFERENCES administrador(no_decontrol_admin)
);

-- cepa    
CREATE TABLE cepa (
    ID_registro_cepa INT AUTO_INCREMENT,
    nombre_cepa VARCHAR(255),   
    descripcion_cepa TEXT,  
    disponibilidad_cepa BOOLEAN,
    no_decontrol_admin INT NOT NULL,
    ID_registro_especie INT NOT NULL,
    CONSTRAINT PK_cepa PRIMARY KEY (ID_registro_cepa), 
	CONSTRAINT FK_cepa FOREIGN KEY (ID_registro_especie) REFERENCES especie(ID_registro_especie) ON DELETE CASCADE,
	CONSTRAINT FK_cepa2 FOREIGN KEY (no_decontrol_admin) REFERENCES administrador(no_decontrol_admin)
); 

-- sexo
CREATE TABLE sexo (
    ID_registro_sexo INT AUTO_INCREMENT, 
    nombre_sexo VARCHAR(255),   
    descripcion_sexo TEXT,  
    disponibilidad_sexo BOOLEAN,
	ID_registro_cepa INT NOT NULL,
	no_decontrol_admin INT NOT NULL,
	CONSTRAINT PK_sexo PRIMARY KEY (ID_registro_sexo),
	CONSTRAINT FK_sexo FOREIGN KEY (ID_registro_cepa) REFERENCES cepa(ID_registro_cepa) ON DELETE CASCADE,
	CONSTRAINT FK_sexo2 FOREIGN KEY (no_decontrol_admin) REFERENCES administrador(no_decontrol_admin)
);

-- edad o peso
CREATE TABLE edadopeso (   
    ID_registro_edadopeso INT AUTO_INCREMENT, 
    nombre_edadopeso VARCHAR(255),   
    descripcion_edadopeso TEXT,  
    disponibilidad_edadopeso BOOLEAN, 
	ID_registro_sexo INT NOT NULL,
	no_decontrol_admin INT NOT NULL,
	CONSTRAINT PK_edadopeso PRIMARY KEY (ID_registro_edadopeso),
	CONSTRAINT FK_edadopeso FOREIGN KEY (ID_registro_sexo) REFERENCES sexo(ID_registro_sexo) ON DELETE CASCADE,
	CONSTRAINT FK_edadopeso2 FOREIGN KEY (no_decontrol_admin) REFERENCES administrador(no_decontrol_admin)
);

-- catalogo de animales 
CREATE TABLE catalogoAnimal (   
    linea VARCHAR(14) NOT NULL,
    disponibilidad_animal BOOLEAN,
    ID_registro_especie INT NOT NULL,
    ID_registro_cepa INT NOT NULL,
	ID_registro_sexo INT NOT NULL,
    ID_registro_edadopeso INT NOT NULL,
	no_decontrol_admin INT NOT NULL,
    CONSTRAINT PK_catalogoanimal PRIMARY KEY (linea),
    CONSTRAINT FK_catalogoanimal_especie FOREIGN KEY (ID_registro_especie) REFERENCES especie(ID_registro_especie) ON DELETE CASCADE,
	CONSTRAINT FK_catalogoanimal_cepa FOREIGN KEY (ID_registro_cepa) REFERENCES cepa(ID_registro_cepa) ON DELETE CASCADE,
	CONSTRAINT FK_catalogoanimal_sexo FOREIGN KEY (ID_registro_sexo) REFERENCES sexo(ID_registro_sexo) ON DELETE CASCADE,
	CONSTRAINT FK_catalogoanimal_edadopeso FOREIGN KEY (ID_registro_edadopeso) REFERENCES edadopeso(ID_registro_edadopeso) ON DELETE CASCADE,
	CONSTRAINT FK_catalogoanimal_admin FOREIGN KEY (no_decontrol_admin) REFERENCES administrador(no_decontrol_admin)
);

-- (entidades fuertes y debiles)
-- revisar la parte que la llave primaria de las entidades debiles es compuesta por la llave primara del protocolo y por el atributo que lo identifica de forma unica

CREATE TABLE protocolo (
	ID_registro_protocolo INT NOT NULL AUTO_INCREMENT,
	ID_protocolo VARCHAR(255),
	estado_protocolo VARCHAR(3),
	fecha_elaboracion VARCHAR(255) NOT NULL,
    vigencia BOOLEAN,
    no_decontrol_investigador INT NOT NULL,	-- no de contol investigador
	no_decontrol_suplente INT NOT NULL, -- No de contol suplente
	CONSTRAINT PK_protocolo PRIMARY KEY (ID_registro_protocolo),
    CONSTRAINT FK_protocolo_investigador FOREIGN KEY (no_decontrol_investigador) REFERENCES usuario(no_decontrol_usuario) ON DELETE CASCADE,
	CONSTRAINT FK_protocolo_suplente FOREIGN KEY (no_decontrol_suplente) REFERENCES usuario(no_decontrol_usuario) ON DELETE CASCADE
);

CREATE TABLE retroalimentacion (
	ID_registro_retroalimentacion INT AUTO_INCREMENT, 
	comentario VARCHAR(255),
    fecha VARCHAR(255),
	ID_registro_protocolo INT NOT NULL,
	no_decontrol_revisor INT NOT NULL,
	CONSTRAINT PK_retroalimentacion PRIMARY KEY (ID_registro_retroalimentacion),
	CONSTRAINT FK_retroalimentacion_protocolo FOREIGN KEY (ID_registro_protocolo) REFERENCES protocolo(ID_registro_protocolo),
	CONSTRAINT FK_retroalimentacion_revisor FOREIGN KEY (no_decontrol_revisor) REFERENCES usuario(no_decontrol_usuario)
);

-- tablas de solicitud
CREATE TABLE solicitud (
	ID_registro_solicitud INT AUTO_INCREMENT,
    seccion_protocolo VARCHAR(255),
    tipo_solicitud VARCHAR(255),
    fecha VARCHAR(255),
    peticion TEXT,
    edo_solicitud BOOLEAN,
	no_decontrol_admin INT NOT NULL,
    no_decontrol_investigador INT NOT NULL,
	ID_registro_protocolo INT NOT NULL,	
	CONSTRAINT PK_solicitud PRIMARY KEY (ID_registro_solicitud),
    CONSTRAINT FK_solicitud_admin FOREIGN KEY (no_decontrol_admin) REFERENCES administrador(no_decontrol_admin),
	CONSTRAINT FK_solicitud_investigador FOREIGN KEY (no_decontrol_investigador) REFERENCES usuario(no_decontrol_usuario),
	CONSTRAINT FK_solicitud_protocolo FOREIGN KEY (ID_registro_protocolo) REFERENCES protocolo(ID_registro_protocolo)
);
-- ////////////////////////////////////////////////////////////////////////////////////////////////  
-- borrador
-- Crear tabla datos_personales (entidad débil)
-- CREATE TABLE datos_personales (
--    id_formulario INT,
--    numero_seccion INT,
--    titulo_seccion VARCHAR(255),
--    PRIMARY KEY (id_formulario, numero_seccion),
--    FOREIGN KEY (id_formulario) REFERENCES formulario(id_formulario)
--        ON DELETE CASCADE
--        ON UPDATE CASCADE


-- ID_registro_datos_personales INT ,
-- ID_protocolo
-- no_decontrol_investigador
-- no_decontrol_usuario
-- );

-- //////////////////////////////////////////////////////////////////////////////////////////////// 

-- Crear tabla Formulario
CREATE TABLE datos_generales ( 
	ID_registro_datos_generales INT,
	titulo VARCHAR(255),
    descripcion TEXT,
	fecha_inicio VARCHAR(255),
	fecha_termino VARCHAR(255),
	es_colaboracion BOOLEAN,
	ID_registro_protocolo INT NOT NULL,
	CONSTRAINT PK_datos_generales PRIMARY KEY (ID_registro_protocolo, ID_registro_datos_generales),
	CONSTRAINT FK_datos_generales FOREIGN KEY (ID_registro_protocolo) REFERENCES protocolo(ID_registro_protocolo) ON DELETE CASCADE
);

-- Crear tabla Formulario
CREATE TABLE animales_protocolo(
	ID_registro_animales_protocolo INT,
	cantidad INT,
	frecuencia_uso varchar(255),
    linea VARCHAR(14) NOT NULL,
	ID_registro_protocolo INT NOT NULL,
	CONSTRAINT PK_animales_protocolo PRIMARY KEY (ID_registro_protocolo, ID_registro_animales_protocolo),
	CONSTRAINT FK_animales_protocolo FOREIGN KEY (ID_registro_protocolo) REFERENCES protocolo(ID_registro_protocolo) ON DELETE CASCADE
);

-- Crear tabla Formulario
CREATE TABLE descripcion_animal (
	ID_registro_descripcion_animal INT,
	alojamiento_animal BOOLEAN,
	justificacion TEXT,
	ID_registro_protocolo INT NOT NULL,
	CONSTRAINT PK_descripcion_animales PRIMARY KEY (ID_registro_protocolo, ID_registro_descripcion_animal),
	CONSTRAINT FK_descripcion_animales FOREIGN KEY (ID_registro_protocolo) REFERENCES protocolo(ID_registro_protocolo) ON DELETE CASCADE
);

-- Crear tabla Formulario
CREATE TABLE procedimientos_experimentales (
	ID_registro_procedimientos_experimentales INT,
    alojamiento_animal VARCHAR(50),
	procedimientos VARCHAR(255),
	descripcion_procedimientos TEXT,
	ID_registro_protocolo INT NOT NULL,
	CONSTRAINT PK_procedimientos_experimentales PRIMARY KEY (ID_registro_protocolo, ID_registro_procedimientos_experimentales),
	CONSTRAINT FK_procedimientos_experimentales FOREIGN KEY (ID_registro_protocolo) REFERENCES protocolo(ID_registro_protocolo) ON DELETE CASCADE
);

-- Crear tabla Formulario
CREATE TABLE alternativas (
	ID_registro_alternativas INT,
	descripcion_alternativas TEXT,
	ID_registro_protocolo INT NOT NULL,
	CONSTRAINT PK_alternativas PRIMARY KEY (ID_registro_protocolo, ID_registro_alternativas),
	CONSTRAINT FK_alternativas FOREIGN KEY (ID_registro_protocolo) REFERENCES protocolo(ID_registro_protocolo) ON DELETE CASCADE
);

-- Crear tabla Formulario
CREATE TABLE agente_ata (
	ID_registro_agente_ata INT,
	agente VARCHAR(255),
	via_administracion VARCHAR(255),
	dosis VARCHAR(255),
	dosis_complementaria VARCHAR(255),
	frecuencia_administracion VARCHAR(255),
	medios TEXT,
	ID_registro_protocolo INT NOT NULL,
	ID_registro_animales_protocolo INT NOT NULL,
    CONSTRAINT PK_agente_ata PRIMARY KEY (ID_registro_protocolo, ID_registro_animales_protocolo, ID_registro_agente_ata),
	CONSTRAINT FK_agente_ata FOREIGN KEY (ID_registro_protocolo, ID_registro_animales_protocolo) REFERENCES animales_protocolo(ID_registro_protocolo, ID_registro_animales_protocolo) ON DELETE CASCADE
);

-- Crear tabla Formulario
CREATE TABLE eutanasia (
	ID_registro_eutanasia INT,
	agente TEXT,
	via_administracion TEXT,
	dosis TEXT,
	ID_registro_protocolo INT NOT NULL,
	ID_registro_animales_protocolo INT NOT NULL,
    CONSTRAINT PK_eutanasia PRIMARY KEY (ID_registro_protocolo, ID_registro_animales_protocolo, ID_registro_eutanasia),
	CONSTRAINT FK_eutanasia FOREIGN KEY (ID_registro_protocolo, ID_registro_animales_protocolo) REFERENCES animales_protocolo(ID_registro_protocolo, ID_registro_animales_protocolo) ON DELETE CASCADE
);

-- Crear tabla Formulario
CREATE TABLE clasificacion (
	ID_registro_clasificacion INT,
	clasificacion varchar(2),
	ID_registro_protocolo INT NOT NULL,
	CONSTRAINT PK_clasificacion PRIMARY KEY (ID_registro_protocolo, ID_registro_clasificacion),
	CONSTRAINT FK_clasificacion FOREIGN KEY (ID_registro_protocolo) REFERENCES protocolo(ID_registro_protocolo) ON DELETE CASCADE
);
-- -------------------- hasta qui se ha creado

-- Crear tabla Formulario
-- CREATE TABLE capacitacion( -- pendiente
--   ID_registro_capacitacion INT AUTO_INCREMENT,
--   nombre_investigador VARCHAR(255),
--   ruta_archivo_investigador VARCHAR(500),
--   nombre_suplente VARCHAR(255),
--   ruta_archivo_suplente VARCHAR(500),
--   ID_registro_protocolo INT NOT NULL,
--   CONSTRAINT PK_alternativas PRIMARY KEY (ID_registro_protocolo, ID_registro_capacitacion),
--   CONSTRAINT FK_clasificacion FOREIGN KEY (ID_registro_protocolo) REFERENCES protocolo(ID_registro_protocolo) ON DELETE CASCADE
-- );

-- Crear tabla Formulario
-- CREATE TABLE salud_ocupacional1 ( -- pendiente
-- ID_registro_salud_ocupacional1 INT,
-- nivel_bioseguridad INT
-- ID_registro_protocolo INT NOT NULL,
-- CONSTRAINT PK_clasificacion PRIMARY KEY (ID_registro_protocolo, ID_registro_clasificacion),
-- CONSTRAINT FK_clasificacion FOREIGN KEY (ID_registro_protocolo) REFERENCES protocolo(ID_registro_protocolo) ON DELETE CASCADE
-- );

-- CREATE TABLE salud_ocupacional2 ( -- pendiente
-- ID_registro_salud_ocupacional2 INT,
-- categoria varchar(255);
-- agente_infeccioso TEXT,
-- radio_isotopos TEXT,
-- carcinógenos TEXT,
-- toxicos TEXT,
-- area5 TEXT,
-- ID_registro_protocolo INT NOT NULL,
-- ID_registro_animales_protocolo INT NOT NULL,
-- CONSTRAINT PK_eutanasia PRIMARY KEY (ID_registro_protocolo, ID_registro_animales_protocolo, ID_registro_eutanasia),
-- CONSTRAINT FK_eutanasia FOREIGN KEY (ID_registro_protocolo, ID_registro_animales_protocolo) REFERENCES animales_protocolo(ID_registro_protocolo, ID_registro_animales_protocolo) ON DELETE CASCADE
-- );

-- CREATE TABLE salud_ocupacional3 ( -- pendiente
-- ID_registro_salud_ocupacional3 INT,
-- riesgo TEXT,
-- procedimientos TEXT,
-- ID_registro_protocolo INT NOT NULL,
-- CONSTRAINT PK_clasificacion PRIMARY KEY (ID_registro_protocolo, ID_registro_clasificacion),
-- CONSTRAINT FK_clasificacion FOREIGN KEY (ID_registro_protocolo) REFERENCES protocolo(ID_registro_protocolo) ON DELETE CASCADE
-- );


--Tablas para la biblioteca digital
CREATE TABLE TipoRecurso (
  ID_tipo_recurso INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL
);

CREATE TABLE BibliotecaDigital (
  ID_recurso INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT NOT NULL,
  ID_tipo INT,
  ruta TEXT NOT NULL,
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (ID_Tipo) REFERENCES TipoRecurso(ID_tipo_recurso)
);
