/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext, MyRetirement, MyRetirementRemote*/
Ext.define('MyRetirement.model.asset.Growth', {
	extend: 'Ext.data.Model'
	,requires: [
		'MyRetirement.proxy.Direct'
	]
	
	,proxy: {
		type: 'apidirect'
		,api: {
			read: 'MyRetirementRemote.assetService.calcAssetGrowth'
		}
	}
	,fields: [
		{ name: 'assetsToRetirement'}
	]
});