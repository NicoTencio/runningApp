import React, { useState } from 'react';
import '../styles/RunnersTimeForm.css';

const RunnersTimeForm = () => {
  const [race, setRace] = useState('');

  const handleRaceChange = (e) => {
    setRace(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica para consultar la lista de corredores según la carrera seleccionada.
    console.log(`Consultando la lista de corredores para: ${race}`);
  };

  return (
    <div className="runners-time-form-container">
      <h2>Consultar Tiempos Corredores</h2>
      <form className="runners-time-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="race">Seleccionar Carrera:</label>
          <select id="race" value={race} onChange={handleRaceChange}>
            <option value="Carrera del Informático SC 2024">Carrera del Informático SC 2024</option>
            <option value="Carrera del Informático SC 2025">Carrera del Informático SC 2025</option>
          </select>
        </div>
        <button type="submit">Consultar</button>
      </form>
    </div>
  );
};

export default RunnersTimeForm;
