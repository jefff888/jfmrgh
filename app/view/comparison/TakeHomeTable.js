/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext,MyRetirement*/
Ext.define('MyRetirement.view.comparison.TakeHomeTable', {
	extend: 'Jarvus.container.table.FieldTable'
	,xtype: 'comparison-takehometable'
	,requires: [
		'Jarvus.container.Raw'
		,'Jarvus.container.table.Header'
		,'Jarvus.field.Template'
		,'Jarvus.field.Percent'
		,'Jarvus.field.PercentTemplate'
		,'Jarvus.field.BigMoneyTemplate'
	]
	,mixins: [
		'Jarvus.mixin.Formable'
	]
	
	,config: {
		showSpouse: null
	}
	
	,items: [{
		// thead
		xtype: 'tableheader'
		,columns: [
			 { colCls: 'line-item' ,title: '&nbsp;' }
			,{ colCls: 'rate'      ,title: '&nbsp;'			,colGroup: 'client' }
			,{ colCls: 'client'    ,title: '&mdash;'		,colGroup: 'client' }
			,{ colCls: 'rate'      ,title: '&nbsp;'			,colGroup: 'spouse' }
			,{ colCls: 'spouse'    ,title: '&mdash;'		,colGroup: 'spouse' }
			,{ colCls: 'annual'    ,title: 'Annual Total'	,colGroup: 'annual' }
			,{ colCls: 'monthly'   ,title: 'Monthly Total' }
		]
	},{
		// tbody
		items: [{
			// row - grossEarnings
			items: [{
				autoEl: 'th'
				,cls: 'col-line-item'
				,html: 'Gross Earnings'
			},{
				xtype: 'component'
				,cls: 'col-rate'
				,html: '&nbsp;'
				,colGroup: 'client'
			},{
				xtype: 'bigmoneytemplatefield'
				,cls: 'col-client'
				,name: 'clientTakeHomePay.grossEarnings'
				,colGroup: 'client'
			},{
				xtype: 'component'
				,cls: 'col-rate'
				,html: '&nbsp;'
				,colGroup: 'spouse'
			},{
				xtype: 'bigmoneytemplatefield'
				,cls: 'col-spouse'
				,name: 'coClientTakeHomePay.grossEarnings'
				,colGroup: 'spouse'
			},{
				xtype: 'bigmoneytemplatefield'
				,cls: 'col-annual'
				,name: 'annualTotalTakeHomePay.grossEarnings'
				,colGroup: 'annual'
			},{
				xtype: 'bigmoneytemplatefield'
				,cls: 'col-monthly'
				,name: 'monthlyTotalTakeHomePay.grossEarnings'
			}]
		},{
			// row - taxes
			items: [{
				autoEl: 'th'
				,cls: 'col-line-item sub-item'
				,html: 'Taxes'
			},{
				xtype: 'percenttemplatefield'
				,cls: 'col-rate'
				,name: 'clientFinancialProfileAverageTaxRate'
				,colGroup: 'client'
				,listeners: {
					change: function(field, value) {
						field.next('[name=clientFinancialProfileAverageTaxRate2]').setValue(value)
					}
				}
			},{
				xtype: 'bigmoneytemplatefield'
				,cls: 'col-client'
				,name: 'clientTakeHomePay.taxOnEarnings'
				,colGroup: 'client'
			},{
				xtype: 'percenttemplatefield'
				,cls: 'col-rate'
				,name: 'clientFinancialProfileAverageTaxRate2'
				,colGroup: 'spouse'
			},{
				xtype: 'bigmoneytemplatefield'
				,cls: 'col-spouse'
				,name: 'coClientTakeHomePay.taxOnEarnings'
				,colGroup: 'spouse'
			},{
				xtype: 'bigmoneytemplatefield'
				,cls: 'col-annual'
				,name: 'annualTotalTakeHomePay.taxOnEarnings'
				,colGroup: 'annual'
			},{
				xtype: 'bigmoneytemplatefield'
				,cls: 'col-monthly'
				,name: 'monthlyTotalTakeHomePay.taxOnEarnings'
			}]
		},{
			// row - social security
			items: [{
				autoEl: 'th'
				,cls: 'col-line-item sub-item'
				,html: 'Social Security'
			},{
				xtype: 'percentfield'
				,cls: 'col-rate'
				,name: 'clientFinancialProfileSocialSecurityTaxRate'
				,colGroup: 'client'
				,monitorChange: 'live'		
			},{
				xtype: 'bigmoneytemplatefield'
				,cls: 'col-client'
				,name: 'clientTakeHomePay.socialSecurityTaxOnEarnings'
				,colGroup: 'client'
			},{
				xtype: 'percentfield'
				,cls: 'col-rate'
				,name: 'spouseFinancialProfileSocialSecurityTaxRate'
				,colGroup: 'spouse'
				,monitorChange: 'live'		
			},{
				xtype: 'bigmoneytemplatefield'
				,cls: 'col-spouse'
				,name: 'coClientTakeHomePay.socialSecurityTaxOnEarnings'
				,colGroup: 'spouse'
			},{
				xtype: 'bigmoneytemplatefield'
				,cls: 'col-annual'
				,name: 'annualTotalTakeHomePay.socialSecurityTaxOnEarnings'
				,colGroup: 'annual'
			},{
				xtype: 'bigmoneytemplatefield'
				,cls: 'col-monthly'
				,name: 'monthlyTotalTakeHomePay.socialSecurityTaxOnEarnings'
			}]
		},{
			// row - retirement contributions
			items: [{
				autoEl: 'th'
				,cls: 'col-line-item sub-item'
				,html: 'Retirement Contributions'
			},{
				xtype: 'percenttemplatefield'
				,cls: 'col-rate'
				,name: 'retirementContributionsClientRate'
				,colGroup: 'client'
			},{
				xtype: 'bigmoneytemplatefield'
				,cls: 'col-client'
				,name: 'clientTakeHomePay.retirementContributions'
				,colGroup: 'client'
			},{
				xtype: 'percenttemplatefield'
				,name: 'retirementContributionsCoClientRate'
				,cls: 'col-rate'
				,colGroup: 'spouse'
			},{
				xtype: 'bigmoneytemplatefield'
				,cls: 'col-spouse'
				,name: 'coClientTakeHomePay.retirementContributions'
				,colGroup: 'spouse'
			},{
				xtype: 'bigmoneytemplatefield'
				,cls: 'col-annual'
				,name: 'annualTotalTakeHomePay.retirementContributions'
				,colGroup: 'annual'
			},{
				xtype: 'bigmoneytemplatefield'
				,cls: 'col-monthly'
				,name: 'monthlyTotalTakeHomePay.retirementContributions'
			}]
		},{
			// row - other
			items: [{
				autoEl: 'th'
				,cls: 'col-line-item sub-item'
				,html: 'Other'
			},{
				xtype: 'percentfield'
				,cls: 'col-rate'
				,name: 'clientFinancialProfileTakeHomePayOtherRate'
				,colGroup: 'client'
				,monitorChange: 'live'		
			},{
				xtype: 'bigmoneytemplatefield'
				,cls: 'col-client'
				,name: 'clientTakeHomePay.otherEarningsReductions'
				,colGroup: 'client'
			},{
				xtype: 'percentfield'
				,cls: 'col-rate'
				,name: 'spouseFinancialProfileTakeHomePayOtherRate'
				,colGroup: 'spouse'
				,monitorChange: 'live'		
			},{
				xtype: 'bigmoneytemplatefield'
				,cls: 'col-spouse'
				,name: 'coClientTakeHomePay.otherEarningsReductions'
				,colGroup: 'spouse'
			},{
				xtype: 'bigmoneytemplatefield'
				,cls: 'col-annual'
				,name: 'annualTotalTakeHomePay.otherEarningsReductions'
				,colGroup: 'annual'
			},{
				xtype: 'bigmoneytemplatefield'
				,cls: 'col-monthly'
				,name: 'monthlyTotalTakeHomePay.otherEarningsReductions'
			}]
		},{
			// row - total reductions
			items: [{
				autoEl: 'th'
				,cls: 'col-line-item'
				,html: 'Total Reductions'
			},{
				xtype: 'component'
				,cls: 'col-rate'
				,html: '&nbsp;'
				,colGroup: 'client'
			},{
				xtype: 'bigmoneytemplatefield'
				,cls: 'col-client'
				,name: 'clientTakeHomePay.totalReductions'
				,colGroup: 'client'
			},{
				xtype: 'component'
				,html: '&nbsp;'
				,cls: 'col-rate'
				,colGroup: 'spouse'
			},{
				xtype: 'bigmoneytemplatefield'
				,cls: 'col-spouse'
				,name: 'coClientTakeHomePay.totalReductions'
				,colGroup: 'spouse'
			},{
				xtype: 'bigmoneytemplatefield'
				,cls: 'col-annual'
				,name: 'annualTotalTakeHomePay.totalReductions'
				,colGroup: 'annual'
			},{
				xtype: 'bigmoneytemplatefield'
				,cls: 'col-monthly'
				,name: 'monthlyTotalTakeHomePay.totalReductions'
			}]
		},{
			// row - total take home income
			cls: 'total-row'
			,items: [{
				autoEl: 'th'
				,cls: 'col-line-item total-col'
				,html: 'Take Home Pay'
			},{
				xtype: 'component'
				,cls: 'col-rate total-col'
				,html: '&nbsp;'
				,colGroup: 'client'
			},{
				xtype: 'bigmoneytemplatefield'
				,cls: 'col-client total-col'
				,name: 'clientTakeHomePay.totalTakeHomePay'
				,colGroup: 'client'
			},{
				xtype: 'component'
				,html: '&nbsp;'
				,cls: 'col-rate'
				,colGroup: 'spouse'
			},{
				xtype: 'bigmoneytemplatefield'
				,cls: 'col-spouse total-col'
				,name: 'coClientTakeHomePay.totalTakeHomePay'
				,colGroup: 'spouse'
			},{
				xtype: 'bigmoneytemplatefield'
				,cls: 'col-annual total-col'
				,name: 'annualTotalTakeHomePay.totalTakeHomePay'
				,colGroup: 'annual'
			},{
				xtype: 'bigmoneytemplatefield'
				,cls: 'col-monthly total-col'
				,name: 'monthlyTotalTakeHomePay.totalTakeHomePay'
			}]
		}]
	}]
	
	,initComponent: function() {
		var me = this;
		
		// initially hide spouse and annual column headers, modifying spec
		Ext.each(me.items[0].columns, function(columnSpec) {
			if(columnSpec.colGroup == 'spouse' || columnSpec.colGroup == 'annual')
				columnSpec.hidden = true;
		});
		
		me.callParent(arguments);
		
		// initially hide spouse and annual column cells, modifying component instances
		Ext.each(me.query('[colGroup=spouse],[colGroup=annual]'), function(cell) {
			cell.setVisible(false);
		});
	}
	
	,afterRender: function() {
		var me = this;
		
		me.callParent(arguments);
		
		// prep column headers for hiding
		me.headerEl = me.down('>tableheader').el;
		me.headerEl.select('.group-spouse,.group-annual').setVisibilityMode(Ext.Element.DISPLAY);
	}
	
	,loadRecord: function(record) {
		var me = this;
		me.headerEl.down('.col-client').update(record.get('clientTakeHomePay').firstName);
		me.headerEl.down('.col-spouse').update(record.get('coClientTakeHomePay').firstName);
		me.setShowSpouse(MyRetirement.API.getClientMarried());
		me.getForm().loadRecord(record);
	}
	
	,updateShowSpouse: function(value, oldValue) {
		Ext.each(this.query('[colGroup=spouse],[colGroup=annual]'), function(cell) {
			cell.setVisible(value);
		});
		
		this.headerEl.select('.group-spouse,.group-annual').setVisible(value);
	}
});