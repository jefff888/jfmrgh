Ext.define('Jarvus.patch.HistoryTrail', {
	override: 'Ext.util.History'
	
	// override History functions to record trail
	,startUp: function() {
		this.callParent(arguments);
		this.trail = [this.currentToken];
	}
	,handleStateChange: function(token) {
		
		if(this.trail[0] != token)
		{
			this.trail.unshift(token);	
		}
			
		this.callParent(arguments);
	}
	
	// new function -- triggers back if known last URL matches given url, else adds URL
	,backToUrl: function(url) {
		if(this.trail[1] == url)
		{
			this.trail.shift();
			Ext.History.back();
		}
		else
			Ext.History.add(url);
	}
});