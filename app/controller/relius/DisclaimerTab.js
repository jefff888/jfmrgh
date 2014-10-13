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
 * Controller class for the consumer disclaimer acknowledgement tab.
 *
 * User: Jeff.Furgal
 * Date: 5/24/13
 * Time: 4:10 PM
 */
Ext.define('MyRetirement.controller.relius.DisclaimerTab', {
	extend: 'Ext.app.Controller'
	,views: ['relius.DisclaimerTab']

	,refs: [{
		ref: 'tabPanel'
		,selector: 'myretirement-viewport #primaryTabs'
	},{
		ref: 'disclaimerContentPanel'
		,selector: 'disclaimer-tab #disclaimer-content-area'
	},{
		ref: 'agreeButton'
		,selector: 'disclaimer-tab button[action=agree]'
	}]
	,init: function() {
		var me = this;

		me.control({
			'disclaimer-tab button[action=agree]': {
				click: me.onIAgreeClick
			}
			,'disclaimer-tab': {
				load: me.doLoad
				,save: me.doSave
				,afterrender: me.onAfterRender
			}
		});

		me.initialLoadComplete = false;
	}

	// AppPanel lifecycle handlers
	,initialLoadComplete: false
	,doLoad: function(parentViewPanel) {
		this.application.log(parentViewPanel.getItemId()+'.doLoad');
		this.initialLoadComplete = true;
		parentViewPanel.onLoadComplete();
	}

	,doSave: function(parentViewPanel) {
		this.application.log(parentViewPanel.getItemId()+'.doSave');
		parentViewPanel.addFinishedOperation();
		parentViewPanel.onSaveComplete();
	}

	,onIAgreeClick: function(button) {
		var tabPanel = this.getTabPanel()
			,viewportController = this.getController('Viewport')
			,nextPanel = tabPanel.getLayout().getNext()
			,aboutYouTab = tabPanel.child('#aboutYou')
			,printButton = Ext.ComponentQuery.query('myretirement-viewport #print-button')[0]
			,helpButton = Ext.ComponentQuery.query('myretirement-viewport #help-button')[0];

		if (nextPanel) {
			tabPanel.child('#disclaimer').tab.hide();
			tabPanel.items.each(function(aTab, index, listSize) {
				if (aTab.getItemId() != 'disclaimer') {
					aTab.tab.show();
				}
			});

			tabPanel.setActiveTab(aboutYouTab);

			if (MyRetirement.API.getPrintEnable() && printButton) {
				printButton.show();
			}

			if (helpButton) {
				helpButton.show();
			}
		}
	}

	,onAfterRender: function() {
		var me = this, disclaimerPanel = me.getDisclaimerContentPanel()
			,exitButton = Ext.ComponentQuery.query('myretirement-viewport #exit-button')[0]
			,rawExitButton
			,confirmButton = me.getAgreeButton();


		if (MyRetirement.VARS.getDisclaimerText()) {
			disclaimerPanel.update('<h1>Important Information</h1><br/><h3>'
				+ MyRetirement.VARS.getDisclaimerText() + '</h3>');
			if (MyRetirement.VARS.getDisclaimerText().length === 0) {
				confirmButton.setText('Continue');
			}
		} else {
			disclaimerPanel.update('<h1>Important Information</h1><br/><h3>&nbsp;</h3>');
			confirmButton.setText('Continue');
		}

		if (exitButton) {
			rawExitButton = Ext.get('exit-button-raw');
			if (rawExitButton) {
				rawExitButton.on('click', function() {
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
});