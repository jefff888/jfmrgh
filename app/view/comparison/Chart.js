/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext, MyRetirement, MyRetirementRemote*/
Ext.define('MyRetirement.view.comparison.Chart',{
	extend: 'Ext.Component'
	,xtype: 'comparison-chart'
	,requires: [
		'Ext.util.Format'
	]
    
	,config: {
		record: null
		,takeHomeVisible: null
	}
    
    ,cls: 'stack-chart'
    ,componentCls: 'comparison-chart'
    ,renderData: {
		takeHomeVisible: false
    }
    ,renderTpl: [
         '<div class="baseline-peekaboo"><hr class="baseline" id="{id}-baselineEl"></div>' // wrapper div is to solve IE "peekaboo" bug

        ,'<section id="{id}-myRetirementStack" class="stack stack-myretirement no-button">'
            ,'<header>'
                ,'<h1>My Retirement</h1>'
                ,'<div class="amount" id="{id}-myRetirementIncomeMonthlyEl" >&mdash;</div>'
            ,'</header>'
            ,'<div class="bar-ct" id="{id}-myRetirementBarCt">'
                ,'<div class="bar bar-income" id="{id}-myRetirementIncomeBar" data-qtip="Income"></div>'
                ,'<div class="bar bar-assets" id="{id}-myRetirementAssetsBar" data-qtip="Assets"></div>'
            ,'</div>'
        ,'</section>'

        ,'<section id="{id}-takeHomeStack" class="stack stack-takehomepay<tpl if="activeTab==\'take-home-pay\'"> active</tpl>"<tpl if="!takeHomeVisible"> style="visibility:hidden"</tpl>>'
            ,'<header>'
                ,'<h1>Take Home Pay</h1>'
                ,'<div class="amount" id="{id}-takeHomeTotalMonthlyEl">&mdash;</div>'
            ,'</header>'
            ,'<div class="bar-ct">'
                ,'<div class="bar bar-takehome" id="{id}-takeHomePayBar" data-qtip="Take Home Pay"></div>'
            ,'</div>'
        ,'</section>'

        ,'<section id="{id}-budgetStack" class="stack stack-mybudget<tpl if="activeTab==\'my-budget\'"> active</tpl>">'
            ,'<header>'
                ,'<h1>My Budget</h1>'
                ,'<div class="amount" id="{id}-budgetTotalMonthlyAmountEl">&mdash;</div>'
            ,'</header>'
            ,'<div class="bar-ct">'
                ,'<div class="bar bar-needs" id="{id}-budgetNeedsBar" data-qtip="Needs"></div>'
                ,'<div class="bar bar-wants" id="{id}-budgetWantsBar" data-qtip="Wants"></div>'
            ,'</div>'
        ,'</section>'
    ]
    ,childEls: [
		'baselineEl'
		,'myRetirementStack'
		,'myRetirementBarCt'
		,'myRetirementIncomeMonthlyEl'
		,'myRetirementIncomeBar'
		,'myRetirementAssetsBar'
		,'takeHomeStack'
		,'takeHomeTotalMonthlyEl'
		,'takeHomePayBar'
		,'budgetStack'
		,'budgetTotalMonthlyAmountEl'
		,'budgetNeedsBar'
		,'budgetWantsBar'
    ]
    
    ,initEvents: function() {
		var me = this;
		
		me.callParent();
		
		me.mon(me.el, 'click', function(ev, t) {
			var section;
			if(section = ev.getTarget('.stack-takehomepay', null, true))
			{
				me.fireEvent('select', 'take-home-pay', ev, t);
			}
			else if(section = ev.getTarget('.stack-mybudget', null, true))
			{
				me.fireEvent('select', 'my-budget', ev, t);
			}
		}, null, {delegate: 'header'});
		
		me.on('select', me.syncActiveTab, me);
    }
    
	,updateRecord: function(record) {
		this.refreshChart();
	}
	
	,updateTakeHomeVisible: function(isVisible) {
		var me = this;
		
		if(me.rendered)
		{
			me.takeHomeStack.setVisibilityMode(Ext.Element.VISIBILITY).setVisible(isVisible);
		}
		else
		{
			me.renderData.takeHomeVisible = isVisible;
		}
	}
	
	,syncActiveTab: function(tabId) {
		if(this.rendered)
		{
			this[tabId=='my-budget'?'budgetStack':'takeHomeStack'].radioCls('active');
		}
		else
		{
			this.renderData.activeTab = tabId;
		}
	}
    
    ,refreshChart: function() {
		var me = this
			,record = this.getRecord()
			,retirementTotal = record.get('myRetirementIncomeMonthly')
			,takeHomeTotal = record.get('takeHomeTotalMonthly')
			,budgetTotal = record.get('budgetTotalMonthlyAmount')
			,assetsWithdrawlAmount = record.get('assetsWithdrawlMonthlyAmount')
			,maxTotal = Math.max(1000, retirementTotal, takeHomeTotal, budgetTotal)
			
			// chart scale is based on retirement total and CSS-assigned position of baseline <HR>
			,dollarsPerPixel = maxTotal / me.myRetirementBarCt.getHeight()
			
			// pixel heights for each bar segment
			,baselineHeight = retirementTotal / dollarsPerPixel
			,retirementAssetsHeight = Math.max(0, assetsWithdrawlAmount / dollarsPerPixel)
			,retirementIncomeHeight = Math.max(0, record.get('totalIncomeSourcesAvgMonthlyAmount') / dollarsPerPixel)
			,takeHomeTotalHeight = Math.max(0, record.get('takeHomeTotalMonthly') / dollarsPerPixel)
			,budgetNeedsHeight = Math.max(0, record.get('budgetNeedsMonthlyAmount') / dollarsPerPixel)
			,budgetWantsHeight = Math.max(0, record.get('budgetWantsMonthlyAmount') / dollarsPerPixel)
			,stackBottomPadding
			
			,formatHeight = function(h) {
				return Ext.util.Format.round(h, 2)+'px';
			};

		// update numbers in headers
		me.myRetirementIncomeMonthlyEl.update(Ext.util.Format.currency(retirementTotal, '$', 0));
		me.takeHomeTotalMonthlyEl.update(Ext.util.Format.currency(takeHomeTotal, '$', 0));
		me.budgetTotalMonthlyAmountEl.update(Ext.util.Format.currency(budgetTotal, '$', 0));
		
		// size and position bar segments
		me.myRetirementIncomeBar.setStyle({
			height: formatHeight(retirementIncomeHeight)
		});
		me.myRetirementAssetsBar.setStyle({
			height: formatHeight(retirementAssetsHeight)
			,bottom: formatHeight(retirementIncomeHeight)
		});

		stackBottomPadding = me.myRetirementStack.getPadding('b');
		// position baseline -- getPadding will return the value in em's if this is the IE browser,
		// so convert at a 12pt font size. This applies to versions 9 and earlier.
		if (Ext.isIE6 || Ext.isIE7 || Ext.isIE8 || Ext.isIE9) {
			stackBottomPadding *= 12;
		}
		me.baselineEl.setBottom(baselineHeight + stackBottomPadding);

		me.takeHomePayBar.setStyle({
			height: formatHeight(takeHomeTotalHeight)
		});
		
		me.budgetNeedsBar.setStyle({
			height: formatHeight(budgetNeedsHeight)
		});
		me.budgetWantsBar.setStyle({
			height: formatHeight(budgetWantsHeight)
			,bottom: formatHeight(budgetNeedsHeight)
		});
		
	
		/* updating tool tip text every time after refreshing charts -*/
		
		me.myRetirementIncomeBar.set({'data-qtip': "<b>Income: </b>"+Ext.util.Format.currency(record.get('totalIncomeSourcesAvgMonthlyAmount'), '$', 0)});
		me.myRetirementAssetsBar.set({'data-qtip': "<b>Assets: </b>"+Ext.util.Format.currency(assetsWithdrawlAmount, '$', 0)});
		me.takeHomePayBar.set({'data-qtip': "<b>Take Home Pay: </b>"+Ext.util.Format.currency( record.get('takeHomeTotalMonthly'), '$', 0)});
		me.budgetNeedsBar.set({'data-qtip': "<b>Needs: </b>"+Ext.util.Format.currency(record.get('budgetNeedsMonthlyAmount'), '$', 0)});
		me.budgetWantsBar.set({'data-qtip': "<b>Wants: </b>"+Ext.util.Format.currency(record.get('budgetWantsMonthlyAmount'), '$', 0)});

	
		
    }
});