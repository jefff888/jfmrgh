/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('Jarvus.field.BigMoneyTemplate', {
	extend: 'Jarvus.field.Template'
	,xtype: 'bigmoneytemplatefield'
	
	,tpl: '{value:currency("$", 0)}'
});