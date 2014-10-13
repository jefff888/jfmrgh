/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('Jarvus.field.Field', {
	extend: 'Ext.Component'
	,mixins: {
		fieldable: 'Jarvus.mixin.Fieldable'
	}
	,xtype: 'rawfield'
	
	,tip: null
	,label: null
	
	,focusCls: 'form-focus'
	
	// component template methods
	,initComponent: function() {
		this.callParent(arguments);
		
		// init Field mixin
		this.initFieldable();
	}
	,initEvents: function () {
        var me = this;
        me.callParent();
        me.mon(me.el, 'mouseover', function (ev, t) {
            ev.stopEvent();
            me.fireEvent('mouseover', me, ev, t);
        });
    }
	,initRenderData: function() {
		var me = this;
		return Ext.applyIf(me.callParent(), {
			label: me.label
			,tip: me.tip
			,value: me.value
		});
	}
});