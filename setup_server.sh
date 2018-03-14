#!/bin/bash
# Check if ROS is intalled
if dpkg-query -l "ros-indigo-desktopa-full" | grep -q ^.i; then
    printf '\n*************************************************\n'
    printf 'Everything is already installed and configured...\n'
    printf '*************************************************\n\n'
else
    printf '\n*************************************\n'
    printf 'Installing ros-indigo-desktop-full...\n'
    printf '*************************************\n\n'
	sudo sh -c 'echo "deb http://packages.ros.org/ros/ubuntu $(lsb_release -sc) main" > /etc/apt/sources.list.d/ros-latest.list'
	sudo apt-key adv --keyserver hkp://ha.pool.sks-keyservers.net:80 --recv-key 421C365BD9FF1F717815A3895523BAEEB01FA116
	sudo apt-get update && sudo apt-get install ros-indigo-desktop-full python-rosinstall
    printf '\n*************************************\n'
    printf '...ros-indigo-desktop-full installed.\n'
    printf '*************************************\n\n'
    printf '\n********************\n'
    printf 'initialize rosdep...\n'
    printf '********************\n\n'
    sudo rosdep init
	rosdep update
    printf '\n********************\n'
    printf 'environment setup...\n'
    printf '********************\n\n'
	echo "source /opt/ros/indigo/setup.bash" >> ~/.bashrc
	source ~/.bashrc
fi
printf '\n*******\n'
printf '...done\n'
printf '*******\n\n'
