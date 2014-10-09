/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('Jarvus.field.Select', {
	extend: 'Ext.Component'
	,mixins: ['Jarvus.mixin.Fieldable']
	,xtype: 'selectfield'
	
	,renderTpl: [
		'<select id="{id}-selectEl"<tpl if="selectCls"> class="{selectCls}"</tpl>>'
			,'<tpl for="options"><option value="{value}">{label}</option></tpl>'
		,'</select>'
	]
	,childEls: ['selectEl']
	
	,updateValue: function(value) {
		Ext.each(this.selectEl.dom.options, function(option) {
			if(option.value == value)
			{
				option.selected = true;
				return false;
			}
		});
	}
	
	,readValue: function() {
		var s = this.selectEl.dom;
		return s.options[s.selectedIndex].value;
	}
});