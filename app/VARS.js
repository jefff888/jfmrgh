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

/*jslint browser: true, undef: true, white: false, laxbreak: true */

/**
 * File description here...
 *
 * User: Jeff.Furgal
 * Date: 6/17/13
 * Time: 2:18 PM
 */

Ext.define('MyRetirement.VARS' , {
	extend: 'Ext.util.Observable'
	,singleton: true
	,config: {
		isStandardMR: undefined
		,isDisclosureRequired: undefined
		,disclosureDisplayable: undefined
		,disclaimerText: undefined
		,caKeepAliveUrl: undefined
		,caKeepAliveValue: undefined
		,caKeepAliveTask: undefined
		,clientProfileId: undefined
		,cfReturnRedirectUrl: undefined
		,contributionLinkUrl: undefined
		,showContributionLink: undefined
		,companyId: undefined
		,adminId: undefined
		,taxLabelConverter: function(value, record) {
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
});
