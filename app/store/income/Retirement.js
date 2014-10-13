/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('MyRetirement.store.income.Retirement', {
	extend: 'MyRetirement.store.AbstractSeeded'
	,requires: [
		'MyRetirement.model.income.Retirement'
		,'MyRetirement.proxy.Direct'
	]
	
	,setNames: ['beginFixedValues', 'endFixedValues']	
	
	,model: 'MyRetirement.model.income.Retirement'
	,proxy: {
		type: 'apidirect'
		,api: {
			read: 'MyRetirementRemote.incomeService.getRetirementIncomeData'
			,create: 'MyRetirementRemote.incomeService.createRetirementIncomeData'
			,update: 'MyRetirementRemote.incomeService.updateRetirementIncomeData'
			,destroy: 'MyRetirementRemote.incomeService.deleteRetirementIncomeData'
		}
		,reader: {
			type: 'json'
			,root: 'retirementIncome'
		}
		,writer: {
			type: 'json'
			,allowSingle: false
			,root: 'retirementIncome'
		}
	}
});