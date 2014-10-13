/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('Jarvus.container.table.Row', {
	extend: 'Jarvus.container.Raw'
	,xtype: 'tablerow'
	
	,autoEl: 'tr'
	,defaults: {
		xtype: 'component'
		,autoEl: 'td'
	}
});