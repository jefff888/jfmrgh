/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext, MyRetirement, MyRetirementRemote*/
Ext.define('MyRetirement.controller.Income', {
	extend: 'Ext.app.Controller'

	,views: [
		'income.Panel'
	]
	,stores: [
		'income.Annuities'
		,'income.Retirement'
		,'income.Monthly'
	]
	,models: [
		'income.SocialSecurity'
		,'income.RetirementAverage'
	]
    
	,refs: [{
		ref: 'incomePanel'
		,selector: 'income-panel'
	},{
		ref: 'socialSecurityTable'
		,selector: 'income-socialsecuritytable'
	},{
		ref: 'annuitiesTable'
		,selector: 'income-noteannuitytable'
	},{
		ref: 'retirementTable'
		,selector: 'income-otherincometable'
	},{
		ref: 'chartPanel'
		,selector: 'income-chartpanel'
	},{
		ref: 'averageIncomeChartCt'
		,selector: 'income-chartpanel #averageIncome'
	},{
		ref: 'monthlyIncomeChartCt'
		,selector: 'income-chartpanel #monthlyIncome'
	}]

	// Controller template methods
    ,init: function() {
		var me = this;

		// listen for events on views
		me.control({
			'income-panel':{
				load: me.doLoad
				,save: me.doSave
			}
			,'income-panel dataheader': {
				expandallclick: me.onExpandAllClick
				,collapseallclick: me.onCollapseAllClick
				,addclick: me.onAddClick
			}
			,'income-socialsecuritytable': {
				benefitresetclick: me.onBenefitResetClick
				,beginageresetclick: me.onBeginAgeResetClick
			}
			,'income-socialsecuritytable rawfield[colName=receivingSocSecurityBenefits]': {
				change: me.onReceivingBenefitChange
			}
		});
	}


	// AppPanel lifecycle handlers
	,doLoad: function(panel) {
		this.application.log(panel.getItemId()+'.doLoad');
		
		Ext.suspendLayouts();
		
		var me = this
			,socialSecurityTable = me.getSocialSecurityTable()
			,annuityTable = me.getAnnuitiesTable()
			,otherTable = me.getRetirementTable()
			,socialSecurityLoaded = false, annuityLoaded = false, otherLoaded = false, chartsLoaded = false
			,tryLoadComplete = function() {
				if(socialSecurityLoaded && annuityLoaded && otherLoaded && chartsLoaded)
				{
					panel.onLoadComplete();	
					Ext.resumeLayouts(true);
				}
			};
		
		// load social security table
		socialSecurityTable.up('datapanel').setLoading('Loading&hellip;');
		
		this.getIncomeSocialSecurityModel().load(undefined, {
			success: function(record, operation) {
				socialSecurityTable.getForm().loadRecord(record);
				
				var isMarried = MyRetirement.API.getClientMarried();
				socialSecurityTable.down('[rowPerson=spouse]').setVisible(isMarried);

				socialSecurityTable.down('[rowPerson=client] [name=spouseFinancialProfileSpousalBenefitAvailable]').getEl().down('[type=checkbox]').setVisible(isMarried);
				
				if (!isMarried){
					socialSecurityTable.down('tableheader').getEl().down('.col-survivorBenefitRate').dom.innerHTML = '';
				} else {
					socialSecurityTable.down('tableheader').getEl().down('.col-survivorBenefitRate').dom.innerHTML = 'Spousal Benefit Available';
				}

				socialSecurityTable.up('datapanel').setLoading(false);
				socialSecurityLoaded = true;
				tryLoadComplete();
			}
			,failure: function(record, operation) {
				me.application.error('Failed to load social security data', record, operation);
			}
		});

		// load pensions and annuities table
		annuityTable.up('datapanel').setLoading('Loading&hellip;');

		annuityTable.getStore().load({
			callback: function() {
				annuityTable.up('datapanel').setLoading(false);
				annuityLoaded = true;
				tryLoadComplete();
			}
			,exception: function() {
				me.application.error('Failed to load pension incom data');
			}
		});

		// load other retirement income table
		otherTable.up('datapanel').setLoading('Loading&hellip;');
		
		otherTable.getStore().load({
			callback: function() {
				otherTable.up('datapanel').setLoading(false);
				otherLoaded = true;
				tryLoadComplete();
			}
			,exception: function() {
				me.application.error('Failed to load retirement income data');
			}
		});
		
		// load both charts
		me.loadCharts(panel, function() {
			chartsLoaded = true;
			tryLoadComplete();
		});
	}
	
	,doSave: function(panel) {
		var me = this
			,success = true;
		
		me.application.log(panel.getItemId()+'.doSave');
		
		success &= me.saveSocialSecurity(panel);
		success &= me.saveAnnuities(panel);
		success &= me.saveOtherIncome(panel);
		
		if(success)
		{
		me.loadCharts(panel);
		}
		
		return Boolean(success);
	}
	
	
	// member methods
	,loadCharts: function(panel, callback, scope) {
		var me = this
			,chartPanel = me.getChartPanel()
			,averageChartCt = me.getAverageIncomeChartCt()
			,averageChartTitle = averageChartCt.getTitle()
			,monthlyChartCt = me.getMonthlyIncomeChartCt()
			,minYear = 9999, maxYear = 0;
			
		chartPanel.setLoading('Loading&hellip;');
		me.getIncomeRetirementAverageModel().load(undefined, {
			success: function(record, operation){
				var monthlyIncomeDuringRetirement = record.get('monthlyIncomeDuringRetirement');

				averageChartCt.getChart().getStore().loadData([{
					'Social Security': record.get('socialSecurityAvgMonthlyAmount')
					,'Pensions/Annuities': record.get('pensionAvgMonthlyAmount')
					,'Other': record.get('otherIncomeAvgMonthlyAmount')
					,name: 'combined'
				}]);

				var retirementIncomeError = function () {
					// First terminate the  "Loading" overlay.
					chartPanel.setLoading(false);
					Ext.callback(callback, scope||me);

					// Display error.
					Ext.Msg.show({
						title: 'Income Data Record Error'
						,msg: 'A Monthly Income During Retirement record does not have a retirement '
								+ 'year properly defined. Please check retirement definitions.'
						,modal: true
						,icon: Ext.Msg.ERROR
						,buttons: Ext.Msg.OK
					});
				};

				// pad with blank years
				if (monthlyIncomeDuringRetirement) {
					if (monthlyIncomeDuringRetirement[0].year) {
						while(monthlyIncomeDuringRetirement[0].year % 5 !== 0)
						{
							monthlyIncomeDuringRetirement.unshift({
								year: monthlyIncomeDuringRetirement[0].year - 1
							});
						}
					} else {
						retirementIncomeError();
						return;
					}

					if (monthlyIncomeDuringRetirement[monthlyIncomeDuringRetirement.length-1].year) {
						while(monthlyIncomeDuringRetirement[monthlyIncomeDuringRetirement.length-1].year % 5 !== 0)
						{
							monthlyIncomeDuringRetirement.push({
								year: monthlyIncomeDuringRetirement[monthlyIncomeDuringRetirement.length-1].year + 1
							});
						}
					} else {
						retirementIncomeError();
						return;
					}

					me.getIncomeMonthlyStore().loadData(monthlyIncomeDuringRetirement);

					averageChartTitle.update(record.getData());
				} else {
					retirementIncomeError();
					return;
				}
				
				chartPanel.setLoading(false);
				Ext.callback(callback, scope||me);
			}
			,failure: function(record, operation) {
				me.application.error('Failed to load income charts  record', record, operation);
			}
		});
	}
	
	
	,saveSocialSecurity: function(panel) {
		var me = this
			,socialSecurityTable = me.getSocialSecurityTable()
			,socialSecurityForm = socialSecurityTable.getForm()
			,socialSecurityRecord = socialSecurityForm.getRecord()
			,socialSecurityErrors;
		
		// update social security record and validate
		socialSecurityForm.updateRecord();
		socialSecurityErrors = socialSecurityRecord.validate();

		// check validity and save to server
		socialSecurityForm.clearInvalid();
		if(socialSecurityErrors.isValid())
		{
			panel.startSaveOperation();
			
			if(socialSecurityRecord.dirty)
			{
				socialSecurityTable.up('datapanel').setLoading('Saving&hellip;');
				socialSecurityRecord.save({
					success: function(){
						socialSecurityTable.up('datapanel').setLoading(false);
						panel.finishSaveOperation();
					}
					,failure: function(){
						socialSecurityTable.up('datapanel').setLoading(false);
						panel.failSaveOperation();
					}
				});
			}
			else
			{
				// mark operation as finished immediately if there were no changes
				panel.finishSaveOperation();
			}
			
			return true; // continue to next screen while save happens
		}
		else
		{
			socialSecurityForm.markInvalid(socialSecurityErrors);
			return false;
		}
	}
	
	,saveAnnuities: function(panel) {
		var me = this
			,annuitiesTable = me.getAnnuitiesTable()
			,store = annuitiesTable.getStore()
			,storeErrors;
		
		storeErrors = annuitiesTable.syncAllRecords();
		
		if(storeErrors.length === 0)
		{
			panel.startSaveOperation();

			if(store.getModifiedRecords().length || store.getRemovedRecords().length)
			{
				annuitiesTable.up('datapanel').setLoading('Saving&hellip;');
				store.sync({
					success: function(){
						annuitiesTable.up('datapanel').setLoading(false);
						panel.finishSaveOperation();
					}
					,failure: function() {
						annuitiesTable.up('datapanel').setLoading(false);
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
	
	,saveOtherIncome: function(panel) {
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
				retirementTable.setLoading('Saving&hellip;');
				store.sync({
					success: function(){
						retirementTable.setLoading(false);
						panel.finishSaveOperation();
					}
					,failure: function(){
						retirementTable.setLoading(false);
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
		dataHeader.up('datapanel').down('listfieldtable').getStore().add({});
	}

	,onBenefitResetClick: function(socialSecurityTable, isSpouse, resetBoth, row, t, ev) {
		var me = this;	
		me.application.log ('calcFullRetirementAgeMonthlyBenefit: isSpouse: ' + isSpouse + ", resetBoth: " + resetBoth + ", row: " + row);
		if(isSpouse)
		{
			MyRetirementRemote.incomeService.calcFullRetirementAgeMonthlyBenefit (1, function (result, e) {
				me.application.log('calcFullRetirementAgeMonthlyBenefit, result: ' + result);						
				socialSecurityTable.down('[isFormField][name=spouseRetirementProfileSocialSecurityFullMonthlyBenefit]').setValue(result);
			});
		}
		else if(!isSpouse)
		{
			MyRetirementRemote.incomeService.calcFullRetirementAgeMonthlyBenefit (0, function (result, e) {
				me.application.log('calcFullRetirementAgeMonthlyBenefit, result: ' + result);			
				socialSecurityTable.down('[isFormField][name=clientRetirementProfileSocialSecurityFullMonthlyBenefit]').setValue(result);
			});
		}
	}
	
	,onBeginAgeResetClick: function(socialSecurityTable, isSpouse, resetBoth, row, t, ev) {
		var me = this;	
		me.application.log ('calcFullRetirementAge: isSpouse: ' + isSpouse + ", resetBoth: " + resetBoth + ", row: " + row);
		if(isSpouse)
		{
			MyRetirementRemote.incomeService.calcFullRetirementAge (1, function (result, e) {
				me.application.log('calcFullRetirementAge, result: ' + result);						
				socialSecurityTable.down('[isFormField][name=spouseRetirementProfileSocialSecurityBeginAge]').setValue(result[0]);
				socialSecurityTable.down('[isFormField][name=spouseRetirementProfileSocialSecurityBeginAgeMonths]').setValue(result[1]);
				
			});
		}
		else if(!isSpouse)
		{
			MyRetirementRemote.incomeService.calcFullRetirementAge (0, function (result, e) {
				me.application.log('calcFullRetirementAge, result: ' + result);			
				socialSecurityTable.down('[isFormField][name=clientRetirementProfileSocialSecurityBeginAge]').setValue(result[0]);
				socialSecurityTable.down('[isFormField][name=clientRetirementProfileSocialSecurityBeginAgeMonths]').setValue(result[1]);
			});
		}
	}
	
	,onReceivingBenefitChange: function(field, value) {
		field.next('[colName=fullMonthlyBenefit]').setDisabled(value);
		field.next('[colName=currentMonthlyBenefit]').setDisabled(!value);
	}

});