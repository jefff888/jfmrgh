/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('MyRetirement.view.assets.GrowthChart', {
	extend: 'Ext.chart.Chart'
	,xtype: 'assetgrowthchart'
	,requires: [
		'MyRetirement.ChartThemes'
		,'Ext.util.Format'
		,'Jarvus.chart.axis.PriorityNumeric'
	]
	
	,store: 'asset.Growth'
	,animate: true
	,theme: 'MyRetirement'
	,shadow: false
	,series: [{
		type: 'column'
		,xField: 'year'
		,yField: ['Retirement', 'Investment']
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
		,fields: ['Retirement', 'Investment']
		,label: {
			renderer: function(v) {
				return Ext.util.Format.currency(v, '$', 0);
			}
		}
	}]
});
