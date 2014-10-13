/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext, MyRetirement, MyRetirementRemote*/
Ext.define('MyRetirement.controller.Development', {
	extend: 'Ext.app.Controller'
	,requires: [
		'MyRetirement.API'
		,'Ext.util.Cookies'
		,'Ext.toolbar.Toolbar'
	]
	
	,refs: [{
		ref: 'viewport'
		,selector: 'myretirement-viewport'
	}]
   
	,init: function() {
		var me = this;
		
		me.control({
			'myretirement-viewport button[toggleGroup=devClient]': {
				toggle: me.onClientToggle
			}
			,'myretirement-viewport button[action=reloadApp]': {
				click: me.onReloadClick
			}
			,'apppanel': {
				deactivate: me.onTabDeactivate
				,beforeactivate: me.onBeforeTabActivate
				,beforeload: me.onBeforeTabLoad
				,load: me.onTabLoad
				,loadcomplete: me.onTabLoadComplete
				,beforesave: me.onBeforeTabSave
				,save: me.onTabSave
				,savecomplete: me.onTabSaveComplete
			}
		});
		
		me.application.on('log', me.onLog, me);
	}
	
	,onLaunch: function() {
		this.application.on('viewportready', this.onViewportReady, this);
		
		MyRetirement.API.on('clientdatachange', function(clientData) {
			if(window.console) window.console.log('API.clientdatachange', clientData);
		});
		
		if(window.console) window.console.warn('Development controller active');
	}
	
	,onViewportReady: function(viewport) {
		
		viewport.add({
			xtype: 'toolbar'
			,margin: '20 0 0 0'
			,items: ['DEVELOPMENT TOOLBOX', '->', {
				xtype: 'button'
				,toggleGroup: 'devClient'
				,text: 'Client 1 &mdash; Single'
				,value: '1'
			}, {
				xtype: 'button'
				,toggleGroup: 'devClient'
				,text: 'Client 2 &mdash; Married'
				,value: '2'
			}, '|', {
				xtype: 'button'
				,text: 'Reload'
				,action: 'reloadApp'
			}]
		});
		
		var activeClientBtn = viewport.down('button[toggleGroup=devClient][value='+MyRetirement.API.getSessionToken()+']');
		
		if(activeClientBtn)
			activeClientBtn.toggle(true, true);

	}
	
	,onLog: function(message, url) {
		if(window.console) window.console.log('App log: ', url, message);
	}
	
	,onReloadClick: function() {
		window.location.reload();
	}
	
	,onClientToggle: function(field, pressed) {
		
		if(pressed)
		{
			var viewport = this.getViewport();
			
			viewport.setLoading('Switching client&hellip;');
			MyRetirement.API.loadClient(field.value, function(clientData) {
				viewport.setLoading(false);
			});
			
			Ext.util.Cookies.set('sg_last_client', field.value);
		}
	}
	
	
	// tab lifecycle monitors
	,onTabDeactivate: function(appPanel) {
		this.application.log(appPanel.getItemId()+'.onTabDeactivate');
	}
	
	,onBeforeTabActivate: function(appPanel) {
		this.application.log(appPanel.getItemId()+'.onBeforeTabActivate');
	}
	
	,onBeforeTabLoad: function(appPanel) {
		this.application.log(appPanel.getItemId()+'.onBeforeTabLoad');
	}
	
	,onTabLoad: function(appPanel) {
		this.application.log(appPanel.getItemId()+'.onTabLoad');
	}
	
	,onTabLoadComplete: function(appPanel) {
		this.application.log(appPanel.getItemId()+'.onTabLoadComplete');
	}
	
	,onBeforeTabSave: function(appPanel) {
		this.application.log(appPanel.getItemId()+'.onBeforeTabSave');
	}
	
	,onTabSave: function(appPanel) {
		this.application.log(appPanel.getItemId()+'.onTabSave');
	}
	
	,onTabSaveComplete: function(appPanel) {
		this.application.log(appPanel.getItemId()+'.onTabSaveComplete');
	}
});