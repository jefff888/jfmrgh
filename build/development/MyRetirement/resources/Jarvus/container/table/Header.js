/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('Jarvus.container.table.Header', {
	extend: 'Jarvus.container.table.Segment'
	,xtype: 'tableheader'
	
	,columns: []
	,superHeader: false
	
	,autoEl: 'thead'
	,renderTpl: [
		'<tpl if="superHeader"><tr class="merge-with-next">{superHeader}</tr></tpl>'
		,'<tr>'
			,'<tpl for="columns">'
				,'<th class="col-{colCls}<tpl if="colGroup"> group-{colGroup}</tpl>"<tpl if="colSpan"> colspan={colSpan}</tpl><tpl if="hidden"> style="display:none"</tpl>>{title}</th>'
			,'</tpl>'
		,'</tr>'
	]
	
	,beforeRender: function() {
		var me = this
			,superHeader = me.superHeader;
		
		Ext.apply(me.renderData, {
			columns: me.columns
			,superHeader: Ext.isArray(superHeader) ? superHeader.join('') : superHeader
		});
		
		me.callParent();
	}
	
	,setError: function(message) {
		var me = this
			,errorEl = me._errorEl
			,colSpan = 0;
			
		if(errorEl)
		{
			errorEl.down('td').update(message);
			errorEl.show();
		}
		else
		{
			Ext.Array.sum(Ext.Array.map(me.columns, function(column) {
				colSpan += (column.colSpan || 1);
			}));
			
			Ext.DomHelper.useDom = true;
			me._errorEl = me.el.createChild({
				tag: 'tr'
				,cls: 'table-error'
				,cn: {
					tag: 'td'
					,html: message
					,colSpan: colSpan
				}
			}).setVisibilityMode(Ext.Element.DISPLAY);
			Ext.DomHelper.useDom = false;
		}
		
		me.doLayout();
	}
	
	,clearError: function() {
		var me = this
			,errorEl = me._errorEl;
		
		if(errorEl)
		{
			errorEl.hide();
			me.doLayout();
		}
	}
});