/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext, MyRetirement, MyRetirementRemote*/
Ext.define('MyRetirement.view.setup.Panel', {
	extend: 'MyRetirement.view.AppPanel'
	,xtype: 'setup-panel'
	,requires: [
		'MyRetirement.view.setup.MyInformationTable'
		,'MyRetirement.view.setup.AssumptionTable'
		,'MyRetirement.view.setup.ChartPanel'
		,'MyRetirement.view.LegendFooter'
	]
	,mixins: [
		'Jarvus.mixin.Formable'
	]

	,initComponent: function() {
		var me = this;

		me.backButton = !window.isStandardMR;

		me.callParent(arguments);
	}
	
	,chartType: 'setup-chartpanel'

	,items: [{
		cls: 'setup-myinformation'
		,title: 'My Information'
		,items: [{
			xtype: 'component'
			,autoEl: 'header'
			,cls: 'panel-body-header'
			,html: '<h1>My Information</h1>'
		},{
			xtype: 'setup-myinformationtable'
		}]
	},{
		cls: 'setup-assumptions'
		,title: 'Assumptions'
		,items: [{
			xtype: 'component'
			,autoEl: 'header'
			,cls: 'panel-body-header'
			,html: '<h1>Assumptions</h1>'
		},{
			xtype: 'setup-assumptiontable'
		}]
	}]
});