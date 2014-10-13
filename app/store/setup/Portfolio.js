/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('MyRetirement.store.setup.Portfolio', {
	extend: 'Ext.data.Store'
	,requires: [
		'MyRetirement.model.income.Retirement'
		,'MyRetirement.proxy.Direct'
	]
	
//	,model: 'MyRetirement.model.setup.Portfolio'
	,model: 'MyRetirement.model.income.Retirement'
});