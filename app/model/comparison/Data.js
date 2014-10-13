/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext, MyRetirement, MyRetirementRemote*/
Ext.define('MyRetirement.model.comparison.Data', {
	extend: 'Ext.data.Model'
	,requires: [
		'MyRetirement.proxy.Direct'
	]
	
	,proxy: {
		type: 'apidirect'
		,api: {
			read: 'MyRetirementRemote.comparisonService.getComparisonData'
		}
	}
	,fields: [
		// client
		{ name: 'additionalRetirementIncome'		,type: 'float'}
		,{name: 'assetsWithdrawlMonthlyAmount'		,type: 'float' }
		,{name: 'budgetNeedsMonthlyAmount'			,type: 'float' }
		,{name: 'budgetTotalMonthlyAmount'			,type: 'float' }
		,{name: 'budgetWantsMonthlyAmount'			,type: 'float' }
		,{name: 'myRetirementIncomeMonthly'			,type: 'float' }
		,{name: 'id'								,type: 'integer'}
		,{name: 'takeHomeTotalMonthly'				,type: 'float' }
		,{name: 'totalIncomeSourcesAvgMonthlyAmount',type: 'float'  }
		,{name: 'totalProposedRetirementIncome'		,type: 'float'  }
    ]
});
