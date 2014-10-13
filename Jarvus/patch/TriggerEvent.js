Ext.define('Jarvus.patch.TriggerEvent', {
	override: 'Ext.form.field.Trigger'

	,triggerOnEnter: true
	
	,onRender: function() {
		this.callParent(arguments);

		this.on('specialkey', function(field, event) {
			if(field.triggerOnEnter && event.getKey() == event.ENTER)
				field.fireEvent('trigger', field, event);
		});
	}

	,onTriggerClick: function(event) {
		this.fireEvent('trigger', this, event);
	}
});

