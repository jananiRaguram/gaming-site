#! /bin/bash
echo "Installing needed packages for server:"


sudo apt-get update
sudo apt install git


echo "checking if git is installed"
git --version


echo "installing nodejs npm"
sudo apt install nodejs npm


node -v
npm -v



