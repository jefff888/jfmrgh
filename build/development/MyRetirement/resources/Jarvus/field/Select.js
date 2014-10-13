/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('Jarvus.field.Select', {
	extend: 'Jarvus.field.Field'
	,xtype: 'selectfield'
	
	,selectCls: null
	,options: null
	,monitorChange: true
	,autoDisable: true
	,disabledPlaceholder: false
	
	,maskOnDisable: false
	,renderTpl: [
		'<tpl if="label"><label><span>{label}</span></tpl>'
		,'<select id="{id}-selectEl"<tpl if="selectCls"> class="{selectCls}"</tpl><tpl if="options.length==1"> disabled="DISABLED"</tpl>>'
			,'<tpl for="options"><option value="{value}"<tpl if="String(value)===String(parent.value)"> selected="selected"</tpl>>{label}</option></tpl>'
		,'</select>'
		,'<tpl if="label"></label></tpl>'
	]
	,childEls: ['selectEl']
	
	
	,addChangeListener: function() {
		var me = this;
		
		me.mon(me.selectEl, 'change', function() {
			me.setValue(me.getValue());
		});
	}
	
	// component template methods
	,initRenderData: function() {
		var me = this;
		return Ext.applyIf(me.callParent(), {
			selectCls: me.selectCls
			,options: me.options
		});
	}
	
	,initEvents: function() {
		var me = this;
		
		if(me.monitorChange)
		{
			me.addChangeListener();
		}
		
		me.callParent(arguments);
	}
	
	,getFocusEl: function() {
		return this.selectEl;
	}
	
	,onDisable: function() {
		var me = this;
		
		me.callParent();
		
		if(me.disabledPlaceholder && !me.disabledOption)
		{
			me.suspendCheckChange++;
			me.disabledIndex = me.selectEl.dom.selectedIndex;
			me.disabledOption = me.selectEl.createChild({
				tag: 'option'
				,value: ''
				,html: me.disabledPlaceholder
				,selected: true
			});
		}
		
		me.selectEl.dom.disabled = true;
	}
	
	,onEnable: function() {
		var me = this;
		
		me.callParent();
		
		if(me.disabledOption)
		{
			me.selectEl.dom.selectedIndex = me.disabledIndex;
			me.disabledOption.destroy();
			me.disabledOption = null;
			me.suspendCheckChange--;
		}
		
		me.selectEl.dom.disabled = false;
	}
	
	// field template methods
	,getValue: function() {
		var me = this
			,s;
		
		if(me.selectEl)
		{
			s = me.selectEl.dom;
			me.value = s.options[s.selectedIndex].value;
		}
		
		return me.value;
	}
	
	,setValue: function(value) {
		var me = this
			,options, len, i = 0;
		
		if(me.selectEl)
		{
			options = me.selectEl.dom.options;
			len = options.length;
			
			for(;i < len; i++)
			{
				if(options[i].value == value)
				{
					if(me.disabledOption)
					{
						me.disabledIndex = i;
					}
					else
					{
						options[i].selected = true;
					}
					break;
				}
			}
		}
		
		return me.mixins.fieldable.setValue.call(me, value);
	}
	
	// selectfield methods
	,getValueLabel: function() {
		var s = this.selectEl.dom;
		return s.options[s.selectedIndex].innerHTML;
	}
});