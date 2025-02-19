import React, { useState } from 'react';
import "../styles/Card.css";
import toast from 'react-hot-toast';

const Card = ({ id, title, description, isCompleted, onDelete, onMarkCompleted }) => {
  const [completed, setCompleted] = useState(isCompleted);

  const toggleStatus = () => {
    const newStatus = !completed;
    setCompleted(newStatus);
    onMarkCompleted(id, newStatus); // Update the server with the new status
  };

  const handleDelete = () => {
    onDelete(id);  
  };

  return (
    <div className= {`card ${completed ? 'card-success' : 'btn-warning'}`} style={{ width: '18rem' }}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <div className={`button-container`}>
          <button
            className={`btn ${completed ? 'btn-success' : 'btn-warning'}`}
            onClick={toggleStatus}
          >
            {completed ? 'Mark Incomplete' : 'Mark Complete'}
          </button>
          <button
            className='btn btn-delete'
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
