FROM php:8.2-fpm

WORKDIR /var/www

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    curl \
    nano \
    libonig-dev \
    libxml2-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install \
        pdo_mysql \
        mbstring \
        zip \
        bcmath \
        gd

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copy Laravel code (si tu veux build à partir du host)
COPY . .

# Permissions
RUN chown -R www-data:www-data /var/www && chmod -R 755 /var/www

# if needed - to ADD to readme troobleshooting section
#RUN chown -R www-data:www-data storage bootstrap/cache

# Expose port if needed
EXPOSE 9000

CMD ["php-fpm"]
