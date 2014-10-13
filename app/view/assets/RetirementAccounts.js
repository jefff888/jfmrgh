Ext.define('MyRetirement.view.assets.RetirementAccounts', {
	extend: 'MyRetirement.view.DataPanel'
	,xtype: 'assets-retirementaccounts'
	,requires: [
		'MyRetirement.view.assets.RetirementAccountTable'	
	]

	,title: 'Retirement Accounts'
	,componentCls: 'assets-retirementaccounts'
	,items: [{
		xtype: 'component'
		,autoEl: 'header'
		,cls: 'panel-body-header'
		,html: [
			'<h1>'
				,'<span class="left title">Retirement Accounts</span>'
				,'<span class="right amount">$175,000</span>'
			,'</h1>'
			,'<div class="tools">'
				,'<span class="left"><a class="expand-all" href="#">Expand all rows</a></span>'
				,'<span class="right"><a class="add-item" href="#">+ Add Item</a></span>'
			,'</div>'
		]
	},{
		xtype: 'assets-retirementaccounttable'
	}]
});