const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
const axios = require('axios');


const app = express();
app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'proyectoIII',
    password: 'shashis',
    port: 5432
});


app.get('/',(req,res)=>{
    res.send('Hello World')
})

/*Registro de Competidores*/

app.post('/registrar-competidor', async (req, res) => {
  const { nombreCompleto, edad, fecha_de_nacimiento, genero } = req.body;

  try {
    const query = `
      SELECT registrar_competidor($1, $2, $3, $4)
    `;
    await pool.query(query, [nombreCompleto, edad, fecha_de_nacimiento, genero]);
    res.status(200).send('Competidor registrado exitosamente');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al registrar el competidor');
  }
});

app.put('/actualizar-competidor/', async (req, res) => {
  const { competidorId, nombreCompleto, edad, fecha_de_nacimiento, genero } = req.body;

  try {
    const query = `
      SELECT actualizar_competidor($1, $2, $3, $4, $5)
    `;
    await pool.query(query, [competidorId, nombreCompleto, edad, fecha_de_nacimiento, genero]);
    res.status(200).send('Competidor actualizado exitosamente');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al actualizar el competidor');
  }
});

app.get('/existe-competidor', async (req, res) => {
  try {
    const {idCompetidor} = req.query;
    const result = await pool.query('SELECT public.ExisteCompetidorPorId($1) AS existe', [idCompetidor]);
    const existe = result.rows[0].existe;

    res.json({existe});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al verificar el competidor' });
  }
});

/* Gestión de Carreras */
app.post('/crear-carrera', async (req, res) => {
  const { nombre, fecha, ubicacion } = req.body;

  try {
    const query = `
      SELECT crear_carrera($1, $2, $3)
    `;
    await pool.query(query, [nombre, fecha, ubicacion]);
    res.status(200).send('Carrera creada exitosamente');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al crear la carrera');
  }
});

app.put('/modificar-carrera', async (req, res) => {
  const {idCarrera, nombre, fecha, maxCompetidores, competidoresRegistrados, ubicacion, horaSalida } = req.body;

  try {
    const query = `
      SELECT ModificarCarrera(
        $1, $2, $3, $4, $5, $6, $7
      )
    `;
    await pool.query(query, [idCarrera, nombre, fecha, maxCompetidores, competidoresRegistrados, ubicacion, horaSalida]);
    res.status(200).send('Carrera modificada exitosamente');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al modificar la carrera');
  }
});

app.get('/existe-carrera', async (req, res) => {
  try {
    const { idCarrera } = req.query;
    const result = await pool.query('SELECT public.ExisteCarreraPorId($1) AS existe', [idCarrera]);
    const existe = result.rows[0].existe;

    res.json({ existe });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al verificar la carrera' });
  }
});


app.post('/definir-trayecto', async (req, res) => {
  const { carrera_id, distancia, descripcion } = req.body;

  try {
    const query = `
      SELECT definir_trayecto($1, $2, $3)
    `;
    await pool.query(query, [carrera_id, distancia, descripcion]);
    res.status(200).send('Trayecto definido exitosamente');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al definir el trayecto');
  }
});

//No funciona
app.post('/insertar-tiempos-competidores', async (req, res) => {
  const { p_competidor_id, p_carrera_id, p_tiempo } = req.body;
  try {
    // Llamar a la función para insertar tiempos de competidores
    const query = 'SELECT InsertarTiemposCompetidores($1, $2, $3)';
    await pool.query(query, [p_competidor_id, p_carrera_id, p_tiempo]);
    res.status(200).json({ message: 'Tiempos de competidores insertados correctamente.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al insertar tiempos de competidores.' });
  }
});

//-------------------------- Obtención de datos

// Endpoint para obtener todas las carreras
app.get('/carreras', async (req, res) => {
  try {
    // Consultar todas las carreras en la base de datos
    const query = 'SELECT * FROM Carreras';
    const result = await pool.query(query);

    // Enviar la lista de carreras como respuesta
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener las carreras.' });
  }
});


app.listen(5000, () => {
  console.log(`Server running at http://localhost:5000/`);
});
