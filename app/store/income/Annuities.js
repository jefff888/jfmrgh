/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('MyRetirement.store.income.Annuities', {
	extend: 'MyRetirement.store.AbstractSeeded'
	,requires: [
		'MyRetirement.model.income.Annuity'
		,'MyRetirement.proxy.Direct'
	]
	
	,setNames: ['beginFixedValues', 'endFixedValues']

	,model: 'MyRetirement.model.income.Annuity'
	,proxy: {
		type: 'apidirect'
		,api: {
			read: 'MyRetirementRemote.incomeService.getNoteAnnuityIncomeData'
			,create: 'MyRetirementRemote.incomeService.createNoteAnnuityIncomeData'
			,update: 'MyRetirementRemote.incomeService.updateNoteAnnuityIncomeData'
			,destroy: 'MyRetirementRemote.incomeService.deleteNoteAnnuityIncomeData'
		}
		,reader: {
			type: 'json'
			,root: 'noteAnnuityIncome'
		}
		,writer: {
			type: 'json'
			,allowSingle: false
			,root: 'noteAnnuityIncome'
		}
	}
});