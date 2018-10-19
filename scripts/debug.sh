#!/bin/bash
cd ~/Robot-Management-Application/server
npm install
pm2 restart server
cd ~/Robot-Management-Application/client
npm install
ng serve
