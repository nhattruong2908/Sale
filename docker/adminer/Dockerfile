# Use official PHP image with FPM
FROM php:8.4-fpm-alpine

# Install required PHP extensions for Adminer and Apache
RUN apk --no-cache add postgresql-dev
RUN docker-php-ext-install pdo pdo_pgsql

# Set the working directory
WORKDIR /usr/local/apache2/htdocs/adminer

RUN mkdir -p /usr/local/apache2/htdocs/adminer

# Download Adminer PHP file
RUN curl -L -o /usr/local/apache2/htdocs/adminer/index.php https://www.adminer.org/latest.php
