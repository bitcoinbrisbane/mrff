# Deploy using Nginx
## Set up the folder to host from
Create the folder, and set permissions so you don't need sudo to copy over to it.
```
sudo mkdir /var/www
sudo chown "$YOUR USER NAME" /var/www
sudo chmod 667 /var/www
```
Clone and build the app, then copy the contents of the `build` directory to `/var/www/[CHOSEN FOLDER NAME]`

## Nginx site config
Save this to: `/etc/nginx/sites-enabled/default`
```bash                                             
server {
   listen 80 default_server;
   root /var/www/[CHOSEN FOLDER NAME];
   server_name [CHOSEN DOMAIN NAME];
   index index.html index.htm;
   location / {
    try_files $uri /index.html;
   }
}
```

## If `/etc/nginx/sites-enabled` doesn't exist
Create it, and add the following line to `/etc/nginx/nginx.conf` at the top of the `http` block:
`include /etc/nginx/sites-enabled/*;`

## Errors
If nginx throws a `500 Internal Server Error`, run `sudo chmod o+rwx /var/www`

## References
[Deploying create-react-app](https://medium.com/@timmykko/deploying-create-react-app-with-nginx-and-ubuntu-e6fe83c5e9e7)
