/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('MyRetirement.view.income.ChartPanel', {
	extend: 'MyRetirement.view.ChartPanel'
	,xtype: 'income-chartpanel'
	,requires: [
		'MyRetirement.ChartThemes'
		,'MyRetirement.view.income.MonthlyChart'
		,'Ext.chart.series.Column'
	]
	,items: [{
		xtype: 'button'
		,action: 'update'
		,text: 'Update Charts'
	},{
		xtype: 'chartcontainer'
		,itemId: 'averageIncome'
		,items: [{
			xtype: 'charttitle'
			,tpl: [
				'Average Monthly Income<BR><span style="font-weight: normal;"> After Tax, Today\'s Dollars</span>'
				,'<tpl if="totalIncomeSourcesAvgMonthlyAmount">'
					,'<div class="total">{totalIncomeSourcesAvgMonthlyAmount:currency("$", 0)}</div>'
				,'<tpl else>'
					,'<div class="total">&mdash;</div>'
				,'</tpl>'
			]
			,data: {
				totalIncomeSourcesAvgMonthlyAmount: null
			}
		},{
			xtype: 'chart'
			,animate: true
			,height: 200
			,theme: 'MyRetirement'
			,shadow: false
			,series: [{
				type: 'column'
				,xField: 'name'
				,yField: ['Other', 'Pensions/Annuities', 'Social Security']
				,axis: 'bottom'
				,stacked: true
//				,highlight: true
				,tips: {
					trackMouse: true
					,cls: 'chart-tip'
					,tpl: '<h1>{category}</h1><span class="amount">{amount:currency("$",0)}</span>'
					,renderer: function(storeItem, item) {
						this.update({
							category: item.yField
							,amount: item.value[1]
						});
						
						(this.el || this.protoEl).setStyle({ borderColor: item.sprite.fill });
					}
				}
			}]
//				,axes: []
			,store: {
		        fields: ['name', 'Social Security', 'Pensions/Annuities', 'Other']
		    }
		},{
			xtype: 'chartlegend'
			,getSeriesItemValue: function(series, index) {
				// use value of first column
				return series.items[index].storeItem.get(series.yField[index]);
			}
		}]
	},{
		xtype: 'hrule'
	},{
		xtype: 'chartcontainer'
		,itemId: 'monthlyIncome'
		,zoomable: {
			title: "Income During Retirement After Taxes"
			,getWindowContainer: function(chartCt) {
				return chartCt.up('apppanel').down('#appPanelBody');
			}
			,xtype: 'monthlyincomechart'
		}
		,items: [{
			xtype: 'charttitle'
			,html: "Income<br>During Retirement<br>After Taxes"
		},{
			xtype: 'monthlyincomechart'
			,height: 200
			,axes: [] // no axes for small chart
		}]
	}]
});