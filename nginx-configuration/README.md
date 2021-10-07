# Configuration source
These urls are suspect, probably due to the length. If using this tool to update the configuration, make sure to check all values for all sites are present in the generated configuration.
## Production Configuration
Production configuration was generated with:  https://www.digitalocean.com/community/tools/nginx#?0.domain=api.getpaidinbitcoin.com.au&0.redirect=false&0.https=false&0.force_https=false&0.email=s.justin.taylor%2Bdltx@gmail.com&0.php=false&0.proxy&0.proxy_pass=http:%2F%2F127.0.0.1:5000&0.root=false&1.domain=admin.getpaidinbitcoin.com.au&1.path=%2Fvar%2Fwww%2Fgpib.admin&1.document_root=%2F&1.redirect=false&1.email=s.justin.taylor%2Bdltx@gmail.com&1.php=false&1.proxy_pass=http:%2F%2F127.0.0.1:3001&1.index=index.html&1.fallback_html&1.error_log_domain&2.domain=explorer.getpaidinbitcoin.com.au&2.redirect=false&2.email=s.justin.taylor%2Bdltx@gmail.com&2.php=false&2.proxy&2.proxy_pass=http:%2F%2F127.0.0.1:24444&2.root=false

## Test Configuration
Test configuration was generated with: https://www.digitalocean.com/community/tools/nginx#?0.domain=testapi.getpaidinbitcoin.com.au&0.redirect=false&0.email=s.justin.taylor%2Bdltx@gmail.com&0.php=false&0.proxy&0.proxy_pass=http:%2F%2F127.0.0.1:5000&0.root=false&0.error_log_domain&1.domain=testadmin.getpaidinbitcoin.com.au&1.path=%2Fvar%2Fwww%2Fgpib.admin&1.document_root=%2F&1.redirect=false&1.email=s.justin.taylor%2Bdltx@gmail.com&1.php=false&1.proxy_pass=http:%2F%2F127.0.0.1:3001&1.index=index.html&1.fallback_html&1.error_log_domain&2.domain=testexplorer.getpaidinbitcoin.com.au&2.redirect=false&2.email=s.justin.taylor%2Bdltx@gmail.com&2.php=false&2.proxy&2.proxy_pass=http:%2F%2F127.0.0.1:24445&2.root=false&2.error_log_domain

# Deployment
Full instructions for deployment are included at the above links. Below is the bare basics for deploying to a clean install of Ubuntu 20.04
```bash
# Install dependencies
sudo add-apt-repository universe
sudo apt update
sudo apt install nginx unzip certbot python3-certbot-nginx

cd /etc/nginx
tar -czvf nginx_$(date +'%F_%H-%M-%S').tar.gz nginx.conf sites-available/ sites-enabled/ nginxconfig.io/
# I'm assuming the config was compressed and uploaded to /etc/nginx/config.zip
unzip -o config.zip

openssl dhparam -out /etc/nginx/dhparam.pem 2048
mkdir -p /var/www/_letsencrypt
chown www-data /var/www/_letsencrypt

sed -i -r 's/(listen .*443)/\1;#/g; s/(ssl_(certificate|certificate_key|trusted_certificate) )/#;#\1/g' /etc/nginx/sites-available/testapi.getpaidinbitcoin.com.au.conf /etc/nginx/sites-available/testadmin.getpaidinbitcoin.com.au.conf /etc/nginx/sites-available/testexplorer.getpaidinbitcoin.com.au.conf

sudo nginx -t && sudo systemctl reload nginx

certbot certonly --webroot -d testapi.getpaidinbitcoin.com.au --email s.justin.taylor+dltx@gmail.com -w /var/www/_letsencrypt -n --agree-tos --force-renewal

certbot certonly --webroot -d testadmin.getpaidinbitcoin.com.au --email s.justin.taylor+dltx@gmail.com -w /var/www/_letsencrypt -n --agree-tos --force-renewal

certbot certonly --webroot -d testexplorer.getpaidinbitcoin.com.au --email s.justin.taylor+dltx@gmail.com -w /var/www/_letsencrypt -n --agree-tos --force-renewal

sed -i -r 's/#?;#//g' /etc/nginx/sites-available/testapi.getpaidinbitcoin.com.au.conf/etc/nginx/sites-available/testadmin.getpaidinbitcoin.com.au.conf/etc/nginx/sites-available/testexplorer.getpaidinbitcoin.com.au.conf

sudo nginx -t && sudo systemctl reload nginx

echo -e '#!/bin/bash\nnginx -t && systemctl reload nginx' | sudo tee /etc/letsencrypt/renewal-hooks/post/nginx-reload.sh
sudo chmod a+x /etc/letsencrypt/renewal-hooks/post/nginx-reload.sh

sudo nginx -t && sudo systemctl reload nginx
```

# Coverage
## Production
The production config covers the following urls: `api.getpaidinbitcoin.com.au`, `admin.getpaidinbitcoin.com.au`, and `explorer.getpaidinbitcoin.com.au`.
## Test
The test configuration covers the following urls:  `testapi.getpaidinbitcoin.com.au`, `testadmin.getpaidinbitcoin.com.au`, and `testexplorer.getpaidinbitcoin.com.au`.


