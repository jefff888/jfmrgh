/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('Jarvus.table.IconCell', {
	extend: 'Ext.Component'
	,xtype: 'tableiconcell'
	
	,iconCls: null
	,href: null
	
	,autoEl: 'td'
	,renderTpl: '<a class="table-icon<tpl if="iconCls"> {iconCls}</tpl>"<tpl if="href"> href="{href}"</tpl>></a>'
	
	,initComponent: function() {
		this.addEvents('click');
		this.callParent();
	}
	
	,beforeRender: function() {
		var me = this;
		
		Ext.apply(me.renderData, {
			iconCls: me.iconCls
			,href: me.href
		});
		
		me.callParent();
	}
	
	,afterRender: function() {
		var me = this;
		
		me.mon(me.el, 'click', function(ev, t) {
			ev.stopEvent();
			
			me.fireEvent('click', me, ev, t);
		});
		
		me.callParent();
	}
});