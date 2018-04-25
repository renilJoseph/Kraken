# Application structure
## Client
### App
 - **_directives:** contains alert component
 - **_guards:** contains the user login component
 - **_helpers:** contains the code that retrieves the current user
 - **_models:** contains the user object model
 - **_services:** contains the following:
	 - ***alert:*** navigation change success and error messages
	 - ***authentication:***  logs user in and stores them as current user
	 - ***ros service:*** connects to ROS server
	 - ***user service:*** exports usersevice class that contains getAll, getById, and other user request actions
 - **auth:** login, register, and forgot password functionality
 - **home:** contains the following
	 - ***husky:*** husky viewer and telemetry components
	 - ***jackal:*** jackal viewer and telemetry components
	 - ***menubar:*** home screen menubar components (web socket pop ups, etc.)
	 - ***settings:*** contains code relating to user creation and deletion and name, password, username, and email changes
	 - ***teleop:*** control buttons and speed controls
	 - ***welcome:*** contains code relating to the buttons on the welcome screen and resulting popups to set web socket addresses
 
### Assets
- Contains welcome button icons and ROS packages used.

## Server
### Controllers
- Contains users.controller.js which implements the user services in the client/app/_services folder

### Services
- contains user.service.js
