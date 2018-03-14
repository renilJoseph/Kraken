# Client Application
## Detailed Installation Guide
### Ubuntu based
**Install NodeJS**
```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```
**Install MongoDB**
```bash
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
echo "deb [ arch=amd64 ] http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/testing multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list
sudo apt-get update && sudo apt-get install -y mongodb-org
```
**Start MongoDB**

Type the following if the service has not already been started.
```
sudo service mongod start
```
### Arch based
**Install NodeJS**
```
sudo pacman -Sy nodejs npm
```
**Install MongoDB**
```bash
sudo pacman -Sy mongodb
```
**Start MongoDB**
Type the following if the service has not already been started.
```
sudo systemctl enable --now mongodb.service
```
### Run the Server API
Run the following from the root project directory.
```
cd server
npm install
node server.js
```
### Run the Angular client
Open a new terminal window and run the following from the root project directory.
```
cd client
npm install
npm start
```
