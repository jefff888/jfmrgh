/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('MyRetirement.view.income.NoteAnnuityTable', {
	extend: 'Jarvus.container.table.ListFieldTable'
	,xtype: 'income-noteannuitytable'
	,requires: [
		'MyRetirement.view.income.NoteAnnuitySegment'
	]
	
	,cls: 'tight-spacing'
	
	,store: 'income.Annuities'
	,headerRow: [
		 { colCls: 'expander'           ,title: '&nbsp;' }
		,{ colCls: 'name'				,title: 'Description' }
		,{ colCls: 'type'				,title: 'Type' }
		,{ colCls: 'owner'				,title: 'Owner' }
		,{ colCls: 'monthlyAmount'		,title: 'Monthly Amount' }
		,{ colCls: 'survivorBenefitRate',title: 'Survivor Benefit Portion' }
		,{ colCls: 'portionTaxableRate'	,title: 'Portion Taxable', colSpan: 2 }
	]
	,recordRowType: 'income-noteannuity'
});