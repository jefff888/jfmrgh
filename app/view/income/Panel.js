/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext, MyRetirement, MyRetirementRemote*/
Ext.define('MyRetirement.view.income.Panel', {
	extend: 'MyRetirement.view.AppPanel'
	,xtype: 'income-panel'
	,requires: [
		'MyRetirement.view.income.SocialSecurityTable'
		,'MyRetirement.view.income.NoteAnnuityTable'
		,'MyRetirement.view.income.OtherIncomeTable'
		,'MyRetirement.view.income.ChartPanel'
		,'MyRetirement.view.DataHeader'
	]
	
	,chartType: 'income-chartpanel'
	,items: [{
		itemId: 'socialSecurity'
		,cls: 'income-socialsecurity'
		,title: 'Social Security'
		,items: [{
			xtype: 'dataheader'
			,tpl: [
				'<h1>'
					,'<span class="left title">Social Security</span>'
					,'<tpl if="total"><span class="right amount">{total:currency("$",0)}</span></tpl>'
				,'</h1>'
				,'<div class="tools">'
					,'<span class="right"><a class="link" target=_blank href="http://ssa.gov">www.ssa.gov</a></span>'
				,'</div>'
			]
			,data: {
				total: null
			}
		},{
			xtype: 'income-socialsecuritytable'
		}]
	},{
		itemId: 'annuities'
		,cls: 'income-pensions'
		,title: 'Pensions and Annuities'
		,items: [{
			xtype: 'dataheader'
			,tpl: [
				'<h1>'
					,'<span class="left title">Pensions and Annuities</span>'
//					,'<span class="right amount">$2,345</span>'
				,'</h1>'
				,'<div class="tools">'
					,'<span class="left">'
						,'<tpl if="bulkOp == \'collapse\'">'
							,'<a class="collapse-all" href="#collapseall">Collapse all rows</a>'
						,'<tpl else>'
							,'<a class="expand-all" href="#expandall">Expand all rows</a>'
						,'</tpl>'
					,'</span>'
					,'<span class="right"><a class="add-item" href="#add">+ Add item</a></span>'
				,'</div>'
			]
			,data: {
				bulkOp: 'expand'
			}
		},{
			xtype: 'income-noteannuitytable'
		}]
	},{
		itemId: 'otherincome'
		,cls: 'income-otherincome'
		,title: 'Other Retirement Income'
		,items: [{
			xtype: 'dataheader'
			,tpl: [
				'<h1>Other Retirement Income</span></h1>'
				,'<div class="tools">'
					,'<span class="left">'
						,'<tpl if="bulkOp == \'collapse\'">'
							,'<a class="collapse-all" href="#collapseall">Collapse all rows</a>'
						,'<tpl else>'
							,'<a class="expand-all" href="#expandall">Expand all rows</a>'
						,'</tpl>'
					,'</span>'
					,'<span class="right"><a class="add-item" href="#add">+ Add item</a></span>'
				,'</div>'
			]
			,data: {
				bulkOp: 'expand'
			}
		},{
			xtype: 'income-otherincometable'
		}]
	}]
});