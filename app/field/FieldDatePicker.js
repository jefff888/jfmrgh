
/**
 * Due to the limitations of Jarvus' table fields being based on raw html rather than standard
 * ExtJS input classes, this date picker class will combine the 'Jarvus.field.Field' base class
 * with and Ext.form.field.Date, which is an input date picker implementation.
 *
 * User: Jeff.Furgal
 * Date: 6/26/13
 * Time: 5:20 PM
 */

Ext.define('MyRetirement.field.FieldDatePicker', {
	extend: 'Ext.form.field.Date'
	,xtype: 'fielddatepicker'
	,mixins: {
		fieldable: 'Jarvus.mixin.Fieldable'
	}
	,monitorChange: true
	,validateOnBlur: true
	,validateOnChange: false
	,maskOnDisable: false

	,initEvents: function() {
		var me = this;

		if(me.monitorChange) {
			me.addChangeListener();
		}

		if(me.validateOnChange && (me.maskRe || me.filterKeys)) {
			me.mon(me.inputEl, 'keypress', me.onKeyPress, me);
		}

		me.callParent();
	}

	,addChangeListener: function() {
		var me = this;

		if (me.monitorChange) {
			me.mon(me.inputEl, 'blur', me.changeHandler, me);
			if (me.validateOnChange) {
				me.mon(me.inputEl, 'keyup', me.changeHandler, me);
			}
		}
	}

	,changeHandler: function(ev, t) {
		var me = this;

		if(!me.suspendCheckChange) {
			var oldValue = me.value
				,newValue = me.getValue();

			if(newValue !== oldValue || me.rawDirty) {
				me.setValue(newValue);
			}
		}
	}

	,onBlur: function(theEvent, inputElement) {
		var me = this, onChangeValidationState = me.validateOnChange;

		me.validateOnChange = true;
		this.callParent(arguments);
		me.checkChange();
		me.validateOnChange = onChangeValidationState;
	}

	/**
	 * As FieldDatePicker is built on top of an Ext.form.field.Date, which is made up of tables and
	 * internal form fields, simply setting classes and messages at the base level does not work.
	 * The input field for the date text must be accessed and invalid field styles applied directly
	 * to it. Error messages must also be applied to the standard Ext errors array to be visible in
	 * the table header error bar.
	 *
	 * @param The rollover message to display when an error is detected.
	 * @returns void
	 */
	,markInvalid: function(msg) {
		var me = this, inputField = me.inputCell;

		if(me._error !== msg) {
			me._error = msg;
			if (!me.errors || !Ext.isArray(me.errors)) {
				me.errors = [];
			}
			me.errors.push(msg);
			me.fireEvent('validitychange', me, false, msg);
			if (inputField) {
				inputField.addCls('field-invalid');
				me.el.set({
					'data-qtip': msg
					,'data-qclass': 'invalid'
				});
			}
		}
	}

	/**
	 * As FieldDatePicker is built on top of an Ext.form.field.Date, which is made up of tables and
	 * internal form fields, clearing error messages and formatting is more complex.
	 * The input field for the date text must be accessed and invalid field styles removed directly
	 * from it. Error messages must also be removed from the standard Ext errors array to be cleared
	 * from the table header error bar.
	 */
	,clearInvalid: function() {
		var me = this, inputField = me.inputCell;

		if (me._error || (me.errors && Ext.isArray(me.errors) && me.errors.length > 0)
				|| inputField.hasCls('field-invalid')) {
			me._error = null;
			if (me.errors) {
				Ext.Array.erase(me.errors, 0, me.errors.length);
			}
			me.fireEvent('validitychange', me, true);
			if (inputField) {
				inputField.removeCls('field-invalid');
				me.el.set({
					'data-qtip': ''
					,'data-qclass': ''
				});
			}
		}
	}

	/**
	 * Return the first error encountered. Try the Jarvus special _error attribute first. If that
	 * is empty then call the getErrors function and just return the first message, if any.
	 */
	,getError: function() {
		var me = this, errorObj;

		errorObj = me._error || me.getErrors()[0];
		return errorObj;
	}

	/**
	 * Propigate style changes to the date picker input field. The Jarvus custom tables assume all
	 * form fields are simple one level HTML fields. This is not true of the FieldDatePicker.
	 */
	,addCls: function() {
		var classList;
		if (arguments.length > 0) {
			classList = arguments[0];
			if (classList && classList.length > 0) {
				if (this.inputCell) {
					this.inputCell.addCls(arguments);
				} else {
					this.callParent(arguments);
				}
			}
		}
	}

	/**
	 * Propigate style removals to the date picker input field. The Jarvus custom tables assume all
	 * form fields are simple one level HTML fields. This is not true of the FieldDatePicker.
	 */
	,removeCls: function() {
		var classList;
		if (arguments.length > 0) {
			classList = arguments[0];
			if (classList && classList.length > 0) {
				if (this.inputCell) {
					this.inputCell.removeCls(arguments);
				} else {
					this.callParent(arguments);
				}
			}
		}
	}
});