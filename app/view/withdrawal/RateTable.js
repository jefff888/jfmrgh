/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('MyRetirement.view.withdrawal.RateTable', {
	extend: 'Ext.Component' // 'Jarvus.container.table.DataTable'
	,xtype: 'withdrawal-ratetable'

	,tpl: [
		 '<table class="datatable">'
			,'<thead>'
				,'<tr class="merge-with-next">'
					,'<th class="col-name" colspan="3">'
					,'<span style="font-size: 14px;">Your Sustainable Withdrawal Amount and Rate = '
					,'{assetsWithdrawalMonthlyAmount:currency("$",0)} and '
					,'{selectedWithdrawalRate:number("0.00")*100}%</span>'
					,'</th>'
					,'<th style="padding: 0.5em !important;">'
					,'<tpl if="showRate == true">'
						,'<button id="wrShowAmount" class="rateDisplayType">$</button>&nbsp;'
						,'<button id="wrShowRate" class="selected rateDisplayType">%</button>'
					,'<tpl else>'
						,'<button id="wrShowAmount" class="selected rateDisplayType">$</button>&nbsp;'
						,'<button id="wrShowRate" class="rateDisplayType">%</button>'
					,'</tpl>'
					,'</th>'
				,'</tr>'
				,'<tr class="merge-with-next">'
					,'<th class="col-name">&nbsp;</th>'
					,'<th class="col-probability-group" colspan=3>Probability of Success</th>'
				,'</tr>'
				,'<tr>'
					,'<th class="col-name">Risk Tolerance <span class="weak">(During&nbsp;Retirement)</span></th>'
					,'<th class="col-probability">{confidenceLevel1*100}%</th>'
					,'<th class="col-probability">{confidenceLevel2*100}%</th>'
					,'<th class="col-probability">{confidenceLevel3*100}%</th>'
				,'</tr>'
			,'</thead>'
			,'<tbody>'
			,'<tpl for="withdrawalScenarios">'
				,'<tr>'
					,'<td class="col-name">{riskToleranceAtRetirementLabel}</td>'
					,'<tpl for="this.getButtons(values, parent)">'
						,'<td class="col-probability">'
							,'<button style="width: 6em !important; padding: 0.5em !important;" '
								,'<tpl if="selected"> class="selected"</tpl>'
								,' data-confidenceLevel="{confidenceLevel}"'
								,' data-riskTolerance="{riskTolerance}"'
								,' data-rate="{withdrawalRate}"'
								,' data-amount="{withdrawalAmount}"'
							,'>'
								 ,'<tpl if="isRate">'
								 ,'{withdrawalRate:number("0.00")*100}%'
								 ,'<tpl else>'
								 ,'{withdrawalAmount:currency("$",0)}'
								 ,'</tpl>'
							,'</button>'
						,'</td>'
					,'</tpl>'
				,'</tr>'
			,'</tpl>'
			,'</tbody>'
		,'</table>'
		,{
			getButtons: function(scenario, rateData) {
				var btns = [], n = 1;
				
				for(;n <= 3; n++)
				{
					btns.push({
						confidenceLevel:
							rateData['confidenceLevel'+n]
						,isRate:
							rateData.showRate
						,riskTolerance:
							scenario.riskToleranceAtRetirement
						,withdrawalRate:
							scenario['withdrawalRate'+n]
						,withdrawalAmount:
							scenario['withdrawalAmount'+n]
						,selected:
							rateData.selectedConfidenceLevel == rateData['confidenceLevel'+n]
							&& rateData.selectedRiskToleranceAtRetirement == scenario.riskToleranceAtRetirement
					});
					
					//window.console.log('btns: ' + n + ' : ' + btns[n-1].confidenceLevel + ' | ' + 
					//	btns[n-1].riskTolerance + ' | ' + btns[n-1].withdrawalRate + ' | ' + btns[n-1].selected); 
					
				}
				
				return btns;
			}
		}
	]

	,afterRender: function() {
		var me = this;
		me.callParent();
		
		me.el.on('click', function(ev, t) {
			var btn = Ext.get(t)
				,confidence = parseFloat(btn.getAttribute('data-confidenceLevel'))
				,riskTolerance = parseInt(btn.getAttribute('data-riskTolerance'), 10)
				,rate = parseFloat(btn.getAttribute('data-rate'));

			if (btn.id === 'wrShowAmount' || btn.id === 'wrShowRate') {
				me.onShowClick(ev, btn);
				ev.stopEvent();
				return;
			}

			ev.stopEvent();
			
			if(me.selectedButton)
			{
				me.selectedButton.removeCls('selected');
			}
			
			me.selectedButton = btn;
			btn.addCls('selected');
			
			me.fireEvent('select', confidence, riskTolerance, rate, btn, ev);
		}, null, {delegate: 'button'});

	}

	,onShowClick: function (evt, btn) {
		var me = this
			,theController = MyRetirement.app.getController('Withdrawal');
		if (btn.id === 'wrShowAmount') {
			me.data.showRate = false;
			theController.rateDataRecord.set({showRate: false});
			Ext.suspendLayouts();
			me.update(me.data);
			Ext.resumeLayouts();
		} else if (btn.id === 'wrShowRate') {
			me.data.showRate = true;
			theController.rateDataRecord.set({showRate: true});
			Ext.suspendLayouts();
			me.update(me.data);
			Ext.resumeLayouts();
		}
	}

	,update: function() {
		var me = this;
		me.callParent(arguments);
		me.selectedButton = me.el.down('button.selected');
	}
	
	,getSelectedButton: function() {
		return this.selectedButton;
	}
});