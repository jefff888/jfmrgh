/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('MyRetirement.view.assets.InvestmentAccountSegment', {
	extend: 'Jarvus.container.table.Segment'
	,xtype: 'assets-investmentaccountsegment'
	,mixins: ['Jarvus.mixin.Formable']
	,requires: [
		'Jarvus.container.Raw'
		,'Jarvus.field.Input'
		,'Jarvus.field.BigMoney'
		,'Jarvus.field.Percent'
		,'Jarvus.table.ExpandCell'
		,'Jarvus.table.DeleteCell'
		,'MyRetirement.field.Enumeration'
	]
	
	,items: [{
		items: [{
			xtype: 'inputfield'
			,cls: 'col-name'
			,name: 'name'
		},{
			xtype: 'enumerationfield'
			,enumerationsStore: 'investmentAssetOwners'
			,cls: 'col-owner'
			,name: 'owner'
		},{
			xtype: 'enumerationfield'
			,enumerationsStore: 'investmentAssetTaxTypeCodes'
			,cls: 'col-taxTypeCode'
			,name: 'taxTypeCode'
		},{
			xtype: 'bigmoneyfield'
			,cls: 'col-currentBalance'
			,name: 'currentBalance'
			,monitorChange: 'live'		
		},{
			xtype: 'percentfield'
			,cls: 'col-retirementAvailabilityRate'
			,name: 'retirementAvailabilityRate'
			,monitorChange: 'live'	
		},{
			xtype: 'tabledeletecell'
			,cls: 'col-delete'
		}]
	}]
});