# blog ...http://www.xuxihai.top

### 运行环境
- mysql
- nodejs

### 备份database
```sh
mysqldump -u root -p  blog_dev >/tmp/blog_dev.sql
```
### 恢复database

1.create database
```mysql
create database
```
2.restore database
```sh
mysql -u root -p blog_dev </tmp/blog_dev.sql
```

### 使用指定用户管理blog_dev库

```mysql
CREATE USER 'blog_user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON blog_dev.* To 'blog_user'@'localhost';
FLUSH PRIVILEGES;
```


### tips

#### 忽略关联关系检查
```mysql
SET FOREIGN_KEY_CHECKS = 0;
```

#### mysql远程访问控制

```mysql
select host,user,password from mysql.user;
update mysql.user set host = '%' where mysql.user = 'root';
```