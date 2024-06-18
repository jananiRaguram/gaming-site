## Mac Set up

### 1. Install homebrew
https://brew.sh/ 

### 2. Install nginx

`brew install nginx`

### 3. Instal mysql

`brew install mysql `

### 4. Install php


`brew install php `


### 5. Modify nginx.conf to 
       

```
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    server {
        listen       8080;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

       root /usr/local/var/www/html/;
        index  index.html index.htm index.php;

        location / {
            autoindex on;
            try_files $uri $uri/ /index.php?$args;

            proxy_buffer_size 128k;
            proxy_buffers 4 256k;
            proxy_busy_buffers_size 256k;
        }
        #error_page  404              /404.html;

       location ~ \.php$ {
		fastcgi_pass 127.0.0.1:9000;
		fastcgi_index index.php;
		fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
		include fastcgi_params;
	}


        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
    include servers/*;
}
```


### 6. Create a PHP Info Page
Create the following file `/var/www/html/index.php`:

```
<?php
phpinfo();
?>
```

### 7. Start services using brew

```
brew services start  nginx
brew services start  pnp
brew services start  mysql
```

### 7. Check to see what is running using $ brew services 
### 8. Naviagte to page

Navigate to http://localhost/index.php in your browser. You should see the PHP info page.

### 9. Modify and restart services 

`brew services restart name_of_service`



