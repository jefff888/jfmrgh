/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('Jarvus.container.table.DetailRow', {
	extend: 'Ext.container.Container'
	,xtype: 'detailrow'
	,requires: [
		'Ext.layout.component.Body'
		,'Jarvus.layout.container.AutoTarget'
	]
	
	,colSpan: 1
	
	,componentLayout: 'body'
	,layout: 'autotarget'
	,defaultType: 'component'
	
	,autoEl: 'tr'
	,baseCls: 'details-row'
	,childEls: ['body']
	,renderTpl: [
		'<td id="{id}-innerCell"<tpl if="colSpan &gt; 1"> colspan="{colSpan}"</tpl>>'
			,'<div id="{id}-body" class="td-ct">'
				,'{%this.renderContainer(out,values)%}'
			,'</div>'
		,'</td>'
	]
	
	,initRenderData: function() {
		var me = this;
		return Ext.apply(me.callParent(), {
			colSpan: me.colSpan
		});
	}
	
//	,getContentTarget: function() {
//		return this.body;
//	}
	
	,getTargetEl: function() {
		return this.body;
	}
});