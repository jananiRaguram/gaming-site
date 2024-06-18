# team_10

## Our website
 
https://cis4250w24-10.socs.uoguelph.ca/

### NPM and Node

In addition to converting our work from PHP over to React, we're also adding functionality related to the matching/memory game. At the moment this version can only be run locally but we plan on deploying it next sprint. To run this NPM and Node need to be installed. This can be done through install.sh

## React Code

Our react builds are deployed to the server after each push to the repo. But the code can also be run locally using NPM in the memory-game directory. 

Running the following will open our project on localhost:3000 :

1. `npm ci`
2. `npm start`

## Getting our git onto the VM

Our .gitlab-ci.yml file will deploy and test pushed code.

How to manually move our files from the git repo onto the website's hosting directory. 
Do the following:

1. `cd home`
2. `sudo git clone https://gitlab.socs.uoguelph.ca/cis4250_w24/team_10.git`
3. `cd team_10`
4. `sudo git checkout sprint3`
5. `sudo cd memory-game`
6. `npm ci`
7. `npm run build`
8. `sudo cp -r build/* ../../../../var/www/html`

Nginx should now be able find our files and run it online

## Testing Outputs

We're using React's testing setup to run front end tests and also accessiblity tests. These tests are done for each push request within our pipeline. While the front end tests can be seen through the pipeline, the accessiblity test results need to be downloaded from the "a11y" job in the build -> artifacts section of gitlab. Downloading the "artifacts.zip" file and opening the html file will allow you to see how accessible the site is based on WCAG2AA standards. 
