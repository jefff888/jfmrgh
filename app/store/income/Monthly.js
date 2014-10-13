/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('MyRetirement.store.income.Monthly', {
	extend: 'Ext.data.Store'

	,fields: [
		 { name: 'year',		type: 'integer' }
		,{ name: 'DBP',			type: 'integer' }
		,{ name: 'Government',	type: 'integer' }
		,{ name: 'Other',		type: 'integer' }
	]
});