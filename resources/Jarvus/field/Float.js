/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('Jarvus.field.Float', {
	extend: 'Jarvus.field.Input'
	,xtype: 'floatfield'
	
	,inputCls: 'float'
	,inputPattern: '-?(\\.\\d+|\\d+\\.?\\d*)'
	,componentCls: 'field-float'
	,maskRe: /[0-9,.]/
	,minValue: null
	,maxValue: null

	,processRawValue: function(rawValue) {
		return rawValue.replace(/[^\-\d.]/g, '');
	}
	
	,rawToValue: function(rawValue) {
		return !rawValue && rawValue !== 0 ? null : this.capValue(parseFloat(rawValue));
	}
	
	,capValue: function(value) {
		var me = this
			,min = me.minValue
			,max = me.maxValue;
			
		if(Ext.isNumber(min) && value < min)
		{
			me.rawDirty = true;
			return min;
		}
		
		if(Ext.isNumber(max) && value > max)
		{
			me.rawDirty = true;
			return max;
		}
		
		return value;
	}
	
//  bad approach to limiting value, no reliable way to detect selection/pasting
//	,filterKeys: function(ev) {
//		var me = this
//			,newValue
//			,min = me.minValue
//			,max = me.maxValue
//			,testMin = Ext.isNumber(min)
//			,testMax = Ext.isNumber(max);
//		
//		// skip check if key has already been cancelled (e.g. by maskRe test)
//		if(ev.browserEvent.returnValue === false)
//		{
//			return;
//		}
//		
//		if(testMin || testMax)
//		{
//			newValue = me.rawToValue(me.processRawValue(me.getRawValue() + String.fromCharCode(ev.getCharCode())));
//			
//			if((testMin && newValue < min) || (testMax && newValue > max))
//			{
//				ev.stopEvent();
//			}
//		}
//	}
});