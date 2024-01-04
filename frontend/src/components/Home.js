import { useNavigate } from 'react-router-dom';
import React from "react";
const Home = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/login');
    }

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
            <button className="btn btn-primary" type="button" onClick={handleClick}>Open A Chat</button>
        </div>
    );
};

export default Home;
