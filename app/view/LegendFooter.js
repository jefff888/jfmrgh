/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('MyRetirement.view.LegendFooter', {
	extend: 'Ext.Component'
	,xtype: 'legendfooter'
	
	,config: {
		takeHomeVisible: null
	}
	
	,renderData: {
		takeHomeVisible: false
	}
	,renderTpl: [
		 '<ul class="chart-legend horizontal">'
			,'<li class="legend-income"  ><span class="swatch"></span><span class="swatch-name">Income</span></li>'
			,'<li class="legend-assets"  ><span class="swatch"></span><span class="swatch-name">Assets</span></li>'
			,'<li class="legend-takehome" id="{id}-takeHomeEl"<tpl if="!takeHomeVisible"> style="display:none"</tpl>><span class="swatch"></span><span class="swatch-name">Take Home Pay</span></li>'
			,'<li class="legend-needs"   ><span class="swatch"></span><span class="swatch-name">Needs</span></li>'
			,'<li class="legend-wants"   ><span class="swatch"></span><span class="swatch-name">Wants</span></li>'
		,'</ul>'
	]
	,childEls: [
		'takeHomeEl'
	]
	
	,afterRender: function() {
		this.takeHomeEl.setVisibilityMode(Ext.Element.DISPLAY);
	}
	
	,updateTakeHomeVisible: function(isVisible) {
		var me = this;
		if(me.rendered)
		{
			me.takeHomeEl.setVisible(isVisible);
		}
		else
		{
			me.renderData.takeHomeVisible = isVisible;
		}
	}
});