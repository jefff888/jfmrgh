/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('MyRetirement.store.asset.Retirement', {
	extend: 'MyRetirement.store.AbstractSeeded'
	,requires: [
		'MyRetirement.model.asset.Retirement'
		,'MyRetirement.proxy.Direct'
	]
	
	,setNames: ['beginFixedValues', 'endFixedValues']
	
	,model: 'MyRetirement.model.asset.Retirement'
	,proxy: {
		type: 'apidirect'
		,api: {
			read: 'MyRetirementRemote.assetService.getRetirementAssetData'
			,create: 'MyRetirementRemote.assetService.createRetirementAssetData'
			,update: 'MyRetirementRemote.assetService.updateRetirementAssetData'
			,destroy: 'MyRetirementRemote.assetService.deleteRetirementAssetData'
		}
		,reader: {
			type: 'json'
			,root: 'retirementAssets'
		}
		,writer: {
			type: 'json'
			,allowSingle: false
			,root: 'retirementAssets'
		}
	}
});