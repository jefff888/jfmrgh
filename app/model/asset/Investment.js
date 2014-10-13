/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext, MyRetirement, MyRetirementRemote*/
Ext.define('MyRetirement.model.asset.Investment', {
	extend: 'Ext.data.Model'
	,requires: [
		'Jarvus.validation.Number'
		,'MyRetirement.validation.Enumeration'
	]
	
	,fields: [
		{ name: 'id'							,type: 'string' }
		,{ name: 'name'							,type: 'string' }
		,{ name: 'owner'						,type: 'integer' }
		,{ name: 'taxTypeCode'					,type: 'integer' }
		,{ name: 'currentBalance'				,type: 'float' }
		,{ name: 'retirementAvailabilityRate'	,type: 'float', defaultValue: 1.0 }
	]
	,validations: [
		//{ field: 'name'							,type: 'presence', message: 'Description required' }
		{ field: 'owner'						,type: 'enumeration', store: 'investmentAssetOwners' }
		,{ field: 'taxTypeCode'					,type: 'enumeration', store: 'investmentAssetTaxTypeCodes' }
		,{ field: 'currentBalance'				,type: 'wsfpFloatRange', min: 0, max: 99999999, validfn: 'InvestmentAsset.currentBalance', messageX: 'Current balance must be between  0- 99,999,999.' }		
		,{ field: 'retirementAvailabilityRate'	,type: 'wsfpFloatRange', min: 0, max: 1, validfn: 'InvestmentAsset.retirementAvailabilityRate', messageX: 'Percent available must be between 0-100%.' }
	]
});