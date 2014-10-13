/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('MyRetirement.view.assets.RetirementAccountTable', {
	extend: 'Jarvus.container.table.ListFieldTable'
	,xtype: 'assets-retirementaccounttable'
	,requires: [
		'MyRetirement.view.assets.RetirementAccountSegment'
	]
	
	,cls: 'tight-spacing'
	
	,store: 'asset.Retirement'
	,headerRow: {
		xtype: 'tableheader'
		,columns: [
			 { colCls: 'expander'               ,title: '&nbsp;' }
			,{ colCls: 'name'                   ,title: 'Description' }
			,{ colCls: 'owner'                  ,title: 'Owner' }
			,{ colCls: 'type'                   ,title: 'Plan Type' }
			,{ colCls: 'currentBalance'         ,title: 'Current Balance' }
			,{ colCls: 'annualContribution'     ,title: 'Personal Contributions' }
			,{ colCls: 'employerContribution'   ,title: 'Employer Contributions'}
			,{ colCls: 'contributionGrowthRate'	,title: 'Contribution Increase Rate', colSpan: 2}
//			,{ colCls: ''                       ,title: '&nbsp;' }
		]
/*
		,superHeader: [
			 '<th colspan=5>&nbsp;</th>'
			,'<th colspan=2>Annual Contributions</th>'
			,'<th colspan=2>&nbsp;</th>'
		]
*/
	}
	,recordRowType: 'assets-retirementaccountsegment'
});