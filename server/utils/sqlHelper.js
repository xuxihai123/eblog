var mysql = require('mysql');
var Q = require('q');
exports.query = function () {
	console.info("sql query " + arguments[0]);
	var params = Array.prototype.slice.call(arguments, 0);

	var deferred = Q.defer();
	params.push(function (err) {
		var args = Array.prototype.slice.call(arguments, 1);
		if (err) {
			console.log(err.stack);
			deferred.reject(err);
		}
		deferred.resolve.apply(this, args);
	});
	process.dbpool.query.apply(process.dbpool, params);

	return deferred.promise;
};
exports.transationQuery=function (sqlObjects,callback) {
	pool.getConnection(function(err, connection) {
		if (err) {
			return callback(err,null);
		}
		connection.beginTransaction(function(err) {
		  if (err) {
			  return callback(err,null);
		  }
			console.log("开始执行transaction，共执行" + sqlparamsEntities.length + "条数据");
			var promises=[];
			sqlObjects.forEach(function (sqlObj) {
				var temp =function (cb) {
					var sql = sqlObj.sql,
					params=sqlObj.params;
					var defered=Q.defer();
					connection.query(sql,params,function (err,rows,fields) {
						if(err){
								 defered.reject(err);
						}else{
							defered.resolve(rows);
						}
					});
					return defered.promise;
				}

				promises.push(temp);
			});
			Q.all(promises,function (err,result) {
				if(err){
					connection.rollback(function (err) {
						  console.log("transaction error: " + err);
						  connection.release();
						  return callback(err, null);
					  });
				}else{
					connection.commit(function (err,info) {
						if(err){
							console.log("执行事务失败，" + err);
							connection.rollback(function (err) {
								console.log("transaction error: " + err);
								connection.release();
								return callback(err, null);
							});
						}else{
							connection.release();
							return callback(null,info);
						}
					})
				}
			})

		});
	});

}
exports.escape = mysql.escape;
exports.escapeId = mysql.escapeId;
exports.format = mysql.format;
