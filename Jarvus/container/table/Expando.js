/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('Jarvus.container.table.Expando', {
	extend: 'Jarvus.container.table.Segment'
	,xtype: 'tableexpando'
	,requires: [
		'Jarvus.container.table.Row'
		,'Jarvus.container.table.DetailRow'
	]

	,primaryRow: null
	,detailRow: null
	,expanded: false

	,initComponent: function() {
		var me = this;
		
		me.addEvents('expand','collapse');
		
		// init expanded state
		if(me.expanded)
		{
			me.addCls('expanded');
		}

		// compose items list
		if(!me.primaryRow || !me.detailRow)
		{
			Ext.Error.raise('Table expando requires primaryRow and detailRow');
		}
		
		// apply defaults
		if(Ext.isArray(me.primaryRow))
		{
			me.primaryRow = {
				xtype: 'tablerow'
				,items: me.primaryRow
			};
		}
		
		Ext.applyIf(me.detailRow, {
			xtype: 'detailrow'
			,colSpan: me.primaryRow.items.length
		});
		
		// set items
		me.items = [me.primaryRow, me.detailRow];
		
		// call parent - init items
		me.callParent();
		
		// find expand icon
		me.expandCell = me.down('tableexpandcell');
		if(me.expandCell)
		{
			me.expandCell.on('click', me.toggleExpand, me);
		}
	}
	
	,toggleExpand: function() {
		this[this.expanded?'collapse':'expand']();
	}

	,expand: function() {
		var me = this;

		if(!me.expanded)
		{
			me.addCls('expanded');
			me.expanded = true;
			me.updateLayout();
			me.fireEvent('expand', me);
		}
	}
	
	,collapse: function() {
		var me = this;

		if(me.expanded)
		{
			me.removeCls('expanded');
			me.expanded = false;
			me.updateLayout();
			me.fireEvent('collapse', me);
		}
	}
});