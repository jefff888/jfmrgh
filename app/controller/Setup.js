/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext, MyRetirement, MyRetirementRemote*/
Ext.define('MyRetirement.controller.Setup', {
	extend: 'Ext.app.Controller'
	
	,views: [
		'setup.Panel'
	]
	,models: [
		'setup.SetupInfo'
		,'setup.AssetAllocation'
	]
    
	,refs: [{
		ref: 'tabPanel'
		,selector: 'myretirement-viewport #primaryTabs'
	},{
		ref: 'setupAssetAllocationCt'
		,selector: 'setup-chartpanel #assetAllocation'
	},{
		ref: 'retirementYearsCt'
		,selector: 'setup-chartpanel #retirementYearsCt'
	}]

    ,init: function() {
		var me = this;
		
		me.control({
			'setup-panel': {
				load: me.doLoad
				,save: me.doSave
				,loadcomplete: me.onLoadComplete
			}
			,'setup-myinformationtable': {
				ageresetclick: me.onAgeResetClick
			}
			,'setup-assumptiontable selectfield[name=clientRetirementProfilePreRetirementRiskTolerance]': {
				change: me.onRiskToleranceChange
			}
			,'setup-myinformationtable rawfield[colName=currentlyRetired]': {
				change: me.onCurrentlyRetiredChange
			}
			,'setup-myinformationtable rawfield[colName=earnedIncome]': {
				change: me.onEarnedIncomeChange
			}
		});

	}

	// AppPanel lifecycle handlers
	,doLoad: function(panel) {
		var me = this;
		this.application.log(panel.getItemId()+'.doLoad');

		panel.setLoading('Loading&hellip;');
		panel.loadCompleted = false;
		Ext.suspendLayouts();
		me.suspendIncomeCheck = true;

		this.getSetupSetupInfoModel().load(undefined, {
			success: function (record, operation) {

				me.updateCharts(record);

				panel.getForm().loadRecord(record);
				panel.down('[rowPerson=spouse]').setVisible(MyRetirement.API.getClientMarried());

				me.suspendIncomeCheck = false;
				panel.setLoading(false);
				panel.onLoadComplete();

				Ext.resumeLayouts(true);
			}, failure: function (record, operation) {
				me.application.error('Failed to load Setup record', record, operation);
				panel.onLoadFail();
			}
		});
	}

	,onLoadComplete: function (panel) {
		var me = this
			,setupInfoRecord = panel.getForm().getRecord();

		panel.loadCompleted = true;
		me.determineWhatIfTabDisplay(setupInfoRecord);
	}

	,determineWhatIfTabDisplay: function(setupInfoRecord) {
		var me = this
			,tabPanel = me.getTabPanel();

		tabPanel.items.each(function (aTab, index, listSize) {
			if (aTab.getItemId() === 'whatif') {
				if (setupInfoRecord && me.clientIsRetired(setupInfoRecord)) {
					aTab.tab.hide();
				} else {
					aTab.tab.show();
				}
			}
		});
	}

	,clientIsRetired: function(record) {
		var isRetired = record.get('clientRetirementProfileRetired');

		if (MyRetirement.API.getClientMarried() && record.get('spouseRetirementProfileRetired')) {
			isRetired = true;
		}

		return isRetired;
	}
	
	,doSave: function(panel) {
		this.application.log(panel.getItemId()+'.doSave');
		
		var me = this
			,form = panel.getForm()
			,record = form.getRecord()
			,errors;
		
		// update record and validate
		form.updateRecord();
		errors = record.validate();

		// check validity and save to server
		form.clearInvalid();
		if(errors.isValid())
		{
			panel.startSaveOperation();
			if(record.dirty) {
				panel.setLoading('Saving&hellip;');
				record.save({
					synchronous: true
					,success: function() {
						panel.finishSaveOperation();
						me.updateCharts(record);

						if(!me.suspendIncomeCheck)
						{
							me.updateHasIncome(record.data);
							form.loadRecord(record);
						}

						panel.finishSaveOperation();
						panel.setLoading(false);
//						panel.onLoadComplete();
					}
					,failure: function() {
						panel.failSaveOperation();
						panel.setLoading(false);
					}
				});
			} else {
				panel.finishSaveOperation();
			}

			return true; // continue to next screen while save happens
		}
		else
		{
			form.markInvalid(errors);
			return false;
		}
	}
	
	
	,updateCharts: function(record) {
		var me = this
			,yearsChartData = []
			,allocationChartCt = me.getSetupAssetAllocationCt()
			,allocationChart = allocationChartCt.getChart()
			,allocationTitle = allocationChartCt.getTitle()
			,allocationData;

		// update retirement years chart
		yearsChartData.push({
			name: record.get('clientPersonFirstName')
			,currentAge: record.get('clientCurrentAge')
			,retirementAge: 
				record.get('clientRetirementProfileRetired')
				? record.get('clientCurrentAge')
				: record.get('clientRetirementProfileRetirementAge') + record.get('clientRetirementProfileRetirementAgeMonths') / 12
			,endAge: record.get('clientFinancialProfileAnalysisEndingAge')
		});
		
		if(MyRetirement.API.getClientMarried())
		{
			yearsChartData.push({
				name: record.get('spousePersonFirstName')
				,currentAge: record.get('spouseCurrentAge')
				,retirementAge:
					record.get('spouseRetirementProfileRetired')
					? record.get('spouseCurrentAge')
					: record.get('spouseRetirementProfileRetirementAge') + record.get('spouseRetirementProfileRetirementAgeMonths') / 12
				,endAge: record.get('spouseFinancialProfileAnalysisEndingAge')
			});
		}
		
		me.getRetirementYearsCt().getChart().getStore().loadData(yearsChartData);
		
		// load initial data into investment pie
		allocationData = record.get('preRetirementAssetAllocation');
		if(allocationData)
		{
			allocationChart.getStore().loadData(allocationData.assetClassRatios);
			allocationChart.loadedRiskTolerance = allocationData.riskTolerance;
			
			allocationTitle.update({
				riskTolerance: MyRetirement.API.getEnumerationStore('riskTolerances').getById(allocationData.riskTolerance).get('label')
			});
		}		
	}
	
	// true if not retired or income > 0.  Tab offs if false
	,updateHasIncome: function(fieldValues) {
		
//		alert('doc mode: ' + document.documentMode);
		
		var retired = fieldValues.clientRetirementProfileRetired || (MyRetirement.API.getClientMarried() && fieldValues.spouseRetirementProfileRetired);
		var hasIncome = 
			(fieldValues.clientFinancialProfileAnnualEarnedIncome > 0 ||
			 (MyRetirement.API.getClientMarried() 
				 && fieldValues.spouseFinancialProfileAnnualEarnedIncome > 0));
		
		// If either retired or has no income, send false
		if (retired || !hasIncome) {
			MyRetirement.API.setHasIncome(false);			
		}
		else {
			MyRetirement.API.setHasIncome(true);
			
		}
	}
	
	// event handlers
	,onAgeResetClick: function(informationTable, isSpouse, resetBoth, row, t, ev) {
		var me = this;		
		if(!isSpouse)
		{
			MyRetirementRemote.setupService.calcSingleLifeExpectancy (0, function (result, e) {
				me.application.log('calcSingleLifeExpectancy, result: ' + result);			
				informationTable.down('[isFormField][name=clientFinancialProfileAnalysisEndingAge]').setValue(result);
			});
		}
		
		if(isSpouse && !resetBoth )
		{
			MyRetirementRemote.setupService.calcSingleLifeExpectancy (1, function (result, e) {
				me.application.log('calcSingleLifeExpectancy, result: ' + result);			
				informationTable.down('[isFormField][name=spouseFinancialProfileAnalysisEndingAge]').setValue(result);
			});
		}

		if (resetBoth) {
			MyRetirementRemote.setupService.calcJointLifeExpectancy (function (result, e) {
				me.application.log('calcDoubleLifeExpectancy, result: ' + result);			
				informationTable.down('[isFormField][name=clientFinancialProfileAnalysisEndingAge]').setValue(result[0]);
				informationTable.down('[isFormField][name=spouseFinancialProfileAnalysisEndingAge]').setValue(result[1]);
			});
		}

	}
	
	,onRiskToleranceChange: function(field, value) {
		var me = this
			,assetAllocationCt = me.getSetupAssetAllocationCt()
			,chart = assetAllocationCt.getChart()
			,title = assetAllocationCt.getTitle();
		
		if(value == chart.loadedRiskTolerance)
		{
			return;
		}
		
		assetAllocationCt.el.mask('Loading&hellip;');
		me.getSetupAssetAllocationModel().load(value, {
			success: function(record, operation) {

				chart.getStore().loadData(record.get('assetClassRatios'));
				chart.loadedRiskTolerance = record.get('riskTolerance');
				title.update({
					riskTolerance: field.getValueLabel()
				});
				
				assetAllocationCt.el.unmask();
			}
			,failure: function(record, operation) {
				me.application.error('Failed to load setup chart record', record, operation);
			}
		});
	}
	
	,onCurrentlyRetiredChange: function(field, value) {
		// enable/disable fields within row
		field.next('[colName=retirementAge]').setDisabled(value);
		field.next('[colName=earnedIncome]').setDisabled(value);
		
		// enable/disable fields in assumptions table
		var form = field.up('[isFormable]').getForm()
			,fieldValues = form.getFieldValues()
			,record = form.getRecord()
			,eitherRetired = fieldValues.clientRetirementProfileRetired || (MyRetirement.API.getClientMarried() && fieldValues.spouseRetirementProfileRetired);

		// Shouldn't have to do this, but...
		if (value !== record.get(field.name)) {
			record.set(field.name, value);
			this.determineWhatIfTabDisplay(record);
		}
			
		form.findField('clientRetirementProfilePreRetirementRiskTolerance').setDisabled(eitherRetired);
		form.findField('clientFinancialProfileAverageTaxRate').setDisabled(eitherRetired);

		if (!this.suspendIncomeCheck) {
			this.updateHasIncome(fieldValues);
		}

		this.getSetupAssetAllocationCt().setVisible(!eitherRetired);
	},

	onEarnedIncomeChange: function (field, value) {
		if (!this.suspendIncomeCheck) {
			this.updateHasIncome(field.up('[isFormable]').getForm().getFieldValues());
		}
	}
});