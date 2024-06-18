## Installing PHP, NGINX, and MySQL on WSL Ubuntu 

The are the steps I followed to install PHP, NGINX, and MySQL on WSL Ubuntu.

### Step 1: Update Packages

```bash
sudo apt update
sudo apt upgrade
```

### Step 2: Install NGINX

```bash
sudo apt install nginx
sudo service nginx start
```
If you navigate to http://localhost in your browser, you should see the default NGINX page.

### Step 3: Install PHP

```bash
sudo apt install php-fpm
sudo service php8.1-fpm start
```
Note that on Ubuntu the php version is 8.1

### Step 4: Configure NGINX to Use PHP

Open `/etc/nginx/sites-available/default` in your favourite editor.

Modify the file to include PHP, it should resemble the following:

```nginx
server {
	listen 80 default_server;
	listen [::]:80 default_server;

	root /var/www/html;

	# Add index.php to the list if you are using PHP
	index index.html index.htm index.nginx-debian.html index.php;

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
	#	# With php-fpm (or other unix sockets):
		fastcgi_pass unix:/run/php/php8.1-fpm.sock;
	}

```
Please note that the php version is 8.1, if you have a different version installed please change it accordingly.

Save and exit the file.

### Step 5: Create a PHP Info Page
Create the following file `/var/www/html/index.php`:

```php
<?php
phpinfo();
?>
```

### Step 6: Reload Nginx and Php

```bash
sudo service nginx reload
sudo service php8.1-fpm reload
```

### Step 7: Test PHP
Navigate to http://localhost/index.php in your browser. You should see the PHP info page.

if you run into any issues please see `/var/log/nginx/error.log` for possible issues.

### Step 8: Install MySQL

```bash
sudo apt install mysql-server
```
Actual MySQL setup to be continued later.
\ No newline at end of file