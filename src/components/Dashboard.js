import React, { useState } from 'react';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = () => {

  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Task Dashboard</h1>
        <p>Manage your tasks efficiently</p>
      </div>
      <div className="form-body">
        <input
          type="text"
          placeholder="Enter task title"
          className="form-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter task description"
          className="form-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="status-button" onClick={handleAddTask}>
          Add Task
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
