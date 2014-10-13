/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('Jarvus.field.Money', {
	extend: 'Jarvus.field.Float'
	,xtype: 'moneyfield'
	
	,componentCls: 'field-money'
	
	,readValue: function() {
		return this.callParent().replace(/[^\d.]/, '');
	}
	
	,renderValue: function(value) {
		return Ext.util.Format.usMoney(value);
	}
	
	,renderEditingValue: function(value) {
		return value*1;
	}
});