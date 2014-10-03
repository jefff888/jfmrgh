Ext.define('MyRetirement.model.Enumeration', {
    extend: 'Ext.data.Model',
    
    fields: [
        { name: 'label', type: 'string' },
        { name: 'sortOrder', type: 'int' },
        { name: 'value', type: 'int' }

    ]
});
