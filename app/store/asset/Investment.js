/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('MyRetirement.store.asset.Investment', {
	extend: 'Ext.data.Store'
	,requires: [
		'MyRetirement.model.asset.Investment'
		,'MyRetirement.proxy.Direct'
	]
	
	
	,model: 'MyRetirement.model.asset.Investment'
	,proxy: {
		type: 'apidirect'
		,api: {
			read: 'MyRetirementRemote.assetService.getInvestmentAssetData'
			,create: 'MyRetirementRemote.assetService.createInvestmentAssetData'
			,update: 'MyRetirementRemote.assetService.updateInvestmentAssetData'
			,destroy: 'MyRetirementRemote.assetService.deleteInvestmentAssetData'
		}
		,reader: {
			type: 'json'
			,root: 'investmentAssets'
		}
		,writer: {
			type: 'json'
			,allowSingle: false
			,root: 'investmentAssets'
		}
	}
});