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

Ext.define('MyRetirement.model.relius.AboutYou', {
	extend: 'Ext.data.Model'
	,requires: [
		'MyRetirement.proxy.Direct'
		,'MyRetirement.validation.Relius'
	]

	,proxy: {
		type: 'apidirect'
		,api: {
			read: 'MyRetirementRemote.setupService.getClient'
			,update: 'MyRetirementRemote.setupService.updateClient'
		}
	}
	,fields: [
		// Common
		{ name: 'id'	                                ,type: 'string' }
		,{ name: 'clientPersonMaritalStatusTypeCode'	,type: 'string' }

		// client-personal
		,{ name: 'clientPersonFirstName'			,allowBlank: false, useNull: true, type: 'string' }
		,{ name: 'clientPersonLastName'				,allowBlank: false, useNull: true, type: 'string' }
		,{ name: 'clientPersonBirthDate'			,useNull: true, type: 'date', format: 'm/d/Y' }
		,{ name: 'clientPersonGenderTypeCode'		,type: 'string', defaultValue: '1' }

		// spouse-personal
		,{ name: 'spousePersonFirstName'			,defaultValue: '', useNull: false, type: 'string' }
		,{ name: 'spousePersonLastName'			    ,defaultValue: '', useNull: false, type: 'string' }
		,{ name: 'spousePersonBirthDate'			,useNull: true, type: 'date', format: 'm/d/Y' }
		,{ name: 'spousePersonGenderTypeCode'		,type: 'string', defaultValue: '1' }
	]
	,validations: [
		{ type: 'presence', field: 'clientPersonFirstName', message: 'You must provide your first name.' }
		,{ type: 'presence', field: 'clientPersonLastName', message: 'You must provide your last name.' }
		,{ type: 'presence', field: 'clientPersonBirthDate', message: 'Your birth date is required.' }

		// Spouse/Co-client validations
		,{ field: 'spousePersonFirstName' ,type: 'coClientConditionalPresence',
			message: 'If married, you must provide your spouse\'s first name.' }
		,{ field: 'spousePersonLastName' ,type: 'coClientConditionalPresence',
			message: 'If married, you must provide your spouse\'s last name.' }
		,{ field: 'spousePersonBirthDate' ,type: 'coClientConditionalPresence',
			message: 'If married, your spouse\'s birth date is required.' }
	]
	
});