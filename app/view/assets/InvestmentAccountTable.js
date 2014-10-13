/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('MyRetirement.view.assets.InvestmentAccountTable', {
	extend: 'Jarvus.container.table.ListFieldTable'
	,xtype: 'assets-investmentaccounttable'
	,requires: [
		'MyRetirement.view.assets.InvestmentAccountSegment'
	]
	
	,store: 'asset.Investment'
	,headerRow: [
		{ colCls: 'name'						,title: 'Description' }
		,{ colCls: 'owner'               		,title: 'Owner' }
		,{ colCls: 'taxTypeCode'				,title: 'Tax Type' }
		,{ colCls: 'currentBalance'				,title: 'Current Balance' }
		,{ colCls: 'retirementAvailabilityRate'	,title: 'Percent Available', colSpan: 2 }
	]
	,recordRowType: 'assets-investmentaccountsegment'
});