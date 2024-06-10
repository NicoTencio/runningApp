import React, { useEffect, useState } from 'react';
import '../styles/NotFound.css';
import notFoundImage from '../img/404.png';

const NotFound = ({ setActiveComponent }) => {
  const [secondsLeft, setSecondsLeft] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft(prevSeconds => prevSeconds - 1);
    }, 1000);

    const redirectTimer = setTimeout(() => {
      setActiveComponent('home');
      window.location.hash = '#home';
    }, 6000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [setActiveComponent]);

  return (
   <div>
    <div className="not-found-container">
      <h2>404 - Section Not Found</h2>
      <p>Redirecting to home in {secondsLeft} seconds...</p>
    </div>
    <div>
      <img src={notFoundImage} alt="404 Not Found" className="not-found-image" />
    </div>
   </div>
  );
};

export default NotFound;