import React, {useState} from "react";
import axios from "axios";
const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');

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

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mt-5">
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
