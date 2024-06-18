## Local Install setup Research and steps
Local install for NGINX, PHP. Since the VM is a Debian Linux, decided to create a local environment in WSL to get as close to the production environment.
NGINX - NGINX is an open-source web server and reverse proxy server software. It is mainly used to show content and handle content for applications. As mentioned it can serve as a web server, what this means is that the main responsibility of NGINX is to serve visitors of websites' web pages so that they can view the content they wish to see. Additionally, NGINX can also be used as a reverse proxy server. What this means is that it acts as a middleman between the client and the backend. What happens in this scenario is that NGINX forwards the client request to the correct backend and then returns that response back to the client. Another important feature of NGINX is that it can load balance, this essentially means that it can ensure that no one server has too much stress on it, as network traffic is equally distributed between multiple servers.

PHP - PHP is a scripting language and it is mainly used for web development. PHP is known to be very flexible and simple due to its ability to be embedded in HTML code. Additionally, PHP is a server-side scripting language which means that code is usually executed on the web server and then the output is sent to the user's web browser. One benefit of PHP is that it can allow for dynamic web pages which can be created using database information, or either use input. Additionally, another benefit of PHP is that it provides support for database connectivity. This makes it easier to create web applications that are connected to databases. Furthermore, it can easily connect to database systems such as MySQL, PostgreSQL, and SQLite.

MySQL - MySQL is a relational data management system that is mainly used to save and manage large amounts of structured data. Due to MySQL being a relational database management system, means that it holds information in tables that are organized as by both rows and columns. Additionally, SQL can be used to query and change data within the tables. As mentioned MySQL can be integrated well with PHP but later down the line if we wanted to introduce other programming languages then MySQL also integrates well with popular languages such as Python and Java.        

## Install Steps
Installing PHP 
```sh
sudo apt update 
sudo apt install php
sudo apt install php-mysql php-curl php-gd php-json php-mbstring php-xml php-zip
sudo apt install php-fpm
```
Installing NGINX
```sh
sudo apt-get update
sudo apt-get install nginx
sudo nano /etc/nginx/sites-available/default
```
Update file to allow php-fpm and save changes

Start command for php-fpm and nginx 
```sh
sudo service php8.2-fpm start
sudo service nginx start
```
