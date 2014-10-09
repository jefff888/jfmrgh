/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext, MyRetirement*/
Ext.define('MyRetirement.field.Enumeration', {
	extend: 'Jarvus.field.Select'
	,xtype: 'enumerationfield'
	,requires: [
		'MyRetirement.API'
	]
	
	,enumerationsStore: null
	,componentCls: 'field-enumeration'
	
	,initRenderData: function() {
		var me = this;
		me.options = [];
		
		if(me.enumerationsStore)
		{
			if(!me.enumerationsStore.isStore)
			{
				me.enumerationsStore = MyRetirement.API.getEnumerationStore(me.enumerationsStore);
			}
			
			me.enumerationsStore.each(function(record) {
				me.options.push({
					value: record.getId()
					,label: record.get('label')
				});
			});
		}
		
		return me.callParent();
	}
	
	,getValue: function() {
		return parseInt(this.callParent(), 10);
	}
});