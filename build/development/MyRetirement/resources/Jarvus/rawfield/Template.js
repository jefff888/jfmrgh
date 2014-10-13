/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('Jarvus.field.Template', {
	extend: 'Ext.Component'
	,mixins: ['Jarvus.mixin.Fieldable']
	,xtype: 'templatefield'
	
	,tpl: '{value}'
	
	,updateValue: function(value) {
		this.update({
			value: value
		});
	}
});