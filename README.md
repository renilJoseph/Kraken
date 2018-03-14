# Robot-Management-Application
## Prototype
This prototype uses the MEAN (MongoDB, Express, Angular and NodeJS) stack for the client application and ROS (Robot Operating System) for the server.
## Installation
### Prerequisites
**Operating System**
* Ubuntu and derivatives
* Arch Linux and derivatives

**Shell**
* Bash

### ROS Server
Type the following to install the ROS server:
```bash
chmod +x setup_server.sh
./setup_server.sh
```
### Client Application
Type the following to install the client application:
```bash
chmod +x setup_client.sh start.sh
./setup_client.sh
```
**Note:** You only need to run `start.sh` after the initial setup to start the application.
## Detailed Installation
Detailed installation guides can be found in the following links:
* [ROS Installation Guide](ROS_Install.md)
* [ROS Configuration Guide](ROS_Config.md)
* [Client Application Installation Guide](CApp_Install.md)
