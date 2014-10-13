/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('Jarvus.container.table.Segment', {
	extend: 'Jarvus.container.Raw'
	,xtype: 'tablesegment'
	,requires: [
		'Jarvus.container.table.Row'
	]
	
	,autoEl: 'tbody'
	,defaultType: 'tablerow'
});