/*
 * Property of SunGard© Data Systems Inc. or its affiliates, all rights reserved.
 * SunGard Confidential.
 *
 * Copyright (c) 1993-2014 Sungard Wealth Management All Rights Reserved.
 *
 * This software is the confidential and proprietary information of Sungard
 * Expert Solutions ("Confidential Information"). You shall not disclose such
 * Confidential Information and shall use it only in accordance with the terms
 * of the license agreement you entered into with Sungard Expert Solutions.
 *
 * SUNGARD WEALTH MANAGEMENT MAKES NO REPRESENTATIONS OR WARRANTIES ABOUT THE
 * SUITABILITY OF THE SOFTWARE OR ASSOCIATED DOCUMENTATION, EITHER
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR
 * NON-INFRINGEMENT. SUNGARD WEALTH MANAGEMENT SHALL NOT BE LIABLE FOR ANY
 * DAMAGES SUFFERED BY LICENSEE AS A RESULT OF USING, MODIFYING OR
 * DISTRIBUTING THIS SOFTWARE OR ITS DERIVATIVES.
 */

/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext, MyRetirement, MyRetirementRemote*/
Ext.define('MyRetirement.model.whatif.SavingMore', {
	extend: 'Ext.data.Model'
	,requires: [
		'MyRetirement.proxy.Direct'
	]

	,proxy: {
		type: 'apidirect'
		,api: {
			read: 'MyRetirementRemote.whatIfService.getAdditionalInvestingWithSaveMore'
			,update: 'MyRetirementRemote.whatIfService.updateAdditionalInvestingWithSaveMore'
		}
	}
	,fields: [
		{name: 'preRetirementRiskTolerance'				    ,type: 'integer'}
		,{
			name: 'preRetirementRiskToleranceLabel'         ,persist: false

			// get string from enumeration store
			,convert: function(v, r) {
				var riskIndex = r.get('preRetirementRiskTolerance')
					,riskTolerances = MyRetirement.API.getEnumerationStore('riskTolerances')
					,record = riskTolerances.getById(riskIndex);

				return record ? record.get('label') : riskIndex;
			}
		}
		,{name: 'additionalContributionsMonths'	            ,type: 'integer'}
		,{name: 'clientFinancialProfileAnnualInflationRate'	,type: 'float'}
		,{name: 'clientFinancialProfileAverageTaxRate'		,type: 'float'}
		,{name: 'duringRetirementAverageTaxRate'		    ,type: 'float'}
		,{name: 'assetsWithdrawalMonthlyAmount'	            ,type: 'integer'}
		,{name: 'totalIncomeSourcesAvgMonthlyAmount'        ,type: 'integer'}
		,{name: 'totalRetirementIncomeWithSaveMore'         ,type: 'integer'}
		,{name: 'retirementIncomeSaveMore'  	            ,type: 'integer'}
		,{name: 'monthlyContribution'       	            ,type: 'integer'    ,defaultValue: 0}
		,{name: 'growthFactorTaxFree'       	            ,type: 'double'}
		,{name: 'growthFactorTaxed'            	            ,type: 'double'}
		,{name: 'growthFactorTaxDef'       	                ,type: 'double'}
		,{name: 'withdrawalRate'               	            ,type: 'double'}
		,{name: 'timeValuePVIFFactor'       	            ,type: 'double'}
		,{name: 'taxTypeCode'                  	            ,type: 'integer'}
		,{name: 'taxTypeLabel'                 	            ,type: 'string' ,persist: false
			,convert:  function(value, record) {
				var labelText = '';

				switch (record.get('taxTypeCode')) {
					case 1:
						labelText = 'Tax-free';
						break;

					case 2:
						labelText = 'Tax-deferred';
						break;

					case 0:
					default:
						labelText = 'Taxable';
						break;
				}

				return labelText;
			}
		 }
		,{name: 'additionalMonthlyAccountValue' ,type: 'integer' ,defaultValue: 0 ,persist: false}
		,{name: 'additionalMonthlyIncome' ,type: 'integer' ,defaultValue: 0 ,persist: false}
	]

	,validations: [
		{field: 'monthlyContribution' ,type: 'contributionRangeCheck',
			message: 'The monthly contribution amount must be in increments of 10, between 10 and 1,500 dollars.' }
    ]
});
