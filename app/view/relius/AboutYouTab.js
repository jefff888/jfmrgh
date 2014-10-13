/*jslint browser: true, undef: true, white: false, laxbreak: true */

/**
 * Overall view class for the consumer personal information tab.
 *
 * User: Jeff.Furgal
 * Date: 5/24/13
 * Time: 4:10 PM
 */

Ext.define('MyRetirement.view.relius.AboutYouTab', {
	extend: 'MyRetirement.view.AppPanel'
	,xtype: 'about-you-tab'
	,requires: [
		'MyRetirement.view.LegendFooter'
		,'MyRetirement.view.relius.PersonalInfoForm'
	]
	,mixins: [
		'Jarvus.mixin.Formable'
	]

	,backButton: false
	,hidden: true

	,items: [{
		itemId: 'aboutYouId'
		,title: 'About You Panel'
		,cls: 'aboutYou-information'
		,items: [{
			xtype: 'dataheader'
			,id: 'marital-status-raw'
			,name: 'clientPersonMaritalStatusTypeCode'
	// NOTE: The marital status selector is a non-form DOM element due to layout problems with the
	// dataheader class and the visual design requirements of this tab. Consequently the Help event
	// listeners have had to be set here in the HTML text.
			,html: [
				'<h1>Personal Information</h1>'
				,'<div class="tools">'
				,'<span class="left"><h2>Tell us a little bit about you. What is your current marital status?</h2></span>'
				,'<span class="right"><select id="marital-status-selector" name="clientPersonMaritalStatusTypeCode" ' +
					'class="marital-status-dropdown" ' +
					'onmouseover="MyRetirement.helpFieldMouseOver(Ext.get(\'marital-status-selector\'))" ' +
					'onfocusgained="MyRetirement.helpFieldGainFocus(Ext.get(\'marital-status-selector\'))">'
				,'<option value="2">Married</option> <option selected value="1">Single</option></select> </span>'
				,'</div>'
			]
		},{
			xtype: 'relius-personalinfo'
		}]
	}]
});