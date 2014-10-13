/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('Jarvus.field.Template', {
	extend: 'Jarvus.field.Field'
	,xtype: 'templatefield'
	
	,tpl: '{value}'
	
	// field template methods	
	,onChange: function(value) {
		this.update({
			value: value
		});
	}
});