/*jslint browser: true, undef: true, white: false, laxbreak: true */

/**
 * Module tool bar icons and module selection drop-down for standard MyRetirement display.
 *
 * User: Jeff.Furgal
 * Date: 6/21/13
 * Time: 3:51 PM
 */

Ext.define('MyRetirement.view.ModuleTools',{
	extend: 'Ext.Container'
	,xtype: 'myretirement-moduletools'
	,requires: [
		'MyRetirement.field.Enumeration'
	]
	,cls: 'module-nav'
	,id: 'nav-container'
	,layout: {
		type: 'hbox'
		,align: 'middle'
		,pack: 'end'
	}
	,defaults: {
		xtype: 'button'
		,ui: 'plain'
	}
	,items: [{
		iconCls: 'module-nav-edit'
		,id: 'edit-button'
		,action: 'edit'
	},{
		iconCls: 'module-nav-print'
		,action: 'print'
		,id: 'print-button'
		,hideMode: 'visibility'
		// Suppress or show Print button based on Admin settings, determined in controller.
		,hidden: true
	},{
		iconCls: 'module-nav-help'
		,id: 'help-button'
		,action: 'help'
	},{
		xtype: 'enumerationfield'
		,enumerationsStore: 'wsModuleList'
		,itemId: 'moduleNavSelect'
		,monitorChange: true
		,hideMode: 'display'
		,height: 'auto'
		,width: 'auto'
	}]
});
