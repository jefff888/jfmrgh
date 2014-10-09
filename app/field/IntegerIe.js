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

/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('MyRetirement.field.IntegerIe', {
	extend: 'MyRetirement.field.InputIe'
	,xtype: 'integerfieldie'
	,inputCls: 'integer'
	,inputPattern: '[\\-\\d.]+'
	,componentCls: 'field-integer'
	,maskRe: /[0-9,]/

	/**
	 * This is IE specific processing for placeholder text support in IE input fields. When a key
	 * press event occurs we must determine whether or not there is a defined and active placeholder
	 * string for the current field. If the placeholder text is currently being displayed, it must
	 * be removed and replaced with the value of the key press.
	 */
	,onKeyPress: function() {
		var me = this;
		if (Ext.isIE && me.getRawValue() == me.inputPlaceholder) {
			me.removeCls(me.placeholderClassName);
			me.setRawValue('');
			me.addClass(me.inputCls);
		}
		this.callParent(arguments);
	}

	/**
	 * This is IE specific processing for placeholder text support in IE input fields. When an input
	 * field is initialized any defined and active placeholder text must be displayed if there is
	 * no current value in the field.
	 */
	,initValue: function() {
		var me = this;

		this.callParent();
		if (Ext.isIE) {
			me.setRawValue(me.inputPlaceholder);
		}
	}

	/**
	 * This is IE specific processing for placeholder text support in IE input fields. When an input
	 * field looses focus we must determine whether or not it has any current value text in it.
	 * If there is no current value in the field and defined and active placeholder text must be
	 * shown.
	 */
	,onBlur: function() {
		var me = this;

		this.callParent();
		if (Ext.isIE) {
			me.setRawValue(me.valueToDisplay(me.getValue()));
		}
	}

	/**
	 * This is IE specific processing for placeholder text support in IE input fields. When an input
	 * field has defined and active placeholder text we need to avoid applying any input mask if
	 * the field is displaying the placeholder.
	 */
	,processRawValue: function(rawValue) {
		var me = this, processedValue = rawValue;
		if (Ext.isIE) {

			if (rawValue !== me.inputPlaceholder) {
				processedValue = rawValue.replace(/[^\-\d.]/g, '');
			}
		} else {
			processedValue = this.callParent(arguments);
		}

		return processedValue;
	}

	/**
	 * This is IE specific processing for placeholder text support in IE input fields. When an input
	 * field has defined and active placeholder text we must check the passed raw text to see if
	 * it is the placeholder string. If so, it should not be parsed into an Integer value.
	 */
	,rawToValue: function(rawValue) {
		var me = this, processedValue = null;
		if (Ext.isIE) {
			if (rawValue && rawValue !== me.inputPlaceholder) {
				processedValue = parseInt(rawValue, 10);
			}
		} else {
			processedValue = this.callParent(arguments);
		}
		return processedValue;
	}
});