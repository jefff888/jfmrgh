/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('Jarvus.field.Money', {
	extend: 'Jarvus.field.Float'
	,xtype: 'moneyfield'
	,requires: [
		'Ext.util.Format'
	]
	
	,monitorChange: true
	,allowBlank: false
	,precision: 2
	,sign: '$'
	,inputPattern: false //'-?$?(\\.\\d+|[\\d,]+\\.?\\d*)'
	,componentCls: 'field-money'
	,maskRe: /[0-9$,.]/
	
	,transformRawValue: function(value) {
		return this.allowBlank && !value && value !== 0 ? '' : Ext.util.Format.currency(value, this.sign, this.precision);
	}
});