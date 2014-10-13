/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('Jarvus.container.Raw', {
	extend: 'Ext.Container'
	,xtype: 'rawcontainer'
	,requires: [
		'Jarvus.layout.container.Raw'
	]

	,layout: 'raw'
});