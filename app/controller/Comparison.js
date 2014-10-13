/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext, MyRetirement, MyRetirementRemote*/
Ext.define('MyRetirement.controller.Comparison', {
	extend: 'Ext.app.Controller'

	,views: [
		'comparison.Panel'
	]
	,models: [
		'comparison.TakeHomePay'
		,'comparison.Budget'
		,'comparison.Data'
	]
    
	,refs: [{
		ref: 'comparisonPanel'
		,selector: 'comparison-panel'
	},{
		ref: 'tableCt'
		,selector: 'comparison-panel #tableCt'
	},{
		ref: 'takeHomeTable'
		,selector: 'comparison-takehometable'
	},{
		ref: 'myBudgetTable'
		,selector: 'comparison-mybudgettable'
	},{
		ref: 'budgetRows'
		,selector: 'comparison-mybudgettable tablesegment#budgetRows'
	},{
		ref: 'chart'
		,selector: 'comparison-chart'
	}]

    ,init: function() {
		var me = this;
		
		me.control({
			'comparison-panel': {
				load: me.doLoad
				,save: me.doSave
				,beforeactivate: { fn: me.onBeforeFirstActivate, single:true }
			}
			,'comparison-panel #tableCt > #take-home-pay': {
				activate: me.loadTakeHome
			}
			,'comparison-panel #tableCt > #my-budget': {
				activate: me.loadMyBudget
			}
			,'comparison-chart': {
				select: me.onChartSelect
			}
			,'comparison-panel button[action=defaultEstimates]': {
				click: me.onDefaultEstimatesClick
			}
			,'comparison-mybudgettable percentslider': {
				change: me.onNeedSliderChange
			}
			,'comparison-mybudgettable percentfield': {
				change: me.onNeedFieldChange
			}
		});
	}

	// AppPanel lifecycle handlers
	,doLoad: function(panel) {
		this.application.log(panel.getItemId()+'.doLoad');
		
		Ext.suspendLayouts();
		
		var me = this
			,chartCmp = me.getChart()
			,takeHomeTable = me.getTakeHomeTable()
			,myBudgetTable = me.getMyBudgetTable();
			
		chartCmp.setLoading('Loading&hellip;');
		
		me.getComparisonDataModel().load(undefined, {
			success: function(record, operation) {
				chartCmp.setRecord(record);
				chartCmp.setLoading(false);
				panel.onLoadComplete();
				Ext.resumeLayouts(true);
			}
			,failure: function(record, operation) {
				me.application.error('Failed to load my budget record', record, operation);
			}
		});
		
		// reload take home if it's already loaded and visible
		if(takeHomeTable.getForm().getRecord() && takeHomeTable.isVisible(true))
		{
			me.loadTakeHome();
		}
		
		// reload my budget if it's already loaded and visible
		if(myBudgetTable.getRecord() && myBudgetTable.isVisible(true))
		{
			me.loadMyBudget();
		}
	}

	,doSave: function(panel) {
		this.application.log(panel.getItemId()+'.doSave');

		var validForm = this.saveTakeHomePay(panel);
			
		if (validForm === undefined || validForm){
			validForm = this.saveMyBudget(panel);
		}

		return validForm || true;
	}
	
	
	// member methods
	,loadTakeHome: function() {
		var me = this
			,takeHomeTable = me.getTakeHomeTable();
			
		me.application.log('comparison.takehomepay activated');
		
		takeHomeTable.setLoading('Loading&hellip;');
		
		me.getComparisonTakeHomePayModel().load(undefined, {
			success: function(record, operation) {
				takeHomeTable.loadRecord(record);
				takeHomeTable.setLoading(false);
			}
			,failure: function(record, operation) {
				me.application.error('Failed to load take home pay record', record, operation);
			}
		});
	}
	
	,loadMyBudget: function() {
		var me = this
			,myBudgetTable = me.getMyBudgetTable();
			
		me.application.log('comparison.mybudget activated');

		myBudgetTable.setLoading('Loading&hellip;');
		
		me.getComparisonBudgetModel().load(undefined, {
			success: function(record, operation) {
				myBudgetTable.loadRecord(record);
				myBudgetTable.setLoading(false);
			}
			,failure: function(record, operation) {
				me.application.error('Failed to load my budget record', record, operation);
			}
		});
	}

	,saveTakeHomePay: function(panel){
		var me = this
			,table = me.getTakeHomeTable()
			,form = table.getForm()
			,record = form.getRecord()
			,errors
			,hasErrors = undefined;

		// skip save if record hasn't been loaded yet
		if (record) {
			// update record and validate
			form.updateRecord();
			// Setting spouse data 0 as validation condation's is failing for single client.
			if (!MyRetirement.API.getClientMarried()) {
				record.set('spouseFinancialProfileSocialSecurityTaxRate', 0);
				record.set('spouseFinancialProfileTakeHomePayOtherRate', 0);
			}
			errors = record.validate();

			// check validity and save to server
			form.clearInvalid();
			if (errors.isValid()) {
				panel.startSaveOperation();

				if (record.dirty) {
					table.up('datapanel').setLoading('Saving&hellip;');
					record.save({
						success: function () {
							panel.finishSaveOperation();
							form.loadRecord(record);
							table.up('datapanel').setLoading(false);
							panel.load();

							me.getChart().refreshChart();

						}, failure: function () {
							me.application.error('Failed to update take home pay data');
							panel.failSaveOperation();
							table.up('datapanel').setLoading(false);
						}
					});
				} else {
					panel.finishSaveOperation();
				}

				hasErrors = true; // continue to next screen while save happens
			} else {
				form.markInvalid(errors);
				hasErrors = false;
			}
		}

		return hasErrors;
	},

	saveMyBudget: function (panel) {
		var me = this
			,table = me.getMyBudgetTable()
			,record = table.getRecord()
			,errors
			,hasErrors = undefined;

		// skip save if record hasn't been loaded yet
		if (record) {
			// update record and validate
			table.updateRecord();
			errors = record.validate();

			// check validity and save to server
			if (errors.isValid()) {
				panel.startSaveOperation();

				if (record.dirty) {
					table.up('datapanel').setLoading('Saving&hellip;');
					record.save({
						success: function () {
							panel.finishSaveOperation();
							table.up('datapanel').setLoading(false);
							panel.load();
						}, failure: function () {
							me.application.error('Failed to update budget data');
							panel.failSaveOperation();
							table.up('datapanel').setLoading(false);
						}
					});
				} else {
					panel.finishSaveOperation();
				}

				hasErrors = true; // continue to next screen while save happens
			} else {
				hasErrors = false;
			}
		}

		return hasErrors;
	}


	// event handlers
	,onBeforeFirstActivate: function(panel) {
		this.onHasIncomeChange(MyRetirement.API.getHasIncome());
		MyRetirement.API.on('hasincomechange', this.onHasIncomeChange, this);
	}
	
	,onHasIncomeChange: function(hasIncome) {
		var me = this
			,cardLayout = me.getTableCt().getLayout()
			,chart = me.getChart()
			,legendFooter = me.getComparisonPanel().down('legendfooter');
			
		if(!hasIncome)
		{
			cardLayout.setActiveItem('my-budget');
		}
		
		chart.syncActiveTab(cardLayout.getActiveItem().getItemId());
		chart.setTakeHomeVisible(hasIncome);
		legendFooter.setTakeHomeVisible(hasIncome);

		var buttons = this.getComparisonPanel().items.get(0).items.get(3);
		var nextIndex = 1, doneIndex = 2;

		if (buttons.items.get(nextIndex)) {
			buttons.items.get(nextIndex).setVisible(hasIncome);
		}
		if (buttons.items.get(doneIndex)) {
			buttons.items.get(doneIndex).setVisible(!hasIncome);
		}
	}

	,onChartSelect: function(stackId) {
		this.getTableCt().getLayout().setActiveItem(stackId);
	}
	
	,onDefaultEstimatesClick: function(btn) {
		var me = this
			,myBudgetTable = me.getMyBudgetTable()
			,record = myBudgetTable.getRecord();
			
		me.application.log('comparison.onDefaultEstimatesClick');

		if(!record)
		{
			me.loadMyBudget();
			return;
		}
		
		myBudgetTable.setLoading('Loading&hellip;');

		MyRetirementRemote.comparisonService.getDefaultBudgetData(function(result) {
			record.set(result);
			myBudgetTable.loadRecord(record);
			myBudgetTable.setLoading(false);
		});
		
		 
		var panel = me.getComparisonPanel();
		me.doLoad(panel);
					
	}
	
	,onNeedSliderChange: function(slider, newValue, thumb) {
		slider.up('tablerow').down('percentfield').setValue(newValue / 100);
	}
	,onNeedFieldChange: function(field, newValue, oldValue) {
		field.up('tablerow').down('percentslider').setValue(newValue * 100);
	}
});