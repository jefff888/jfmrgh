
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
Ext.define('MyRetirement.view.whatif.TableParticipant', {
	extend: 'Jarvus.container.table.FieldTable'
	,xtype: 'whatif-table-participant'
	,mixins: [
		'Jarvus.mixin.Formable'
	]
	,requires: [
		'Jarvus.container.Raw'
		,'Jarvus.container.table.Header'
		,'Jarvus.field.BigMoneyTemplate'
		,'Jarvus.field.BigMoney'
		,'Jarvus.field.Template'
		,'MyRetirement.field.SaveMoreSlider'
	]

	,cls: 'whatif-table-participant'

	// component template methods
	,initComponent: function() {
		var me = this
			,hideLinkButton = !MyRetirement.VARS.getShowContributionLink();

		me.items = [{
			// thead
			xtype: 'tableheader'
			,columns: [
				{ colCls: 'additional-savings'  ,title: '&nbsp;' }
				,{ colCls: 'amount-desc'        ,title: '&nbsp;' }
				,{ colCls: 'amount'             ,title: '&nbsp;' }
				,{ colCls: 'increase'           ,title: '&nbsp;' }
			]
			// Collapse the column headers as we are not using them. Template code is from the
			// Jarvus.container.table.Header class, which is the class of tableheader xtype. In
			// this case the hidden style was changed from style="display:none" to
			// style="visibility:collapse".
			,hidden: true
			,renderTpl: [
				'<tpl if="superHeader"><tr class="merge-with-next">{superHeader}</tr></tpl>'
				,'<tr>'
				,'<tpl for="columns">'
				,'<th class="col-{colCls}<tpl if="colGroup"> group-{colGroup}</tpl>'
				,'<tpl if="colSpan"> colspan={colSpan}</tpl><tpl if="hidden"> ' +
					'style="visibility:collapse"</tpl>>{title}</th>'
				,'</tpl>'
				,'</tr>'
			]
		},{
			// tbody
			xtype: 'tablesegment'
			,items: [{
				// row - Additional contributions
				items: [{
					autoEl: 'td'
					,cls: 'col-additional-savings'
					,style: 'padding-top: 0 !important; font-weight: bold;'
					,html: 'Additional monthly savings'
				},{
					xtype: 'rawcontainer'
					,autoEl: 'td'
					,cls: 'col-amount-desc'
					,style: 'text-align: left !important; padding-left: 0 !important; padding-top: 0.15em !important;'
					,monitorChange: 'live'
					,border: 0
					,items: [{
						xtype: 'savemoreslider'
						,submitValue: false
					}]
				},{
					xtype: 'bigmoneyfield'
					,id: 'contributionAmount'
					,cls: 'col-amount what-if-emphasized-money-text'
					,style: 'padding-top: 0;'
					,name: 'monthlyContribution'
					,step: 10
					,minValue: 0
					,maxValue: 1500
					,monitorChange: 'live'
				},{
					xtype: 'rawcontainer'
					,autoEl: 'td'
					,cls: 'col-increase'
					,border: 0
					,items: [{
						xtype: 'button'
						,id: 'increaseParticipantContribution'
						,cls: 'x-btn-primary-large'
						,style: 'margin: 15px; padding-top 0: !important;'
						,scale: 'large'
						,text: 'Increase Plan Contributions'
						,hideMode: 'visibility'
						,hidden: hideLinkButton
						,ui: 'primary'
					}]
				}]
			},{
				// row - Additional retirement income
				items: [{
					autoEl: 'td'
					,cls: 'col-additional-savings'
					,html: '&nbsp;'
				},{
					xtype: 'component'
					,cls: 'col-amount-desc what-if-amount-desc'
					,html: ['<div class="legend-addl chart-legend-icon"><span class="swatch">&nbsp;</span></div>'
					        ,'</div><span class="what-if-emphasized-money-text">Additional monthly retirement income</span>']
				},{
					xtype: 'bigmoneytemplatefield'
					,id: 'adjustedRetirementIncome'
					,cls: 'col-amount what-if-emphasized-money-text'
					,name: 'retirementIncomeSaveMore'
					,monitorChange: 'live'
				},{
					xtype: 'component'
					,cls: 'col-increase'
					,html: '&nbsp;'
				}]
			},{
				// row - Asset retirement income
				items: [{
					autoEl: 'td'
					,cls: 'col-additional-savings'
					,html: '&nbsp;'
				},{
					xtype: 'component'
					,cls: 'col-amount-desc what-if-amount-desc'
					,html: ['<div class="legend-assets chart-legend-icon"><span class="swatch">&nbsp;</span></div>'
							,'Resources from assets']
				},{
					xtype: 'bigmoneytemplatefield'
					,cls: 'col-amount what-if-money-text'
					,name: 'assetsWithdrawalMonthlyAmount'
					,monitorChange: 'live'
				},{
					xtype: 'component'
					,cls: 'col-increase'
					,html: '&nbsp;'
				}]
			},{
				// row - Retirement income
				items: [{
					autoEl: 'td'
					,cls: 'col-additional-savings'
					,html: '&nbsp;'
				},{
					xtype: 'component'
					,cls: 'col-amount-desc what-if-amount-desc'
					,html: ['<div class="legend-income chart-legend-icon"><span class="swatch">&nbsp;</span></div>'
							,'Resources from income']
				},{
					xtype: 'bigmoneytemplatefield'
					,cls: 'col-amount what-if-money-text'
					,monitorChange: 'live'
					,name: 'totalIncomeSourcesAvgMonthlyAmount'
				},{
					xtype: 'component'
					,cls: 'col-increase'
					,html: '&nbsp;'
				}]
			},{
				// row - Horizontal rule for total.
				items: [{
					autoEl: 'td'
					,cls: 'col-additional-savings sub-item'
					,style: 'padding-top: 0 !important; padding-bottom: 0 !important;'
					,html: '&nbsp;'
				},{
					xtype: 'component'
					,cls: 'col-amount-desc sub-item'
					,style: 'padding-top: 0 !important; padding-bottom: 0 !important;'
					,html: '&nbsp;'
				},{
					xtype: 'component'
					,cls: 'col-amount'
					,style: 'padding-top: 0 !important; padding-bottom: 0 !important;'
					,html: '<div class="summary-line"></div>'
				},{
					xtype: 'component'
					,cls: 'col-increase'
					,style: 'padding-top: 0 !important; padding-bottom: 0 !important;'
					,html: '&nbsp;'
				}]
			},{
				// row - Additional retirement income
				items: [{
					autoEl: 'td'
					,cls: 'col-additional-savings'
					,html: '&nbsp;'
				},{
					xtype: 'component'
					,cls: 'col-amount-desc'
					,html: '<span  class="what-if-emphasized-money-text">Total retirement income</span>'
				},{
					xtype: 'bigmoneytemplatefield'
					,id: 'adjustedTotalRetirementIncome'
					,cls: 'col-amount what-if-emphasized-money-text'
					,name: 'totalRetirementIncomeWithSaveMore'
					,monitorChange: 'live'
				},{
					xtype: 'component'
					,cls: 'col-increase'
					,html: '&nbsp;'
				}]
			}]
		}];
		
		me.callParent(arguments);
	}

});