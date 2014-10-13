/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('MyRetirement.view.withdrawal.ChartPanel', {
	extend: 'MyRetirement.view.ChartPanel'
	,xtype: 'withdrawal-chartpanel'
	,requires: [
		'MyRetirement.ChartThemes'
		,'MyRetirement.API'
		,'Ext.chart.axis.Numeric'
		,'Ext.chart.series.Pie'
		,'Ext.chart.series.Column'
	]
	
	,items: [{
		xtype: 'chartcontainer'
		,itemId: 'averageIncome'
		,items: [{
			xtype: 'charttitle'
			,tpl: [
				'Average Monthly Income<br><span style="font-weight: normal;">After Tax, '
				,'Today\'s Dollars</span><div class="total">{totalIncome:currency("$", 0)}</div>'
			]
		},{	
			xtype: 'chart'
			,animate: true
			,theme: 'MyRetirement'
			,height: 200
			,shadow: false
			,axes: [{
	           type: 'Numeric'
	           ,position: 'left'
	           ,hidden: true
	        }]
			,series: [{
				type: 'column'
				,xField: 'name'
				,yField: ['Income', 'Assets']
				,axis: 'bottom'
				,stacked: true
//				,highlight: true
				,tips: {
					trackMouse: true
					,tpl: '<h1>{category}</h1><span>{amount:currency("$",0)}</span>'
					,cls: 'chart-tip'
					,renderer: function(storeItem, item) {
						this.update({
							category: item.yField
							,amount: item.value[1]
						});
						
						(this.el || this.protoEl).setStyle({ borderColor: item.sprite.fill });
					}
				}
			}]
			,store: {
		        fields: ['name', 'Assets', 'Income']
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
		,itemId: 'assetAllocation'
		,items: [{
			xtype: 'charttitle'
			,tpl: '{riskTolerance} Portfolio'
		},{
			xtype: 'chart'
	        ,animate: true
	        ,theme: 'MyRetirement'
	        ,height: 200
	        ,shadow: false
	        ,series: [{
	            type: 'pie'
	            ,field: 'amount'
//	            ,highlight: true
				,tips: {
					trackMouse: true
					,tpl: '<h1>{name}</h1><span>{amount}%</span>'
					,cls: 'chart-tip'
					,renderer: function(storeItem, item) {
						this.update(storeItem.getData());
						
						(this.el || this.protoEl).setStyle({ borderColor: item.sprite.fill });
					}
				}
		        //add renderers for custom colors	
				,getLegendColor: function(index) {
			        var me = this;
			        var store = me.chart.substore || me.chart.store;
			        var record = store.getAt(index);
			        return MyRetirement.API.getAssetColor(record.get('name'));
			    }
			    ,renderer: function(sprite, record, attr, index, store) {
			        var color = MyRetirement.API.getAssetColor(record.get('name'));
			        return Ext.apply(attr, {
			            fill: color
			        });
			    }
	        }]
			
			,store: {
		        fields: [
					 { name: 'name', type: 'string' }
					,{ name: 'amount', type: 'integer' }
		        ]
			}
		},{
			xtype: 'chartlegend'
			,renderValue: function(value) {
				return value + '%';
			}
		}]
	}]
});