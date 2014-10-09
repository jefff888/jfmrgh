/*
 * Property of SunGard© Data Systems Inc. or its affiliates, all rights reserved.
 * SunGard Confidential.
 *
 * Copyright (c) 1993-2012 Sungard Wealth Management All Rights Reserved.
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

/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext,MyRetirement*/
Ext.define('MyRetirement.field.RelativeDateForIe', {
	extend: 'MyRetirement.field.RelativeDate'
	,xtype: 'relativedatefieldie'
	,requires: [
		'MyRetirement.field.IntegerIe'
	]

	,initComponent: function() {
		this.callParent(arguments);
	}

	,getMonthsInputField: function(theDefaultValue) {
		var me = this;
		return me.monthsInputField || (me.monthsInputField = Ext.widget({
			xtype: 'integerfieldie'
				,cls: 'subfield-months'
				,ignoreDefaultValue: true
				,defaultValue: theDefaultValue
				,value: theDefaultValue || null
				,disabledPlaceholder: false
				,inputPlaceholder: 'Months'
				,name: me.monthsName || me.baseName+'Months'
		}));
	}
	
	,getYearsInputField: function(theDefaultValue) {
		var me = this;
		return me.yearsInputField || (me.yearsInputField = Ext.widget({
			xtype: 'integerfieldie'
				,cls: 'subfield-years'
				,ignoreDefaultValue: true
				,defaultValue: theDefaultValue
				,value: theDefaultValue || null
				,disabledPlaceholder: false
				,inputPlaceholder: 'Years'
				,name: me.yearsName || me.baseName
		}));
	}
});