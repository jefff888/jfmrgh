/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext, MyRetirement, MyRetirementRemote*/
Ext.define('MyRetirement.model.Enumeration', {
	extend: 'Ext.data.Model'
	
	,idProperty: 'value'
	,fields: [
		{ name: 'label', type: 'string' }
		,{ name: 'sortOrder', type: 'integer' }
		,{ name: 'value', type: 'integer' }
	]
});