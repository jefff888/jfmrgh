/*
 * Property of SunGard© Data Systems Inc. or its affiliates, all rights reserved.
 * SunGard Confidential.
 *
 * Copyright (c) 1993-2013 Sungard Wealth Management All Rights Reserved.
 *
 * This software is the confidential and proprietary information of Sungard Expert Solutions
 * ("Confidential Information"). You shall not disclose such Confidential Information and shall
 * use it only in accordance with the terms of the license agreement you entered into with
 * Sungard Expert Solutions.
 *
 * SUNGARD WEALTH MANAGEMENT MAKES NO REPRESENTATIONS OR WARRANTIES ABOUT THE SUITABILITY OF
 * THE SOFTWARE OR ASSOCIATED DOCUMENTATION, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT
 * LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR
 * NON-INFRINGEMENT. SUNGARD WEALTH MANAGEMENT SHALL NOT BE LIABLE FOR ANY DAMAGES SUFFERED
 * BY LICENSEE AS A RESULT OF USING, MODIFYING OR DISTRIBUTING THIS SOFTWARE OR ITS DERIVATIVES.
 */

/*jslint browser: true, undef: true, white: false, laxbreak: true */

/**
 * Relius custom validations for the About You form.
 *
 * User: Jeff.Furgal
 * Date: 7/1/13
 * Time: 9:54 AM
 */

Ext.define('MyRetirement.validation.Relius', {
	override: 'Ext.data.validations'

	,coClientConditionalPresenceMessage: 'If married, you must provide your spouse\'s identifying information.'
	,coClientConditionalPresence: function(config, value, record) {
		var isMarried = record.get('clientPersonMaritalStatusTypeCode'),
			valueOk = false;

		if (isMarried === '2') {
			valueOk = !!value || value === 0 || value === false;
		} else {
			valueOk = true;
		}

		return valueOk;
	}
	,contributionRangeCheck: function(config, value, record) {
		var valueOk = false;

		if (value >= 0 && value <= 1500 && value % 10 === 0) {
			valueOk = true;
		}

		return valueOk;
	}
});