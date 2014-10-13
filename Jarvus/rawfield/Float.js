/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('Jarvus.field.Float', {
	extend: 'Jarvus.field.Input'
	,xtype: 'floatfield'
	
	,componentCls: 'field-float'
	
	,initComponent: function() {
		
		Ext.applyIf(this.renderData, {
			inputCls: 'float'
			,inputPattern: '-?(\\.\\d+|\\d+\\.?\\d*)'
		});
		
		this.callParent(arguments);
	}
});