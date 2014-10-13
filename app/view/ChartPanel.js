/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('MyRetirement.view.ChartPanel', {
	extend: 'Ext.Panel'
	,xtype: 'chartpanel'
	,requires: [
		'Jarvus.widget.HorizontalRule'
		,'Jarvus.widget.chart.Container'
		,'Jarvus.widget.chart.Title'
		,'Jarvus.widget.chart.Legend'
	]

	,componentCls: 'chart-panel'
	,title: 'Charts'
	,width: 240
});