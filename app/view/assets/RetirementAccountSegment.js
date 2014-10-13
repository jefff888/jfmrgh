/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('MyRetirement.view.assets.RetirementAccountSegment', {
	extend: 'Jarvus.container.table.Expando'
	,xtype: 'assets-retirementaccountsegment'
	,mixins: ['Jarvus.mixin.Formable']
	,requires: [
		'Jarvus.container.Raw'
		,'Jarvus.field.Input'
		,'Jarvus.field.BigMoney'
		,'Jarvus.field.Percent'
		,'Jarvus.table.ExpandCell'
		,'Jarvus.table.DeleteCell'
		,'MyRetirement.field.Enumeration'
		,'MyRetirement.field.InputIe'
		,'MyRetirement.field.RelativeDateForIe'
	]
	
	,primaryRow: [{
		xtype: 'tableexpandcell'
		,cls: 'col-expand'
	},{
		xtype: 'inputfield'
		,cls: 'col-name'
		,name: 'name'
	},{
		xtype: 'enumerationfield'
		,enumerationsStore: 'retirementAssetOwners'
		,cls: 'col-owner'
		,name: 'owner'
	},{
		xtype: 'enumerationfield'
		,enumerationsStore: 'retirementAssetTypes'
		,cls: 'col-type'
		,name: 'type'
	},{
		xtype: 'bigmoneyfield'
		,cls: 'col-currentBalance'
		,name: 'currentBalance'
		,monitorChange: 'live'	
	},{
		xtype: 'bigmoneyfield'
		,cls: 'col-annualContribution'
		,name: 'annualContribution'
		,monitorChange: 'live'	
	},{
		xtype: 'bigmoneyfield'
		,cls: 'col-employerContribution'
		,name: 'employerContribution'
		,monitorChange: 'live'	
	},{
		xtype: 'percentfield'
		,cls: 'col-contributionGrowthRate'
		,name: 'contributionGrowthRate'
		,monitorChange: 'live'		
	},{
		xtype: 'tabledeletecell'
		,cls: 'col-delete'
	}]
	
	
	,detailRow: {
		defaults: {
			xtype: 'rawcontainer'
			,autoEl: 'section'
		}
		,items: [{
			cls: 'begins'
			,items: [{
				xtype: 'relativedatefieldie'
				,baseName: 'contributionBegin'
				,monthsName: 'contributionMonthsUntilBegin'
				,yearsName: 'contributionYearsUntilBegin'
				,enumerationsStore: 'retirementAssetContributionBeginTypes'
				,setName: 'beginFixedValues'
				,label: 'Contributions Begin'	
				,relatedComponent: 'assets-retirementaccountsegment'
				,relatedField: 'owner'
			}]
		},{
			cls: 'ends'
			,items: [{
				xtype: 'relativedatefieldie'
				,baseName: 'contributionEnd'
				,monthsName: 'contributionDurationMonths'
				,yearsName: 'contributionDuration'
				,monthName: 'contributionMonthEnds'
				,yearName: 'contributionYearEnds'
				,enumerationsStore: 'retirementAssetContributionEndTypes'
				,setName: 'endFixedValues'				
				,label: 'Contributions End'
				,relatedComponent: 'assets-retirementaccountsegment'
				,relatedField: 'owner'
			}]
		}]
	}
});