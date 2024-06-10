import React from 'react';
import Info from './Info';
import RunnersListForm from './RunnersListForm';
import RunnersTimeForm from './RunnersTimeForm';
import '../styles/Home.css';

const Home = () => {
  return (
    <div>
      <div className="component-container">
        <Info />
        <RunnersListForm />
        <RunnersTimeForm />
      </div>
    </div>
  );
};

export default Home;