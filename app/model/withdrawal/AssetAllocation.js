/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext, MyRetirement, MyRetirementRemote*/
Ext.define('MyRetirement.model.withdrawal.AssetAllocation', {
	extend: 'Ext.data.Model'
	,requires: [
		'MyRetirement.proxy.Direct'
	]
	
	,proxy: {
		type: 'apidirect'
		,directFn: 'MyRetirementRemote.withdrawalRateService.getAssetAllocationAtRetirement'
		,paramOrder: ['id'] // pass desired assetClassRatios as id for Model.load(id)
	}
	,fields: [
		{ name: 'riskTolerance', type: 'integer' }
		,{ name: 'assetClassRatios' }
    ]
});
