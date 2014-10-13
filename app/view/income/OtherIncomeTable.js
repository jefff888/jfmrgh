/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('MyRetirement.view.income.OtherIncomeTable', {
	extend: 'Jarvus.container.table.ListFieldTable'
	,xtype: 'income-otherincometable'
	,requires: [
		'MyRetirement.view.income.OtherIncomeSegment'
	]
	,mixins: [
		'Jarvus.mixin.Formable'
	]
	
	,cls: 'tight-spacing'
	
	,store: 'income.Retirement'
	,headerRow: {
		xtype: 'tableheader'
		,columns: [
			 { colCls: 'expander'                   ,title: '&nbsp;' }
			,{ colCls: 'name'				        ,title: 'Description' }
			,{ colCls: 'owner'						,title: 'Owner' }
			,{ colCls: 'annualAmount'				,title: 'Monthly Amount' }
			,{ colCls: 'beforePeriodAnnualIncrease'	,title: 'Until&nbsp;Begin' }
			,{ colCls: 'annualIncreaseRate'			,title: 'After&nbsp;Begin' }
			,{ colCls: 'portionTaxableRate'			,title: 'Portion Taxable', colSpan: 2 }
		]
		,superHeader: [
			 '<th colspan=4>&nbsp;</th>'
			,'<th colspan=2>Inflation Rates for Payments</th>'
			,'<th colspan=2>&nbsp;</th>'
		]
	}
	,recordRowType: 'income-otherincome'
});