/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('MyRetirement.view.setup.RetirementYearsChart', {
	extend: 'Ext.draw.Component'
	,xtype: 'retirementyearschart'
	,mixins: {
		bindable: 'Ext.util.Bindable'
		,tips: 'Ext.chart.Tip'
	}
	
	,chartMargin: 5
	,chartPadding: 5
	,extraYears: 5
	,axisFont: '12px Helvetica, sans-serif'
	,barColors: ['#61b70b', '#f2d407']
	,barHeight: 17
	
	,viewBox: false

	// template methods for component
	,initComponent: function() {
		var me = this;
		
		// call parent -- init items
		me.callParent();
		
		// bind store with Bindable mixin
		me.bindStore(me.store, true);
	}
	
	,onBoxReady: function() {
		var me = this;
		
		me.callParent();
		
		if(me.store.getCount())
		{
			me.renderChart();
		}
		
		// initialize tips mixin
		me.chart = me; // tips mixin needs this, thinks its part of a series
		me.mixins.tips.constructor.call(me, me);
	}
	
	// template methods for Ext.util.Bindable
	,getStoreListeners: function() {
		var me = this;
		return {
			refresh: me.renderChart
		};
	}
	
	// local methods
	,renderChart: function() {
		
		var me = this
			,store = me.getStore()
			,surface = me.surface
			,w = surface.width
			,h = surface.height
			,m = me.chartMargin
			,p = me.chartPadding
			,sprites = {}
			,startBBox, endBBox
			,currentYear = new Date().getFullYear()
			,maxSpan = 0
			,chartX, chartWidth, chartHeight, barOuterHeight, pixelsPerYear;
		
		// clear surface
		surface.removeAll(true);
		
		// loop through records to find largest years span, then add extraYears for padding
		store.each(function(person) {
			maxSpan = Math.max(maxSpan, person.get('endAge') - person.get('currentAge'));
		});
		
		maxSpan += me.extraYears;
		
		// draw text hidden first
		sprites.startText = surface.add({
			type: 'text'
			,text: currentYear
			,font: me.axisFont
			,opacity: 0
		}).show(true);
		
		sprites.endText = surface.add({
			type: 'text'
			,text: currentYear + maxSpan
			,font: me.axisFont
			,opacity: 0
		}).show(true);
		
		// measure text and calculate key chart metrics
		startBBox = sprites.startText.getBBox();
		endBBox = sprites.endText.getBBox();
		
		chartX = m+startBBox.width/2;
		chartWidth = w-chartX-m-endBBox.width/2;
		chartHeight = h-m-startBBox.height-m-p;
		barOuterHeight = chartHeight / store.getCount();
		pixelsPerYear = chartWidth / maxSpan;
		
		// position and show text
		sprites.startText.setAttributes({
			x: m
			,y: h-startBBox.height
			,opacity: 1
		}, true);
		
		sprites.endText.setAttributes({
			x: w-m-endBBox.width
			,y: h-startBBox.height
			,opacity: 1
		}, true);

		// draw boundary lines
		sprites.boundaries = surface.add({
			type: 'path'
			,path: [
				'M', chartX,m
				,'v', chartHeight
				,'M', w-m-endBBox.width/2,m
				,'v', chartHeight
			]
			,stroke: '#000'
		}).show(true);
		
		// draw retirement bars
		sprites.bars = [];
		store.each(function(person) {
			var chartItem = {
				storeItem: person
				,sprite: surface.add({
					type: 'rect'
					,width: pixelsPerYear * (person.get('endAge') - person.get('retirementAge'))
					,height: me.barHeight
					,fill: me.barColors[sprites.bars.length%me.barColors.length]
					,stroke: 'white'
					,'stroke-width': 2					
					,x: chartX + pixelsPerYear * (person.get('retirementAge') - person.get('currentAge'))
					,y: m + sprites.bars.length * barOuterHeight + (barOuterHeight - me.barHeight) / 2
					,group: 'bars'
				})
			};

			sprites.bars.push(chartItem.bar);
			chartItem.sprite.show(true).on({
				mouseover: function() {
					me.showTip(chartItem);
				}
				,mouseout: function() {
					me.hideTip(chartItem);
				}
			});
		});
		
		// finished
		me.sprites = sprites;
		me.fireEvent('refresh', me);
	}
});