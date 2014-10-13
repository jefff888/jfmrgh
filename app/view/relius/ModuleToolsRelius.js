/*jslint browser: true, undef: true, white: false, laxbreak: true */

/**
 * Module tool bar icons and module selection drop-down for consumer-facing/Relius MyRetirement
 * display.
 *
 * User: Jeff.Furgal
 * Date: 6/21/13
 * Time: 3:51 PM
 */

Ext.define('MyRetirement.view.relius.ModuleToolsRelius',{
	extend: 'Ext.Container'
	,xtype: 'myretirement-moduletools-relius'
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
		iconCls: 'module-nav-print'
		,action: 'print'
		,id: 'print-button'
		,hideMode: 'offset'
		// Print button is always hidden for the initial disclaimer tab.
		,hidden: true
	},{
		iconCls: 'module-nav-help'
		,id: 'help-button'
		,hideMode: 'offset'
		,hidden: true
		,action: 'help'
	},{
		xtype: 'component'
		,id: 'exit-button'
		,hidden: false
		,html: '<button id="exit-button-raw" class="participant-exit" value="exit">Exit</button>'
	}]
});
