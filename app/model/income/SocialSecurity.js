/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext, MyRetirement, MyRetirementRemote*/
Ext.define('MyRetirement.model.income.SocialSecurity', {
	extend: 'Ext.data.Model'
	,requires: [
		'MyRetirement.proxy.Direct'
		,'Jarvus.validation.Number'
	]
	
	,proxy: {
		type: 'apidirect'
		,api: {
			read: 'MyRetirementRemote.incomeService.getSocialSecurityIncomeData'
			,update: 'MyRetirementRemote.incomeService.updateSocialSecurityIncomeData'
		}
	}
	,fields: [
		// client
		{ name: 'clientPersonFirstName',									type: 'string' }
		,{ name: 'clientFinancialProfileSocialSecurityCovered',				type: 'boolean' }
		,{ name: 'clientRetirementProfileIsReceivingSocSecurityBenefits',	type: 'boolean' }
		,{ name: 'clientRetirementProfileSocialSecurityBeginAge',			type: 'integer' }
		,{ name: 'clientRetirementProfileSocialSecurityBeginAgeMonths',		type: 'integer' }
		,{ name: 'clientRetirementProfileSocialSecurityFullMonthlyBenefit',	type: 'float' }
		,{ name: 'clientRetirementProfileSocialSecurityPVMonthlyBenefit',	type: 'float' }
		,{ name: 'socialSecurityAvgMonthlyAmount',							type: 'float' }
		
		// spouse
		,{ name: 'spousePersonFirstName',									type: 'string' }
		,{ name: 'spouseFinancialProfileSocialSecurityCovered',				type: 'boolean' }
		,{ name: 'spouseRetirementProfileIsReceivingSocSecurityBenefits',	type: 'boolean' }
		,{ name: 'spouseFinancialProfileSpousalBenefitAvailable',			type: 'boolean' }
		,{ name: 'spouseRetirementProfileSocialSecurityBeginAge',			type: 'integer' }
		,{ name: 'spouseRetirementProfileSocialSecurityBeginAgeMonths',		type: 'integer' }
		,{ name: 'spouseRetirementProfileSocialSecurityFullMonthlyBenefit',	type: 'float' }
		,{ name: 'spouseRetirementProfileSocialSecurityPVMonthlyBenefit',	type: 'float' }
	]
	,validations: [
		{ field: 'clientRetirementProfileSocialSecurityFullMonthlyBenefit', type: 'wsfpFloatRange', checkIf: {clientRetirementProfileIsReceivingSocSecurityBenefits: false}, min: 0, max: 99999999, validfn: 'RetirementProfile.socialSecurityFullMonthlyBenefit', messageX: 'Full retirement age monthly benefit must be between 0- 99,999,999.' }
		,{ field: 'spouseRetirementProfileSocialSecurityFullMonthlyBenefit', type: 'wsfpFloatRange', checkIf: {spouseRetirementProfileIsReceivingSocSecurityBenefits: false}, min: 0, max: 99999999, validfn: 'RetirementProfile.socialSecurityFullMonthlyBenefit', messageX: 'Full retirement age monthly benefit must be between 0- 99,999,999.' }

		,{ field: 'clientRetirementProfileSocialSecurityPVMonthlyBenefit', type: 'wsfpFloatRange', checkIf: {clientRetirementProfileIsReceivingSocSecurityBenefits: true}, min: 0, max: 99999999, validfn: 'RetirementProfile.socialSecurityPVMonthlyBenefit', messageX: 'Full retirement age monthly benefit must be between 0- 99,999,999.' }
		,{ field: 'spouseRetirementProfileSocialSecurityPVMonthlyBenefit', type: 'wsfpFloatRange', checkIf: {spouseRetirementProfileIsReceivingSocSecurityBenefits: true}, min: 0, max: 99999999, validfn: 'RetirementProfile.socialSecurityPVMonthlyBenefit', messageX: 'Full retirement age monthly benefit must be between 0- 99,999,999.' }

		,{ field: 'clientRetirementProfileSocialSecurityBeginAge', type: 'wsfpIntegerRange', min: 62, max: 70, validfn: 'RetirementProfile.socialSecurityBeginAge', messageX: 'Age must be 62-70' }
		,{ field: 'spouseRetirementProfileSocialSecurityBeginAge', type: 'spouseRetirementProfileSocialSecurityBeginAge', min: 62, max: 70, validfn: 'RetirementProfile.socialSecurityBeginAge', messageX: 'Age must be 62-70' }
		
		,{ field: 'clientRetirementProfileSocialSecurityBeginAgeMonths', type: 'clientRetirementProfileSocialSecurityBeginAgeMonths', min: 0, max: 11, validfn: 'RetirementProfile.socialSecurityBeginAgeMonths' }
		,{ field: 'spouseRetirementProfileSocialSecurityBeginAgeMonths', type: 'spouseRetirementProfileSocialSecurityBeginAgeMonths', min: 0, max: 11, validfn: 'RetirementProfile.socialSecurityBeginAgeMonths' }
	]
	
});