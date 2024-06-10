import React, { useState } from 'react';
import '../styles/ArrivalTimeForm.css';

const ArrivalTimeForm = () => {
  const [selectedRace, setSelectedRace] = useState('');
  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedNumber, setSelectedNumber] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes manejar el envío del formulario
    console.log('Arrival Time Registered:', { selectedRace, selectedRoute, selectedNumber });
    setSelectedRace('');
    setSelectedRoute('');
    setSelectedNumber('');
  };

  return (
    <div className="arrival-time-form-container">
      <h2>Registrar Tiempos de Llegada</h2>
      <form className="arrival-time-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="race-select">Seleccionar Carrera</label>
          <select
            id="race-select"
            value={selectedRace}
            onChange={(e) => setSelectedRace(e.target.value)}
            required
          >
            <option value="">Seleccione una carrera</option>
            <option value="Carrera del Informático SC 2024">Carrera del Informático SC 2024</option>
            <option value="Carrera del Informático SC 2025">Carrera del Informático SC 2025</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="route-select">Seleccionar Ruta</label>
          <select
            id="route-select"
            value={selectedRoute}
            onChange={(e) => setSelectedRoute(e.target.value)}
            required
          >
            <option value="6km">6km</option>
            <option value="12km">12km</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="runner-select">Número de Corredor</label>
          <select
            id="route-select"
            value={selectedNumber}
            onChange={(e) => setSelectedNumber(e.target.value)}
            required
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <button type="submit">Registrar Tiempo</button>
      </form>
    </div>
  );
};

export default ArrivalTimeForm;
