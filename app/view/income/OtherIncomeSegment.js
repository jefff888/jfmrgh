/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('MyRetirement.view.income.OtherIncomeSegment', {
	extend: 'Jarvus.container.table.Expando'
	,xtype: 'income-otherincome'
	,mixins: ['Jarvus.mixin.Formable']
	,requires: [
		'Jarvus.container.Raw'
		,'Jarvus.field.Input'
		,'Jarvus.field.BigMoney'
		,'Jarvus.field.Percent'
		,'Jarvus.table.ExpandCell'
		,'Jarvus.table.DeleteCell'
		,'MyRetirement.field.InputIe'
		,'MyRetirement.field.RelativeDateForIe'
	]
	
	,primaryRow: [{
		xtype: 'tableexpandcell'
		,cls: 'col-expand'
	},{
		xtype: 'inputfield'
		,cls: 'col-name'
		,name: 'name'
	},{
		xtype: 'enumerationfield'
		,enumerationsStore: 'retirementIncomeOwners'
		,cls: 'col-owner'
		,name: 'owner'
	},{
		xtype: 'bigmoneyfield'
		,cls: 'col-annualAmount'
		,name: 'annualAmount'
		,monitorChange: 'live'
		// display in monthly scale
		,rawToValue: function(value) {
			return value * 12;
		}
		,valueToRaw: function(value) {
			return value / 12;
		}
	},{
		xtype: 'percentfield'
		,cls: 'col-beforePeriodAnnualIncrease'
		,name: 'beforePeriodAnnualIncreaseRate'
		,monitorChange: 'live'	
	},{
		xtype: 'percentfield'
		,cls: 'col-annualIncreaseRate'
		,name: 'annualIncreaseRate'
		,monitorChange: 'live'	
	},{
		xtype: 'percentfield'
		,cls: 'col-portionTaxableRate'
		,name: 'portionTaxableRate'
		,monitorChange: 'live'	
	},{
		xtype: 'tabledeletecell'
		,cls: 'col-delete'
	}]
	
	,detailRow: {
		defaults: {
			xtype: 'rawcontainer'
			,autoEl: 'section'
		}
		,items: [{
			cls: 'begins'
			,items: [{
				xtype: 'relativedatefieldie'
				,baseName: 'begin'
				,enumerationsStore: 'retirementIncomeBeginTypes'
				,setName: 'beginFixedValues'
				,label: 'Benefit Begins'
				,relatedComponent: 'income-otherincome'
				,relatedField: 'owner'
			}]
		},{
			cls: 'ends'
			,items: [{
				xtype: 'relativedatefieldie'
				,baseName: 'duration'
				,monthName: 'endMonth'
				,yearName: 'endYear'
				,enumerationsStore: 'retirementIncomeDurationTypes'
				,setName: 'endFixedValues'
				,label: 'Benefit Ends'
				,relatedComponent: 'income-otherincome'
				,relatedField: 'owner'
			}]
		}]
	}
});