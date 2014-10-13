/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('MyRetirement.view.income.SocialSecurityTable', {
	extend: 'Jarvus.container.table.FieldTable'
	,xtype: 'income-socialsecuritytable'
	,requires: [
		'Jarvus.container.Raw'
		,'Jarvus.container.table.Header'
		,'Jarvus.field.Template'
		,'Jarvus.field.Boolean'
		,'Jarvus.field.BigMoney'
		,'Jarvus.field.Integer'
		,'Jarvus.table.FillerCell'
	]
	,mixins: [
		'Jarvus.mixin.Formable'
	]

	,cls: 'tight-spacing'

	,items: [{
		xtype: 'tableheader'
		,columns: [
			 { colCls: 'name'                             ,title: 'Name' }
			,{ colCls: 'socialSecurityCovered'            ,title: 'Covered' }
			,{ colCls: 'socialSecurityReceivingBenefits'  ,title: 'Receiving Benefits' }
			,{ colCls: 'socialSecurityFullMonthlyBenefit' ,title: 'Full Retirement Age Monthly&nbsp;Benefit' }
			,{ colCls: 'socialSecurityCurMonthlyBenefit'  ,title: 'Current Monthly Benefit' }
			,{ colCls: 'beginAge'                         ,title: 'Begin Age (Years&nbsp;/&nbsp;Months)' }
			,{ colCls: 'survivorBenefitRate'              ,title: 'Spousal Benefit Available' }
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
				,cls: 'col-socialSecurityCovered'
				,name: 'clientFinancialProfileSocialSecurityCovered'
			},{
				xtype: 'booleanfield'
				,cls: 'col-socialSecurityReceivingBenefits'
				,colName: 'receivingSocSecurityBenefits'
				,name: 'clientRetirementProfileIsReceivingSocSecurityBenefits'
			},{
				xtype: 'rawcontainer'
				,cls: 'col-socialSecurityFullMonthlyBenefit'
				,colName: 'fullMonthlyBenefit'
				,maskOnDisable: false
				,items: [{
					xtype: 'component'
					,autoEl: { tag: 'span', cls: 'reset-spacer' }
				},{
					xtype: 'bigmoneyfield'
					,name: 'clientRetirementProfileSocialSecurityFullMonthlyBenefit'
					,disabledPlaceholder: 'N/A'
					,monitorChange: 'live'	
				},{
					xtype: 'component'
					,autoEl: { tag: 'span', cls: 'reset-button reset-field', 'data-qtip': 'Set to Client\'s Full Retirement Age benefit' }
				}]
			},{
				xtype: 'bigmoneyfield'
				,name: 'clientRetirementProfileSocialSecurityPVMonthlyBenefit'
				,colName: 'currentMonthlyBenefit'
				,disabledPlaceholder: 'N/A'
				,disabled: true
				,monitorChange: 'live'
			},{
				xtype: 'rawcontainer'
				,cls: 'col-beginAge'
				,items: [{
					xtype: 'component'
					,autoEl: { tag: 'span', cls: 'reset-spacer' }
				},{
					xtype: 'integerfield'
					,cls: 'field-years'
					,name: 'clientRetirementProfileSocialSecurityBeginAge'
					,resetBlank: true
				},{
					xtype: 'integerfield'
					,cls: 'field-months'
					,name: 'clientRetirementProfileSocialSecurityBeginAgeMonths'
					,resetBlank: true
				},{
					xtype: 'component'
					,autoEl: { tag: 'span', cls: 'reset-button reset-field', 'data-qtip': 'Set to Client\'s Full Retirement Age' }
				}]
			},{
				xtype: 'booleanfield'
				,cls: 'col-survivorBenefitRate'
				,name: 'spouseFinancialProfileSpousalBenefitAvailable'
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
				,cls: 'col-socialSecurityCovered'
				,name: 'spouseFinancialProfileSocialSecurityCovered'
			},{
				xtype: 'booleanfield'
				,cls: 'col-socialSecurityReceivingBenefits'
				,colName: 'receivingSocSecurityBenefits'
				,name: 'spouseRetirementProfileIsReceivingSocSecurityBenefits'
			},{
				xtype: 'rawcontainer'
				,cls: 'col-socialSecurityFullMonthlyBenefit'
				,colName: 'fullMonthlyBenefit'
				,maskOnDisable: false
				,items: [{
					xtype: 'component'
					,autoEl: { tag: 'span', cls: 'reset-spacer' }
				},{
					xtype: 'bigmoneyfield'
					,name: 'spouseRetirementProfileSocialSecurityFullMonthlyBenefit'
					,disabledPlaceholder: 'N/A'
					,monitorChange: 'live'	
				},{
					xtype: 'component'
					,autoEl: { tag: 'span', cls: 'reset-button reset-field', 'data-qtip': 'Set to Co-Client\'s Full Retirement Age benefit' }
				}]
			},{
				xtype: 'bigmoneyfield'
				,name: 'spouseRetirementProfileSocialSecurityPVMonthlyBenefit'
				,colName: 'currentMonthlyBenefit'
				,disabledPlaceholder: 'N/A'
				,disabled: true
				,monitorChange: 'live'
			},{
				xtype: 'rawcontainer'
				,cls: 'col-beginAge'
				,items: [{
					xtype: 'component'
					,autoEl: { tag: 'span', cls: 'reset-spacer' }
				},{
					xtype: 'integerfield'
					,cls: 'field-years'
					,name: 'spouseRetirementProfileSocialSecurityBeginAge'
					,resetBlank: true
				},{
					xtype: 'integerfield'
					,cls: 'field-months'
					,name: 'spouseRetirementProfileSocialSecurityBeginAgeMonths'
					,resetBlank: true
				},{
					xtype: 'component'
					,autoEl: { tag: 'span', cls: 'reset-button reset-field', 'data-qtip': 'Set to Co-Client\'s Full Retirement Age' }
				}]
			},{
				xtype: 'tablefillercell'
			}]
		}]
	}]
	
	,initEvents: function() {
		var me = this;
		me.callParent();
		
		me.mon(me.el, 'click', function(ev, t) {
			var row = ev.getTarget('tr', me.el, true)
				,isSpouse = row.hasCls('spouse')
				,resetBoth = Ext.fly(t).hasCls('reset-both')
				,eventName = ev.getTarget('.col-beginAge') ? 'beginageresetclick' : 'benefitresetclick';
				
			me.fireEvent(eventName, me, isSpouse, resetBoth, row, t, ev);
		}, me, {delegate: '.reset-button'});
	}
});