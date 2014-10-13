/*
 * Property of SunGard© Data Systems Inc. or its affiliates, all rights reserved.
 * SunGard Confidential.
 *
 * Copyright (c) 1993-2013 Sungard Wealth Management All Rights Reserved.
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

/**
 * Controller class for the consumer personal information tab.
 *
 * User: Jeff.Furgal
 * Date: 5/24/13
 * Time: 4:10 PM
 */
Ext.define('MyRetirement.controller.relius.AboutYouTab', {
	extend: 'Ext.app.Controller'
	,requires: [
		'MyRetirement.model.relius.AboutYou'
	]
	,views: [ 'relius.AboutYouTab' ]
	,models: [ 'relius.AboutYou' ]

	,refs: [{
		ref: 'tabPanel'
		,selector: 'myretirement-viewport #primaryTabs'
	},{
		ref: 'aboutYouPanel'
		,selector: 'myretirement-viewport about-you-tab'
	}]

	,init: function() {
		var me = this;

		me.control({
			'myretirement-viewport about-you-tab': {
				load: me.doLoad
				,save: me.doSave
				,afterrender: me.onAfterRender
			}
		});

	}

	,initialLoadCompleted: false

	// AppPanel lifecycle handlers
	,parentPanel: undefined
	,doLoad: function(parentViewPanel) {
		var me = this;

		if (!me.initialLoadCompleted) {
			this.application.log(parentViewPanel.getItemId()+'.doLoad');

			me.parentPanel = parentViewPanel;
			Ext.suspendLayouts();

			parentViewPanel.setLoading('Loading&hellip;');

			me.getModel('setup.SetupInfo').load(undefined, {
				synchronous: false
				,success: function (record, operation) {}
				,failure: function (record, operation) {
					me.application.error('Failed to load Setup record', record, operation);
				}
			});

			me.getModel('relius.AboutYou').load(undefined, {
				synchronous: true
				,success: function(record, operation) {
					var maritalStatusValue, isDirty;
					parentViewPanel.getForm().loadRecord(record);
					if (me.maritalStatusSelector) {
						maritalStatusValue = record.get('clientPersonMaritalStatusTypeCode');
						if (!maritalStatusValue || maritalStatusValue === '0') {
							maritalStatusValue = '1';
							record.set('clientPersonMaritalStatusTypeCode', maritalStatusValue);
						}
						parentViewPanel.down('[rowPerson=co-client]').setVisible(maritalStatusValue === '2');
						me.maritalStatusSelector.dom.value = maritalStatusValue;
						me.maritalStatusSelector.on('change', me.onMaritalStatusChange, me);
					}
					if (maritalStatusValue == '1') {
						isDirty = record.dirty;
						record.set('spousePersonBirthDate', null);
						record.set('spousePersonGenderTypeCode', '1');
						if (!isDirty) {
							// If the record had been clean before, set it back to clean.
							record.dirty = false;
						}
					}
					parentViewPanel.setLoading(false);
					me.initialLoadCompleted = true;
					parentViewPanel.onLoadComplete();

					Ext.resumeLayouts(true);
				}
				,failure: function(record, operation) {
					parentViewPanel.setLoading(false);
					parentViewPanel.onLoadFail();
					me.application.error('Failed to load client record', record, operation);
				}
			});
		} else {
			parentViewPanel.setLoading(false);
			parentViewPanel.onLoadComplete();
		}
	}

	,doSave: function(parentViewPanel) {
		var me = this
			,form = parentViewPanel.getForm()
			,record = form.getRecord()
			,errors;

		this.application.log(parentViewPanel.getItemId()+'.doSave');
		// update record and validate
		// TODO - Update record is ALWAYS indicating the data is dirty!
		form.updateRecord();
		errors = record.validate();

		// check validity and save to server
		form.clearInvalid();
		if(errors.isValid()) {
			parentViewPanel.startSaveOperation();
			if (record.dirty) {
				parentViewPanel.setLoading('Saving&hellip;');
				record.save({
					synchronous: true
					,success: function() {
/*
						MyRetirement.API.loadClient(MyRetirement.VARS.getClientProfileId(),
							function(clientData) {
								parentViewPanel.finishSaveOperation();
								parentViewPanel.addFinishedOperation();
								parentViewPanel.onSaveComplete();
							}
						);
*/
						parentViewPanel.finishSaveOperation();
						parentViewPanel.addFinishedOperation();
						parentViewPanel.onSaveComplete();
						parentViewPanel.setLoading(false);
					}
					,failure: function(record, operation) {
						var clientName = record.get('clientPersonFirstName') + ' '
								+ record.get('clientPersonLastName');
						parentViewPanel.failSaveOperation();
						parentViewPanel.setLoading(false);
						me.application.error('Client Update Failure', 'For client: ' + clientName,
								'Error message: ' + operation.error);
					}
				});
			} else {
				parentViewPanel.finishSaveOperation();
			}

			return true; // continue to next screen while save happens
		} else {
			form.markInvalid(errors);
			return false;
		}
	}

	,maritalStatusSelector: undefined
	,onAfterRender: function() {
		var me = this
			,maritalStatusWrapper = Ext.ComponentQuery.query('about-you-tab #aboutYouId')[0]
			,coClientBirthDate = Ext.ComponentQuery.query('about-you-tab #spouseBirthDate')[0]
			,coClientBirthDateEl = Ext.get('spouseBirthDate')
			,helpController = me.getController('Help')
			,exitButton
			,rawExitButton
			,printButton
			,helpButton;

		if (maritalStatusWrapper) {
			me.maritalStatusSelector = Ext.get('marital-status-selector');
			me.maritalStatusSelector.name = 'clientPersonMaritalStatusTypeCode';
		}

		if (coClientBirthDate && helpController) {
			coClientBirthDate.on('focus', helpController.onFieldGainFocus, helpController);
			coClientBirthDateEl.on('mouseover', function() {
				helpController.onFieldMouseOver(coClientBirthDate);
			}, helpController);
		}

		// If the disclosure tab is not shown we need to initialize the toolbar and exit button here.
		if (!MyRetirement.VARS.getDisclosureDisplayable()) {
			exitButton = Ext.ComponentQuery.query('myretirement-viewport #exit-button')[0];
			printButton = Ext.ComponentQuery.query('myretirement-viewport #print-button')[0];
			helpButton = Ext.ComponentQuery.query('myretirement-viewport #help-button')[0];

			if (MyRetirement.API.getPrintEnable() && printButton) {
				printButton.show();
			}

			if (helpButton) {
				helpButton.show();
			}

			if (exitButton) {
				rawExitButton = Ext.get('exit-button-raw');
				if (rawExitButton) {
					rawExitButton.on('click', function () {
						var keepAliveTask = MyRetirement.VARS.getCaKeepAliveTask();

                        // Make sure everything gets saved before redirecting.
                        me.application.getController("Viewport").onBeforeDestroy();

						Ext.getBody().mask('Returning&hellip;');
						if (keepAliveTask) {
							keepAliveTask.destroy();
						}
						top.location.href = MyRetirement.VARS.cfReturnRedirectUrl;
					});
				}
			}
		}
	}

	,onMaritalStatusChange: function() {
		var me = this, record = me.parentPanel.getForm().getRecord();

		record.set('clientPersonMaritalStatusTypeCode', me.maritalStatusSelector.dom.value);
		me.parentPanel.down('[rowPerson=co-client]').setVisible(me.maritalStatusSelector.dom.value === '2');
	}
});