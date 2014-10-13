/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('Jarvus.field.Input', {
	extend: 'Ext.Component'
	,mixins: ['Jarvus.mixin.Fieldable']
	,xtype: 'inputfield'
	
	,tip: null
	
	,renderTpl: '<input id="{id}-inputEl" type="{inputType:defaultValue("text")}"<tpl if="inputPattern"> pattern="{inputPattern}"</tpl><tpl if="inputTitle"> title="{inputTitle}"</tpl><tpl if="inputCls"> class="{inputCls}"</tpl><tpl if="inputAttrs"> {inputAttrs}</tpl>>'
	,childEls: ['inputEl']
	,focusCls: 'form-focus'
	
	/**
	 * @cfg {Function}
	 */
	,renderEditingValue: false
	
	,initComponent: function() {
		
		Ext.applyIf(this.renderData, {
			inputTitle: this.tip
		});
		
		this.callParent(arguments);
	}
	
	,getFocusEl: function() {
		return this.inputEl;
	}
	
	,onBlur: function(e) {
		this.renderPending = !!this.renderEditingValue;
		this.syncValue();
		
		// force re-rendering of value if an editingValue was used but an update wasn't triggered by a changed value
		if(this.renderPending)
		{
			this.updateValue(this.value);
		}
	}
	
	,onFocus: function(e) {
		if(Ext.isFunction(this.renderEditingValue))
		{
			this.inputEl.dom.value = this.renderEditingValue(this.value);
		}
	}
	
	,updateValue: function(value) {
		this.inputEl.dom.value = this.renderValue(value);
		this.renderPending = false;
	}
	
	,readValue: function() {
		return this.inputEl.dom.value;
	}
	
	,renderValue: function(value) {
		return value;
	}
	
});