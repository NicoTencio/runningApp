import React from 'react';
import RaceForm from './RaceForm';
import TraceForm from './TraceForm';
import ArrivalTimeForm from './ArrivalTimeForm';
import '../styles//Admin.css';

const Admin = () => {
  return (
    <div>
      <h1>Admin Section</h1>
      <div className="component-container">
        <RaceForm />
        <TraceForm/>
        <ArrivalTimeForm/>
      </div>
    </div>
  );
};

export default Admin;