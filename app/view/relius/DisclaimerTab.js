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
 * Overall view class for the consumer disclaimer acknowledgement tab.
 *
 * User: Jeff.Furgal
 * Date: 5/22/13
 * Time: 4:30 PM
 */

Ext.define('MyRetirement.view.relius.DisclaimerTab', {
	extend: 'MyRetirement.view.AppPanel'
//	extend: 'Ext.Panel'
	,xtype: 'disclaimer-tab'
	,requires: [
		'MyRetirement.view.LegendFooter'
		,'MyRetirement.view.DataPanel'
		,'Jarvus.container.Raw'
	]

	,backButton: false

	,items: [{
		xtype: 'rawcontainer'
		,itemId: 'appPanelBody'
		,baseCls: 'data-panel-ct'
		,flex: 1
		,defaultType: 'datapanel'
		,items: [{
			cls: 'disclaimerPanel'
			,title: 'Disclaimer'
			,id: 'disclaimer-panel'
			,items: [{
				xtype: 'component'
				,autoEl: 'header'
				,id: 'disclaimer-content-area'
				,cls: 'panel-body-header'
				,html: '<h1>Important Information</h1><br/><h3>&nbsp;</h3>'
			}]
		},{
			xtype: 'rawcontainer'
			,cls: 'main-nav'
			,autoEl: 'nav'
			,defaults: { xtype: 'button', scale: 'large' }
			,items: [{
				text: 'I Agree'
				,id: 'agree-button'
				,ui: 'primary'
				,action: 'agree'
			}]
		}]
	}]

});