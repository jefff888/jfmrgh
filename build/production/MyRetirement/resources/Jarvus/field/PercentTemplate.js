/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('Jarvus.field.PercentTemplate', {
	extend: 'Jarvus.field.Template'
	,xtype: 'percenttemplatefield'
	
	,tpl: '{[fm.round(values.value*100, 2)]}%'
});