/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('MyRetirement.view.setup.MyInformationTable', {
	extend: 'Jarvus.container.table.FieldTable'
	,xtype: 'setup-myinformationtable'
	,requires: [
		'Jarvus.container.Raw'
		,'Jarvus.container.table.Header'
		,'Jarvus.field.Template'
		,'Jarvus.field.Boolean'
		,'Jarvus.field.Integer'
		,'Jarvus.field.BigMoney'
	]

	,items: [{
		xtype: 'tableheader'
		,columns: [
			{ colCls: 'firstName'		,title: 'Name' }
			,{ colCls: 'retired'		,title: 'Currently Retired?' }
			,{ colCls: 'retirementAge'	,title: 'Desired Retirement Age (Years&nbsp;/&nbsp;Months)' }
			,{ colCls: 'endingAge'		,title: 'Retirement &ldquo;Funding&nbsp;Until&rdquo;&nbsp;Age' }
			,{ colCls: 'annualIncome'	,title: 'Annual Earned Income' }
		]
	},{
		// tbody
		items: [{
			// tr
			cls: 'client'
			,rowPerson: 'client'
			,items: [{
				xtype: 'templatefield'
				,cls: 'col-name'
				,name: 'clientPersonFirstName'
			},{
				xtype: 'booleanfield'
				,cls: 'col-retired'
				,name: 'clientRetirementProfileRetired'
				,colName: 'currentlyRetired'
			},{
				xtype: 'rawcontainer'
				,cls: 'col-retirementAge'
				,colName: 'retirementAge'
				,maskOnDisable: false
				,items: [{
					xtype: 'integerfield'
					,cls: 'field-years'
					,name: 'clientRetirementProfileRetirementAge'
					,resetBlank: true
					,disabledPlaceholder: 'N/A'
				},{
					xtype: 'integerfield'
					,cls: 'field-months'
					,name: 'clientRetirementProfileRetirementAgeMonths'
					,tip: 'A number between 0 and 11'
					,resetBlank: true
					,disabledPlaceholder: 'N/A'
				}]
			},{
				xtype: 'rawcontainer'
				,cls: 'col-endingAge'
				,items: [{
					xtype: 'integerfield'
					,cls: 'field-years'
					,name: 'clientFinancialProfileAnalysisEndingAge'	
					,resetBlank: true
				},{
					xtype: 'component'
					,autoEl: { tag: 'span', cls: 'reset-button reset-field', 'data-qtip': 'Set to Client\'s life expectancy' }
				}]
			},{
				xtype: 'bigmoneyfield'
				,cls: 'col-annualIncome'
				,name: 'clientFinancialProfileAnnualEarnedIncome'
				,colName: 'earnedIncome'
				,disabledPlaceholder: 'N/A'
				,monitorChange: 'live'
			}]
		},{
			// tr
			cls: 'spouse'
			,rowPerson: 'spouse'
			,hidden: true
			,items: [{
				xtype: 'templatefield'
				,cls: 'col-name'
				,name: 'spousePersonFirstName'
			},{
				xtype: 'booleanfield'
				,cls: 'col-retired'
				,name: 'spouseRetirementProfileRetired'
				,colName: 'currentlyRetired'
				,monitorChange: 'live'
			},{
				xtype: 'rawcontainer'
				,cls: 'col-retirementAge'
				,colName: 'retirementAge'
				,maskOnDisable: false
				,items: [{
					xtype: 'integerfield'
					,cls: 'field-years'
					,name: 'spouseRetirementProfileRetirementAge'
					,resetBlank: true
					,disabledPlaceholder: 'N/A'
				},{
					xtype: 'integerfield'
					,cls: 'field-months'
					,name: 'spouseRetirementProfileRetirementAgeMonths'
					,resetBlank: true
					,disabledPlaceholder: 'N/A'
				}]
			},{
				xtype: 'rawcontainer'
				,cls: 'col-endingAge'
				,items: [{
					xtype: 'component'
					,autoEl: { tag: 'span', cls: 'reset-spacer' }
				},{
					xtype: 'integerfield'
					,cls: 'field-years'
					,name: 'spouseFinancialProfileAnalysisEndingAge'
					,resetBlank: true
				},{
					xtype: 'component'
					,autoEl: { tag: 'span', cls: 'reset-button reset-field', 'data-qtip': 'Set to Co-Client\'s life expectancy' }
				},{
					xtype: 'component'
					,autoEl: { tag: 'span', cls: 'reset-button reset-both', 'data-qtip': 'Set to joint life expectancy' }
				}]
			},{
				xtype: 'bigmoneyfield'
				,cls: 'field-annualIncome'
				,name: 'spouseFinancialProfileAnnualEarnedIncome'
				,colName: 'earnedIncome'
				,disabledPlaceholder: 'N/A'
				,monitorChange: 'live'
			}]
		}]
	}]
	
	,initEvents: function() {
		var me = this;
		me.callParent();
		
		me.mon(me.el, 'click', function(ev, t) {
			var row = ev.getTarget('tr', me.el, true)
				,isSpouse = row.hasCls('spouse')
				,resetBoth = Ext.fly(t).hasCls('reset-both');
				
			me.fireEvent('ageresetclick', me, isSpouse, resetBoth, row, t, ev);
		}, me, {delegate: '.reset-button'});
	}
});