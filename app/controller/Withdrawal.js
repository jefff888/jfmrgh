/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext, MyRetirement, MyRetirementRemote*/
Ext.define('MyRetirement.controller.Withdrawal', {
	extend: 'Ext.app.Controller'
	,requires: [
		'MyRetirement.API'
	]
	
	,views: [
		'withdrawal.Panel'
	]
	,models: [
		'withdrawal.RateData'
		,'withdrawal.AssetAllocation'
	]
	,refs: [{
		ref: 'withdrawalPanel'
		,selector: 'withdrawal-panel'
	},{
		ref: 'rateContainer'
		,selector: 'withdrawal-panel #withdrawalRate'
	},{
		ref: 'rateTable'
		,selector: 'withdrawal-ratetable'
	},{
		ref: 'withdrawalAverageIncomeCt'
		,selector: 'withdrawal-chartpanel #averageIncome'
	},{
		ref: 'withdrawalAssetAllocationCt'
		,selector: 'withdrawal-chartpanel #assetAllocation'
	}]

	,withdrawalDisplayState: undefined

    ,init: function() {
		var me = this;
		
		me.control({
			'withdrawal-panel': {
				load: me.doLoad
				,save: me.doSave
				,loadcomplete: me.onLoadComplete
			}
			,'withdrawal-ratetable': {
				select: me.onTableSelect
			}
		});
	}

	// AppPanel lifecycle handlers
	,doLoad: function(panel) {
		this.application.log(panel.getItemId()+'.doLoad');
		Ext.suspendLayouts();
		
		var me = this
			,withdrawalPanel = me.getWithdrawalPanel()
			,rateContainer = me.getRateContainer();

		panel.setLoading('Loading&hellip;');
		MyRetirement.model.withdrawal.RateData.load(undefined, {
			success: function(record) {
				me.rateDataRecord = record;
				if (me.withdrawalDisplayState) {
					me.rateDataRecord.set({showRate: me.withdrawalDisplayState});
				}
				withdrawalPanel.setData(record.getData());
				me.updateAllocationChart(record.get('atRetirementAssetAllocation'));
				panel.setLoading(false);
				panel.onLoadComplete();
				Ext.resumeLayouts(true);
			}
			,failure: function() {
				me.application.error('Failed to load withdrawal rate data');
				panel.onLoadFail();
			}
		});		
	}
	
	,doSave: function(panel) {
		this.application.log(panel.getItemId()+'.doSave');
		
		var me = this
			,rateTable = this.getRateTable();

		me.withdrawalDisplayState = me.rateDataRecord.get('showRate');

		if(rateTable.getSelectedButton())
		{
			panel.addFinishedOperation();
		}
		
		return true;
	}
	
	// local methods
	,loadAllocationChart: function() {
		var me = this
			,assetAllocationCt = me.getWithdrawalAssetAllocationCt();
			
		assetAllocationCt.setLoading('Loading&hellip;');
		me.getWithdrawalAssetAllocationModel().load(me.rateDataRecord.get('selectedRiskToleranceAtRetirement'), {
			success: function(record, operation) {
				me.updateAllocationChart(record.getData());
				assetAllocationCt.setLoading(false);
			}
			,failure: function(record, operation) {
				me.application.error('Failed to load asset allocation chart record', record, operation);
			}
		});
	}
	
	,updateAllocationChart: function(allocationData) {
		var me = this
			,assetAllocationCt = me.getWithdrawalAssetAllocationCt()
			,assetAllocationChart = assetAllocationCt.getChart()
			,assetAllocationTitle = assetAllocationCt.getTitle()
			,riskEnum = MyRetirement.API.getEnumerationStore('riskTolerances').getById(allocationData.riskTolerance);
		
		assetAllocationChart.getStore().loadData(allocationData.assetClassRatios);
		assetAllocationChart.loadedRiskTolerance = allocationData.riskTolerance;
		// get scenario title
		assetAllocationTitle.update({
			riskTolerance: riskEnum ? riskEnum.get('label') : '&mdash;'
		});
	}

	// event handlers
	,onLoadComplete: function(panel) {
		var me = this
			,withdrawalAverageIncomeCt = me.getWithdrawalAverageIncomeCt()
			,withdrawalAverageIncomeChart = withdrawalAverageIncomeCt.getChart()
			,withdrawalAverageIncomeTitle = withdrawalAverageIncomeCt.down('charttitle')
			,withdrawalAverageIncomeStore = withdrawalAverageIncomeChart.getStore()
			,withdrawalAverageIncomeRecord = withdrawalAverageIncomeStore.getAt(0)
			,withdrawalAverageIncomeData;

		withdrawalAverageIncomeChart.axes.get(0).maximum =
			me.rateDataRecord.get('maxMyRetirementMonthlyIncome');
		
		// update monthly income chart
		withdrawalAverageIncomeData = {
			'Income': me.rateDataRecord.get('totalIncomeSourcesAvgMonthlyAmount')
			,'Assets': me.rateDataRecord.get('assetsWithdrawalMonthlyAmount')
			,name: 'combined'
		};
		
		if(withdrawalAverageIncomeRecord)
		{
			withdrawalAverageIncomeRecord.set(withdrawalAverageIncomeData);
		}
		else
		{
			withdrawalAverageIncomeRecord = withdrawalAverageIncomeStore.add(withdrawalAverageIncomeData);
		}
		
		withdrawalAverageIncomeTitle.update({
			totalIncome: me.rateDataRecord.get('myRetirementMonthlyIncome')
		});
	}

	,onTableSelect: function(confidence, riskTolerance, rate, btn) {
		var me = this
			,panel = me.getWithdrawalPanel()
			,rateContainer = me.getRateContainer()
			,assetAllocationCt = me.getWithdrawalAssetAllocationCt()
			,assetAllocationChart = assetAllocationCt.getChart()

		me.rateDataRecord.set({
			selectedConfidenceLevel: confidence
			,selectedRiskToleranceAtRetirement: riskTolerance
			,selectedWithdrawalRate: rate
		});
		me.withdrawalDisplayState = me.rateDataRecord.get('showRate');

		// save changes
		panel.startSaveOperation();
		rateContainer.setLoading('Updating&hellip;');
		
		me.rateDataRecord.save({
			success: function(record) {
				if (me.withdrawalDisplayState) {
					record.set({showRate: me.withdrawalDisplayState});
				}
				panel.setData(record.getData());
				rateContainer.setLoading(false);
				panel.finishSaveOperation();
				panel.onLoadComplete();
			}
			,failure: function() {
				me.application.error('Failed to save withdrawal rate', record, operation);
				panel.failSaveOperation();
			}
		});
		
		// reload chart if needed
		if(riskTolerance !== assetAllocationChart.loadedRiskTolerance) {
			me.loadAllocationChart();
		}
	}
});