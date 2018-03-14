# Robot Operating System
## Detailed Installation Guide
**Note:** `ROS Indigo` currently can be installed without any issues on `Ubuntu 14.04`, therefore this guide only provides instructions for `Ubuntu 14.04`.
### Add ROS to the `sources.list` file
```
sudo sh -c 'echo "deb http://packages.ros.org/ros/ubuntu $(lsb_release -sc) main" > /etc/apt/sources.list.d/ros-latest.list'
```
### Setting up keys
```
sudo apt-key adv --keyserver hkp://ha.pool.sks-keyservers.net:80 --recv-key 421C365BD9FF1F717815A3895523BAEEB01FA116
```
### Installation
```
sudo apt-get update
sudo apt-get install ros-indigo-desktop-full python-rosinstall
```
### Initialize rosdep
```
sudo rosdep init
rosdep update
```
### Environment setup
```
echo "source /opt/ros/indigo/setup.bash" >> ~/.bashrc
source ~/.bashrc
```
### Configuration
Follow [this](ROS_Config.md) guide to configure ROS.
