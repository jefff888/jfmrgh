Ext.define('MyRetirement.view.assets.InvestmentAccounts', {
	extend: 'MyRetirement.view.DataPanel'
	,xtype: 'assets-investmentaccounts'
	,requires: [
		'MyRetirement.view.assets.InvestmentAccountTable'	
	]

	,title: 'Investment Accounts'
	,componentCls: 'assets-investmentaccounts'
	,items: [{
		xtype: 'component'
		,autoEl: 'header'
		,cls: 'panel-body-header'
		,html: [
			'<h1>'
				,'<span class="left title">Investment Accounts</span>'
				,'<span class="right amount">$160,000</span>'
			,'</h1>'
			,'<div class="tools">'
				,'<span class="left"><a class="expand-all" href="#">Expand all rows</a></span>'
				,'<span class="right"><a class="add-item" href="#">+ Add Item</a></span>'
			,'</div>'		
		]
	},{
		xtype: 'assets-investmentaccounttable'
	}]
});