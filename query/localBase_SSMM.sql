---------------------------------------------------- Conexión ----------------------------------------------------
-- Crear el servidor vinculado
EXEC sp_addlinkedserver 
    @server = 'PostgreSQLServer', 
    @srvproduct = '',
    @provider = 'MSDASQL', 
    @datasrc = 'PostgreSQL35W';

-- Configurar las credenciales del servidor vinculado
EXEC sp_addlinkedsrvlogin 
    @rmtsrvname = 'PostgreSQLServer', 
    @useself = 'false',
    @rmtuser = 'postgres', 
    @rmtpassword = 'shashis';

---------------------------------------------------- Tablas ----------------------------------------------------
CREATE TABLE Participantes (
    id_participante INT IDENTITY(1,1) PRIMARY KEY,
    competidor_id INT NOT NULL,
    carrera_id INT NOT NULL,
    tiempo DECIMAL(10, 2) NOT NULL
);

---------------------------------------------------- funciones ----------------------------------------------------

GO
CREATE OR ALTER PROCEDURE InsertarParticipante
    @competidor_id INT,
    @carrera_id INT,
    @tiempo DECIMAL(10, 2)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Participantes (competidor_id, carrera_id, tiempo)
    VALUES (@competidor_id, @carrera_id, @tiempo);

    SELECT SCOPE_IDENTITY() AS id_participante;
END;

GO

CREATE OR ALTER PROCEDURE RegistrarOModificarTiempoParticipante
    @id_participante INT,
    @tiempo DECIMAL(10, 2)
AS
BEGIN
    SET NOCOUNT ON;

    -- Intenta actualizar el tiempo del participante existente
    UPDATE Participantes
    SET tiempo = @tiempo
    WHERE id_participante = @id_participante;
END;
GO



---------------------------------------------------- Trigger ----------------------------------------------------
GO

CREATE TRIGGER trg_PreventDuplicateParticipant
ON Participantes
INSTEAD OF INSERT
AS
BEGIN
    DECLARE @competidor_id INT;
    DECLARE @carrera_id INT;

    SELECT @competidor_id = competidor_id, @carrera_id = carrera_id
    FROM inserted;

    IF EXISTS (SELECT 1 FROM Participantes WHERE competidor_id = @competidor_id AND carrera_id = @carrera_id)
    BEGIN
        RAISERROR ('El competidor ya está registrado en esta carrera.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END

    INSERT INTO Participantes (competidor_id, carrera_id, tiempo)
    SELECT competidor_id, carrera_id, tiempo
    FROM inserted;
END;
GO



SELECT * FROM OPENQUERY(PostgreSQLServer, 'SELECT public.ExisteCompetidorPorId(2)');
go
DECLARE @id_jugador INT = 3; -- Supongamos que quieres verificar si el jugador con ID 1 existe
DECLARE @query NVARCHAR(MAX);
DECLARE @resultado BIT;

SET @query = N'SELECT public.ExisteCompetidorPorId(' + CAST(@id_jugador AS VARCHAR(10)) + ')::int';

DECLARE @dynamicSQL NVARCHAR(MAX);
SET @dynamicSQL = N'SELECT 1 FROM OPENQUERY(PostgreSQLServer, ''' + REPLACE(@query, '''', '''''') + ''')';

EXEC sp_executesql @dynamicSQL;

SELECT @resultado AS ExisteCompetidor;


DECLARE @estado BIT;

SELECT @estado = CASE WHEN resultado = 1 THEN 1 ELSE 0 END
FROM OPENQUERY(PostgreSQLServer, 'SELECT CASE WHEN public.ExisteCompetidorPorId(1) THEN 1 ELSE 0 END AS resultado');

SELECT @estado AS Estado;

go

GO

Select*from Participantes
EXEC RegistrarOModificarTiempoParticipante 25, 123.45;

delete from Participantes