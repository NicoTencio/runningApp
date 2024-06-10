import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/RunnersListForm.css';

const RunnersListForm = () => {
  const [races, setRaces] = useState([]);
  const [raceNames, setRaceNames] = useState([]);
  const [selectedRace, setSelectedRace] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/carreras') 
      .then((response) => {
        setRaces(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener las carreras:', error);
      });
  }, []);

  useEffect(() => {
    // Extraer solo los nombres de las carreras del array races
    const names = races.map((race) => race.nombre);
    setRaceNames(names);
    console.log(races)
  }, [races]);

  const handleRaceChange = (e) => {
    setSelectedRace(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica para consultar la lista de corredores según la carrera seleccionada.
    console.log(`Consultando la lista de corredores para: ${selectedRace}`);
  };

  return (
    <div className="runners-list-form-container">
      <h2>Consultar Lista de Corredores</h2>
      <form className="runners-list-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="race">Seleccionar Carrera:</label>
          <select id="race" value={selectedRace} onChange={handleRaceChange}>
            <option value="">Seleccionar Carrera</option>
            {raceNames.map((name, index) => (
              <option key={index} value={name}>{name}</option>
            ))}
          </select>
        </div>
        <button type="submit">Consultar</button>
      </form>
    </div>
  );
};

export default RunnersListForm;
