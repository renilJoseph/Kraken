# Robot-Management-Application
## Login Prototype
This prototype uses the MEAN(MongoDB, Express, Angular and NodeJS) stack to create the login system.
## Installation
To install all the dependencies for running our login system, type the following:
```bash
chmod +x setup.sh start.sh
./setup.sh
```
**Note:** You only need to run `start.sh` after the initial setup to start the login app.
## Detailed Installation
This can be used as a fallback if the above method fails.
### Install NodeJS
```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```
### Install MongoDB
```bash
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
echo "deb [ arch=amd64 ] http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/testing multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list
sudo apt-get update && sudo apt-get install -y mongodb-org
```
### Start MongoDB
Type the following if the service has not already been started.
```
sudo service mongod start
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
### Setting up the connection between ROS and the web application
Install rosbridge
```
sudo apt-get install ros-indigo-rosbridge-server
```
Run rosbridge
```
roslaunch rosbridge_server rosbridge_websocket.launch
```
Download the ros package found here: https://github.com/perrypwang/rma-ros-server.
Place the rma-ros-server into your local `~/catkin_ws/src` folder. 
Build the package from the `catkin_ws` folder and run the package by executing the following commands:
```
cd ~/catkin_ws
source devel/setup.sh
catkin_make install
rosrun rma rma_connection_server.py
```
This will start the ROS node that will allow you to launch and shutdown the husky simulator through a ROS service. 
### Visualization
Clone screengrab_ros from https://github.com/lucasw/screen_grab
Add screen_grab to catkin_ws/src and use catkin_make
Source devel/setup.sh if not already done
```
roslaunch screen_grab screen_grab.launch
```
Now we can change the region of interest in the screen by publishing to screen_grab/roi, and the video is constantly published to the topic /image
Region of interest is made up of an xOffset and yOffset from the top left of the screen, in pixels.
Also a height and width starting from that offset.
In order to make this easily viewable in the web application:
Make sure the web_video_server package is installed, before running it
```
rosrun web_video_server web_video_server
```
This makes the image topics available on port 8080, where the web application connects to /image
## Local database location
MongoDB stores the database in Ubuntu under `/var/lib/mongodb`.
