--tabla Competidores
CREATE TABLE Competidores (
    id_Competidores SERIAL PRIMARY KEY,
    nombreCompleto VARCHAR(200) NOT NULL,
	edad SMALLINT NOT NULL,
    fecha_de_nacimiento DATE NOT NULL,
    genero VARCHAR(10) NOT NULL
);

--  tabla Carreras
CREATE TABLE Carreras (
    id_Carreras SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    fecha TIMESTAMP(6) NOT NULL,
	maxCompetidores INT,
	competidoresRegistrados INT NOT NULL,
    ubicacion VARCHAR(150) NOT NULL,
	horaSalida TIMESTAMP(6) NOT NULL
);

-- tabla Trayectos
CREATE TABLE Trayectos (
    id_Trayectos SERIAL PRIMARY KEY,
    carrera_id INT NOT NULL,
    distancia NUMERIC(10, 2) NOT NULL,
    descripcion TEXT,
    FOREIGN KEY (carrera_id) REFERENCES Carreras(id_Carreras)
);

CREATE TABLE TiemposCompetidores(
	IdTiemposCompetidores SERIAL PRIMARY KEY,
	competidor_id INT NOT NULL,
	trayecto_id INT NULL,
	tiempo DECIMAL(10,2) NOT NULL,
	FOREIGN KEY (competidor_id) REFERENCES Competidores(id_Competidores),
	FOREIGN KEY (trayecto_id) REFERENCES Trayectos(id_Trayectos)
)
------------------------------------ -----------------------------------------
--------registrar competidor--------
CREATE OR REPLACE FUNCTION registrar_competidor(nombreCompleto VARCHAR, edad SMALLINT, fecha_de_nacimiento DATE, genero VARCHAR)
RETURNS VOID AS $$
BEGIN
    INSERT INTO Competidores (nombreCompleto, edad, fecha_de_nacimiento, genero)
    VALUES (nombreCompleto, edad, fecha_de_nacimiento, genero);
END;
$$ LANGUAGE plpgsql;

---actualizar competidor--
CREATE OR REPLACE FUNCTION actualizar_competidor(
  competidor_id INT, 
  nuevos_nombres VARCHAR, 
  nueva_edad SMALLINT, 
  nueva_fecha_de_nacimiento DATE, 
  nuevo_genero VARCHAR
)
RETURNS VOID AS $$
BEGIN
  UPDATE Competidores
  SET nombres = COALESCE(nuevos_nombres, nombreCompleto),
      edad = COALESCE(nueva_edad, edad),
      fecha_de_nacimiento = COALESCE(nueva_fecha_de_nacimiento, fecha_de_nacimiento),
      genero = COALESCE(nuevo_genero, genero)
  WHERE id_Competidores = competidor_id;
END;
$$ LANGUAGE plpgsql;

--Función que retorna un bool si existe el competidor
CREATE OR REPLACE FUNCTION public.ExisteCompetidorPorId(
    p_id_competidores INT
)
RETURNS BOOLEAN AS $$
DECLARE
    competidor_existente BOOLEAN;
BEGIN
    SELECT EXISTS (
        SELECT 1
        FROM Competidores
        WHERE id_Competidores = p_id_competidores
    ) INTO competidor_existente;

    RETURN competidor_existente;
END;
$$ LANGUAGE plpgsql STRICT;

-------Gestión de carreras---------------------
-- inserción de carrera
CREATE OR REPLACE FUNCTION InsertarCarrera(
    nombre_carrera VARCHAR(100),
    fecha_carrera TIMESTAMP(6),
    max_competidores INT,
    competidores_registrados INT,
    ubicacion_carrera VARCHAR(150),
    hora_salida TIMESTAMP(6)
) RETURNS VOID AS $$
BEGIN
    INSERT INTO Carreras (nombre, fecha, maxCompetidores, competidoresRegistrados, ubicacion, horaSalida)
    VALUES (nombre_carrera, fecha_carrera, max_competidores, competidores_registrados, ubicacion_carrera, hora_salida);
END;
$$ LANGUAGE plpgsql;

--modificación de carrera
CREATE OR REPLACE FUNCTION ModificarCarrera(
    id_carrera INT,
    nuevo_nombre VARCHAR(100),
    nueva_fecha TIMESTAMP(6),
    nuevo_max_competidores INT,
    nuevos_competidores_registrados INT,
    nueva_ubicacion VARCHAR(150),
    nueva_hora_salida TIMESTAMP(6)
) RETURNS VOID AS $$
BEGIN
    UPDATE Carreras
    SET nombre = nuevo_nombre,
        fecha = nueva_fecha,
        maxCompetidores = nuevo_max_competidores,
        competidoresRegistrados = nuevos_competidores_registrados,
        ubicacion = nueva_ubicacion,
        horaSalida = nueva_hora_salida
    WHERE id_Carreras = id_carrera;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION ExisteCarreraPorId(p_id_carreras INT)
RETURNS BOOLEAN AS $$
DECLARE
    carrera_existe BOOLEAN;
BEGIN
    SELECT EXISTS (SELECT 1 FROM Carreras WHERE id_Carreras = p_id_carreras) INTO carrera_existe;
    RETURN carrera_existe;
END;
$$ LANGUAGE plpgsql;


---crear trayectoria-------------
CREATE OR REPLACE FUNCTION definir_trayecto(carrera_id INT, distancia NUMERIC, descripcion TEXT)
RETURNS VOID AS $$
BEGIN
    INSERT INTO Trayectos (carrera_id, distancia, descripcion) -- Cambiar a carrera_id
    VALUES (carrera_id, distancia, descripcion);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION ObtenerIdTrayectoPorCarrera(carrera_id_param INT)
RETURNS INT AS
$$
DECLARE
    trayecto_id INT;
BEGIN
    SELECT id_Trayectos INTO trayecto_id
    FROM Trayectos
    WHERE carrera_id = carrera_id_param
    LIMIT 1;

    RETURN trayecto_id;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION InsertarTiemposCompetidores(
    p_competidor_id INT,
    p_carrera_id INT,
    p_tiempo DECIMAL(10,2)
) RETURNS VOID AS $$
DECLARE
    p_trayecto_id INT;
BEGIN
    -- Obtener el id del trayecto por el id de la carrera
    p_trayecto_id := ObtenerIdTrayectoPorCarrera(p_carrera_id);

    -- Insertar en TiemposCompetidores usando el id del trayecto obtenido
    INSERT INTO TiemposCompetidores (competidor_id, trayecto_id, tiempo)
    VALUES (p_competidor_id, p_trayecto_id, p_tiempo);
END;
$$ LANGUAGE plpgsql;






select*from competidores
select*from carreras
select*from trayectos
select*from TiemposCompetidores
-- Ejemplo de consulta para probar la función actualizar_competidor
SELECT actualizar_competidor(1, 'Nuevo Nombre', null,'1995-01-15', null);
SELECT definir_trayecto(1,10,'asidjeio');
SELECT ExisteCarreraPorId(1)
SELECT * FROM Competidores WHERE id_Competidores = 1
SELECT ObtenerIdTrayectoPorCarrera(1);
SELECT InsertarTiemposCompetidores(2,1,12.45);