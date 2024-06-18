## WSL local dev setup

###### Prereq 
- install Ubuntu 
- for the tutorial I'll be using 20.04.6 LTS


## update ubuntu
```
sudo apt update
sudo apt upgrade
```

# NGINX

```
sudo apt install nginx
```
start running the server with:
```
sudo service nginx start
```
You should a message like the one below that indicates that the server is running
```
*Starting nginx nginx        [OK]
```

Check localhost on chrome and you should see a `'Welcome to nginx!'` page


# PHP

### installation
```
sudo apt install php-fpm
```

start the server with:
```
sudo service php7.4-fpm start
```
note: I'm using php v.7.4 check the version of your php and change it to the correct one

### update the config file
```
cd /etc/nginx
sudo vi sites-enabled/default
```
replace the section with the server with the following:

```
server {
	listen 80 default_server;
	listen [::]:80 default_server;

	root /var/www/html;

	# Add index.php to the list if you are using PHP
	index index.php index.html index.htm index.nginx-debian.html;

	server_name _;

	location / {
		# First attempt to serve request as file, then
		# as directory, then fall back to displaying a 404.
		try_files $uri $uri/ =404;
	}

	# pass PHP scripts to FastCGI server
	#
	location ~ \.php$ {
		include snippets/fastcgi-php.conf;
		fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
	}
}
```
# test
To test go to 
```
/var/www/html
```
add the following into the index.php file
```
<?php  phpinfo(); 
```

refresh both servers with

```
sudo service nginx reload
sudo service php7.4-fpm reload
```

if you go to localhost you should see a purple chart 

##### commands overview
start running the servers with:
```
sudo service nginx start
sudo service php7.4-fpm start

```
reload (only need to reload if changing config things):
```
sudo service nginx reload
sudo service php7.4-fpm reload
```

stop:

```
sudo service nginx stop
sudo service php7.4-fpm stop
```