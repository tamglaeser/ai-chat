# AI Chat

This project implements a simple ai-human chat server, allowing the user to interact with a question-answering bot and 
share the conversation with another user who can use the shared link to fork the conversation and continue it.

## Getting Started

### Installation

1. Clone the repository:

    ```bash
    git clone git@github.com:tamglaeser/ai-chat.git
    ```

2. Navigate to the project directory:

    ```bash
    cd ai-chat
    ```

3. Build and Usage

    ```bash
    ./run.sh
    ```

You can now open http://localhost:3000 to see the application.

### Project Structure
````bash
feedbackapp/
│
├── backend/             # Contains the backend / Flask logic
│   ├── app/           
│   │   ├── database/    # Contains the SQLite DB
│   │   ├── __init__.py
│   │   ├── models.py    # DB table models
│   │   ├── routes.py    # API routes
│   ├── .gitignore       # Backend gitignore   
│   ├── config.py        # Config containing GOOGLE_CLIENT_ID, SQLALCHEMY_DATABASE_URI, etc
│   ├── requirements.txt
│   └── run.py           # Script to launch back   
│
├── frontend/            # Contains the frontend / React part
│   ├── public/
│   ├── src/
│   │   ├── components/  # Contains all components, ie. Chat.js, Home.js, Login.js, etc.
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── index.css
│   │   ├── index.js     # Contains routes and web app setup
│   │   └── ...
│   └── ...
├── .gitignore           # Files and directories ignored by version control
├── LICENSE              # Laravel's command-line interface executable
├── README.md            # Defines PHP dependencies for the Laravel application
└── run.sh               # Other project-related files and folders
````


### Future Work

* Implement tests
* Host project
* Improve UI
* Lint