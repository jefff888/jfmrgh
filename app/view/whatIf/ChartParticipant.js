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

/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('MyRetirement.view.whatif.ChartParticipant',{
	extend: 'Ext.Component'
	,xtype: 'whatif-chart-participant'
	,requires: [
		'Ext.util.Format'
	]

	,config: {
		comparisonRecord: null
		,savingMoreRecord: null
	}
	
	,cls: 'stack-chart'
	,componentCls: 'whatif-chart-participant'
	,renderTpl: [
		 '<div class="baseline-peekabo"><hr class="baseline" id="{id}-baselineEl"></div>' // wrapping div is to solve IE "peekaboo" bug

		,'<section id="{id}-myRetirementStack" class="stack stack-myretirement no-button">'
			,'<header>'
				,'<h1>My Retirement</h1>'
				,'<div class="amount" id="{id}-myRetirementIncomeMonthlyEl">&mdash;</div>'
			,'</header>'
			,'<div class="bar-ct" id="{id}-myRetirementBarCt">'
				,'<div class="bar bar-income" id="{id}-myRetirementIncomeBar" data-qtip="Income"></div>'
				,'<div class="bar bar-assets" id="{id}-myRetirementAssetBar" data-qtip="Assets"></div>'
			,'</div>'
		,'</section>'

		,'<section class="stack stack-additionalInvesting no-button">'
			,'<header>'
				,'<h1>Saving More</h1>'
				,'<div class="amount" id="{id}-additionalInvestingMonthlyEl">&mdash;</div>'
			,'</header>'
			,'<div class="bar-ct">'
				,'<div class="bar bar-income" id="{id}-additionalInvestingIncomeBar" data-qtip="Investing Income"></div>'
				,'<div class="bar bar-assets" id="{id}-additionalInvestingAssetsBar" data-qtip="Investing Assets"></div>'
				,'<div class="bar bar-addl" id="{id}-additionalInvestingAmountBar" data-qtip="Investing Amount"></div>'
			,'</div>'
		,'</section>'
	]
	,childEls: [
		'baselineEl'
		,'myRetirementStack'
		,'myRetirementIncomeMonthlyEl'
		,'myRetirementBarCt'
		,'myRetirementIncomeBar'
		,'myRetirementAssetBar'
		,'additionalInvestingMonthlyEl'
		,'additionalInvestingAmountBar'
		,'additionalInvestingIncomeBar'
		,'additionalInvestingAssetsBar'
	]

	,updateAdditionalInvestingRecord: function (record) {
		this.setIllustratedOption(record.getIllustratedOption());
		if (record && this.getComparisonRecord()) {
			this.refreshChart();
		}
	}

	,updateSavingMoreRecord: function (record) {
		if (record && this.getComparisonRecord()) {
			this.refreshChart();
		}
	}

	,updateComparisonRecord: function (record) {
		if (record && this.getSavingMoreRecord()) {
			this.refreshChart();
		}
	}
	
	,refreshChart: function(there) {
		var me = there || this
			,comparisonRecord = me.getComparisonRecord()
			,saveMoreRecord = me.getSavingMoreRecord()
			,retirementTotal = comparisonRecord.get('myRetirementIncomeMonthly')
			,additionalInvestingTotal = saveMoreRecord.get('totalRetirementIncomeWithSaveMore')
			,assetsAmount = comparisonRecord.get('assetsWithdrawlMonthlyAmount')
			,incomeAmount = comparisonRecord.get('totalIncomeSourcesAvgMonthlyAmount')
			,additionalInvestmentAmount = saveMoreRecord.get('retirementIncomeSaveMore')
			,maxTotal = Math.max(1000, retirementTotal + additionalInvestingTotal)

		// chart scale is based on retirement total and CSS-assigned position of baseline <HR>
			,dollarsPerPixel = maxTotal / me.myRetirementBarCt.getHeight()

		// pixel heights for each bar segment
			,assetsHeight = Math.max(0, assetsAmount / dollarsPerPixel)
			,incomeHeight = Math.max(0, incomeAmount / dollarsPerPixel)
			,additionalInvestmentHeight = Math.max(0, additionalInvestmentAmount / dollarsPerPixel)
			,baselineHeight = incomeHeight + assetsHeight
			,stackBottomPadding

			,formatHeight = function(h) {
				return Ext.util.Format.round(h, 2)+'px';
			};

		// update numbers in headers
		me.myRetirementIncomeMonthlyEl.update(Ext.util.Format.currency(retirementTotal, '$', 0));
		me.additionalInvestingMonthlyEl.update(Ext.util.Format.currency(additionalInvestingTotal, '$', 0));

		// size, color, and position bar segments
		me.myRetirementIncomeBar.setStyle({
			height: formatHeight(incomeHeight)
		});
		me.myRetirementAssetBar.setStyle({
			height: formatHeight(assetsHeight)
			,bottom: formatHeight(incomeHeight)
		});

		stackBottomPadding = me.myRetirementStack.getPadding('b');
		// position baseline -- getPadding will return the value in em's if this is the IE browser,
		// so convert at a 12pt font size. This applies to versions 9 and earlier.
		if (Ext.isIE6 || Ext.isIE7 || Ext.isIE8 || Ext.isIE9) {
			stackBottomPadding *= 12;
		}
		me.baselineEl.setBottom(baselineHeight + stackBottomPadding);

		me.additionalInvestingIncomeBar.setStyle({
			height: formatHeight(incomeHeight)
		});
		me.additionalInvestingAssetsBar.setStyle({
			height: formatHeight(assetsHeight)
			,bottom: formatHeight(incomeHeight)
		});
		me.additionalInvestingAmountBar.setStyle({
			height: formatHeight(additionalInvestmentHeight)
			,bottom: formatHeight(incomeHeight + assetsHeight)
		});
		
/* updating tool tip text every time after refreshing charts -*/
		
		me.myRetirementIncomeBar.set({'data-qtip': "<b>Income: </b>"+Ext.util.Format.currency(incomeAmount, '$', 0)});
		me.myRetirementAssetBar.set({'data-qtip': "<b>Assets: </b>"+Ext.util.Format.currency(assetsAmount, '$', 0)});
		me.additionalInvestingIncomeBar.set({'data-qtip': "<b>Income: </b>"+Ext.util.Format.currency(incomeAmount, '$', 0)});
		me.additionalInvestingAssetsBar.set({'data-qtip': "<b>Assets: </b>"+Ext.util.Format.currency(assetsAmount, '$', 0)});
		me.additionalInvestingAmountBar.set({'data-qtip': "<b>Additional Retirement Income: </b>"+Ext.util.Format.currency(additionalInvestmentAmount, '$', 0)});

		me.fireEvent('chartrefresh', me, comparisonRecord, saveMoreRecord);
    }
});