/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('Jarvus.mixin.DataApplicator', {
	
	applyData: function(delta, value) {
		var me = this
			,data = me.data || {}
			,key;
			
		if(!me.tpl)
		{
			return false;
		}
		
		if(!Ext.isObject(delta) && Ext.isDefined(value))
		{
			key = delta;
			delta = {};
			delta[key] = value;
		}
		
		Ext.apply(data, delta);
		me.update(data);
		return data;
	}
});