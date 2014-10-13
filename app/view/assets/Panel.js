/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext, MyRetirement, MyRetirementRemote*/
Ext.define('MyRetirement.view.assets.Panel', {
	extend: 'MyRetirement.view.AppPanel'
	,xtype: 'assets-panel'
	,requires: [
		'MyRetirement.view.assets.InvestmentAccountTable'
		,'MyRetirement.view.assets.RetirementAccountTable'
		,'MyRetirement.view.assets.ChartPanel'
		,'MyRetirement.view.DataHeader'
	]
	
	,chartType: 'assets-chartpanel'
	,items: [{
		itemId: 'retirement'
		,cls: 'assets-retirementaccounts'
		,title: 'Retirement Accounts'
		,items: [{
			xtype: 'dataheader'
			,tpl: [
				'<h1>Retirement Accounts</h1>'
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
			xtype: 'assets-retirementaccounttable'
		}]
	},{
		itemId: 'investment'
		,cls: 'assets-investmentaccounts'
		,title: 'Investment Accounts'
		,items: [{
			xtype: 'dataheader'
			,html: [
				'<h1>Investment Accounts</h1>'
				,'<div class="tools">'
					,'<span class="right"><a class="add-item" href="#add">+ Add item</a></span>'
				,'</div>'
			]
		},{
			xtype: 'assets-investmentaccounttable'
		}]
	}]
});