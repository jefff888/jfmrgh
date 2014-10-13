/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext, MyRetirement, MyRetirementRemote*/
Ext.define('MyRetirement.model.comparison.TakeHomePay', {
	extend: 'Ext.data.Model'
	,requires: [
		'MyRetirement.proxy.Direct'
	]
	
	,proxy: {
		type: 'apidirect'
		,api: {
			read: 'MyRetirementRemote.comparisonService.getTakeHomePayData'
			,update: 'MyRetirementRemote.comparisonService.updateTakeHomePayData'
		}
		,writer: {
			type: 'json'
			,getRecordData: function(record) {
				return {
					clientFinancialProfileSocialSecurityTaxRate: record.get('clientFinancialProfileSocialSecurityTaxRate')
					,clientFinancialProfileTakeHomePayOtherRate: record.get('clientFinancialProfileTakeHomePayOtherRate')
					,spouseFinancialProfileSocialSecurityTaxRate: record.get('spouseFinancialProfileSocialSecurityTaxRate')
					,spouseFinancialProfileTakeHomePayOtherRate: record.get('spouseFinancialProfileTakeHomePayOtherRate')
				};
			}
		}
	}
	,fields: [
		{name: 'id'												,type: 'string' }
		,{name: 'clientFinancialProfileAverageTaxRate'			,type: 'float' }
		,{name: 'clientFinancialProfileSocialSecurityTaxRate'	,type: 'float' }
		,{name: 'clientFinancialProfileTakeHomePayOtherRate'	,type: 'float' }
		,{name: 'retirementContributionsClientRate'				,type: 'float' }
		,{name: 'retirementContributionsCoClientRate'			,type: 'float' }
		,{name: 'spouseFinancialProfileSocialSecurityTaxRate'	,type: 'float' }
		,{name: 'spouseFinancialProfileTakeHomePayOtherRate'	,type: 'float' }
		
		,{name: 'clientTakeHomePay'}
		,{name: 'clientTakeHomePay.grossEarnings'				,type: 'float' }
		,{name: 'clientTakeHomePay.taxOnEarnings'				,type: 'float' }
		,{name: 'clientTakeHomePay.socialSecurityTaxOnEarnings'				,type: 'float' }
		,{name: 'clientTakeHomePay.retirementContributions'				,type: 'float' }
		,{name: 'clientTakeHomePay.otherEarningsReductions'				,type: 'float' }
		,{name: 'clientTakeHomePay.totalReductions'				,type: 'float' }
		,{name: 'clientTakeHomePay.totalTakeHomePay'				,type: 'float' }
		
		,{name: 'coClientTakeHomePay'}
		,{name: 'coClientTakeHomePay.grossEarnings'				,type: 'float' }
		,{name: 'coClientTakeHomePay.taxOnEarnings'				,type: 'float' }
		,{name: 'coClientTakeHomePay.socialSecurityTaxOnEarnings'				,type: 'float' }
		,{name: 'coClientTakeHomePay.retirementContributions'				,type: 'float' }
		,{name: 'coClientTakeHomePay.otherEarningsReductions'				,type: 'float' }
		,{name: 'coClientTakeHomePay.totalReductions'				,type: 'float' }
		,{name: 'coClientTakeHomePay.totalTakeHomePay'				,type: 'float' }
		
		,{name: 'annualTotalTakeHomePay'}
		,{name: 'annualTotalTakeHomePay.grossEarnings'			,type: 'float' }
		,{name: 'annualTotalTakeHomePay.taxOnEarnings'				,type: 'float' }
		,{name: 'annualTotalTakeHomePay.socialSecurityTaxOnEarnings'				,type: 'float' }
		,{name: 'annualTotalTakeHomePay.retirementContributions'				,type: 'float' }
		,{name: 'annualTotalTakeHomePay.otherEarningsReductions'				,type: 'float' }
		,{name: 'annualTotalTakeHomePay.totalReductions'				,type: 'float' }
		,{name: 'annualTotalTakeHomePay.totalTakeHomePay'				,type: 'float' }
		
		,{name: 'monthlyTotalTakeHomePay'}
		,{name: 'monthlyTotalTakeHomePay.grossEarnings'			,type: 'float' }
		,{name: 'monthlyTotalTakeHomePay.taxOnEarnings'				,type: 'float' }
		,{name: 'monthlyTotalTakeHomePay.socialSecurityTaxOnEarnings'				,type: 'float' }
		,{name: 'monthlyTotalTakeHomePay.retirementContributions'				,type: 'float' }
		,{name: 'monthlyTotalTakeHomePay.otherEarningsReductions'				,type: 'float' }
		,{name: 'monthlyTotalTakeHomePay.totalReductions'				,type: 'float' }
		,{name: 'monthlyTotalTakeHomePay.totalTakeHomePay'				,type: 'float' }
	]
	,validations: [
   		{ field: 'clientFinancialProfileSocialSecurityTaxRate'				,type: 'wsfpFloatRange', min: 0, max: 1, validfn: 'MyRetirementJointProfile.socialSecurityTaxClientRate', messageX: 'Tax Rate should be 0-100%' }
   		,{ field: 'clientFinancialProfileTakeHomePayOtherRate'				,type: 'wsfpFloatRange', min: 0, max: 1, validfn: 'MyRetirementJointProfile.takeHomePayOtherClientRate', messageX: 'Tax Rate should be 0-100%' }
   		
   		,{ field: 'spouseFinancialProfileSocialSecurityTaxRate'				,type: 'wsfpFloatRange', min: 0, max: 1, validfn: 'MyRetirementJointProfile.takeHomePayOtherClientRate', messageX: 'Tax Rate should be 0-100%' }
   		,{ field: 'spouseFinancialProfileTakeHomePayOtherRate'				,type: 'wsfpFloatRange', min: 0, max: 1, validfn: 'MyRetirementJointProfile.socialSecurityTaxSpouseRate', messageX: 'Tax Rate should be 0-100%' }
   	]
});