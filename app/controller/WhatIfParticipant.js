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
Ext.define('MyRetirement.controller.WhatIfParticipant', {
	extend: 'Ext.app.Controller'
	
	,views: [
        'whatif.PanelParticipant'
     ]
    ,models: [
		'whatif.SavingMore'
		,'comparison.Data'
    ]
	,refs: [{
		ref: 'whatIfPanel'
		,selector: 'whatif-panel-participant'
	},{
		ref: 'table'
		,selector: 'whatif-table-participant'
	},{
		ref: 'chart'
		,selector: 'whatif-chart-participant'
	},{
		ref: 'saveMoreSlider'
		,selector: 'whatif-table-participant savemoreslider'
	},{
		ref: 'contribAmount'
		,selector: 'whatif-table-participant #contributionAmount'
	},{
		ref: 'additionalRetirementIncome'
		,selector: 'whatif-table-participant #adjustedRetirementIncome'
	},{
		ref: 'newTotalRetirementIncome'
		,selector: 'whatif-table-participant #adjustedTotalRetirementIncome'
	},{
		ref: 'summary'
		,selector: 'whatif-panel-participant #summary'
	}]

    ,init: function() {
		var me = this;

		me.control({
			'whatif-panel-participant':{
				load: me.doLoad
				,save: me.doSave
				,afterrender: me.onAfterRender
				,activate: me.onActivate
			}
			,'whatif-table-participant savemoreslider': {
				change: me.onSaveMoreSliderChange
			}
			,'whatif-table-participant #contributionAmount': {
				change: me.onContributionAmountFieldChange
			}
			,'whatif-table-participant #increaseParticipantContribution': {
				click: me.onClickIncreaseParticipantContribution
			}
		});
	}

	,taxTypeSelector: 'undefined'

	// AppPanel lifecycle handlers
	,doLoad: function(panel) {
		var me = this
			,tableCmp = me.getTable()
			,chartCmp = me.getChart()
			,summaryCmp = me.getSummary()
			,saveMoreModel
			,tableLoaded = false, chartLoaded = false
			,tryLoadComplete = function () {
				if (tableLoaded && chartLoaded) {
					tableCmp.up('datapanel').setLoading(false);
					panel.onLoadComplete();
					Ext.resumeLayouts();
				}
			};

		this.application.log(panel.getItemId() + '.doLoad');

		// the rest of this method shouldn't run as long as requests are pending.
		if (me.pendingRequests) {
			return;
		}

		Ext.suspendLayouts();
		saveMoreModel = me.getWhatifSavingMoreModel();
		if (!saveMoreModel) {
			saveMoreModel = me.getModel('whatif.SavingMore');
		}
		me.pendingRequests = 0;

		// load additional investment data
		me.pendingRequests++;
		tableCmp.up('datapanel').setLoading('Loading&hellip;');

		//noinspection JSUnresolvedFunction
		saveMoreModel.load(undefined, {
			success: function (record, operation) {
				var taxTypeValue;

				tableCmp.getForm().loadRecord(record);
				tableCmp.up('datapanel').setLoading(false);

				chartCmp.setSavingMoreRecord(record);

				if (me.taxTypeSelector) {
					taxTypeValue = record.get('taxTypeCode');

					// We have to test for zero as it evaluates to false due to JavaScript's
					// "helpful" truthyness mechanism.
					if (!taxTypeValue && taxTypeValue !== 0) {
						taxTypeValue = 2;
					}
					me.taxTypeSelector.dom.value = taxTypeValue;
					me.taxTypeSelector.on('change', me.onTaxTypeChange, me);
				}
				summaryCmp.update(record.getData());
				me.updateIncomeValues(record.get('monthlyContribution'), record);

				me.pendingRequests--;
				//noinspection ReuseOfLocalVariableJS
				tableLoaded = true;

				tryLoadComplete();
			}, failure: function (record, operation) {
				me.application.error('Failed to load Saving More information.', record,
					operation);
				me.pendingRequests--;
				panel.onLoadFail();
				tryLoadComplete();
			}
		});

		// load comparison data, chart isn't ready until both models are available
		me.pendingRequests++;
		chartCmp.setLoading('Loading&hellip;');
		chartCmp.on('chartrefresh', function () {
			chartCmp.setLoading(false);
		}, me, {single: true});

		//noinspection JSUnresolvedFunction
		me.getComparisonDataModel().load(undefined, {
			success: function (record, operation) {
				chartCmp.setComparisonRecord(record);
				me.pendingRequests--;
				//noinspection ReuseOfLocalVariableJS
				chartLoaded = true;
				tryLoadComplete();
			}, failure: function (record, operation) {
				me.application.error('Failed to load comparison record', record, operation);
				me.pendingRequests--;
				tryLoadComplete();
			}
		});
	}

	,onAfterRender: function () {
		var me = this
			,panelTitle
			,taxTypeWrapper = Ext.ComponentQuery.query(
					'whatif-panel-participant #additionalInvestingTable')[0];

		if (taxTypeWrapper) {
			me.taxTypeSelector = Ext.get('tax-type-selector');
			me.taxTypeSelector.name = 'taxTypeCode';

			// Adjust for IE9 in Document Quirks mode.
			if (Ext.isIE8) {
				panelTitle = Ext.get('whatif-panel-title');
				panelTitle.removeCls('save-more-title');
				panelTitle.addCls('save-more-title-quirks9');
			}
		}
	}

	,chartRefreshTask: undefined
	,chartRefresh: function() {
		var me = this
			,summaryCmp = me.getSummary();

		if (!me.chartRefreshTask) {
			me.chartRefreshTask = new Ext.util.DelayedTask(function() {
				var self = this
					,record = me.getTable().getForm().getRecord();

				me.updateIncomeValues(record.get('monthlyContribution'), record);
				summaryCmp.update(record.getData());

				// Now update What-If Chart
				if (self.getChart() && self.getChart().getComparisonRecord()) {
					self.getChart().refreshChart();
				}
			}, me)
		}

		me.chartRefreshTask.delay(250);
	}

	,onActivate: function() {
		var me = this;

		if (me.chartRefreshTask) {
			me.chartRefreshTask.cancel();
		}
	}

	,onTaxTypeChange: function () {
		var me = this, taxWorkField
			,record = me.getTable().getForm().getRecord();

		record.set('taxTypeCode', me.taxTypeSelector.dom.value);
		// Force the tax type label field to update.
		taxWorkField = MyRetirement.VARS.taxLabelConverter(me.taxTypeSelector.dom.value, record);
		record.set('taxTypeLabel', taxWorkField);

		// Now update What-If Chart
		me.chartRefresh();
	}

	,sliderUpdateLocked: false
	,contributionFieldUpdateLocked: false
	// event handlers
	,unlockSliderTask: undefined
	,onSaveMoreSliderChange: function(slider, newValue, thumb) {
		var me = this;

		me.sliderUpdateLocked = true;
		me.getTable().getForm().getRecord().set('monthlyContribution', newValue);
		if (!me.contributionFieldUpdateLocked) {
			me.getContribAmount().setValue(newValue);
		} else {
			if (slider) {
				slider.setValue(newValue);
			}
		}

		if (!me.unlockSliderTask) {
			me.unlockSliderTask = Ext.TaskManager.newTask({
				run: function() { this.sliderUpdateLocked = false; }
				,scope: me
				,interval: 50
				,repeat: 1
			});
		}

		me.unlockSliderTask.start();
	}

	,unlockContributionFieldTask: undefined
	,onContributionAmountFieldChange: function(field, newValue, oldValue) {
		var me = this
			,record = me.getTable().getForm().getRecord();

		me.contributionFieldUpdateLocked = true;
		if (!me.sliderUpdateLocked) {
			me.getSaveMoreSlider().setValue(newValue);
		} else {
			if (field) {
				field.setValue(newValue);
			}
		}
		record.set('monthlyContribution', newValue);

		if (!me.unlockContributionFieldTask) {
			me.unlockContributionFieldTask = Ext.TaskManager.newTask({
				run: function() { this.contributionFieldUpdateLocked = false; }
				,scope: me
				,interval: 50
				,repeat: 1
			});
		}

		me.unlockContributionFieldTask.start();
		me.contributionFieldUpdateLocked = false;

		// Now update What-If Chart
		me.chartRefresh();
	}

	,onClickIncreaseParticipantContribution: function() {
		var me = this
			,myParent = me.getWhatIfPanel()
			,record = me.getTable().getForm().getRecord()
			,contributionAmount = record.get('monthlyContribution')
			,fullLinkUrl = MyRetirement.VARS.contributionLinkUrl +
				    (MyRetirement.VARS.contributionLinkUrl.indexOf('?') >= 0
				    ? '&AdditionalContribution='
				    : '?AdditionalContribution=')
					+ contributionAmount
			,keepAliveTask = MyRetirement.VARS.getCaKeepAliveTask();
		Ext.MessageBox.confirm('Leave MyRetirement?', 'Clicking on the \'Increase Plan Contributions\' '
				+ 'button will cause you to leave MyRetirement and move to an account management '
				+ 'page where you can change your contribution.'
				+ '<p>&nbsp;<p>Proceed?',
			function(buttonText) {
				if (buttonText == 'yes') {
					myParent.save();

					if (keepAliveTask) {
						keepAliveTask.destroy();
					}
					top.location.href = fullLinkUrl;
				}
			}
		);
	}

	/**
	 * This is here just for the synchronization operations that happen during the default save
	 * when a tab is deactivated.
	 */
	,doSave: function(parentViewPanel) {
		var me = this
			,form = me.getTable().getForm()
			,record = form.getRecord()
			,errors;

		this.application.log(parentViewPanel.getItemId() + '.doSave');

		// update record and validate
		form.updateRecord();
		errors = record.validate();

		// check validity and save to server
		form.clearInvalid();

		if (errors.isValid()) {
			parentViewPanel.startSaveOperation();

			if (record.dirty) {
				record.save({
					synchronous: false,
					success: function () {
						parentViewPanel.finishSaveOperation();
						parentViewPanel.onSaveComplete();
					},failure: function () {
						parentViewPanel.failSaveOperation();
					}
				});
			}
			else {
				parentViewPanel.finishSaveOperation();
			}

			return true; // continue to next screen while save happens
		}
		else {
			form.markInvalid(errors);
			return false;
		}
	}

	/**
	 * Determines the change in monthly account value based on the passed contribution amount
	 * and data model record values.
	 *
	 * @param contributionAmount The amount of additional monthly savings to base the calculation on.
	 * @param record The data model record instance to use.
	 */
	,calcAdditionalMonthlyAccountValue: function(contributionAmount, record) {
		var taxType = record.get('taxTypeCode')
			,growthFactor, additionalValue;

		switch (taxType) {
			case 1:
				growthFactor = record.get('growthFactorTaxFree');
				break;

			case 2:
				growthFactor = record.get('growthFactorTaxDef');
				break;

			case 0:
			default:
				growthFactor = record.get('growthFactorTaxed');
				break;
		}

		additionalValue = growthFactor * contributionAmount;

		record.set('additionalMonthlyAccountValue', additionalValue);
	}

	/**
	 * Determines the change in monthly income based on the passed data model record values.
	 *
	 * @param record The data model record instance to use.
	 */
	,calcAdditionalMonthlyIncome: function(record) {
		var additionalIncome
			,newAccountValue = record.get('additionalMonthlyAccountValue')
			,withdrawRate = record.get('withdrawalRate')
			,timeValueFactor = record.get('timeValuePVIFFactor')
			,taxType = record.get('taxTypeCode')
			,retirementAvgTaxRate = record.get('duringRetirementAverageTaxRate');

		additionalIncome = Math.round((newAccountValue * withdrawRate) * timeValueFactor);
		if (taxType === 2) {
			additionalIncome *= (1.0 - retirementAvgTaxRate);
		}
		record.set('retirementIncomeSaveMore', additionalIncome);
		record.set('additionalMonthlyIncome', additionalIncome);

		return additionalIncome;
	}

	,updateIncomeValues: function(newValue, record) {
		var me = this, totalMonthlyIncome, assetMonthlyIncome
			,currentAvgMonthlyIncome ,additionalMonthlyIncome
			,additionalRetirementIncome = me.getAdditionalRetirementIncome()
			,newTotalRetirementIncome = me.getNewTotalRetirementIncome();

		// Update data model with adjusted income.
		me.calcAdditionalMonthlyAccountValue(newValue, record);
		additionalMonthlyIncome = me.calcAdditionalMonthlyIncome(record);
		currentAvgMonthlyIncome = record.get('totalIncomeSourcesAvgMonthlyAmount');
		assetMonthlyIncome = record.get('assetsWithdrawalMonthlyAmount');
		totalMonthlyIncome = currentAvgMonthlyIncome + assetMonthlyIncome + additionalMonthlyIncome;
		record.set('totalRetirementIncomeWithSaveMore', Math.round(totalMonthlyIncome));

		// Now update What-If Table
		if (additionalRetirementIncome && additionalRetirementIncome.setValue) {
			additionalRetirementIncome.setValue(additionalMonthlyIncome);
		}

		if (newTotalRetirementIncome && newTotalRetirementIncome.setValue) {
			newTotalRetirementIncome.setValue(Math.round(totalMonthlyIncome));
		}
	}
});