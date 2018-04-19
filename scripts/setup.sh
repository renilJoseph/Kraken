#!/bin/bash

# Function to get the name of the package manager
chk_pkg_mgr() {
	[ -x "$(which $1)" ]
}

# Starts installation
apt-get_install() {
	# Check if ROS is intalled
	if dpkg-query -l "ros-indigo-desktop-full" | grep -q ^.i; then
	    printf '\n*************************************************\n'
	    printf 'ROS is already installed...\n'
	    printf '*************************************************\n\n'
	else
	    printf '\n*************************************\n'
	    printf 'Installing ros-indigo-desktop-full...\n'
	    printf '*************************************\n\n'
		sudo sh -c 'echo "deb http://packages.ros.org/ros/ubuntu $(lsb_release -sc) main" > /etc/apt/sources.list.d/ros-latest.list'
		sudo apt-key adv --keyserver hkp://ha.pool.sks-keyservers.net:80 --recv-key 421C365BD9FF1F717815A3895523BAEEB01FA116
		sudo apt-get update && sudo apt-get install -y ros-indigo-desktop-full python-rosinstall
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

	# Check if nodejs is installed
	if dpkg-query -l "nodejs" | grep -q ^.i; then
		printf '\n***************************\n'
		printf 'nodejs is already installed\n'
		printf '***************************\n\n'
	else
		printf '\n********************\n'
		printf 'installing nodejs...\n'
		printf '********************\n\n'
		curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
		sudo apt-get install -y nodejs
		printf '\n*******************\n'
		printf '...nodejs installed\n'
		printf '*******************\n\n'
	fi

	# Check if build-essential is installed
	if dpkg-query -l "build-essential" | grep -q ^.i; then
		printf '\n************************************\n'
		printf 'build-essential is already installed\n'
		printf '************************************\n\n'
	else
		printf '\n*****************************\n'
		printf 'installing build-essential...\n'
		printf '*****************************\n\n'
		sudo apt-get install -y build-essential
		printf '\n****************************\n'
		printf '...build-essential installed\n'
		printf '****************************\n\n'
	fi

	# Check if mongodb is installed
	if dpkg-query -l "mongodb-org" | grep -q ^.i; then
		printf '\n********************************\n'
		printf 'mongodb-org is already installed\n'
		printf '********************************\n\n'
	else
		printf '\n*************************\n'
		printf 'installing mongodb-org...\n'
		printf '*************************\n\n'
		sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
		echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list
		sudo apt-get update && sudo apt-get install -y mongodb-org
		printf '\n************************\n'
		printf '...mongodb-org installed\n'
		printf '************************\n\n'
	fi

	# Start the mongodb server
	if ! pgrep -x "mongod" > /dev/null
	then
		printf '\n*******************\n'
		printf 'Starting mongodb...\n'
		printf '*******************\n\n'
		sudo service mongod start
	else
		printf '\n*********************\n'
		printf 'mongodb is running...\n'
		printf '*********************\n\n'
	fi

	# Check if nginx is installed
	if dpkg-query -l "nginx" | grep -q ^.i; then
		printf '\n**************************\n'
		printf 'nginx is already installed\n'
		printf '**************************\n\n'
	else
		printf '\n*******************\n'
		printf 'installing nginx...\n'
		printf '*******************\n\n'
		sudo apt-get install -y nginx
		: ${USER?}
		echo -e 'server {\n\tlisten 80 default_server;' | sudo tee /etc/nginx/sites-available/default > /dev/null
		echo -e "\troot /home/$USER/Robot-Management-Application/client/dist;" | sudo tee --append /etc/nginx/sites-available/default > /dev/null
		echo -e '\tindex index.html index.htm;\n\tserver_name localhost;' | sudo tee --append /etc/nginx/sites-available/default > /dev/null
		echo -e '\tlocation / {\n\t\ttry_files $uri $uri/ /index.html;\n\t}\n}' | sudo tee --append /etc/nginx/sites-available/default > /dev/null
		sudo service nginx restart
		printf '\n******************\n'
		printf '...nginx installed\n'
		printf '******************\n\n'
	fi

	# NPM Permission error fix
	if ! test -d ~/.npm-global; then
		mkdir ~/.npm-global
	fi
	npm config set prefix '~/.npm-global'
	export PATH=~/.npm-global/bin:$PATH
	source ~/.profile
	echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.bashrc

	# Check if angular-cli is installed
	if ! npm list -g @angular/cli > /dev/null; then
		printf '\n************************\n'
		printf 'installing angularcli...\n'
		printf '************************\n\n'
		npm install -g @angular/cli
		printf '\n***********************\n'
		printf '...angularcli installed\n'
		printf '***********************\n\n'
	else
		printf '\n***********************************\n'
		printf 'angular cli is already installed...\n'
		printf '***********************************\n\n'
	fi

	# Check if pm2 is installed
	if ! npm list -g pm2 > /dev/null; then
		printf '\n*****************\n'
		printf 'installing pm2...\n'
		printf '*****************\n\n'
		npm install -g pm2
		# gnome-terminal -e ./pm2-setup.sh
		cd ~/Robot-Management-Application/server
		npm install
		source ~/.profile
		pm2 start server.js
		pm2 startup
		sudo env PATH=$PATH:/usr/bin /home/$USER/.npm-global/lib/node_modules/pm2/bin/pm2 startup upstart -u $USER --hp /home/$USER
		pm2 save
		printf '\n****************\n'
		printf '...pm2 installed\n'
		printf '****************\n\n'
	else
		printf '\n***************************\n'
		printf 'pm2 is already installed...\n'
		printf '***************************\n\n'
	fi

	# Take ownership of folder
	sudo chown -R $USER:$USER ~/Robot-Management-Application
	sudo chmod -R 755 ~/Robot-Management-Application
}

# Finds which package manager to use
if chk_pkg_mgr apt-get; then
	printf '\n*****************************\n'
	printf 'using apt-get package manager\n'
	printf '*****************************\n\n'
	apt-get_install
else
	printf '\n*****************************\n'
	printf 'distribution not supported...\n'
	printf '*****************************\n\n'
fi

# Starts the client application
cd ~/Robot-Management-Application/scripts
echo -e 'Installation complete. What would you like to do?\x0a\t(1): Build for debugging\x0a\t(2): Build for deployment\x0a\t(3): Nothing\x0a'
read -p "Your choice: " CHOICE
if [ "$CHOICE" == "1" ]; then
	./debug.sh
elif [ "$CHOICE" == "2" ]; then
	./deploy.sh
elif [ "$CHOICE" == "3" ]; then
	echo "You have chosen to do nothing."
fi
