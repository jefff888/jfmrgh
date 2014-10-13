/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext, MyRetirement, MyRetirementRemote*/
Ext.define('MyRetirement.model.income.RetirementAverage', {
	extend: 'Ext.data.Model'
	,requires: [
		'MyRetirement.proxy.Direct'
	]
	
	,proxy: {
		type: 'apidirect'
		,api: {
			read: 'MyRetirementRemote.incomeService.calcMonthlyIncomeDuringRetirement'
		}
	}
	,fields: [
		// client
		{name: 'otherIncomeAvgMonthlyAmount'			,type: 'integer'}
		,{name: 'pensionAvgMonthlyAmount'				,type: 'integer'}
		,{name: 'socialSecurityAvgMonthlyAmount'		,type: 'integer'}
		,{name: 'totalIncomeSourcesAvgMonthlyAmount'	,type: 'integer'}
		,{name: 'monthlyIncomeDuringRetirement'}
	]
});