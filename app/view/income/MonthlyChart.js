/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('MyRetirement.view.income.MonthlyChart', {
	extend: 'Ext.chart.Chart'
	,xtype: 'monthlyincomechart'
	,requires: [
		'MyRetirement.ChartThemes'
		,'Ext.util.Format'
		,'Jarvus.chart.axis.PriorityNumeric'
	]
	
	,store: 'income.Monthly'
	,animate: true
	,theme: 'MyRetirement'
	,shadow: false
	,series: [{
		type: 'column'
		,xField: 'year'
		,yField: ['Other', 'DBP', 'Government']
		,axis: 'bottom'
		,stacked: true
		,highlight: true
		,tips: {
			trackMouse: true
			,cls: 'chart-tip'
			,tpl: '<h1>{category} ({year})</h1><span class="amount">{amount:currency("$",0)}</span>'
			,renderer: function(storeItem, item) {
				this.update({
					category: item.yField
					,year: item.value[0]
					,amount: item.value[1]
				});
				
				(this.el || this.protoEl).setStyle({ borderColor: item.sprite.fill });
			}
		}
	}]
	
	,axes: [{
		type: 'PriorityNumeric'
		,stepSizePriority: [5, 4, 3, 2]
		,position: 'bottom'
		,fields: ['year']
		,label: {
			renderer: Ext.util.Format.numberRenderer('0')
		}
	},{
		type: 'Numeric'
		,position: 'left'
		,fields: ['Other', 'DBP', 'Government']
		,label: {
			renderer: function(v) {
				return Ext.util.Format.currency(v, '$', 0);
			}
		}
	}]
});
