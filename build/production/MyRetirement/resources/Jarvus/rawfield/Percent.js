/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('Jarvus.field.Percent', {
	extend: 'Jarvus.field.Float'
	,xtype: 'percentfield'
	
	,componentCls: 'field-percent'

	,readValue: function() {
		return this.callParent().replace(/\D*([\d\.]+)\D*/, '$1')/100;
	}
	
	,renderValue: function(value) {
		return value*100+'%';
	}
	
	,renderEditingValue: function(value) {
		return value * 100;
	}
});