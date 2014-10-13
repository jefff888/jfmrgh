/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext, MyRetirement, MyRetirementRemote*/
Ext.define('MyRetirement.model.income.Annuity', {
	extend: 'Ext.data.Model'
	,requires: [
		'Jarvus.validation.Number'
		,'MyRetirement.validation.Enumeration'
	]
	
	,fields: [
		{ name: 'id'								,type: 'string' }
		,{ name: 'annualIncreaseRate'				,type: 'float' }
		,{ name: 'beforePeriodAnnualIncreaseRate'	,type: 'float' }
		,{ name: 'beginType'						,type: 'integer' , defaultValue: 2 }
		,{ name: 'beginYear'						,type: 'integer'}
		,{ name: 'beginMonth'						,type: 'integer' }
		,{ name: 'beginAge'							,type: 'integer' }
		,{ name: 'durationType'						,type: 'integer' , defaultValue: 94 }
		,{ name: 'duration'							,type: 'integer' }		
		,{ name: 'durationMonths'					,type: 'integer' }
		,{ name: 'endYear'							,type: 'integer' }
		,{ name: 'endMonth'							,type: 'integer' }
		,{ name: 'name'								,type: 'string' }
		,{ name: 'owner'							,type: 'integer' , defaultValue: 1}
		,{ name: 'portionTaxableRate'				,type: 'float' }
		,{ name: 'survivorBenefitRate'				,type: 'float' }
		,{ name: 'type'								,type: 'integer' }
		,{ name: 'monthlyAmount'					,type: 'float' }
	]
	,validations: [
		//{ field: 'name'								,type: 'presence', message: 'Description required' }
		{ field: 'type'								,type: 'enumeration', store: 'noteAnnuityIncomeTypes' }
		,{ field: 'owner'							,type: 'enumeration', store: 'noteAnnuityIncomeOwners' }
		,{ field: 'monthlyAmount'					,type: 'wsfpFloatRange', min: 0, max: 99999999, validfn: 'NoteAnnuityIncome.monthlyAmount', messageX: 'Monthly amount must be between 0- 99,999,999.' }
		,{ field: 'survivorBenefitRate'				,type: 'wsfpFloatRange', min: 0, max: 1, validfn: 'NoteAnnuityIncome.survivorBenefitRate', messageX: 'Survivor benefit portion must be between 0-100%.' }
		,{ field: 'portionTaxableRate'				,type: 'wsfpFloatRange', min: 0, max: 1, validfn: 'NoteAnnuityIncome.portionTaxableRate', messageX: 'Portion taxable must be between 0-100%.' }
		,{ field: 'beforePeriodAnnualIncreaseRate'	,type: 'wsfpFloatRange', min: 0, max: 1, validfn: 'NoteAnnuityIncome.beforePeriodAnnualIncreaseRate', messageX: 'Inflation rate must be between 0-100%.' }
		,{ field: 'annualIncreaseRate'				,type: 'wsfpFloatRange', min: 0, max: 1, validfn: 'NoteAnnuityIncome.annualIncreaseRate', messageX: 'Inflation rate must be between 0-100%.' }
		,{ field: 'beginType'						,type: 'enumeration', store: 'noteAnnuityIncomeBeginTypes' }
		,{ field: 'beginMonth'						,type: 'integer', checkIf: {beginType: 0}, min: 1, max: 12, message: 'Month may be 1-12' }
		,{ field: 'beginYear'						,type: 'wsfpIntegerRange', checkIf: {beginType: 0}, min: 2000, max: 2100, validfn: 'NoteAnnuityIncome.beginYear', messageX: 'Year must be 2000-2100' }
		,{ field: 'beginAge'						,type: 'wsfpIntegerRange', checkIf: {beginType: 30}, min: 0, max: 120, validfn: 'NoteAnnuityIncome.beginAge', messageX: 'Age must be 0-120' }
		,{ field: 'durationType'					,type: 'enumeration', store: 'noteAnnuityIncomeDurationTypes' }
		,{ field: 'endMonth'						,type: 'integer', checkIf: {durationType: 0}, min: 1, max: 12, message: 'Month may be 1-12' }
		,{ field: 'endYear'							,type: 'wsfpIntegerRange', checkIf: {durationType: 0}, min: 2000, max: 2100, validfn: 'NoteAnnuityIncome.endYear', messageX: 'Year must be 2000-2100' }
		,{ field: 'duration'						,type: 'wsfpIntegerRange', checkIf: {durationType: 1}, min: 0, max: 120, validfn: 'NoteAnnuityIncome.duration', messageX: 'Years must be 0-120' }
		,{ field: 'durationMonths'					,type: 'integer', checkIf: {durationType: 1}, min: 0, max: 11, message: 'Months may be 0-11' }
    ]
});
