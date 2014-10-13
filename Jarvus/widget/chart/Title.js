/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('Jarvus.widget.chart.Title', {
	extend: 'Ext.Component'
	,xtype: 'charttitle'
	
	,autoEl: 'h1'
	,componentCls: 'chart-title'
	
	,onChartRefresh: Ext.emptyFn
});