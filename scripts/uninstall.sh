#! /bin/bash
echo "removing isntalled packages from server:"
sudo apt-get remove git


echo "checking if git is removed"
dpkg -s git

o
echo "Removing Nodejs"
sudo apt-get remove nodejs


echo "Removing npm"
sudo apt-get remove npm
