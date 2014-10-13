/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext, MyRetirement, MyRetirementRemote*/
Ext.define('MyRetirement.model.income.Retirement', {
	extend: 'Ext.data.Model'
	,requires: [
		'Jarvus.validation.Number'
		,'MyRetirement.validation.Enumeration'
	]
	
	,fields: [
		{ name: 'id'								,type: 'string' }
		,{ name: 'annualIncreaseRate'				,type: 'float' }
		,{ name: 'annualAmount'						,type: 'integer' }
		,{ name: 'beforePeriodAnnualIncreaseRate'	,type: 'float' }
		,{ name: 'beginType'						,type: 'integer' , defaultValue: 2}
		,{ name: 'beginMonth'						,type: 'integer' }
		,{ name: 'beginYear'						,type: 'integer' }	
		,{ name: 'durationType'						,type: 'integer' , defaultValue: 90}	
		,{ name: 'duration'							,type: 'integer' }
		,{ name: 'durationMonths'					,type: 'integer' }
		,{ name: 'endMonth'							,type: 'integer' }
		,{ name: 'endYear'							,type: 'integer' }
		,{ name: 'name'								,type: 'string' }
		,{ name: 'owner'							,type: 'integer' , defaultValue: 1}
		,{ name: 'portionTaxableRate'				,type: 'float' }
	]
	,validations: [
		//{ field: 'name'								,type: 'presence', message: 'Description required' }
		{ field: 'owner'							,type: 'enumeration', store: 'retirementIncomeOwners' }	
		,{ field: 'beforePeriodAnnualIncreaseRate'	,type: 'wsfpFloatRange', min: 0, max: 1, validfn: 'RetirementIncome.beforePeriodAnnualIncreaseRate', messageX: 'Inflation rate must be between 0-100%.' }
		,{ field: 'annualAmount'					,type: 'wsfpFloatRange', min: 0, max: 99999999, validfn: 'RetirementIncome.annualAmount', messageX: 'Monthly amount must be between  0- 99,999,999.' }
		,{ field: 'annualIncreaseRate'				,type: 'wsfpFloatRange', min: 0, max: 1, validfn: 'RetirementIncome.annualIncreaseRate', messageX: 'Inflation rate must be between 0-100%.' }
		,{ field: 'portionTaxableRate'				,type: 'wsfpFloatRange', min: 0, max: 1, validfn: 'RetirementIncome.portionTaxableRate', messageX: 'Portion taxable must be between 0-100%.' }
		,{ field: 'beginType'						,type: 'enumeration', store: 'retirementIncomeBeginTypes' }
		,{ field: 'beginMonth'						,type: 'integer', checkIf: {beginType: 0}, min: 1, max: 12, message: 'Month may be 1-12' }
		,{ field: 'beginYear'						,type: 'wsfpIntegerRange', checkIf: {beginType: 0}, min: 2000, max: 2100, validfn: 'RetirementIncome.beginYear', messageX: 'Year must be 2000-2100' }
		,{ field: 'durationType'					,type: 'enumeration', store: 'retirementIncomeDurationTypes' }
		,{ field: 'endMonth'						,type: 'integer', checkIf: {durationType: 0}, min: 1, max: 12, message: 'Month may be 1-12' }
		,{ field: 'endYear'							,type: 'wsfpIntegerRange', checkIf: {durationType: 0}, min: 2000, max: 2100, validfn: 'RetirementIncome.endYear', messageX: 'Year must be 2000-2100' }
		,{ field: 'duration'						,type: 'wsfpIntegerRange', checkIf: {durationType: 1}, min: 0, max: 120, validfn: 'RetirementIncome.duration', messageX: 'Years must be 0-120' }
		,{ field: 'durationMonths'					,type: 'integer', checkIf: {durationType: 1}, min: 0, max: 11, message: 'Months may be 0-11' }
    ]
});
