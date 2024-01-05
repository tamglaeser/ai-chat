#!/bin/bash

# Backend Setup
cd backend

# Create 'database' directory if it doesn't exist
mkdir -p app/database

pip install -r requirements.txt
python run.py &

# Frontend Setup
cd ../frontend
npm install
npm start

