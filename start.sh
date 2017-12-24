#!/bin/bash
cd server
node server.js &
cd ..
cd client
npm start
