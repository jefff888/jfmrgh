/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext, MyRetirement, MyRetirementRemote*/
Ext.define('MyRetirement.view.setup.AssumptionTable', {
	extend: 'Jarvus.container.table.FieldTable'
	,xtype: 'setup-assumptiontable'
	,requires: [
		'Jarvus.container.table.Header'
		,'MyRetirement.field.Enumeration'
		,'Jarvus.field.Percent'
	]

	,items: [{
		xtype: 'tableheader'
		,columns: [
			{ colCls: 'riskTolerance'  ,title: 'Pre-Retirement Risk&nbsp;Tolerance' }
			,{ colCls: 'preTaxRate'	   ,title: 'Pre-Retirement' }
			,{ colCls: 'postTaxRate'   ,title: 'Post-Retirement' }
			,{ colCls: 'inflationRate' ,title: 'Inflation Rate' }
		]
		,superHeader: [
			 '<th>&nbsp;</th>'
			,'<th colspan=2>Effective Income Tax Rate</th>'
			,'<th>&nbsp;</th>'
		]
	},{
		items: [{
			items: [{
				xtype: 'enumerationfield'
				,monitorChange: true
				,enumerationsStore: 'riskTolerances'
				,cls: 'col-riskTolerance'
				,name: 'clientRetirementProfilePreRetirementRiskTolerance'
				,disabledPlaceholder: 'N/A'
			},{
				xtype: 'percentfield'
				,cls: 'col-preTaxRate'
				,name: 'clientFinancialProfileAverageTaxRate'
				,disabledPlaceholder: 'N/A'
				,monitorChange: 'live'		
			},{
				xtype: 'percentfield'
				,cls: 'col-postTaxRate'
				,name: 'retirementJointProfileDuringRetirementAverageTaxRate'
				,monitorChange: 'live'		
			},{
				xtype: 'percentfield'
				,cls: 'col-inflationRate'
				,name: 'clientFinancialProfileAnnualInflationRate'
				,monitorChange: 'live'	
			}]
		}]
	}]
});