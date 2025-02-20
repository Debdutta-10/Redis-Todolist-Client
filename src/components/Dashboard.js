import React, { useEffect, useState } from 'react';
import '../styles/Dashboard.css';
import Card from './Card';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
// import { FaSignOutAlt } from 'react-icons/fa';

const Dashboard = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  async function getAllTasks() {
    const token = localStorage.getItem('token');
    const url = "https://redis-todolist-backend.onrender.com/api/getTodos";

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(response.data.todos);
    } catch (error) {
      toast.error("Error fetching tasks");
      console.error("Error fetching tasks:", error);
    }
  }

  useEffect(() => {
    getAllTasks();
  }, []);

  async function handleAddTask() {
    const url = "https://redis-todolist-backend.onrender.com/api/addTodo";
    const token = localStorage.getItem('token');
    const data = {
      title,
      description,
    };

    try {
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.data.success) {
        toast.success("Task added successfully!");
        setTasks(prevTasks => [...prevTasks, response.data.newTask]);
        setTitle('');
        setDescription('');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error adding task");
      console.error("Error adding task:", error);
    }
  }

  async function handleDeleteTask(id) {
    const url = `https://redis-todolist-backend.onrender.com/api/deletetodo/${id}`;
    const token = localStorage.getItem("token");

    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.data.success) {
        toast.success(response.data.message);
        getAllTasks();
      } else {
        toast.error(response.data.message);
        console.log(response.data.message);
      }
    } catch (error) {
      toast.error("Error deleting task");
      console.error("Error deleting task:", error);
    }
  }

  function handleLogout(){
    toast.success("Logout Successfull")
    localStorage.removeItem('token');
    navigate('/');
  }

  // New logic to update the completed status
  async function handleMarkCompleted(id, completed) {
    const url = `https://redis-todolist-backend.onrender.com/api/setCompleted/${id}`;
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(url, { completed }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.data.success) {
        toast.success(response.data.message);
        // Directly update the task status in the state without refetching
        setTasks(prevTasks =>
          prevTasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
          )
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error updating task status");
      console.error("Error updating task status:", error);
    }
  }

  return (
    <>
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

      <div className="cards-container">
        {
          tasks.map((task) => (
            <Card
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              isCompleted={task.completed}
              onDelete={handleDeleteTask}
              onMarkCompleted={handleMarkCompleted} // Pass handleMarkCompleted as a prop
            />
          ))
        }
      </div>

      <div className="logout-container" onClick={handleLogout}>
        Logout
      </div>
    </>
  );
};

export default Dashboard;
