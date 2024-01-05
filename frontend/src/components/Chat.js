import React, {useEffect, useState} from "react";
import { Modal } from 'react-bootstrap';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
const Chat = () => {
    const { uuid } = useParams(); // Access the 'uuid' parameter from the URL
    const navigate = useNavigate();

    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [copySuccess, setCopySuccess] = useState(false);

    useEffect(() => {
        async function fetchChat() {
            if (uuid) {
                try {
                    const response = await axios.get('http://127.0.0.1:5000/chat/' + uuid, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                    setMessages(response.data.chat.thread);
                } catch (error) {
                    if (error.response && (error.response.status === 401 || error.response.status === 422)) {
                        // Redirect to the login page when unauthorized
                        navigate('/login', { state: { from: `/chat/share/${uuid}` } });
                    } else {
                        // Handle other errors
                        console.error('Error:', error);
                    }
                }
            } else {
                // If 'uuid' is not present, set default messages or an empty array
                setMessages([]); // Set default or empty messages
            }
        }
        fetchChat();
    }, [uuid, navigate]);

    const sendMessage = async () => {
        if (inputText.trim() !== '') {
            // Call your backend API to process the message and get bot response
            await fetchBotResponse(inputText);
            setInputText('');
        }
    };

    const fetchBotResponse = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/respond', {
                inputText,
            });
            setMessages([...messages, { sender: 'user', text: inputText }, { sender: 'bot', text: response.data.botResponse }]);

        } catch (error) {
            console.error(error);
        }
    };

    const shareChat = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/create-chat', {
                messages,
            });
            // Copy the text to the clipboard
            navigator.clipboard.writeText(response.data.chat.share_url)
                .then(function() {
                    setCopySuccess(true);
                    // Hide the success message after 3 seconds
                    setTimeout(() => {
                        setCopySuccess(false);
                    }, 3000);
                })
                .catch(function(err) {
                    console.error('Could not copy share URL: ', err);
                });

        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-end">
                <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <div className="card">
                <div className="card-body">
                    <div className="chat-box">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`alert ${message.sender === 'user' ? 'alert-success' : 'alert-info'}`}
                                role="alert"
                            >
                                {message.text}
                            </div>
                        ))}
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Message AIChat..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                        />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button" onClick={sendMessage}>
                                Send
                            </button>
                        </div>
                        <div className="input-group-append">
                            <button className="btn btn-secondary" type="button" onClick={shareChat}>
                                Share
                            </button>
                        </div>
                        <Modal show={copySuccess} onHide={() => setCopySuccess(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Copy Success</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>Copied Share URL to clipboard!</p>
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
