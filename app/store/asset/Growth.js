/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('MyRetirement.store.asset.Growth', {
	extend: 'Ext.data.Store'

	,fields: [
		 { name: 'year',       type: 'integer' }
		,{ name: 'Retirement', type: 'integer' }
		,{ name: 'Investment', type: 'integer' }
	]
});