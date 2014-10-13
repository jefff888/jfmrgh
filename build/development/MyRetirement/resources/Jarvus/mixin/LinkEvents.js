/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('Jarvus.mixin.LinkEvents', {
	
	initLinkEvents: function() {
		var me = this;
		me.mon(me.el, 'click', function(ev, t) {
			if(t.hash.length > 1)
			{
				ev.stopEvent();
				me.fireEvent(t.hash.substr(1)+'click', me, ev, t);
			}
		}, null, {delegate: 'a'});
	}
});