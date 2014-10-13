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
Ext.define('MyRetirement.view.whatif.PanelParticipant', {
	extend: 'MyRetirement.view.AppPanel'
	,xtype: 'whatif-panel-participant'
	,requires: [
		 'MyRetirement.view.whatif.ChartParticipant'
		,'MyRetirement.view.whatif.TableParticipant'
		,'MyRetirement.view.whatif.FooterParticipant'
	]

	,nextButton: false
	,backButton: true

	,componentCls: 'whatif-panel-participant'
	,items: [{
		xtype: 'whatif-chart-participant'
	},{
		xtype: 'whatiffooterparticipant',
		cls:'whatIfChartLegend'
	},{
		cls: 'additional-investing'
		,id: 'additionalInvestingTable'
		,title: 'Additional Investing'
		,items: [{
			xtype: 'component'
			,autoEl: 'header'
			,name: 'taxTypeCode'
			,cls: 'panel-body-header'
			,html: [
				'<div class="tools">'
				,'<span id="whatif-panel-title" class="left save-more-title"><h1>What If &ndash; Saving More</h1></span>'
				,'<span class="left"><select id="tax-type-selector" name="taxTypeCode" '
				,'class="table-header-dropDown" '
				,'onmouseover="MyRetirement.helpFieldMouseOver(Ext.get(\'tax-type-selector\'))" '
				,'onfocusgained="MyRetirement.helpFieldGainFocus(Ext.get(\'tax-type-selector\'))">'
				,'<option value="0">Taxable</option> <option value="1">Tax-free</option> <option selected value="2">Tax-deferred</option></select> </span>'
				,'</div>'
			]
		},{
			xtype: 'whatif-table-participant'
		},{
			xtype: 'component'
			,itemId: 'summary'
			,autoEl: 'footer'
			,cls: 'panel-body-footer'
			,style: 'height: 35px !important;'
			,tpl: [
				'<p>The {monthlyContribution:currency("$",0)} amount is after tax '
				,'({clientFinancialProfileAverageTaxRate:number("0.00") * 100}% tax rate), '
				,'increases annually with inflation ({clientFinancialProfileAnnualInflationRate:number("0.00") * 100}% inflation rate), '
				,'will continue until retirement ({additionalContributionsMonths} months of contributions), '
				,'and assumes a {preRetirementRiskToleranceLabel} risk tolerance portfolio.</p>'
			]
		}]
	}]
});