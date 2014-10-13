/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('MyRetirement.store.Enumeration', {
	extend: 'Ext.data.Store'
	,requires: [
		'MyRetirement.model.Enumeration'
		,'Ext.data.proxy.Memory'
		,'Ext.data.reader.Json'
	]
	
	,model: 'MyRetirement.model.Enumeration'
	,sorters: [{
		property: 'sortOrder'
		,direction: 'ASC'
	}]
	,proxy: {
		type: 'memory'
		,reader: {
			type: 'json'
			,root: 'enumerations'
		}
	}
});