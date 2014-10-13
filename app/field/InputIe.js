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
Ext.define('MyRetirement.field.InputIe', {
	extend: 'Jarvus.field.Input'
	,xtype: 'inputfieldie'
	,placeholderClassName: 'input-placeholder'
	,defaultValue: null
	,ignoreDefaultValue: false

	/**
	 * Convert a mixed-type value to a raw representation suitable for displaying in the field.
	 * This allows controlling how value objects passed to {@link #setValue} are shown to the user,
	 * including localization. For instance, for a {@link Ext.form.field.Date}, this would control
	 * how a Date object passed to {@link #setValue} would be converted to a String for display in
	 * the field.
	 *
	 * See {@link #rawToValue} for the opposite conversion.
	 *
	 * The base implementation simply does a standard toString conversion, and converts
	 * {@link Ext#isEmpty empty values} to an empty string. However this override provides
	 * simulated HTML 5 place holder support on input fields for IE browsers. IE does not yet
	 * support this feature.
	 *
	 * @param {Object} value The mixed-type value to convert to the raw representation.
	 * @return {Object} The converted raw value.
	 */
	,valueToRaw: function(value) {
		if (Ext.isIE) {
			var me = this;
			return '' + Ext.value(me.valueToDisplay(value), '');
		} else {
			return this.callParent(arguments);
		}
	}

	/**
	 * This is the IE specific processing for placeholder text support in IE input fields. Currently
	 * (up through version 9.0) IE does not support an HTML 5 input field option for display of
	 * placeholder text in an input field.
	 *
	 * When converting a mixed-type value to a raw representation suitable for displaying in the
	 * field, whether or not there is defined and active placeholder text must be taken into
	 * consideration.
	 *
	 * The following constraints need to be accounted for when determining what value to return for
	 * display:
	 *
	 * actual value   use Default   use Placeholder   Display value
	 * ------------------------------------------------------------
	 * null/empty   |    true     |       true      |  place holder
	 * null/empty   |    false    |       true      |  place holder
	 * null/empty   |    true     |       false     |  default value
	 * null/empty   |    false    |       false     |  empty
	 * default value|  true/false |       true      |  place holder
	 * default value|  true/false |       false     |  default value
	 * non-default  |  true/false |    true/false   |  the value
	 *
	 * @param {Object} value The mixed-type value to convert to the raw representation.
	 * @return {Object} The converted raw value, possibly having th value of the placeholder text.
	 */
	,valueToDisplay: function(value) {
		var me = this;
		var convertedValue = value; // All permutations not tested for below return the passed value.

		if (Ext.isEmpty(value)) { // No value -- only placeholder flag matters
			if (!me.disabledPlaceholder && me.inputPlaceholder) {
				convertedValue = me.inputPlaceholder;
			} else if (me.defaultValue && !me.ignoreDefaultValue) {
				convertedValue = me.defaultValue;
			}
		} else { // Value exists -- placeholder and default flags, and value matter
			if (me.defaultValue && value === me.defaultValue) {
				if (!me.disabledPlaceholder && me.inputPlaceholder) {
					convertedValue = me.inputPlaceholder;
				} else {
					convertedValue = me.defaultValue;
				}
			}
		}

		if (convertedValue !== me.inputPlaceholder) {
			me.removeCls(me.placeholderClassName);
			me.addClass(me.inputCls);
		}
		return convertedValue;
	}
});