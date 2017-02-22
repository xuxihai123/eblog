MySQL [wp_blog2]> MySQL [wp_blog2]> select * from wp_terms,wp_term_taxonomy where wp_terms.term_id=wp_term_taxonomy.term_id;
+---------+------------------------------+--------------------------------------------+------------+------------------+---------+----------+----------------------+--------+-------+
| term_id | name                         | slug                                       | term_group | term_taxonomy_id | term_id | taxonomy | description          | parent | count |
+---------+------------------------------+--------------------------------------------+------------+------------------+---------+----------+----------------------+--------+-------+
|       1 | 未分类                       | uncategorized                              |          0 |                1 |       1 | category |                      |      0 |     2 |
|       2 | android混合开发 jsbridge     | androidhtml5                               |          0 |                2 |       2 | category |                      |      9 |     1 |
|       3 | js                           | js                                         |          0 |                3 |       3 | category |                      |      0 |     1 |
|       4 | centos 内核 参数             | centos%e5%86%85%e6%a0%b8%e5%8f%82%e6%95%b0 |          0 |                4 |       4 | category | centos 内核 参数     |      0 |     1 |
|       5 | linux                        | linux                                      |          0 |                5 |       5 | category |                      |      0 |     3 |
|       6 | mysql                        | mysql                                      |          0 |                6 |       6 | category |                      |      0 |     2 |
|       7 | ubuntu man                   | ubuntuman                                  |          0 |                7 |       7 | category |                      |      5 |     1 |
|       8 | hibernate                    | hibernate                                  |          0 |                8 |       8 | category |                      |      9 |     1 |
|       9 | java                         | java                                       |          0 |                9 |       9 | category |                      |      0 |     6 |
|      10 | 数据库                       | %e6%95%b0%e6%8d%ae%e5%ba%93                |          0 |               10 |      10 | category |                      |      0 |     1 |
|      11 | interceptor                  | interceptor                                |          0 |               11 |      11 | category |                      |      9 |     1 |
|      12 | struts2                      | struts2                                    |          0 |               12 |      12 | category |                      |      9 |     3 |
|      13 | filter                       | filter                                     |          0 |               13 |      13 | category |                      |      0 |     1 |
|      14 | web.xml                      | web-xml                                    |          0 |               14 |      14 | category |                      |      0 |     1 |
|      15 | javascript                   | javascript                                 |          0 |               15 |      15 | category |                      |      0 |     0 |
|      16 | perl                         | perl                                       |          0 |               16 |      16 | category |                      |      0 |     0 |
|      17 | HTML5                        | html5                                      |          0 |               17 |      17 | category |                      |      0 |     0 |
+---------+------------------------------+--------------------------------------------+------------+------------------+---------+----------+----------------------+--------+-------+
17 rows in set (0.00 sec) 所有目录及对应的文章数 wp_terms->wp_term_taxonomy

MySQL [wp_blog2]> select ID,post_title,term_taxonomy_id from wp_posts as T1,wp_term_relationships as T2 where T1.ID=T2.object_id;
+----+---------------------------------------------------------------------------------------------------------------------------------------+------------------+
| ID | post_title                                                                                                                            | term_taxonomy_id |
+----+---------------------------------------------------------------------------------------------------------------------------------------+------------------+
|  1 | 世界，您好！                                                                                                                          |                1 |
| 12 | Hello world!                                                                                                                          |                1 |
| 45 | testMarkdown                                                                                                                          |                1 |
| 60 |                                                                                                                                       |                1 |
| 69 |                                                                                                                                       |                1 |
| 73 | 111                                                                                                                                   |                1 |
| 75 | xxx                                                                                                                                   |                1 |
| 84 | wordpress fix1                                                                                                                        |                1 |
| 86 | wordpress fix2                                                                                                                        |                1 |
| 21 | 基于android混合开发的JsBridge技术学习                                                                                                 |                2 |
| 21 | 基于android混合开发的JsBridge技术学习                                                                                                 |                3 |
| 23 | 使用centos引导内核错误：kernel: pnp 00:0b: can't evaluate _CRS: 8                                                                     |                4 |
| 17 | 各系统下设置输入法按键为ctrl+shift+space                                                                                              |                5 |
| 19 | Centos安装gnome主菜单编辑器无                                                                                                         |                5 |
| 25 | mysql的错误：The server quit without updating PID file  /usr/local/mysql/data/door.pid).                                              |                5 |
| 25 | mysql的错误：The server quit without updating PID file  /usr/local/mysql/data/door.pid).                                              |                6 |
| 39 | Hibernate学习笔记--环境搭建及运行                                                                                                     |                6 |
| 27 | 关于新的man版本出现“无法解析 /usr/share/man/zh_CN/man1/ls.1.gz: 没有那个文件或目录“                                                   |                7 |
| 39 | Hibernate学习笔记--环境搭建及运行                                                                                                     |                8 |
| 33 | but has failed to stop it. This is very likely to create a memory leak(c3p0在Spring管理中，连接未关闭导致的内存溢出)                  |                9 |
| 35 | 个人学习笔记--MyBatis官方推荐DAO开发方案                                                                                              |                9 |
| 37 | 个人学习笔记--MyBatis-的搭建及第一个程序                                                                                              |                9 |
| 39 | Hibernate学习笔记--环境搭建及运行                                                                                                     |                9 |
| 41 | 个人笔记--struts2对Action的权限拦截                                                                                                   |                9 |
| 43 | 个人笔记--Servlet之过滤器实现权限拦截                                                                                                 |                9 |
| 39 | Hibernate学习笔记--环境搭建及运行                                                                                                     |               10 |
| 41 | 个人笔记--struts2对Action的权限拦截                                                                                                   |               11 |
| 29 | 使用struts2标签                                                                                                                       |               12 |
| 31 | 关于Action中ValidateXXX方法校验一次失败后导致以后一直返回input视图的情况                                                              |               12 |
| 41 | 个人笔记--struts2对Action的权限拦截                                                                                                   |               12 |
| 43 | 个人笔记--Servlet之过滤器实现权限拦截                                                                                                 |               13 |
| 43 | 个人笔记--Servlet之过滤器实现权限拦截                                                                                                 |               14 |
+----+---------------------------------------------------------------------------------------------------------------------------------------+------------------+
32 rows in set (0.00 sec)
select T1.ID,T2.*,T3.*,T4.* from wp_posts as T1,wp_term_relationships as T2,wp_term_taxonomy as T3,wp_terms as T4 where ID=110 and T1.ID=T2.object_id and T2.term_taxonomy_id=T3.term_taxonomy_id and T3.term_id=T4.term_id;
//最近文章
MySQL [wp_blog]> select  post_title,post_status,post_date from wp_posts  where post_status='publish' order by post_date desc limit 6;
+------------------------------------------------------+-------------+---------------------+
| post_title                                           | post_status | post_date           |
+------------------------------------------------------+-------------+---------------------+
| fffff                                                | publish     | 2016-10-24 12:00:08 |
| wordpress fix2                                       | publish     | 2016-10-19 14:11:45 |
| wordpress fix1                                       | publish     | 2016-10-19 14:06:31 |
| 示例页面                                             | publish     | 2016-06-24 23:32:33 |
| 各系统下设置输入法按键为ctrl+shift+space             | publish     | 2015-10-27 22:15:00 |
| Centos安装gnome主菜单编辑器无                        | publish     | 2015-10-26 23:27:00 |
+------------------------------------------------------+-------------+---------------------+
6 rows in set (0.00 sec)

//文章归档
MySQL [wp_blog]> select year(post_date),month(post_date),count(ID) from wp_posts group by year(post_date),month(post_date) order by year(post_date) desc,month(post_date)desc;
+-----------------+------------------+-----------+
| year(post_date) | month(post_date) | count(ID) |
+-----------------+------------------+-----------+
|            2016 |               10 |        28 |
|            2016 |                6 |         2 |
|            2015 |               10 |         3 |
|            2015 |                7 |         2 |
|            2015 |                6 |         1 |
|            2015 |                4 |         1 |
|            2014 |               12 |         4 |
|            2014 |               11 |         3 |
+-----------------+------------------+-----------+
8 rows in set (0.00 sec)
//查询指定分类下的文章
MySQL [wp_blog]> select * from wp_terms as T1,wp_term_relationships as T2 where T1.slug='java' and T1.term_id=T2.term_taxonomy_id;
select * from wp_terms as T1,wp_term_relationships as T2,wp_posts as T3 where T1.slug='linux' and T1.term_id=T2.term_taxonomy_id and T2.object_id=T3.ID
+---------+------+------+------------+-----------+------------------+------------+
| term_id | name | slug | term_group | object_id | term_taxonomy_id | term_order |
+---------+------+------+------------+-----------+------------------+------------+
|       9 | java | java |          0 |        33 |                9 |          0 |
|       9 | java | java |          0 |        35 |                9 |          0 |
|       9 | java | java |          0 |        37 |                9 |          0 |
|       9 | java | java |          0 |        39 |                9 |          0 |
|       9 | java | java |          0 |        41 |                9 |          0 |
|       9 | java | java |          0 |        43 |                9 |          0 |
+---------+------+------+------------+-----------+------------------+------------+
6 rows in set (0.00 sec)

