/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext, MyRetirement, MyRetirementRemote*/
Ext.define('MyRetirement.model.setup.AssetAllocation', {
	extend: 'Ext.data.Model'
	,requires: [
		'MyRetirement.proxy.Direct'
	]
	
	,proxy: {
		type: 'apidirect'
		,directFn: 'MyRetirementRemote.setupService.getAssetAllocationPreRetirement'
		,paramOrder: ['id'] // pass desired assetClassRatios as id for Model.load(id)
	}
	,fields: [
		{ name: 'riskTolerance', type: 'integer' }
		,{ name: 'assetClassRatios' }
	]
});