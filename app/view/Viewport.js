/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext, MyRetirement, MyRetirementRemote*/
Ext.define('MyRetirement.view.Viewport',{
	extend: 'Ext.Container'
	,xtype: 'myretirement-viewport'
	,requires: [
		'MyRetirement.VARS'
		,'MyRetirement.view.ModuleTools'
		,'MyRetirement.view.relius.ModuleToolsRelius'
	]
	
	,cls: 'viewport'
	,initComponent: function() {
		var me = this;

		me.items = [(MyRetirement.VARS.getIsStandardMR() ? {
			xtype: 'myretirement-moduletools'
		}:{
			xtype: 'myretirement-moduletools-relius'
			,width: '115px'
		}),{
			xtype: 'tabpanel'
			,activeTab: me.activeTab
			,itemId: 'primaryTabs'
			,cls: 'primary-tabs'
			,items: [(!MyRetirement.VARS.getIsStandardMR()
				          && MyRetirement.VARS.getDisclosureDisplayable() ? {
				title: 'Disclaimer'
				,xtype: 'disclaimer-tab'
				,itemId: 'disclaimer'
			} : null),(!MyRetirement.VARS.getIsStandardMR() ? {
				title: 'About You'
				,xtype: 'about-you-tab'
				,itemId: 'aboutYou'
			} : null),{
				title: 'Setup'
				,xtype: 'setup-panel'
				,itemId: 'setup'
			},{
				title: 'Income'
				,xtype: 'income-panel'
				,itemId: 'income'
			},{
				title: 'Assets'
				,xtype: 'assets-panel'
				,itemId: 'assets'
			},{
				title: 'Results'
				,xtype: 'withdrawal-panel'
				,itemId: 'withdrawal'
			}, {
				title: 'Comparison'
				,xtype: 'comparison-panel'
				,itemId: 'comparison'
            }, {
				title: 'What If'
				,xtype: 'whatif-panel-participant'
				,itemId: 'whatif'
			}]
		}];
		
		me.callParent(arguments);
	}
});