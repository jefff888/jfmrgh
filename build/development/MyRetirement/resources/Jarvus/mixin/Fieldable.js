/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('Jarvus.mixin.Fieldable', {
	extend: 'Ext.form.field.Field'
	
	,initFieldable: function() {
		this.initField();
	}
	
	,markInvalid: function(msg) {
		var me = this;
		
		if(me._error !== msg)
		{
			me._error = msg;
			me.fireEvent('validitychange', me, false, msg);
			me.addCls('field-invalid');
			if (me.el) {
				me.el.set({
					'data-qtip': msg
					,'data-qclass': 'invalid'
				});
			}
		}
	}
	
	,clearInvalid: function() {
		var me = this;
		
		if(me._error)
		{
			me._error = null;
			me.fireEvent('validitychange', me, true);
			me.removeCls('field-invalid');
			if (me.el) {
				me.el.set({
					'data-qtip': ''
					,'data-qclass': ''
				});
			}
		}
	}
	
	,getError: function() {
		return this._error;
	}
});