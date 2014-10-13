/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('Jarvus.data.writer.MappedJson', {
	extend: 'Ext.data.writer.Json'
	,alias: 'writer.mappedjson'

	// this function was lifted from the base writer and patched to support field mappings
	// see http://www.sencha.com/forum/showthread.php?145427
	,getRecordData: function(record, operation) {
		var isPhantom = record.phantom === true,
			writeAll = this.writeAllFields || isPhantom,
			nameProperty = this.nameProperty,
			fields = record.fields,
			fieldItems = fields.items,
			data = {}, dataCursor,
			clientIdProperty = record.clientIdProperty,
			changes,
			name,
			field,
			key,
			value,
			f, fLen;

		if (writeAll) {
			fLen = fieldItems.length;

			for (f = 0; f < fLen; f++) {
				field = fieldItems[f];
				if (field.persist) {
					name = field[nameProperty] || field.name;
					value = record.get(field.name);
					if (field.serialize) {
						value = field.serialize(value, record);
					} else if (field.type === Ext.data.Types.DATE && field.dateFormat) {
						value = Ext.Date.format(value, field.dateFormat);
					}
					
					// apply dot-mapping
					dataCursor = data;
					name = name.split('.');
					while(name.length > 1)
					{
						if(!Ext.isDefined(dataCursor[name[0]]))
						{
							dataCursor[name[0]] = {};
						}
						
						dataCursor = dataCursor[name.shift()];
					}
						
					dataCursor[name[0]] = value;
				}
			}
		} else {
			// Only write the changes
			changes = record.getChanges();
			for (key in changes) {
				if (changes.hasOwnProperty(key)) {
					field = fields.get(key);
					if (field.persist) {
						name = field[nameProperty] || field.name;
						value = record.get(field.name);
						if (field.serialize) {
							value = field.serialize(value, record);
						} else if (field.type === Ext.data.Types.DATE && field.dateFormat) {
							value = Ext.Date.format(value, field.dateFormat);
						}
					
						// apply dot-mapping
						dataCursor = data;
						name = name.split('.');
						while(name.length > 1)
						{
							if(!Ext.isDefined(dataCursor[name[0]]))
							{
								dataCursor[name[0]] = {};
							}
							
							dataCursor = dataCursor[name.shift()];
						}
							
						dataCursor[name[0]] = value;
					}
				}
			}
		}
		if (isPhantom) {
			if (clientIdProperty && operation && operation.records.length > 1) {
				// include clientId for phantom records, if multiple records are being written to the server in one operation.
				// The server can then return the clientId with each record so the operation can match the server records with the client records
				data[clientIdProperty] = record.internalId;
			}
		} else {
			// always include the id for non phantoms
			data[record.idProperty] = record.getId();
		}

		return data;
	}
});