# Lightweight PHP CLI image to serve Adminer
FROM php:8.2-cli-alpine

# Install PDO MySQL extension so Adminer can connect to the mysql service
RUN docker-php-ext-install pdo pdo_mysql

WORKDIR /var/www/html

# Download the MySQL-only Adminer build so the login page never offers
# a PostgreSQL/other driver we haven't installed the PHP extension for
ADD https://www.adminer.org/latest-mysql-en.php /var/www/html/index.php

EXPOSE 8080

CMD ["php", "-S", "0.0.0.0:8080", "-t", "."]
