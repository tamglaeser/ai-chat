import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import {Link, useLocation, useNavigate} from "react-router-dom";
const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleEmailLogin = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/login', {
                email,
                password,
            });
            const token = response.data.token;
            setToken(token);
            // Save the token to local storage
            localStorage.setItem('token', token);
            // Retrieve intended route from location state
            const intendedRoute = location.state?.from || '/chat'; // Default to '/chat' if no intended route
            navigate(intendedRoute);
        } catch (error) {
            console.error(error);
        }
    };

    const responseMessage = (response) => {
        console.log('Google login success:', response);
        const tokenId = response.tokenId;
        axios.post('/login-with-google', { tokenId })
            .then((response) => {
                console.log('Backend response:', response);
                // Handle successful login response if needed
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle error if needed
            });
    };
    const errorMessage = (error) => {
        console.log(error);
    };
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 col-10 col-md-6 col-lg-4">
                <h2 className="text-center mb-4">Welcome back</h2>
                <div className="mb-3">
                    <input type="email" value={email} onChange={handleEmailChange} placeholder="Email*" />
                </div>
                <div className="mb-3">
                    <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password*" />
                </div>
                <button className="btn btn-primary d-block w-100 mb-3" onClick={handleEmailLogin}>Login</button>
                <p className="text-muted">
                    <span className="d-inline-block">Don't have an account?&nbsp;</span>
                    <Link to="/signup" className="text-primary text-decoration-none">Sign up</Link>
                </p>

                {/* Google Login */}
                <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
            </div>
        </div>
    );
};

export default Login;

