/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('Jarvus.field.Boolean', {
	extend: 'Jarvus.field.Input'
	,xtype: 'booleanfield'
	
	,componentCls: 'field-boolean'
	,renderTpl: '<input id="{id}-inputEl" type="checkbox">'
	
	,updateValue: function(value) {
		this.inputEl.dom.checked = !!value;
	}
});