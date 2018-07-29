create database blog_dev;
use blog_dev;
source blog_dev.sql;

create user 'blog_dev'@'localhost' identified by 'blog_dev';
grant all privileges on blog_dev.* to 'blog_dev'@'localhost';
flush privileges;