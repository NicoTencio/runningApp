import React, { useState } from 'react';
import '../styles/AdminModal.css';

const AdminModal = ({ isOpen, onClose, onSubmit }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(password);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Admin Access</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Ingresa Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="submit-button">Ingresar</button>
          <button type="button" className="close-button" onClick={onClose}>Cerrar</button>
        </form>
      </div>
    </div>
  );
};

export default AdminModal;