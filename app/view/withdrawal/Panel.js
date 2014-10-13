/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext, MyRetirement, MyRetirementRemote*/
Ext.define('MyRetirement.view.withdrawal.Panel', {
	extend: 'MyRetirement.view.AppPanel'
	,xtype: 'withdrawal-panel'
	,requires: [
		'MyRetirement.view.withdrawal.ChartPanel'
		,'MyRetirement.view.withdrawal.RateTable'
	]
	
	,config: {
		data: null
	}
	
	,chartType: 'withdrawal-chartpanel'
	,items: [{
		itemId: 'withdrawalRate'
		,cls: 'withdrawal-rate'
		,title: 'Results'
		,items: [{
			xtype: 'dataheader'
			,tpl: [
				,'<tpl if="totalAssetsValueAtRetirement">'
					,'<p>'
						,'With a <strong class="rate">{selectedConfidenceLevel*100}%</strong> probability of success, '
						,'your projected assets at retirement</br>'
						,'of <strong class="total">{totalAssetsValueAtRetirement:currency("$",0)}</strong>, '
						,'may produce a monthly retirement income of &hellip; '
						,'<strong class="monthly">{assetsWithdrawalMonthlyAmount:currency("$",0)}</strong>'
					,'</p>'
				,'</tpl>'
			]
			,data: {
				totalAssetsValueAtRetirement: null
			}
		},{
			xtype: 'withdrawal-ratetable'
		},{
			xtype: 'component'
			,itemId: 'withdrawalSummary'
			,autoEl: 'footer'
			,cls: 'panel-body-footer'
			,tpl: [
				'<tpl if="totalAssetsValueAtRetirement">'
					,'<p style="font-size: 13px;">'
						,'The {assetsWithdrawalMonthlyAmount:currency("$",0)} is after tax ('
						,'{clientFinancialProfileAverageTaxRate:number("0.00") * 100}% '
						,'tax rate) in today\'s dollars, and increases annually with inflation '
						,'({clientFinancialProfileAnnualInflationRate:number("0.00") * 100}% '
						,'inflation rate).'
					,'</p>'
				,'</tpl>'
			]
		}]
	}]
	
	,updateData: function(data) {
		var me = this;
		
		me.down('dataheader').update(data);
		me.down('withdrawal-ratetable').update(data);
		me.down('#withdrawalSummary').update(data);
	}
});