/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('Jarvus.field.Percent', {
	extend: 'Jarvus.field.Float'
	,xtype: 'percentfield'
	,requires: [
		'Ext.util.Format'
	]
	
	,monitorChange: true
	,allowBlank: false
	,precision: 2
	,inputPattern: false //'-?(\\.\\d+|\\d+\\.?\\d*)%?'
	,componentCls: 'field-percent'
	,maskRe: /[0-9%,.]/

	,rawToValue: function(rawValue) {
		return !rawValue && rawValue !== 0 ? null : this.capValue(rawValue/100);
	}
	
	,valueToRaw: function(value) {
		return !value && value !== 0 ? null : value*100;
	}
	
	,transformRawValue: function(value) {
		return this.allowBlank && !value && value !== 0 ? '' : Ext.util.Format.round(value||0, this.precision)+'%';
	}
});