import React, { useState } from 'react';
// import GoogleLogin from 'react-google-login';
// import GithubLogin from 'react-github-login';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
const Login = () => {
    const navigate = useNavigate();
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
            navigate('/chat');
        } catch (error) {
            console.error(error);
        }
    };

    const responseGoogle = (response) => {
        // Handle Google login response
        console.log('Google login response:', response);
    };

    const responseGitHub = (response) => {
        // Handle GitHub login response
        console.log('GitHub login response:', response);
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
                {/*<GoogleLogin*/}
                {/*    clientId="YOUR_GOOGLE_CLIENT_ID"*/}
                {/*    buttonText="Login with Google"*/}
                {/*    onSuccess={responseGoogle}*/}
                {/*    onFailure={responseGoogle}*/}
                {/*    cookiePolicy={'single_host_origin'}*/}
                {/*/>*/}

                {/*/!* GitHub Login *!/*/}
                {/*<GithubLogin*/}
                {/*    clientId="YOUR_GITHUB_CLIENT_ID"*/}
                {/*    buttonText="Login with GitHub"*/}
                {/*    onSuccess={responseGitHub}*/}
                {/*    onFailure={responseGitHub}*/}
                {/*    redirectUri=""*/}
                {/*/>*/}
            </div>
        </div>
    );
};

export default Login;

