import React, { useState } from 'react';
import '../styles/RaceForm.css';

const RaceForm = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes manejar el envío del formulario
    console.log('Race Registered:', { name, date, location });
    setName('');
    setDate('');
    setLocation('');
  };

  return (
    <div className="race-form-container">
      <h2>Registrar Carrera</h2>
      <form className="race-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="race-name">Nombre de la Carrera</label>
          <input
            id="race-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="race-date">Fecha</label>
          <input
            id="race-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="race-location">Ubicación</label>
          <input
            id="race-location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RaceForm;
