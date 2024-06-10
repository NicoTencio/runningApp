import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Inscription from './components/Inscription';
import Admin from './components/Admin';
import AdminModal from './components/AdminModal';
import Footer from './components/Footer'; 
import NotFound from './components/NotFound';
import './App.css';

// CAMBIAR LA KEY DE STRIPE POR LA QUE TE PROPORCIONA LA PLATAFORMA
const stripePromise = loadStripe('your-publishable-key-here');

function App() {
  const [activeComponent, setActiveComponent] = useState('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const currentHash = window.location.hash.replace('#', '');
      const validComponents = ['home', 'inscription', 'admin'];
      
      if (currentHash === 'admin' && !isAuthenticated) {
        setIsModalOpen(true);
      } else if (!validComponents.includes(currentHash)) {
        setActiveComponent('notfound');
        setIsNotFound(true);
      } else {
        setActiveComponent(currentHash || 'home');
        setIsNotFound(false);
      }
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);

    // Pone el default de la web en #home
    if (!window.location.hash) {
      window.location.hash = '#home';
    } else {
      handleHashChange();
    }

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [isAuthenticated]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    window.location.hash = '#home';
  };

  const handlePasswordSubmit = (password) => {
    if (password === '12345') {
      setIsAuthenticated(true);
      setIsModalOpen(false);
      setActiveComponent('admin');
      window.location.hash = '#admin';
    } else {
      handleModalClose();
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <div className="App">
        <Navbar setActiveComponent={setActiveComponent} />
        <div className="content component-container">
          {activeComponent === 'home' && <Home />}
          {activeComponent === 'inscription' && <Inscription />}
          {activeComponent === 'admin' && isAuthenticated && <Admin />}
          {isNotFound && <NotFound setActiveComponent={setActiveComponent} />}
        </div>
        <Footer />
        <AdminModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={handlePasswordSubmit}
        />
      </div>
    </Elements>
  );
}

export default App;