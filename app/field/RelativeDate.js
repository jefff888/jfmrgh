/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext,MyRetirement*/
Ext.define('MyRetirement.field.RelativeDate', {
	extend: 'Jarvus.container.Raw'
	,xtype: 'relativedatefield'
	,requires: [
		'Jarvus.field.Integer'
		,'MyRetirement.field.Enumeration'
	]
	
	// parameter names
	,monthName: null
	,yearName: null
	,yearsName: null
	,monthsName: null
	,defaultLookup: null
	,relatedComponent: null
	,relatedField: null
	,componentCls: 'field-reldate'
	,autoDestroy: false
	
	// Component template methods
	,initComponent: function() {
		var me = this;
		
		me.callParent();
		
		me.enumField = me.add({
			xtype: 'enumerationfield'
			,name: me.baseName+'Type'			
			,label: me.label
			,enumerationsStore: me.enumerationsStore
			,monitorChange: true
			,cls: 'field-reldate-main'
			,listeners: {
				scope: me
				,change: me.onChange
			}
		});
	}
	
	
	// event handlers
	,onChange: function(enumField, value) {
		this.syncSubFields(value);
	}
	
	
	// member methods
	,syncSubFields: function(value) {
		var me = this
			,active = me.activeSubFields || []
			,toActivate = []
			,toRemove
			,toAdd
			,i
			,listStore
			,relatedVal
			,storeVal
			,defaultLookupVal;
		
		listStore = me.up('listfieldtable').getStore();
		
		// build a list of fields to activate
		switch(value||me.enumField.getValue())
		{
			case undefined:
				return;
			case 0: // On
				// Get default date for On
				if (me.relatedComponent && me.relatedField) {
					relatedVal = me.up().up().up().getRecord().get(me.relatedField) + "_"; 
				}
				defaultLookupVal = listStore.getSetValue(me.setName, value) || listStore.getSetValue(me.setName, relatedVal + value);
				if (defaultLookupVal) {
					var splitDates = defaultLookupVal.split(" ");
					toActivate.push(me.getMonthInputField(splitDates[0]), me.getYearInputField(splitDates[1]));
				}
				else {
					toActivate.push(me.getMonthInputField(null), me.getYearInputField(null));
				}
				break;
			case 1: // After
				defaultLookupVal = listStore.getSetValue(me.setName, value) || listStore.getSetValue(me.setName, relatedVal + value);
				if (defaultLookupVal) {
					var splitTime = defaultLookupVal.split(" ");
					toActivate.push(me.getYearsInputField(splitTime[0]), me.getMonthsInputField(splitTime[1]));
				}
				else {
					toActivate.push(me.getYearsInputField(null), me.getMonthsInputField(null));
				}
				
				break;
			case 30: // At a specific age
				toActivate.push(me.getAgeInputField(0));
				break;
			default: // Now, AtRetirement, Death
				toActivate.push(me.getAutoValueCmp());
				listStore = me.up('listfieldtable').getStore();
				//if(window.console) window.console.log ('RelativeDate: lookup: ' + me.setName + 
				//		'relatedComponent: ' + me.relatedComponent + ', relatedField: ' + me.relatedField);
				if (me.relatedComponent && me.relatedField) {
					relatedVal = me.up().up().up().getRecord().get(me.relatedField) + "_"; 
					//if (window.console) window.console.log ('Related value: ' + relatedVal);
				
					var amount = me.up().up().up().getRecord().get('amount');
					var name = me.up().up().up().getRecord().get ('name');
					//if (window.console) window.console.log ('Related name: ' + name + ', amount: ' + amount);
				
				}
				var storeVal = listStore.getSetValue(me.setName, value) || listStore.getSetValue(me.setName, relatedVal + value);
				
				me.getAutoValueCmp().update(me.setName ? storeVal : '');
		}
		
		// calculate delta
		toAdd = Ext.Array.difference(toActivate, active);
		toRemove = Ext.Array.difference(active, toActivate);
		
		// apply visibility changes
		Ext.suspendLayouts();
		me.add(toAdd);
		Ext.Array.each(toRemove, function(cmp) {
			if(cmp.isFormField)
			{
				cmp.clearInvalid();
			}
			me.remove(cmp);
		}, me);
		Ext.resumeLayouts(true);
		
		// store new list of active fields
		me.activeSubFields = toActivate;
	}
	
	
	// subfield factory methods
	,getMonthInputField: function(defaultValue) {
		var me = this;
		return me.monthInputField || (me.monthInputField = Ext.widget({
			xtype: 'selectfield'
			,cls: 'subfield-month'
			,name: me.monthName || me.baseName+'Month'
			,value: defaultValue || ''
			,options: [
				{value: '', label: 'Month'}
				,{value: '1', label: 'Jan'}
				,{value: '2', label: 'Feb'}
				,{value: '3', label: 'Mar'}
				,{value: '4', label: 'Apr'}
				,{value: '5', label: 'May'}
				,{value: '6', label: 'Jun'}
				,{value: '7', label: 'Jul'}
				,{value: '8', label: 'Aug'}
				,{value: '9', label: 'Sep'}
				,{value: '10', label: 'Oct'}	
				,{value: '11', label: 'Nov'}
				,{value: '12', label: 'Dec'}
			]
		}));
	}
	
	,getYearInputField: function(defaultValue) {
		var me = this;
		return me.yearInputField || (me.yearInputField = Ext.widget({
			xtype: 'integerfield'
			,cls: 'subfield-year'
			,inputPlaceholder: 'Year'
			,value: defaultValue || ''
			,name: me.yearName || me.baseName+'Year'
		}));
	}
	
	,getAgeInputField: function(defaultValue) {
		var me = this;
		return me.ageInputField || (me.ageInputField = Ext.widget({
			xtype: 'integerfield'
			,cls: 'subfield-age'
			,inputPlaceholder: 'Age'
			,value: defaultValue || 0
			,name: me.yearName || me.baseName+'Age'
		}));
	}
	
	,getMonthsInputField: function(defaultValue) {
		var me = this;
		return me.monthsInputField || (me.monthsInputField = Ext.widget({
			xtype: 'integerfield'
			,cls: 'subfield-months'
			,value: defaultValue
			,inputPlaceholder: 'Months'
			,name: me.monthsName || me.baseName+'Months'
		}));
	}
	
	,getYearsInputField: function(defaultValue) {
		var me = this;
		return me.yearsInputField || (me.yearsInputField = Ext.widget({
			xtype: 'integerfield'
			,cls: 'subfield-years'
			,value: defaultValue
			,inputPlaceholder: 'Years'
			,name: me.yearsName || me.baseName
		}));
	}
	
	,getAutoValueCmp: function() {
		var me = this;
		return me.autoValueCmp || (me.autoValueCmp = Ext.widget({
			xtype: 'component'
			,cls: 'subfield-autovalue'
		}));
	}
});