/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('MyRetirement.field.PercentSlider', {
	extend: 'Ext.slider.Single'
	,xtype: 'percentslider'
	
	,width: 300
	
	,increment: 1
	,minValue: 0
	,maxValue: 100
	
	,tipText: function(thumb) {
		return (thumb.value||0) + '%';
	}
});