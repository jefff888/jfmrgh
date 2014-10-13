/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('MyRetirement.view.comparison.MyBudgetRow', {
	extend: 'Jarvus.container.table.Row'
	,xtype: 'comparison-mybudgetrow'
	,requires: [
		'Jarvus.field.Field'
		,'Jarvus.field.BigMoney'
		,'Jarvus.field.Percent'
		,'MyRetirement.field.PercentSlider'
	]
	,mixins: [
		'Jarvus.mixin.Formable'
	]
	
	,initComponent: function() {
		var me = this
			,budget = me.budget;
		
		me.items = [{
			xtype: 'templatefield'
			,autoEl: 'th'
			,cls: 'col-line-item'
			,name: 'name'
			,submitValue: false
		},{
			xtype: 'bigmoneyfield'
			,cls: 'col-now'
			,name: 'amountNow'
			,helpKey: 'amountNow.' + me.itemId
			,colGroup: 'now'
			,minValue: 0
			,maxValue: 99999999
			,monitorChange: 'live'	
		},{
			xtype: 'bigmoneyfield'
			,cls: 'col-retirement'
			,name: 'amountAtRetirement'
			,helpKey: 'amountAtRetirement.' + me.itemId
			,minValue: 0
			,maxValue: 99999999
			,monitorChange: 'live'	
		},{
			xtype: 'rawcontainer'
			,autoEl: 'td'
			,cls: 'col-needs'
			,items: [{
				xtype: 'percentslider'
				,submitValue: false
			}]
		},{
			xtype: 'percentfield'
			,cls: 'col-percent'
			,name: 'needRate'
			,helpKey: 'needRate.' + me.itemId
			,monitorChange: true
			,precision: 0
			,minValue: 0
			,maxValue: 1
			,monitorChange: 'live'
		}];
		
		me.callParent();
	}
});