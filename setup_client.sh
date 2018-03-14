#!/bin/bash

# Used to check if install is completed
complete=n

# Function to get the name of the package manager
chk_pkg_mgr() {
	[ -x "$(which $1)" ]
}

# Installer for apt-get based systems
apt-get_install() {
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
		printf '*******************\n'
		printf '...nodejs installed\n'
		printf '*******************\n'
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
		sudo service mongod startcd server
	else
		printf '\n*********************\n'
		printf 'mongodb is running...\n'
		printf '*********************\n\n'
	fi
	complete=y
}

#Installer for pacman based systems
pacman_install() {
	# Check if nodejs is installed
	if pacman -Qs "nodejs" "npm" > /dev/null
	then
		printf '\n***************************\n'
		printf 'nodejs is already installed\n'
		printf '***************************\n\n'
	else
		printf '\n********************\n'
		printf 'installing nodejs...\n'
		printf '********************\n\n'
		sudo pacman -Sy --needed --noconfirm nodejs npm
		printf '*******************\n'
		printf '...nodejs installed\n'
		printf '*******************\n'
	fi
	
	# Check if mongodb is installed
	if pacman -Qs "mongodb" > /dev/null
	then
		printf '\n********************************\n'
		printf 'mongodb-org is already installed\n'
		printf '********************************\n\n'
	else
		printf '\n*************************\n'
		printf 'installing mongodb-org...\n'
		printf '*************************\n\n'
		sudo pacman -Sy --needed --noconfirm mongodb
		printf '\n************************\n'
		printf '...mongodb-org installed\n'
		printf '************************\n\n'
	fi
	
	# Start the mongodb server
	if ! systemctl status mongodb.service > /dev/null
	then
		printf '\n*******************\n'
		printf 'Starting mongodb...\n'
		printf '*******************\n\n'
		sudo systemctl enable --now mongodb.service
	else
		printf '\n*********************\n'
		printf 'mongodb is running...\n'
		printf '*********************\n\n'
	fi
	complete=y
}

# Finds which package manager to use
if chk_pkg_mgr apt-get; then
	printf '\n*****************************\n'
	printf 'using apt-get package manager\n'
	printf '*****************************\n\n'
	apt-get_install
elif chk_pkg_mgr pacman; then
	printf '\n****************************\n'
	printf 'using pacman package manager\n'
	printf '****************************\n\n'
	pacman_install
else
	printf '\n*****************************\n'
	printf 'distribution not supported...\n'
	printf '*****************************\n\n'
fi

# Starts the client application
if [ "$complete" == "y" ]; then
	./start.sh
fi
