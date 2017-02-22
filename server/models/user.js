"use strict";
//Sequelize.STRING                      // VARCHAR(255)
//Sequelize.STRING(1234)                // VARCHAR(1234)
//Sequelize.STRING.BINARY               // VARCHAR BINARY
//Sequelize.TEXT                        // TEXT
//
//Sequelize.INTEGER                     // INTEGER
//Sequelize.BIGINT                      // BIGINT
//Sequelize.BIGINT(11)                  // BIGINT(11)
//Sequelize.FLOAT                       // FLOAT
//Sequelize.FLOAT(11)                   // FLOAT(11)
//Sequelize.FLOAT(11, 12)               // FLOAT(11,12)
//
//Sequelize.DECIMAL                     // DECIMAL
//Sequelize.DECIMAL(10, 2)              // DECIMAL(10,2)
//
//Sequelize.DATE                        // DATETIME for mysql / sqlite, TIMESTAMP WITH TIME ZONE for postgres
//Sequelize.BOOLEAN                     // TINYINT(1)
//
//Sequelize.ENUM('value 1', 'value 2')  // An ENUM with allowed values 'value 1' and 'value 2'
//Sequelize.ARRAY(Sequelize.TEXT)       // Defines an array. PostgreSQL only.
//
//Sequelize.BLOB                        // BLOB (bytea for PostgreSQL)
//Sequelize.BLOB('tiny')                // TINYBLOB (bytea for PostgreSQL. Other options are medium and long)
//Sequelize.UUID                        // UUID datatype for PostgreSQL and SQLite, CHAR(36) BINARY for MySQL (use defaultValue: Sequelize.UUIDV1 or Sequelize.UUIDV4 to make sequelize generate the ids automatically)
//+---------------------+---------------------+------+-----+---------------------+----------------+
//| Field               | Type                | Null | Key | Default             | Extra          |
//+---------------------+---------------------+------+-----+---------------------+----------------+
//| ID                  | bigint(20) unsigned | NO   | PRI | NULL                | auto_increment |
//| user_login          | varchar(60)         | NO   | MUL |                     |                |
//| user_pass           | varchar(255)        | NO   |     |                     |                |
//| user_nicename       | varchar(50)         | NO   | MUL |                     |                |
//| user_email          | varchar(100)        | NO   | MUL |                     |                |
//| user_url            | varchar(100)        | NO   |     |                     |                |
//| user_registered     | datetime            | NO   |     | 0000-00-00 00:00:00 |                |
//| user_activation_key | varchar(255)        | NO   |     |                     |                |
//| user_status         | int(11)             | NO   |     | 0                   |                |
//| display_name        | varchar(250)        | NO   |     |                     |                |
module.exports = function (sequelize, DataTypes) {
	var User = sequelize.define("users", {
		ID: {type: DataTypes.BIGINT(20), autoIncrement: true, primaryKey: true},
		user_login: {type:DataTypes.STRING(60),allowNull:false},
		user_pass: {type:DataTypes.STRING(255),allowNull:false},
		display_name: DataTypes.STRING(255),
		user_nicename: DataTypes.STRING(50),
		user_email: DataTypes.STRING(100),
		user_url: DataTypes.STRING(100),
		user_registered: DataTypes.DATE,
		user_activation_key: DataTypes.STRING(255),
		user_status: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0}
	});

	return User;
};