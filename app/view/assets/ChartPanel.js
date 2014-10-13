/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('MyRetirement.view.assets.ChartPanel', {
	extend: 'MyRetirement.view.ChartPanel'
	,xtype: 'assets-chartpanel'
	,requires: [
		'Jarvus.field.Select'
		,'MyRetirement.ChartThemes'
		,'MyRetirement.view.assets.GrowthChart'
		,'Ext.chart.series.Pie'
	]

	,items: [{
		xtype: 'button'
		,action: 'update'
		,text: 'Update Charts'
	},{
		xtype: 'chartcontainer'
		,itemId: 'assetComposition'
		,items: [{
			xtype: 'charttitle'
			,tpl: [
				'Asset Composition<BR>At Retirement'
				,'<tpl if="totalAssetsValueAtRet">'
					,'<div class="total">{totalAssetsValueAtRet:currency("$", 0)}</div>'
				,'<tpl else>'
					,'<div class="total">&mdash;</div>'
				,'</tpl>'
			]
			,data: {
				totalAssetsValueAtRet: null
			}
		},{	
			xtype: 'chart'
			,height: 200
	        ,animate: true
	        ,theme: 'MyRetirement'
	        ,shadow: false
	        ,series: [{
	            type: 'pie'
	            ,field: 'amount'
//	            ,highlight: true
				,tips: {
					trackMouse: true
					,cls: 'chart-tip'
					,tpl: '<h1>{name}</h1><span class="amount">{amount:currency("$",0)}</span>'
					,renderer: function(storeItem, item) {
						this.update(storeItem.getData());
						
						(this.el || this.protoEl).setStyle({ borderColor: item.sprite.fill });
					}
				}
	        }]
			,store: {
		        fields: ['name', { name: 'amount', type: 'integer' }]
		    }
		},{	
			xtype: 'chartlegend'
		},{
			xtype: 'selectfield'
			,monitorChange: true
			,selectCls: 'chart-switcher'
			,options: [
				 { label: 'By Ownership', value: 'assetValueAtRetByOwnership' }
				,{ label: 'By Tax Type', value: 'assetValueAtRetByTaxType' }
			]
		}]
	},{
		xtype: 'hrule'
	},{
		xtype: 'chartcontainer'
		,itemId: 'assetGrowth'
		,zoomable: {
			title: 'Asset Growth Until Retirement'
			,getWindowContainer: function(chartCt) {
				return chartCt.up('apppanel').down('#appPanelBody');
			}
			,xtype: 'assetgrowthchart'
		}
		,items: [{
			xtype: 'charttitle'
			,html: 'Asset Growth<br>Until Retirement'
		},{
			xtype: 'assetgrowthchart'
			,height: 200
			
			// abbreviated axes for small chart
			,axes: [{
				type: 'PriorityNumeric'
				,stepSizePriority: [17, 13, 11, 10, 9, 8, 7, 6, 5]
				,position: 'bottom'
				,fields: ['year']
				,label: {
					renderer: Ext.util.Format.numberRenderer('0')
				}
			}]
		},{
			xtype: 'chartlegend'
		}]
	}]
});