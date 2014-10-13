/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('Jarvus.chart.axis.PriorityNumeric', {
	extend: 'Ext.chart.axis.Numeric'
	,alias: 'axis.prioritynumeric'

	,stepSizePriority: []
	
	
	,constructor: function() {
		this.callParent(arguments);
		this.type = 'Numeric'; // Ext.chart.axis.Axis expects this for Numeric-y axis
	}
	
	,calcEnds: function() {
		var me = this
			,range = me.getRange()
			,diff = range.max - range.min
			,steps = 1
			,sizes = me.stepSizePriority, i = 0, len = sizes.length;
		
		// find the first step size that fits the chart evenly
		for(;i<sizes.length;i++)
		{
			if(diff%sizes[i]==0)
			{
				steps = diff/sizes[i];
				break;
			}
		}
			
		return {
			from: range.min
			,to: range.max
			,step: diff / steps
			,steps: steps
		};
	}
});