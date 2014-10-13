/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('Jarvus.field.Age', {
	extend: 'Jarvus.field.Integer'
	,xtype: 'agefield'
	
	,monthsName: null
	,componentCls: 'field-age'
	,inputCls: 'input-years'

	,beforeRender: function() {
		var me = this;
		
		me.renderTpl += ' <input id="{id}-monthsInputEl" type="text" class="input-months" pattern="^([0-9]|1[01])$" title="0-11 months">';
		me.addChildEls('monthsInputEl');
		
		me.callParent(arguments);
	}
	
	,getModelData: function() {
		var monthsName = this.monthsName
			,data = this.callParent();
		
		if(monthsName)
		{
			data[monthsName] = parseInt(this.monthsInputEl.dom.value.replace(/[^\-\d.]/g, ''), 10) || null;
		}
		
		return data;
	}
});