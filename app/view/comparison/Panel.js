/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('MyRetirement.view.comparison.Panel', {
	extend: 'MyRetirement.view.AppPanel'
	,xtype: 'comparison-panel'
	,componentCls: 'comparison-panel' 
	,requires: [
		 'MyRetirement.view.comparison.Chart'
		,'MyRetirement.view.comparison.TakeHomeTable'
		,'MyRetirement.view.comparison.MyBudgetTable'
	]
	,mixins: [
		'Jarvus.mixin.Formable'
	]
	
	
	,doneButton: true
	
	,items: [{
		xtype: 'comparison-chart'
	},{
		xtype: 'legendfooter',
			cls:'comparisonChartLegend'
		
	},{
		xtype: 'container'
		,itemId: 'tableCt'
		,layout: 'card'
		,items: [{
			xtype: 'datapanel'
			,itemId: 'take-home-pay'
			,cls: 'take-home-pay'
			,title: 'Take Home Pay'
			,items: [{
				xtype: 'dataheader'
				,html: '<h1>Take Home Pay</h1>'
			},{
				xtype: 'comparison-takehometable'
			},{
				xtype: 'container'
				,cls: 'buttons-ct'
				,items: [{
					xtype: 'button'
					,action: 'update'
					,text: 'Update'
				}]
			}]
		},{
			xtype: 'datapanel'
			,itemId: 'my-budget'
			,cls: 'my-budget'
			,title: 'My Monthly Budget'
			,items: [{
				xtype: 'dataheader'
				,html: '<h1>My Monthly Budget</h1>'
			},{
				xtype: 'comparison-mybudgettable'
			},{
				xtype: 'container'
				,cls: 'buttons-ct'
				,items: [{
					xtype: 'button'
					,action: 'defaultEstimates'
					,text: 'Default Estimates'
				},{
					xtype: 'button'
					,action: 'update'
					,text: 'Update'
				}]
			}]
		}]
	}]
});