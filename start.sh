#!/bin/bash
# Start the server
cd server
npm install
node server.js &

# Start the client
cd ..
cd client
npm install
npm start
