import React, { useState } from 'react';
import PaymentForm from './PaymentForm';
import '../styles/Inscription.css';

const Inscription = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
    age: '',
    bloodType: '',
    gender: ''
  });

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validación para la edad
    if (name === 'age' && (value < 0 || value.length > 2)) {
      return;
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a un servidor.
    console.log(formData);
    setIsCheckoutOpen(true); // Abre la ventana emergente
  };

  return (
    <div className="inscription-container" id="inscription">
      <h2>Formulario de Inscripción</h2>
      <form onSubmit={handleSubmit} className="inscription-form">
        <div className="form-group">
          <label htmlFor="fullName">Nombre Completo:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="birthDate">Fecha de Nacimiento:</label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Edad:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min="0"
            max="99"
          />
        </div>
        <div className="form-group">
          <label htmlFor="bloodType">Tipo de Sangre:</label>
          <select
            id="bloodType"
            name="bloodType"
            value={formData.bloodType}
            onChange={handleChange}
            required
          >
            <option value="O+">O+</option>
            <option value="A+">A+</option>
            <option value="B+">B+</option>
            <option value="AB+">AB+</option>
            <option value="O-">O-</option>
            <option value="A-">A-</option>
            <option value="B-">B-</option>
            <option value="AB-">AB-</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="gender">Género:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
          </select>
        </div>
        <div className="form-group">
        <label htmlFor="career">Selecciona tu carrera</label>
          <select
            id="career"
            name="career"
            value={formData.career}
            onChange={handleChange}
            required
          >
            <option value="Carrera del Informatico SC 2024">Carrera del Informatico SC 2024</option>
            <option value="Carrera del Informatico SC 2025">Carrera del Informatico SC 2025</option>
          </select>
        </div>
        <button type="submit">Inscribirme</button>
      </form>
      {isCheckoutOpen && (
        <div className="modal">
          <div className="modal-content">
            <PaymentForm/>
            <button className="close-button" onClick={() => setIsCheckoutOpen(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inscription;
