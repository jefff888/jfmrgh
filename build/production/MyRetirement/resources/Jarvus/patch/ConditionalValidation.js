/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('Jarvus.patch.ConditionalValidation', {
	override: 'Ext.data.Model'
	
	// adds support for a checkIf option in validators that cause them to be ignored unless the record matches some conditions
	,validate: function() {
		var me = this;
				
		if(!Ext.isDefined(me.allValidations))
		{
			me.allValidations = me.validations;
		}
		
		me.validations = Ext.Array.filter(me.allValidations, function(validator) {
			var match = true;
			
			if(validator.checkIf)
			{
				Ext.Object.each(validator.checkIf, function(fieldName, value) {
					if(me.get(fieldName) != value)
					{
						match = false;
						return false;
					}
				});
			}
			
			return match;
		});
		
		
		var errors = Ext.create('Ext.data.Errors'),
			validators = Ext.data.validations,
			length, validation, field, valid, type, i;
		                

        if (me.validations) {
            length = me.validations.length;

            for (i = 0; i < length; i++) {
                validation = me.validations[i];
                field = validation.field || validation.name;
                type = validation.type;
                valid = validators[type](validation, this.get(field), this);

                if (!valid) {
                    errors.add({
                        field  : field,
                        message: validation.message || validators[type + 'Message']
                    });
                }
            }
        }

        return errors;
		//return me.callParent(arguments);
	}
});