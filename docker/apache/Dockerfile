# Use the official Apache base image
FROM httpd:2.4-alpine

RUN sed -i \
    # Enable vhosts
    -e 's/^#\(Include .*httpd-vhosts.conf\)/\1/' \
    # Allow proxying to PHP FPM
    -e 's/^#\(LoadModule .*mod_proxy.so\)/\1/' \
    -e 's/^#\(LoadModule .*mod_proxy_fcgi.so\)/\1/' \
    # Allow mod_rewrite (for .htaccess)
    -e 's/^#\(LoadModule .*mod_rewrite.so\)/\1/' \
    conf/httpd.conf

# Copy Apache configuration file
COPY httpd-vhosts.conf /usr/local/apache2/conf/extra/httpd-vhosts.conf

# Expose the ports Apache is listening on
EXPOSE 80

