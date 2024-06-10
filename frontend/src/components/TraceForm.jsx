import React, { useState } from 'react';
import '../styles/TraceForm.css';

const TraceForm = () => {
  const [selectedRace, setSelectedRace] = useState('');
  const [distance, setDistance] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes manejar el envío del formulario
    console.log('Trace Registered:', { selectedRace, distance, description, image });
    setSelectedRace('');
    setDistance('');
    setDescription('');
    setImage(null);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <div className="trace-form-container">
      <h2>Agregar Ruta</h2>
      <form className="trace-form" onSubmit={handleSubmit}>
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
          <label htmlFor="trace-distance">Distancia en Km</label>
          <input
            id="trace-distance"
            type="number"
            step="0.01"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="trace-description">Descripción del Recorrido</label>
          <textarea
            id="trace-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="trace-image">Subir Imagen</label>
          <input
            id="trace-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit">Agregar Ruta</button>
      </form>
    </div>
  );
};

export default TraceForm;