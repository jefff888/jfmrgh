/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('MyRetirement.view.comparison.MyBudgetTotalsRow', {
	extend: 'Jarvus.container.table.Row'
	,xtype: 'comparison-mybudgettotalsrow'
	,requires: [
		'Jarvus.table.FillerCell'
		,'Jarvus.field.BigMoneyTemplate'
		,'Jarvus.field.PercentTemplate'
	]
	,mixins: [
		'Jarvus.mixin.Formable'
	]
	
	,cls: 'total-row'
	,items: [{
		xtype: 'templatefield'
		,autoEl: 'th'
		,cls: 'col-line-item'
		,name: 'name'
	},{
		xtype: 'bigmoneytemplatefield'
		,cls: 'col-now'
		,name: 'amountNow'
		,colGroup: 'now'
	},{
		xtype: 'bigmoneytemplatefield'
		,cls: 'col-retirement'
		,name: 'amountAtRetirement'
	},{
		xtype: 'tablefillercell'
	},{
		xtype: 'percenttemplatefield'
		,cls: 'col-percent'
		,name: 'needRate'
		,tpl: '{[fm.round(values.value*100, 0)]}%'
	}]

	,cacheNowValue: function(){
		this._nowValue = this.down('[cls=col-now]').getEl().dom.innerHTML; 
	}

	,setNowVisibility: function(visibility){
		var el = this.down('[cls=col-now]').getEl().dom;
		if (visibility === true){
			el.innerHTML = this._nowValue;
		} else {
			el.innerHTML = '';
		}
	}
});