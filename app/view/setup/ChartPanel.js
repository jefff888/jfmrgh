/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('MyRetirement.view.setup.ChartPanel', {
	extend: 'MyRetirement.view.ChartPanel'
	,requires: [
		'MyRetirement.ChartThemes'
		,'MyRetirement.API'
		,'MyRetirement.view.setup.RetirementYearsChart'
		,'Ext.chart.series.Pie'
	]

	,xtype: 'setup-chartpanel'

	,items: [{
		xtype: 'button'
		,action: 'update'
		,text: 'Update Charts'
	},{
		xtype: 'chartcontainer'
		,itemId: 'retirementYearsCt'
		,chartSelector: 'retirementyearschart'
		,items: [{
			xtype: 'charttitle'
			,html: 'Retirement Years'
		},{
			xtype: 'retirementyearschart'
			,height: 120
			,store: {
				fields: ['name', 'currentAge', 'retirementAge', 'endAge']
			}
			,tips: {
				trackMouse: true
				,cls: 'chart-tip'
				,tpl: '<h1>{name}</h1><span class="retirement">{[Math.floor(values.endAge - values.retirementAge)]} years</span>'
				,renderer: function(storeItem, item) {
					this.update(storeItem.getData());
					(this.el || this.protoEl).setStyle({ borderColor: item.sprite.fill });
				}
			}
		},{
			xtype: 'chartlegend'
			,onChartRefresh: function(chart) {
				var series = [];
				
				chart.getStore().each(function(person, index) {
					series.push({
						label: person.get('name')
						,color: chart.barColors[index%chart.barColors.length]
						,value: person
					});
				});
				
				this.update({
					series: series
					,renderValue: function(person) {
						return Math.floor(person.get('retirementAge'))+'&ndash;'+person.get('endAge');
					}
				});
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
			,height: 200
			,animate: true
			,theme: 'MyRetirement'
			,shadow: false
			,store: {
		        fields: [
					 { name: 'name', type: 'string' }
					,{ name: 'amount', type: 'integer' }
		        ]
		    }
			,series: [{
				type: 'pie'
				,field: 'amount'
				,tips: {
					trackMouse: true
					,cls: 'chart-tip'
					,tpl: '<h1>{name}</h1><span class="amount">{amount}%</span>'
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
			
		},{
			xtype: 'chartlegend'
			,renderValue: function(value) {
				return value + '%';
			}
		}]
	}]
});