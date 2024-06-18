## NGINX and PHP on WSL (Windows Subsystem for Linux) with Debian

The are the steps I followed to install NGINX and PHP on WSL (Windows Subsystem for Linux) with Debian.

### Step 1: Update Package Lists

```bash
sudo apt update
sudo apt upgrade
```

### Step 2: Install NGINX

```bash
sudo apt install nginx
```

Start NGINX:

```bash
sudo service nginx start
```

### Step 3: Install PHP and PHP-FPM

```bash
sudo apt install php-fpm
```

### Step 4: Configure NGINX to Use PHP
Edit the following file:
```bash
/etc/nginx/sites-available/default
```

Update the configuration to include PHP:

```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    root /var/www/html;
    index index.php index.html index.htm;

    server_name _;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
    }
}
```

Save and exit the file.

### Step 5: Restart NGINX and PHP-FPM

```bash
sudo service nginx restart
sudo service php8.2-fpm start
```

### Step 6: Create a PHP Index and Test

Create a PHP index file:

```bash
echo "<?php My first PHP script! ?>" | sudo tee /var/www/html/index.php
```

Go to `http://localhost` you should see a PHP page.
