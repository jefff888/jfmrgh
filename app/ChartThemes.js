/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext, MyRetirement, MyRetirementRemote*/

/**
 * @class MyRetirement.ChartThemes
 * 
 * Themes must be defined within Ext.chart.theme namespace, but we can't require our own files
 * into the Ext namespace. This wrapper class defines our application's custom themes from a
 * class within the application namespace.
 * 
 * See http://www.sencha.com/forum/showthread.php?176237-Chart-themes-are-incompatible-with-dependency-loading
 */
Ext.define('MyRetirement.ChartThemes',{
	singleton: true
	,constructor: function() {

		Ext.define('Ext.chart.theme.MyRetirement', {
			extend: 'Ext.chart.theme.Base'
			
			,themeConfig: {
				colors: [
					 '#4c6d06' // green
					,'#cc8e3f' // sienna
					,'#8c5d89' // purple
					,'#bdb48c' // taupe
					,'#3192ad' // aqua blue
					,'#9cb6bd' // light blue
					,'#73928c' // grey-green
					,'#ffb65a' // light orange
					,'#843c29' // brown
					,'#4a7d8c' // blue-grey
					,'#72a800' // green
				]
				
				,seriesThemes: [{
					stroke: '#d6dadc'
					,'stroke-width': 1
				}]
			}
			
			,constructor: function(config) {
				this.callParent([ Ext.apply(this.themeConfig, config) ]);
			}
		});

	}
});