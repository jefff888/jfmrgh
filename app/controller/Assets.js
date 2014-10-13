/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext, MyRetirement, MyRetirementRemote*/
Ext.define('MyRetirement.controller.Assets', {
	extend: 'Ext.app.Controller'

	,views: [
		'assets.Panel'
	]
    ,stores: [
		'asset.Retirement'
		,'asset.Investment'
		,'asset.Growth'
    ]
	,models: [
		'asset.RetirementComposition'
		,'asset.Growth'
	]
    ,refs: [{
		ref: 'assetsPanel'
		,selector: 'assets-panel'
    },{
		ref: 'retirementAccountsPane'
		,selector: 'assets-panel #retirement'
    },{
		ref: 'retirementTable'
		,selector: 'assets-retirementaccounttable'
    },{
		ref: 'investmentAccountsPane'
		,selector: 'assets-panel #investment'
    },{
		ref: 'investmentTable'
		,selector: 'assets-investmentaccounttable'
	},{
		ref: 'compositionChartCt'
		,selector: 'assets-chartpanel #assetComposition'
	},{
		ref: 'growthChartCt'
		,selector: 'assets-chartpanel #assetGrowth'
	},{
		ref: 'compositionSelectField'
		,selector: 'assets-chartpanel #assetComposition selectfield'
	}]

    ,init: function() {
		var me = this;

		me.control({
			'assets-panel':{
				load: me.doLoad
				,save: me.doSave
			}
			,'assets-panel dataheader': {
				expandallclick: me.onExpandAllClick
				,collapseallclick: me.onCollapseAllClick
				,addclick: me.onAddClick
			}
			,'assets-chartpanel #assetComposition selectfield': {
				change: me.onCompositionSelectChange
			}
		});
	}
	

	// AppPanel lifecycle handlers
	,doLoad: function(panel) {
		this.application.log(panel.getItemId()+'.doLoad');
		
		Ext.suspendLayouts();
		
		var me = this
			,investmentTable = me.getInvestmentTable()
			,retirementTable = me.getRetirementTable()
			,workPane
			,investmentLoaded = false, retirementLoaded = false, compositionLoaded = false, growthLoaded = false
			,tryLoadComplete = function() {
				if(investmentLoaded && retirementLoaded && compositionLoaded && growthLoaded)
				{
					panel.onLoadComplete();
					Ext.resumeLayouts(true);
				}
			};
		
		// load investment table
		investmentTable.up('datapanel').setLoading('Loading&hellip;');
		investmentTable.getStore().load({
			callback: function() {
				investmentTable.up('datapanel').setLoading(false);
				investmentLoaded = true;
				tryLoadComplete();
				investmentTable.getStore().filterBy(me.investmentEmptyFilter);
			}
			,exception: function() {
				me.application.error('Failed to load investment asset data');
			}
		});
		
		// load retirement table
		retirementTable.up('datapanel').setLoading('Loading&hellip;');
		retirementTable.getStore().load({
			callback: function() {
				retirementTable.up('datapanel').setLoading(false);
				retirementLoaded = true;
				tryLoadComplete();
				retirementTable.getStore().filterBy(me.retirementEmptyFilter);
			}
			,exception: function() {
				me.application.error('Failed to load retirement asset data');
			}
		});

		if (Ext.isIE7) {
			workPane = me.getRetirementAccountsPane();
			workPane.removeCls('assets-retirementaccounts');
			workPane = me.getInvestmentAccountsPane();
			workPane.removeCls('assets-investmentaccounts');
		}
		
		// load asset composition chart
		me.loadCompositionChart(panel, function() {
			compositionLoaded = true;
			tryLoadComplete();
		});
		
		// load asset growth chart
		me.loadGrowthChart(panel, function() {
			growthLoaded = true;
			tryLoadComplete();
		});
	}
	
	,doSave: function(panel) {
		var me = this, retirementStore = me.getStore('asset.Retirement')
			,investmentStore = me.getStore('asset.Investment')
			,success = true;
			
		me.application.log(panel.getItemId()+'.doSave');

//		retirementStore.filterBy(me.retirementEmptyFilter);
		success &= me.saveRetirement(panel);

//		investmentStore.filterBy(me.investmentEmptyFilter);
		success &= me.saveInvestment(panel);
		
		if(success)
		{
			me.loadCompositionChart(panel);
			me.loadGrowthChart(panel);
		}
		
		return Boolean(success);
	}

	,retirementEmptyFilter: function(record) {
		var shouldUse, noDescription, noBalance, noContribution, noEmpContribution
			,description = record.get('name')
			,balance = record.get('currentBalance')
			,contribution = record.get('annualContribution')
			,empContribution = record.get('employerContribution');

		noDescription = !description || Ext.String.trim(description) === '';
		noBalance = !balance || balance === 0.0;
		noContribution = !contribution || contribution === 0.0;
		noEmpContribution = !empContribution || empContribution === 0;

		shouldUse = !(noDescription && noBalance && noContribution && noEmpContribution);

		return shouldUse;
	}

	,investmentEmptyFilter: function(record) {
		var shouldUse, noDescription, noBalance
			,description = record.get('name')
			,balance = record.get('currentBalance');

		noDescription = !description || Ext.String.trim(description) === '';
		noBalance = !balance || balance === 0.0;

		shouldUse = !(noDescription && noBalance);

		return shouldUse;
	}

	// member methods
	,loadCompositionChart: function(panel, callback, scope) {
		var me = this
			,compositionChartCt = me.getCompositionChartCt()
			,compositionChartTitle = compositionChartCt.getTitle()
			,selectedComposition = me.getCompositionSelectField().getValue();
			
		if(!selectedComposition)
		{
			return;
		}
			
		compositionChartCt.setLoading('Loading&hellip;');
		me.getAssetRetirementCompositionModel().load(undefined, {
			success: function(record, operation) {
				me.assetCompositionRecord = record;
				
				compositionChartCt.getChart().getStore().loadData(record.get(selectedComposition));
				
				compositionChartTitle.update(record.getData());
				
				compositionChartCt.setLoading(false);
				Ext.callback(callback, scope||me);
			}
			,failure: function(record, operation) {
				me.application.error('Failed to load asset chart record', record, operation);
			}
		});
	}
	
	,loadGrowthChart: function(panel, callback, scope) {
		var me = this
			,growthChartCt = me.getGrowthChartCt()
			,minYear = 9999, maxYear = 0;
			
		if (MyRetirement.API.getHasIncome()) {
			growthChartCt.setVisible(true);
			growthChartCt.setLoading('Loading&hellip;');
			me.getAssetGrowthModel().load(undefined, {
				success: function(record, operation) {
					var assetsToRetirement = record.get('assetsToRetirement');
					if (assetsToRetirement.length > 0) {
						// pad with blank years
						while(assetsToRetirement[0].year % 5 !== 0)
						{
							assetsToRetirement.unshift({
								year: assetsToRetirement[0].year - 1
							});
						}
						
						while(assetsToRetirement[assetsToRetirement.length-1].year % 5 !== 0)
						{
							assetsToRetirement.push({
								year: assetsToRetirement[assetsToRetirement.length-1].year + 1
							});
						}
										
						me.getAssetGrowthStore().loadData(assetsToRetirement);
					}
					else {
						growthChartCt.setVisible(false);
					}
					growthChartCt.setLoading(false);
					Ext.callback(callback, scope||me);
				}
				,failure: function(record, operation) {
					me.application.error('Failed to load asset chart record', record, operation);
				}
			});
		} else {
			growthChartCt.setVisible(false);
			Ext.callback(callback, scope||me);
		}	
			
	}
	,saveRetirement: function(panel) {
		var me = this
			,retirementTable = me.getRetirementTable()
			,store = retirementTable.getStore()
			,storeErrors;
		
		storeErrors = retirementTable.syncAllRecords();
		
		if(storeErrors.length === 0)
		{
			panel.startSaveOperation();
			if(store.getModifiedRecords().length || store.getRemovedRecords().length)
			{
				retirementTable.up('datapanel').setLoading('Saving&hellip;');
				store.sync({
					scope: me
					,success: function(){
						retirementTable.up('datapanel').setLoading(false);
						panel.finishSaveOperation();
					}
					,failure: function() {
						retirementTable.up('datapanel').setLoading(false);
						panel.failSaveOperation();
					}
				});
			}
			else
			{
				panel.finishSaveOperation();
			}
			return true;
		}
		else
		{
//			console.log('storeErrors', storeErrors);
			return false;
		}
	}
	
	,saveInvestment: function(panel) {
		var me = this
			,investmentTable = me.getInvestmentTable()
			,store = investmentTable.getStore()
			,storeErrors;
		
		storeErrors = investmentTable.syncAllRecords();
		
		if(storeErrors.length === 0)
		{
			panel.startSaveOperation();
			if(store.getModifiedRecords().length || store.getRemovedRecords().length)
			{
				investmentTable.up('datapanel').setLoading('Saving&hellip;');
				store.sync({
					scope: me
					,success: function(){
						investmentTable.up('datapanel').setLoading(false);
						panel.finishSaveOperation();
					}
					,failure: function() {
						investmentTable.up('datapanel').setLoading(false);
						panel.failSaveOperation();
					}
				});
			}
			else
			{
				panel.finishSaveOperation();
			}
			return true;
		}
		else
		{
//			console.log('storeErrors', storeErrors);
			return false;
		}
	}


	// event handlers
	,onExpandAllClick: function(dataHeader) {
		dataHeader.up('datapanel').down('listfieldtable').expandAll();
	}
	
	,onCollapseAllClick: function(dataHeader) {
		dataHeader.up('datapanel').down('listfieldtable').collapseAll();
	}
	
	,onAddClick: function(dataHeader) {
		//var newAsset = new dataHeader.up('datapanel').down('listfieldtable').getStore().recordType ({value: '100%'});
		
		dataHeader.up('datapanel').down('listfieldtable').getStore().add({});
	}
	
	,onCompositionSelectChange: function(field, value) {
		this.getCompositionChartCt().getChart().getStore().loadData(this.assetCompositionRecord.get(value));
	}
	
});