/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext, MyRetirement, MyRetirementRemote*/
Ext.define('MyRetirement.model.setup.SetupInfo', {
	extend: 'Ext.data.Model'
	,requires: [
		'MyRetirement.proxy.Direct'
		,'Jarvus.validation.Number'
		,'MyRetirement.validation.Enumeration'		
	]
	
	,proxy: {
		type: 'apidirect'
		,api: {
			read: 'MyRetirementRemote.setupService.getSetupInfo'
			,update: 'MyRetirementRemote.setupService.updateSetupInfo'
		}
	}
	,fields: [
		// client-personal
		{ name: 'clientPersonFirstName'										,useNull: true, type: 'string' }
		,{ name: 'clientCurrentAge'											,useNull: true, type: 'integer' }
		,{ name: 'clientFinancialProfileAnalysisEndingAge'					,allowBlank: false, useNull: true, type: 'integer' }
		,{ name: 'clientFinancialProfileAnnualEarnedIncome'					,allowBlank: false, useNull: true, type: 'float' }
		,{ name: 'clientRetirementProfileRetired'							,allowBlank: false, useNull: true, type: 'boolean' }
		,{ name: 'clientRetirementProfileRetirementAge'						,allowBlank: false, useNull: true, type: 'integer', defaultValue: 65 }
		,{ name: 'clientRetirementProfileRetirementAgeMonths'				,type: 'integer' }
		
		// spouse-personal
		,{ name: 'spousePersonFirstName'									,useNull: true, type: 'string' }
		,{ name: 'spouseCurrentAge'											,useNull: true, type: 'integer' }
		,{ name: 'spouseFinancialProfileAnalysisEndingAge'					,useNull: true, type: 'integer' }
		,{ name: 'spouseFinancialProfileAnnualEarnedIncome'					,useNull: true, type: 'float' }
		,{ name: 'spouseRetirementProfileRetired'							,useNull: true, type: 'boolean' }
		,{ name: 'spouseRetirementProfileRetirementAge'						,useNull: true, type: 'integer', defaultValue: 65 }
		,{ name: 'spouseRetirementProfileRetirementAgeMonths'				,type: 'integer' }
		
		// common
		,{ name: 'clientRetirementProfilePreRetirementRiskTolerance'		,allowBlank: false, useNull: true, type: 'integer' }
		,{ name: 'clientFinancialProfileAverageTaxRate'						,allowBlank: false, useNull: true, type: 'float' }
		,{ name: 'clientFinancialProfileAnnualInflationRate'				,allowBlank: false, useNull: true, type: 'float' }
		,{ name: 'retirementJointProfileDuringRetirementAverageTaxRate'		,allowBlank: false, useNull: true, type: 'float' }
		,{ name: 'preRetirementAssetAllocation' }
	]
	,validations: [
		{ field: 'clientFinancialProfileAnalysisEndingAge'					,type: 'wsfpIntegerRange', min: 0, max: 120, validfn: 'FinancialProfile.analysisEndingAge' }
		,{ field: 'spouseFinancialProfileAnalysisEndingAge'					,type: 'wsfpIntegerRange', min: 0, max: 120, validfn: 'FinancialProfile.analysisEndingAge' }
		
		,{ field: 'clientFinancialProfileAnnualEarnedIncome'				,type: 'wsfpFloatRange', min: 0, max: 99999999, validfn: 'FinancialProfile.annualEarnedIncome' }
		,{ field: 'spouseFinancialProfileAnnualEarnedIncome'				,type: 'wsfpFloatRange', min: 0, max: 99999999, validfn: 'FinancialProfile.annualEarnedIncome' }
		
		,{ field: 'clientRetirementProfileRetirementAge'					,type: 'wsfpIntegerRange', min: 0, max: 120, validfn: 'RetirementProfile.retirementAge' }
		,{ field: 'spouseRetirementProfileRetirementAge'					,type: 'retirementAgeYearSpouse', min: 0, max: 120, validfn: 'RetirementProfile.retirementAge' }
		
		,{ field: 'clientRetirementProfileRetirementAgeMonths'				,type: 'retirementAgeMonthClient', min: 0, max: 11, validfn: 'RetirementProfile.retirementAgeMonths', messageX: 'Months should be 0-11' }
		,{ field: 'spouseRetirementProfileRetirementAgeMonths'				,type: 'retirementAgeMonthSpouse', min: 0, max: 11, validfn: 'RetirementProfile.retirementAgeMonths', messageX: 'Months should be 0-11' }
		
		,{ field: 'clientRetirementProfilePreRetirementRiskTolerance'		,type: 'enumeration', store: 'riskTolerances' }
		,{ field: 'clientFinancialProfileAverageTaxRate'					,type: 'wsfpFloatRange', min: 0, max: 1, validfn: 'FinancialProfile.averageTaxRate', messageX: 'Pre-retirement effective income tax rate must be between 0-100%.' }
		,{ field: 'clientFinancialProfileAnnualInflationRate'				,type: 'wsfpFloatRange', min: 0, max: 1, validfn: 'FinancialProfile.annualInflationRate', messageX: 'Inflation rate must be between 0-100%.' }
		,{ field: 'retirementJointProfileDuringRetirementAverageTaxRate'	,type: 'wsfpFloatRange', min: 0, max: 1, validfn: 'RetirementJointProfile.duringRetirementAverageTaxRate', messageX: 'Post-retirement effective income tax rate must be between 0-100%.' }
	]
	
});
