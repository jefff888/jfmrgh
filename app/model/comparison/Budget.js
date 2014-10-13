/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext, MyRetirement, MyRetirementRemote*/
Ext.define('MyRetirement.model.comparison.Budget', {
	extend: 'Ext.data.Model'
	,requires: [
		'MyRetirement.proxy.Direct'
		,'Jarvus.data.writer.MappedJson'
	]
	
	,proxy: {
		type: 'apidirect'
		,api: {
			read: 'MyRetirementRemote.comparisonService.getBudgetData'
			,update: 'MyRetirementRemote.comparisonService.updateBudgetData'
		}
		,writer: 'mappedjson'
	}
	,fields: [
		{name: 'budgets'}
		,{name: 'totalBudget'}
	]
});