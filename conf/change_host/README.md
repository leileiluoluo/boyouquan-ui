# Host Change Document

Based on CenOS 7

## Software installation

### Nginx

```shell
yum install nginx
systemctl start nginx
systemctl enable nginx
```

### MariaDB

```shell
sudo vi /etc/yum.repos.d/MariaDB.repo
```

```text
[mariadb]
name = MariaDB
baseurl = http://yum.mariadb.org/10.6/centos7-amd64
gpgkey=https://yum.mariadb.org/RPM-GPG-KEY-MariaDB
gpgcheck=1
```

```shell
yum install MariaDB-server MariaDB-client
systemctl start mariadb
systemctl enable mariadb
```

### Java

```shell
# https://bell-sw.com/pages/downloads/

cd /usr/local/
curl -O https://download.bell-sw.com/java/21.0.8+12/bellsoft-jdk21.0.8+12-linux-amd64.tar.gz
tar -zxvf bellsoft-jdk21.0.8+12-linux-amd64.tar.gz
```

```text
# edit /etc/profile
export JAVA_HOME=/usr/local/jdk-21.0.8
export PATH=$PATH:$JAVA_HOME/bin
```

## Nginx Config & Data Import & Images Migration

### Upload Cert and Config Nginx

```shell
cd usr/share/nginx/
mkdir cert
scp root@boyouquan.com:/usr/share/nginx/cert/boyouquan.com_bundle.crt .
scp root@boyouquan.com:/usr/share/nginx/cert/boyouquan.com.key .

cd /etc/nginx/conf.d/
scp root@boyouquan.com:/etc/nginx/conf.d/boyouquan.conf .

service nginx restart
```

### Data Import

```shell
# on old host
mysqldump --complete-insert -u root -p -t boyouquan > /tmp/boyouquan-20251011.sql
```

```sql
-- on new host
CREATE DATABASE `boyouquan` DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_general_ci;
GRANT ALL PRIVILEGES ON boyouquan.* TO 'root'@'localhost' IDENTIFIED BY 'your_password';
FLUSH PRIVILEGES;

use boyouquan;
-- https://github.com/leileiluoluo/boyouquan-api/tree/main/sql/ddl
-- create tables
```

```shell
# on new host
cd /tmp
scp root@boyouquan.com:/tmp/boyouquan-20251011.sql .
mysql -u root -p boyouquan < /tmp/boyouquan-20251011.sql
```

### Images Migration

```shell
# on old host
cd /usr/app
zip -r image-upload.zip image-upload/
zip -r post-images.zip post-images/
zip -r gravatar.zip gravatar/
```

```shell
# on new host
mkdir /usr/app/
cd /usr/app/

scp root@boyouquan.com:/usr/app/image-upload.zip .
scp root@boyouquan.com:/usr/app/post-images.zip .
scp root@boyouquan.com:/usr/app/gravatar.zip .

unzip image-upload.zip
unzip post-images.zip
unzip gravatar.zip
```

## Server Startup

```shell
mkdir -p /usr/app/old/
mkdir -p /usr/app/new/
```

Replace the HOST and PASSWORD in Repository secrets, and re-run the pipelines.

[UI](https://github.com/leileiluoluo/boyouquan-ui)
[API](https://github.com/leileiluoluo/boyouquan-api)

## DNS Config

Config DNS to the new host
