/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext,MyRetirement*/
Ext.define('MyRetirement.view.comparison.MyBudgetTable', {
	extend: 'Jarvus.container.table.FieldTable'
	,xtype: 'comparison-mybudgettable'
	,requires: [
		'Jarvus.container.table.Header'
		,'MyRetirement.view.comparison.MyBudgetRow'
		,'MyRetirement.view.comparison.MyBudgetTotalsRow'
	]
	
	,config: {
		showCurrentIncome: null
	}
	
	,items: [{
		// thead
		xtype: 'tableheader'
		,columns: [
			 { colCls: 'line-item'  ,title: '&nbsp;' }
			,{ colCls: 'now'        ,title: 'Now', colGroup: 'now', hidden: true }
			,{ colCls: 'retirement' ,title: 'Retirement' }
			,{ colCls: 'needs'      ,title: 'Portion considered a need' }
			,{ colCls: 'percent'    ,title: '%' }
		]
	},{
		// tbody
		itemId: 'budgetRows'
		,defaultType: 'comparison-mybudgetrow'
	},{
		// tbody
		items: [{
			// row
			xtype: 'comparison-mybudgettotalsrow'
			,itemId: 'totalRow'
		}]
	}]
	
	,afterRender: function() {
		var me = this;
		
		me.callParent(arguments);
		
		// prep column headers for hiding
		me.headerEl = me.down('>tableheader').el;
		me.headerEl.select('.group-now').setVisibilityMode(Ext.Element.DISPLAY);
	}
	
	,loadRecord: function(record) {
		var me = this
			,totalRow = me.down('#totalRow')
			,budgetRowsCt = me.down('#budgetRows')
			,budgets = record.get('budgets')
			,budgetKeys = Ext.Object.getKeys(budgets)
			,toAdd = Ext.Array.difference(budgetKeys, budgetRowsCt.items.keys)
			,toRemove = Ext.Array.difference(budgetRowsCt.items.keys, budgetKeys)
			,toUpdate = Ext.Array.intersect(budgetRowsCt.items.keys, budgetKeys);

		me.loadedRecord = record;
		
		// load basic form fields for total
		totalRow.getForm().setValues(record.get('totalBudget'));
		totalRow.cacheNowValue();

		// update existing budget rows
		Ext.each(toUpdate, function(key) {
			budgetRowsCt.getComponent(key).getForm().setValues(budgets[key]);
		});
		
		// pause layout engine during component adding/removing
		me.suspendLayouts();
		
		// add new budget rows
		Ext.each(toAdd, function(key) {
			budgetRowsCt.insert(Ext.Array.indexOf(budgetKeys, key),{
				itemId: key
			}).getForm().setValues(budgets[key]);
		});
		
		// remove stale budget rows
		Ext.each(toRemove, function(key) {
			budgetRowsCt.remove(key);
		});
		
		// hide/show "now" column
		me.setShowCurrentIncome(MyRetirement.API.getHasIncome());
		
		// resume layout engine and flush pending changes
		me.resumeLayouts(true);
	}
	
	,getRecord: function() {
		return this.loadedRecord;
	}
	
	,updateRecord: function() {
		var budgetData = {};
		
		// compile budget data
		Ext.each(this.query('#budgetRows comparison-mybudgetrow'), function(row) {
			budgetData[row.getItemId()] = row.getForm().getValues();
		});
		
		this.loadedRecord.set({
			budgets: budgetData
		});
	}
	
	,updateShowCurrentIncome: function(value, oldValue) {
		Ext.each(this.query('[colGroup=now]'), function(cell) {
			cell.setVisible(value);
		});
		
		this.headerEl.select('.group-now').setVisible(value);
	}
});