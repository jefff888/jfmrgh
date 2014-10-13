/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext, MyRetirement, MyRetirementRemote*/
Ext.define('MyRetirement.view.AppPanel',{
	extend: 'Ext.Panel'
	,xtype: 'apppanel'
	,requires: [
		'MyRetirement.view.DataPanel'
		,'Jarvus.container.Raw'
	]

	,footerType: null
	,chartType: null
	,backButton: true
	,nextButton: true
	,loadCompleted: false
	,baseCls: 'app-panel'
	,autoEl: 'form'
	,layout: {
		type: 'hbox'
		,align: 'stretch'
	}
	
	
	// component template methods
	,initComponent: function() {
		var me = this
			,innerItems = me.items || [];
		
		me.addEvents('beforesave', 'save', 'savecomplete', 'beforeload', 'load', 'loadcomplete','done');
		
		me.savesInProgress = 0;
		me.savesFinished = 0;
		me.savesFailed= 0;

		if (me.itemId !== 'disclaimer') {
			if (!Ext.isArray(innerItems)) {
				innerItems = [innerItems];
			}

			innerItems.push({
				xtype: 'rawcontainer'
				,cls: 'main-nav'
				,autoEl: 'nav'
				,defaults: { xtype: 'button', scale: 'large' }
				,items: [(
					me.backButton ? {
						text: 'Back'
						,ui: 'secondary'
						,action: 'back'
				} : null)
				,(me.nextButton ? {
						text: 'Next'
						,ui: 'primary'
						,action: 'next'
				} : null)
				,((me.doneButton || !me.nextButton) && MyRetirement.API.printEnable ? {
						text: 'Create Report'
						,ui: 'primary'
						,hidden: me.nextButton ? true : false, action: 'done'
				} : null)]
			});

			me.items = [{
				xtype: 'rawcontainer'
				,itemId: 'appPanelBody'
				,baseCls: 'data-panel-ct'
				,flex: 1
				,defaultType: 'datapanel'
				,items: innerItems
			}];
		}
		
		if(me.chartType)
		{
			me.items.push({
				xtype: me.chartType
			});
		}
		else
		{
			me.addCls('no-chart');
		}
		
		me.dockedItems = [{
			xtype: me.footerType || 'component'
			,autoEl: 'footer'
			,baseCls: 'app-footer'
			,dock: 'bottom'
			,weight: -1
		}];

		me.callParent(arguments);
		
	}
	
	
	// local methods
	,load: function() {
		var me = this;
		me.loadCompleted = false;
		if(false !== me.fireEvent('beforeload', me))
		{
			return me.fireEvent('load', me);
		}
		
		return false;
	}
	// Fire event to leave module and launch client snapshot
	,done: function() {
		var me = this;
		me.save();
		return me.fireEvent('done', me);
	}
	
	// invoked by controller after records have been loaded or updated by a save
	,onLoadComplete: function() {
		this.fireEvent('loadcomplete', this);
		this.loadCompleted = true;
	}

	,onLoadFail: function() {
		this.loadCompleted = true;
		this.setLoading(false);
	}

	,save: function() {
		var me = this;		
		if (!me.loadCompleted)
		{
			// alert('Load not completed. Unable to save');
			this.syncTabClasses();
			return false;
		}
		
		if(false !== me.fireEvent('beforesave', me))
		{
			return me.fireEvent('save', me);
		}
		
		return false;
	}
	
	// invoked by controller after records have been saved
	,onSaveComplete: function() {
		this.fireEvent('savecomplete', this);
	}
	
	
	// utility methods for tracking aggregate state of save operations
	,startSaveOperation: function() {
		this.savesInProgress++;
		this.syncTabClasses();
	}
	
	,finishSaveOperation: function() {
		this.savesInProgress--;
		this.savesFinished++;
		this.syncTabClasses();
	}
	
	,failSaveOperation: function() {
		this.savesInProgress--;
		this.savesFailed++;
		this.syncTabClasses();
	}
	
	,addFinishedOperation: function() {
		this.savesFinished++;
		this.syncTabClasses();
	}

	,syncTabClasses: function() {
		var me = this;
		
		if(me.savesInProgress > 0)
		{
			this.tab.removeCls('complete error');
			this.tab.addCls('saving');
		}
		else if(me.savesFailed > 0)
		{
			this.tab.removeCls('saving complete');
			this.tab.addCls('error');
		}
		else if(me.savesFinished > 0)
		{
			this.tab.removeCls('saving error');
			this.tab.addCls('complete');
		}
	}
});