
const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const cors = require('cors');
const axios = require('axios');


const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuración de conexión a SQL Server
const config = {
    user: 'usuario2',
    password: '12345',
    server: 'localhost', 
    database: 'DBcentral_proyecto',
    options: {
      encrypt: true, // Si estás usando conexiones encriptadas
      trustServerCertificate: true // Solo si estás usando certificados de servidor autofirmados
    }
  };

app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.post('/registrar-participante', async (req, res) => {
    try {
        const { competidor_id, carrera_id } = req.body;
        const tiempo = 0;
        // Hacer la solicitud GET al endpoint '/existe-competidor' con el idCompetidor como parámetro
        const response = await axios.get('http://localhost:5000/existe-competidor', {
            params: {
                idCompetidor: competidor_id
            }
        });

        const responseC = await axios.get('http://localhost:5000/existe-carrera', {
            params: {
                idCarrera: carrera_id
            }
        });

        // Obtener el booleano de la respuesta
        const boolValue = response.data.existe;
        const boolValueC = responseC.data.existe;
        if (boolValue && boolValueC) {
            // Si boolValue es verdadero, procede a insertar el participante
            await sql.connect(config);
            const request = new sql.Request();
            request.input('competidor_id', sql.Int, competidor_id);
            request.input('carrera_id', sql.Int, carrera_id);
            request.input('tiempo', sql.Decimal(10, 2), tiempo);
            
            const resultado = await request.query('EXEC InsertarParticipante @competidor_id, @carrera_id, @tiempo');
            await sql.close();
            res.status(200).json({ message: 'Participante registrado exitosamente.' });
        } else {
            // Si boolValue es falso, enviar un mensaje indicando que el participante primero debe registrarse como competidor
            res.send("Competidor no registrado o carrera no existe");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar participante' });
    }
});

app.post('/registrar-o-modificar-tiempo', async (req, res) => {
    const { id_participante, tiempo } = req.body;
    try {

        const response = await axios.get('http://localhost:5000/existe-competidor', {
            params: {
                idCompetidor: competidor_id
            }
        });

      await sql.connect(config);
      const request = new sql.Request();
      request.input('id_participante', sql.Int, id_participante);
      request.input('tiempo', sql.Decimal(10, 2), tiempo);
      const result = await request.query('EXEC RegistrarOModificarTiempoParticipante @id_participante, @tiempo');
      await sql.close();
      res.status(200).json({ message: 'Tiempo registrado exitosamente.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al registrar o modificar el tiempo del participante' });
    }
  });
  
app.listen(3001, () => {
    console.log('Servidor corriendo en http://localhost:3001');
});
