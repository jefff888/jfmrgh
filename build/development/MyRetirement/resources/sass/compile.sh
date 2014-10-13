#!/bin/bash

######################################

	fail() {
		tput bold; tput setaf 1 #red
		echo -n "Not Uploaded "
		tput sgr0
		date +%r
	}

######################################

compass compile

if [ $? -eq 0 ]; then
	cp ../css/myretirement.css /Volumes/SG-MyRetirement/ext-library/MyRetirement/resources/css/myretirement.css
	if [ $? -eq 0 ]; then
		tput bold; tput setaf 2 #green
		echo -n "Uploaded "
		tput sgr0
		date +%r
	else
		fail
	fi
else
	fail
fi

printf "\a\n" #alert