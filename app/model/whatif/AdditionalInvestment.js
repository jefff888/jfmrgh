/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext, MyRetirement, MyRetirementRemote*/
Ext.define('MyRetirement.model.whatif.AdditionalInvestment', {
	extend: 'Ext.data.Model'
	,requires: [
		'MyRetirement.proxy.Direct'
	]
	
	,additionalInvestingOptions: {
		additionalInvesting1Percent: 1
		,additionalInvesting3Percent: 3
		,additionalInvesting5Percent: 5
	}
	
	,getIllustratedOption: function() {
		var options = Ext.Object.getKeys(this.additionalInvestingOptions);
		
		for(var i = 0; i < options.length; i++)
		{
			if(this.get(options[i]+'.illustrateOption'))
			{
				return options[i];
			}
		}
		
		return options[0];
	}
	
	,setIllustratedOption: function(newValue) {
		var me = this
			,oldValue = me.getIllustratedOption();
			
		if(newValue && oldValue)
		{
			this.set(oldValue+'.illustrateOption', false);
			this.set(newValue+'.illustrateOption', true);
		}
	}
	
	,proxy: {
		type: 'apidirect'
		,api: {
			read: 'MyRetirementRemote.whatIfService.getAdditionalInvestingData'
			,update: 'MyRetirementRemote.whatIfService.updateAdditionalInvestingData'
		}
		,writer: {
			type: 'json'
			,getRecordData: function(record) {
				var illustratedOption = record.getIllustratedOption();
				return illustratedOption ? record.additionalInvestingOptions[illustratedOption] : null;
			}
		}
	}
	,fields: [
		// client
		{ name: 'additionalContributionsMonths'				,type: 'integer'}
		
		,{name: 'additionalInvesting1Percent'}
		,{name: 'additionalInvesting1Percent.additionalMonthlyInvestment'	,type: 'float'}
		,{name: 'additionalInvesting1Percent.additionalRetirementIncome'	,type: 'float'}
		,{name: 'additionalInvesting1Percent.totalProposedRetirementIncome'	,type: 'float'}
		,{name: 'additionalInvesting1Percent.illustrateOption'				,type: 'boolean'}
		
		,{name: 'additionalInvesting3Percent'}
		,{name: 'additionalInvesting3Percent.additionalMonthlyInvestment'	,type: 'float'}
		,{name: 'additionalInvesting3Percent.additionalRetirementIncome'	,type: 'float'}
		,{name: 'additionalInvesting3Percent.totalProposedRetirementIncome'	,type: 'float'}
		,{name: 'additionalInvesting3Percent.illustrateOption'				,type: 'boolean'}
		
		,{name: 'additionalInvesting5Percent'}
		,{name: 'additionalInvesting5Percent.additionalMonthlyInvestment'	,type: 'float'}
		,{name: 'additionalInvesting5Percent.additionalRetirementIncome'	,type: 'float'}
		,{name: 'additionalInvesting5Percent.totalProposedRetirementIncome'	,type: 'float'}
		,{name: 'additionalInvesting5Percent.illustrateOption'				,type: 'boolean'}
		
		,{name: 'additionalRetirementIncomeTaxType'			,type: 'string'}
		,{name: 'clientFinancialProfileAnnualInflationRate'	,type: 'float'}
		,{name: 'clientFinancialProfileAverageTaxRate'		,type: 'float'}
		,{name: 'preRetirementRiskTolerance'				,type: 'integer'}
		,{
			name: 'preRetirementRiskToleranceLabel'
			
			// get string from enumeration store
			,convert: function(v, r) {
				var riskIndex = r.get('preRetirementRiskTolerance')
					,riskTolerances = MyRetirement.API.getEnumerationStore('riskTolerances')
					,record = riskTolerances.getById(riskIndex);

				return record ? record.get('label') : riskIndex;
			}
		}
	]
});