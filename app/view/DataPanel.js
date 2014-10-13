/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext, MyRetirement, MyRetirementRemote*/
Ext.define('MyRetirement.view.DataPanel', {
	extend: 'Ext.panel.Panel'
	,xtype: 'datapanel'
	,requires: [
		'Jarvus.layout.container.Raw'
	]

	,layout: 'raw'
	
	,componentCls: 'data-panel'
	,bodyCls: 'data-panel-body'
});