/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('MyRetirement.store.AbstractSeeded', {
	extend: 'Ext.data.Store'
	
	,setNames: []
	
	,onProxyLoad: function(operation) {
		var me = this
			,result = operation.response.result || {};
		
		me.valueSets = {};
		Ext.each(me.setNames, function(setName) {
			me.valueSets[setName] = result[setName] || {};
		});
		
		return this.callParent(arguments);
	}
	
	,getSet: function(setName) {
		return this.valueSets[setName];
	}
	
	,getSetValue: function(setName, value) {
		return this.getSet(setName)[value];
	}
});