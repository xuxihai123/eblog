"use strict";

module.exports = function (sequelize, DataTypes) {
	var Term = sequelize.define("Term",
		{
			term_id: {type: DataTypes.BIGINT(20).UNSIGNED, autoIncrement: true, primaryKey: true},
			name: {type: DataTypes.STRING(200), unique: false, allowNull: false, defaultValue: ''},
			slug: {type: DataTypes.STRING(200), unique: false, allowNull: false, defaultValue: ''},
			term_group: {type: DataTypes.BIGINT(10), allowNull: false, defaultValue: 0}
		},
		{
			tableName: 'wp_terms',
			indexes:[
				{
					unique: false,
					name:'slug',
					fields: ['slug']
				},
				{
					unique: false,
					name:'name',
					fields: ['name']
				}
			],
			timestamps: false,
			classMethods: {
				associate: function (models) {
					Term.hasOne(models.TermTaxonomy, {
						as: "termTaxonomy",
						foreignKey: "term_id"
					});
				}
			},
			getterMethods: {
				taxonomy: function () {
					return this.termTaxonomy && this.termTaxonomy.taxonomy;
				},
				description: function () {
					return this.termTaxonomy && this.termTaxonomy.description;
				},
				parent: function () {
					return this.termTaxonomy && this.termTaxonomy.description;
				},
				count: function () {
					return this.termTaxonomy && this.termTaxonomy.count;
				}
			},
			scopes: {
				incTable: function (model, taxonomy) {
					return {
						include: [
							{
								model: model,
								as: "termTaxonomy",
								where: {
									taxonomy: {
										$eq: taxonomy
									}
								}
							}
						]
					}
				}
			}
		});

	return Term;
};