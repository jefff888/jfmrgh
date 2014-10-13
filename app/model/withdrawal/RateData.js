/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext, MyRetirement, MyRetirementRemote*/
Ext.define('MyRetirement.model.withdrawal.RateData', {
	extend: 'Ext.data.Model'
	,requires: [
		'MyRetirement.proxy.Direct'
		,'MyRetirement.API'
	]
	
	,proxy: {
		type: 'apidirect'
		,api: {
			read: 'MyRetirementRemote.withdrawalRateService.getWithdrawalRateData'
			,update: 'MyRetirementRemote.withdrawalRateService.calcWithdrawalRateData'
		}
		,writer: {
			type: 'json'
			,getRecordData: function(record) {
				return {
					selectedConfidenceLevel: record.get('selectedConfidenceLevel')
					,selectedRiskToleranceAtRetirement: record.get('selectedRiskToleranceAtRetirement')
					,selectedWithdrawalRate: record.get('selectedWithdrawalRate')
				};
			}
		}
	}
	,fields: [
		{ name: 'assetsWithdrawalMonthlyAmount'			    ,type: 'float' }
		,{ name: 'assetsWithdrawalMonthlyRate'			    ,type: 'float' }
		,{ name: 'confidenceLevel1'						    ,type: 'float' }
		,{ name: 'confidenceLevel2'						    ,type: 'float' }
		,{ name: 'confidenceLevel3'						    ,type: 'float' }
		,{ name: 'incomeWithdrawalMonthlyRate'			    ,type: 'float' }
		,{ name: 'myRetirementMonthlyIncome'			    ,type: 'float' }
		,{ name: 'maxMyRetirementMonthlyIncome'			    ,type: 'float' }
		,{ name: 'selectedConfidenceLevel'				    ,type: 'float' }
		,{ name: 'selectedRiskToleranceAtRetirement'	    ,type: 'integer' }
		,{ name: 'selectedWithdrawalRate'				    ,type: 'float' }
		,{ name: 'totalAssetsValueAtRetirement'			    ,type: 'float' }
		,{ name: 'totalIncomeSourcesAvgMonthlyAmount'	    ,type: 'float' }
		,{ name: 'clientFinancialProfileAnnualInflationRate',type: 'float'}
		,{ name: 'clientFinancialProfileAverageTaxRate'		,type: 'float'}
		,{ name: 'atRetirementAssetAllocation' }
		,{ name: 'showRate' ,type: 'boolean', defaultValue: true, persist: false }
		,{ name: 'withdrawalScenarios'
			// inject labels for risk tolerances from enumerations store
			,convert: function(v) {
				var riskTolerances = MyRetirement.API.getEnumerationStore('riskTolerances')
					,i = 0
					,scenario
					,record;
					
				for(; i < v.length; i++)
				{
					scenario = v[i];
					if(record = riskTolerances.getById(scenario.riskToleranceAtRetirement))
					{
						scenario.riskToleranceAtRetirementLabel = record.get('label');
					}
				}
				
				return v;
			}
		}
    ]
});
