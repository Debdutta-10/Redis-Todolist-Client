import React, { useState } from "react";
import axios from 'axios';
import "../styles/FormStyles.css";
import { Navigate } from "react-router-dom";
import { toast, Toaster } from 'react-hot-toast';

const LoginSignupForm = () => {
    const [activeForm, setActiveForm] = useState("login");
    const handleSwitchForm = (form) => {
        setActiveForm(form);
    };

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);  // Used for navigation

    // Function to handle login
    function handleLogin(e) {
        e.preventDefault();
        const url = "https://redis-todolist-backend.onrender.com/api/login";
        const data = {
            username: username,
            password: password,
        };

        axios.post(url, data)
            .then((response) => {
                if (response && response.data) {
                    toast.success(response.data.message);
                    localStorage.setItem('token', response.data.token);
                    setRedirect(true);
                } else {
                    toast.error('Unexpected response structure');
                }
            })
            .catch((error) => {
                // Check if there's an error response with data
                if (error.response && error.response.data) {
                    const errorData = error.response.data;

                    // Check if the error message is a string or an array
                    if (Array.isArray(errorData.message)) {
                        // If it's an array, extract and display all error messages
                        errorData.message.forEach((errorItem) => {
                            if (errorItem.message) {
                                toast.error(errorItem.message);
                            }
                        });
                    } else {
                        // If it's a string, display the message directly
                        toast.error(errorData.message || 'An error occurred');
                    }
                } else {
                    toast.error('An error occurred');
                }
            });
    }

    function handleSignUp(e) {
        e.preventDefault();
        const url = "https://redis-todolist-backend.onrender.com/api/signup";
        const data = {
            username: username,
            password: password,
        };
        axios.post(url, data)
            .then((response) => {
                if (response && response.data) {
                    toast.success(response.data.message);
                    localStorage.setItem('token', response.data.token);
                    setRedirect(true);
                } else {
                    toast.error('Unexpected response structure');
                }
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    const errorData = error.response.data;
    
                    if (Array.isArray(errorData.message)) {
                        errorData.message.forEach((item) => {
                            if (item.message) {
                                toast.error(item.message); 
                            }
                        });
                    } else {
                        const errorMessage = errorData.message || 'An error occurred';
                        toast.error(errorMessage); 
                    }
                } else {
                    toast.error('An unexpected error occurred');
                }
            });
    }
    

    // Redirect to the dashboard if login is successful
    if (redirect) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <section className="forms-section">
            <h1 className="section-title">Taskify</h1>
            <div className="forms">
                {/* Login Form */}
                <div className={`form-wrapper ${activeForm === "login" ? "is-active" : ""}`}>
                    <button
                        type="button"
                        className="switcher switcher-login"
                        onClick={() => handleSwitchForm("login")}
                    >
                        Login
                        <span className="underline"></span>
                    </button>
                    <form className="form form-login">
                        <fieldset>
                            <legend>Please, enter your username and password for login.</legend>
                            <div className="input-block">
                                <label htmlFor="login-username">Username</label>
                                <input
                                    id="login-username"
                                    onChange={(e) => setUsername(e.target.value)}
                                    type="text"
                                    required
                                />
                            </div>
                            <div className="input-block">
                                <label htmlFor="login-password">Password</label>
                                <input
                                    id="login-password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    required
                                />
                            </div>
                        </fieldset>
                        {/* Fixing onClick to call handleLogin directly */}
                        <button type="submit" className="btn-login" onClick={handleLogin}>Login</button>
                    </form>
                </div>

                {/* Sign Up Form */}
                <div className={`form-wrapper ${activeForm === "signup" ? "is-active" : ""}`}>
                    <button
                        type="button"
                        className="switcher switcher-signup"
                        onClick={() => handleSwitchForm("signup")}
                    >
                        Sign Up
                        <span className="underline"></span>
                    </button>
                    <form className="form form-signup">
                        <fieldset>
                            <legend>
                                Please, enter your email, password, and password confirmation
                                for sign up.
                            </legend>
                            <div className="input-block">
                                <label htmlFor="signup-username">Username</label>
                                <input
                                    id="signup-username"
                                    onChange={(e) => setUsername(e.target.value)}
                                    type="text"
                                    required
                                />
                            </div>
                            <div className="input-block">
                                <label htmlFor="signup-password">Password</label>
                                <input
                                    id="signup-password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    required
                                />
                            </div>
                        </fieldset>
                        {/* Fixing onClick to call handleSignUp directly */}
                        <button type="submit" className="btn-signup" onClick={handleSignUp}>Sign Up</button>
                    </form>
                </div>
            </div>

            {/* Toast notifications */}
            <Toaster />
        </section>
    );
};

export default LoginSignupForm;
