/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('Jarvus.field.Integer', {
	extend: 'Jarvus.field.Input'
	,xtype: 'integerfield'
	
	,componentCls: 'field-integer'
	
	,initComponent: function() {
		
		Ext.applyIf(this.renderData, {
			inputCls: 'integer'
			,inputPattern: '[0-9]+'
		});
		
		this.callParent(arguments);
	}
});