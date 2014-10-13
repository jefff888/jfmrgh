/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('MyRetirement.view.income.NoteAnnuitySegment', {
	extend: 'Jarvus.container.table.Expando'
	,xtype: 'income-noteannuity'
	,mixins: ['Jarvus.mixin.Formable']
	,requires: [
		'Jarvus.container.Raw'
		,'Jarvus.field.Input'
		,'Jarvus.field.BigMoney'
		,'Jarvus.field.Percent'
		,'Jarvus.table.ExpandCell'
		,'Jarvus.table.DeleteCell'
		,'MyRetirement.field.Enumeration'
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
		,enumerationsStore: 'noteAnnuityIncomeTypes'
		,cls: 'col-type'
		,name: 'type'
	},{
		xtype: 'enumerationfield'
		,enumerationsStore: 'noteAnnuityIncomeOwners'
		,cls: 'col-owner'
		,name: 'owner'
	},{
		xtype: 'bigmoneyfield'
		,cls: 'col-monthlyAmount'
		,name: 'monthlyAmount'
		,monitorChange: 'live'	
	},{
		xtype: 'percentfield'
		,cls: 'col-survivorBenefitRate'
		,name: 'survivorBenefitRate'
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
				,enumerationsStore: 'noteAnnuityIncomeBeginTypes'
				,setName: 'beginFixedValues'
				,label: 'Benefit Begins'
				,relatedComponent: 'income-noteannuity'
				,relatedField: 'owner'
			},{
				xtype: 'percentfield'
				,name: 'beforePeriodAnnualIncreaseRate'
				,label: 'Inflation rate until benefit begins'
				,monitorChange: 'live'	
			}]
		},{
			cls: 'ends'
			,items: [{
				xtype: 'relativedatefieldie'
				,baseName: 'duration'
				,monthName: 'endMonth'
				,yearName: 'endYear'
				,enumerationsStore: 'noteAnnuityIncomeDurationTypes'
				,setName: 'endFixedValues'
				,label: 'Benefit Ends'
				,relatedComponent: 'income-noteannuity'
				,relatedField: 'owner'
			},{
				xtype: 'percentfield'
				,name: 'annualIncreaseRate'
				,label: 'Inflation rate during benefit'
				,monitorChange: 'live'	
			}]
		}]
	}
});