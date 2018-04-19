# Robot Operating System
## Configuration Guide
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
Clone screengrab_ros from https://github.com/lucasw/screen_grab.
Add screen_grab to catkin_ws/src and use catkin_make.
Source devel/setup.sh if not already done.
```
roslaunch screen_grab screen_grab.launch
```
Now we can change the region of interest in the screen by publishing to screen_grab/roi, and the video is constantly published to the topic /image.
Region of interest is made up of an xOffset and yOffset from the top left of the screen, in pixels, as well as a height and width starting from that offset.

In order to make this easily viewable in the web application, use the web_video_server package:
```
rosrun web_video_server web_video_server
```
This makes the image topics available on port 8080, where the web application connects to /image
## Local database location
MongoDB stores the database in `/var/lib/mongodb`.
