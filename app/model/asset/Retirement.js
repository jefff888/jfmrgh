/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext, MyRetirement, MyRetirementRemote*/
Ext.define('MyRetirement.model.asset.Retirement', {
	extend: 'Ext.data.Model'
	,requires: [
		'Jarvus.validation.Number'
		,'MyRetirement.validation.Enumeration'
	]

	,fields: [
		{ name: 'id'							,type: 'string' }
		,{ name: 'annualContribution'			,type: 'float' }
		,{ name: 'contributionBeginType'		,type: 'integer' , defaultValue: 2 }
		,{ name: 'contributionBeginMonth'		,type: 'integer' , defaultValue: 1 }
		,{ name: 'contributionBeginYear'		,type: 'integer' , defaultValue: 2012 }
		,{ name: 'contributionEndType'			,type: 'integer' , defaultValue: 10 }
		,{ name: 'contributionDuration'			,type: 'integer' }
		,{ name: 'contributionDurationMonths'	,type: 'integer' }
		,{ name: 'contributionMonthEnds'		,type: 'integer' , defaultValue: 1 }
		,{ name: 'contributionMonthsUntilBegin'	,type: 'integer' }
		,{ name: 'contributionYearEnds'			,type: 'integer' , defaultValue: 2015}
		,{ name: 'contributionYearsUntilBegin'	,type: 'integer' }
		,{ name: 'contributionGrowthRate'		,type: 'float' }
		,{ name: 'currentBalance'				,type: 'float' }
		,{ name: 'employerContribution'			,type: 'integer' }
		,{ name: 'name'							,type: 'string' }
		,{ name: 'owner'						,type: 'integer' , defaultValue: 1 }
		,{ name: 'type'							,type: 'integer' }
	]
	,validations: [
		//{ field: 'name'							,type: 'presence', message: 'Description required' }
		{ field: 'owner'						,type: 'enumeration', store: 'retirementAssetOwners' }
		,{ field: 'type'						,type: 'enumeration', store: 'retirementAssetTypes' }
		,{ field: 'currentBalance'				,type: 'wsfpFloatRange', min: 0, max: 99999999, validfn: 'RetirementAsset.currentBalance', messageX: 'Current balance must be between  0- 99,999,999. ' }	
		,{ field: 'annualContribution'			,type: 'wsfpFloatRange', min: 0, max: 99999999, validfn: 'RetirementAsset.annualContribution', messageX: 'Personal contribution amounts must be between  0- 99,999,999. ' }	
		,{ field: 'employerContribution'		,type: 'wsfpFloatRange', min: 0, max: 99999999, validfn: 'RetirementAsset.employerContribution', messageX: 'Employer contribution amounts must be between  0- 99,999,999. ' }	
		,{ field: 'contributionGrowthRate'		,type: 'wsfpFloatRange', min: 0, max: 1, validfn: 'RetirementAsset.contributionGrowthRate', messageX: 'Contribution Increase Rate must be between 0-100%.' }
		,{ field: 'contributionBeginType'		,type: 'enumeration', store: 'retirementAssetContributionBeginTypes' }
		,{ field: 'contributionBeginMonth'		,type: 'wsfpIntValues', checkIf: {contributionBeginType: 0}, min: 1, max: 12, validfn: 'RetirementAsset.contributionBeginMonth', message: 'Month may be 1-12' }
		,{ field: 'contributionBeginYear'		,type: 'wsfpIntegerRange', checkIf: {contributionBeginType: 0}, min: 2000, max: 2100, validfn: 'RetirementAsset.contributionBeginYear', messageX: 'Year must be 2000-2100' }
		,{ field: 'contributionYearsUntilBegin'	,type: 'wsfpIntegerRange', checkIf: {contributionBeginType: 1}, min: 0, max: 120, validfn: 'RetirementAsset.contributionYearsUntilBegin', messageX: 'Years must be 0-120' }
		,{ field: 'contributionMonthsUntilBegin',type: 'wsfpIntegerRange', checkIf: {contributionBeginType: 1}, min: 0, max: 11, validfn: 'RetirementAsset.contributionMonthsUntilBegin', messageX: 'Months may be 0-11' }
		,{ field: 'contributionEndType'			,type: 'enumeration', store: 'retirementAssetContributionEndTypes' }
		,{ field: 'contributionMonthEnds'		,type: 'wsfpIntValues', checkIf: {contributionEndType: 0}, min: 1, max: 12, validfn: 'RetirementAsset.contributionMonthEnds', messageX: 'Month may be 1-12' }
		,{ field: 'contributionYearEnds'		,type: 'wsfpIntegerRange', checkIf: {contributionEndType: 0}, min: 2000, max: 2100, validfn: 'RetirementAsset.contributionYearEnds', messageX: 'Year must be 2000-2100' }
		,{ field: 'contributionDuration'		,type: 'wsfpIntegerRange', checkIf: {contributionEndType: 1}, min: 0, max: 120, validfn: 'RetirementAsset.contributionDuration', messageX: 'Years must be 0-120' }
		,{ field: 'contributionDurationMonths'	,type: 'wsfpIntegerRange', checkIf: {contributionEndType: 1}, min: 0, max: 11, validfn: 'RetirementAsset.contributionDurationMonths', messageX: 'Months may be 0-11' }
    ]
});
