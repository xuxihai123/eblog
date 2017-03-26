/**
 * Created by toor on 17-2-16.
 */
var userSql = {};
var postSql = {
	//添加文章
	save: "insert into wp_posts set ?",
	//删除文章或页面
	delete: "delete  from wp_posts where ID=?",
	//更新文章
	update: "update wp_posts set post_title = ?, post_content = ? where ID=?",
	//获取文章
	getById: "select * " +
	"from wp_posts as T1 " +
	"inner join wp_term_relationships as T2 on T1.ID=T2.object_id " +
	"inner join wp_term_taxonomy as T3 on T2.term_taxonomy_id=T3.term_taxonomy_id " +
	"inner join wp_terms as T4 on T3.term_id=T4.term_id " +
	"where ID=?",
	//获取页面
	getPageById: "select * " +
	"from wp_posts as T1 " +
	"where ID=?",
	//获取前一篇文章
	getPrev: "select * from wp_posts where ID<? and post_type=\'post\' and post_status=\'publish\' order by ID desc limit 1",
	//下一篇文章
	getNext: "select * from wp_posts where ID>? and post_type=\'post\' and post_status=\'publish\' order by ID  limit 1",
	//通过分类查找文章带分页
	findByCategoryPageModel: "select * " +
	"from wp_terms as T1,wp_term_relationships as T2,wp_posts as T3 " +
	"where T1.slug=? and T1.term_id=T2.term_taxonomy_id and T2.object_id=T3.ID and T3.post_status=\'publish\' " +
	"order by post_date desc",
	//获取所有文章，用于后台管理
	getPostPageModel: "select T1.ID,post_title,user_login,post_type,menu_order,comment_count,post_date " +
	"from wp_posts as T1 " +
	"left join wp_users as T2 on T1.post_author=T2.ID " +
	"where post_type='post' order by T1.post_date desc",
	//获取所有页面，用于后台管理
	getPagePageModel: "select T1.ID,post_title,user_login,post_type,menu_order,comment_count,post_date " +
	"from wp_posts as T1 " +
	"left join wp_users as T2 on T1.post_author=T2.ID " +
	"where post_type='page' order by T1.post_date desc",
	//获取最新的文章，带分页,降序，状态为已经发布
	findNewestListPageModel: 'select ID,comment_count, post_title,post_content,post_status,post_date ' +
	'from wp_posts  ' +
	'where post_type=\'post\'and  post_status=\'publish\' ' +
	'order by post_date desc',

	findPostByWordPageModel: 'select ID,comment_count, post_title,post_content,post_status,post_date ' +
	'from wp_posts  ' +
	'where post_type=\'post\'and  post_status=\'publish\' and post_title like ? ' +
	'order by post_date desc',
	//获取所有文章的归档，即年月集合
	findArticleArchive: 'select year(post_date) as year,month(post_date) as month,count(ID) as archive_count ' +
	'from wp_posts ' +
	'where post_type=\'post\' and post_status=\'publish\' ' +
	'group by year(post_date),month(post_date) ' +
	'order by year(post_date) desc,month(post_date)desc',
	//获取所有文章的归档，即年月集合
	findByYearMonthPageModel: 'select *  from wp_posts ' +
	'where year(post_date)=? and month(post_date)=? and post_type=\'post\' and post_status=\'publish\' ' +
	'order by post_date desc',
	//获取最新的6则文章(左侧最新文章显示)
	findNewestList: "select ID,comment_count, post_title,post_status,post_date " +
	"from wp_posts  " +
	"where post_type=\'post\' and post_status=\'publish\' " +
	"order by post_date desc limit 6",
	//获取最新的6则页面(左侧关于...)
	findNewestPage: "select ID, post_title,post_status,post_date from wp_posts  where post_type=\'page\' order by post_date desc limit 6"
};
var termSql = {
	//通过分类查找文章带分页
	findByTermPageModel: "select * " +
	"from wp_terms as T1,wp_term_relationships as T2,wp_posts as T3 " +
	"where T1.slug=? and T1.term_id=T2.term_taxonomy_id and T2.object_id=T3.ID and T3.post_status=\'publish\' " +
	"order by post_date desc",
	getAllCategory: "select * from wp_terms as T1,wp_term_taxonomy as T2 " +
	"where T1.term_id=T2.term_id and T2.taxonomy=\'category\'" +
	"order by T1.name",
	getAllTags: "select * from wp_terms as T1,wp_term_taxonomy as T2 " +
	"where T1.term_id=T2.term_id and T2.taxonomy='post_tag'" +
	"order by T1.name",
	getCategoryPage: "select * from wp_terms as T1,wp_term_taxonomy as T2 where T1.term_id=T2.term_id and T2.taxonomy='category'",
	getTagPage: "select * from wp_terms as T1,wp_term_taxonomy as T2 where T1.term_id=T2.term_id and T2.taxonomy=\'post_tag\'"
};
var termRelationshipSql={
	saveMulti: "insert into wp_term_relationships(object_id,term_taxonomy_id,term_order) VALUES ?"
};
module.exports = {
	userSql: userSql,
	postSql: postSql,
	termSql: termSql,
	termRelationshipSql:termRelationshipSql
};