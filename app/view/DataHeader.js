/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext, MyRetirement, MyRetirementRemote*/
Ext.define('MyRetirement.view.DataHeader', {
	extend: 'Ext.Component'
	,xtype: 'dataheader'
	,mixins: [
		'Jarvus.mixin.LinkEvents'
		,'Jarvus.mixin.DataApplicator'
	]
	
	,autoEl: 'header'
	,cls: 'panel-body-header'
	
	,initEvents: function() {
		var me = this;
		me.callParent();
		me.initLinkEvents();
	}
});