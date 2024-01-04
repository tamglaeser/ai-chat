import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSignUp = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/signup', {
                name,
                email,
                password,
            });
            console.log(response.data);
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 col-10 col-md-6 col-lg-4">
                <h2 className="text-center mb-4">Create your account</h2>
                <div className="mb-3">
                    <input type="text" value={name} onChange={handleNameChange} placeholder="Name*" />
                </div>
                <div className="mb-3">
                    <input type="email" value={email} onChange={handleEmailChange} placeholder="Email*" />
                </div>
                <div className="mb-3">
                    <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password*" />
                </div>
                <button className="btn btn-primary d-block w-100 mb-3" onClick={handleSignUp}>Sign up</button>
                <p className="text-muted">
                    <span className="d-inline-block">Have an account?&nbsp;</span>
                    <Link to="/login" className="text-primary text-decoration-none">Log in</Link>
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

export default Signup;
