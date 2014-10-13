/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext, MyRetirementRemote*/
Ext.define('MyRetirement.API', {
    extend: 'Ext.util.Observable'
	,singleton: true
	,requires: [
		'Ext.Ajax'
		,'Ext.util.MixedCollection'
		,'MyRetirement.store.Enumeration'
		,'MyRetirement.direct.RemotingProvider'
	]
	
	,config: {
		sessionToken: null
		,clientData: null
		,hasIncome: null
		,printEnable: null
	}
	
	,constructor: function(config) {
		var me = this;
		
		// initialize Ext.Direct
		if(!window.MyRetirement_REMOTEAPI)
		{
			window.alert('window.MyRetirement_REMOTEAPI is not present, try reloading the page or contact an administrator if this problem persists.');
			return;
		}
		
		Ext.direct.Manager.addProvider(Ext.apply(window.MyRetirement_REMOTEAPI, {
			type: 'api'
			,namespace: 'MyRetirementRemote'
		}));
		
		// listen globally for non-200 HTTP responses
		Ext.Ajax.on('requestexception', me.onRequestException, me);
		
		// initialize cache for enumeration stores
		me.enumerationStores = Ext.create('Ext.util.MixedCollection');
		
		// call parent routines
		me.initConfig(config);
		me.callParent(arguments);
	}

	,onRequestException: function (connection, response, options) {

		if (options.ignoreException || (options.operation && options.operation.ignoreException))
			return true;

		if (response.status == 401) {
			this.fireEvent('unauthorized', connection, response, options);
		}
		else if (response.status == 500) {
			Ext.msg.confirm('Server Request Problem', 'Request failed, your session may be '
				+ 'expired. Do you want to reload the page and login again?',
				function (button) {
					if (button === 'yes') {
						this.clearSessionToken();
						location.reload();
					}
				}, this);
		}
		else {
			Ext.Msg.alert('Server Request Time-out', 'Having trouble communicating with the server...'
					+ ' reloading the site and trying again momentarily');
		}
	}

	,loadClient: function(client, callback, scope) {
		var me = this;
		
		if(Ext.isObject(client))
		{
			me.setClientData(client);
			Ext.callback(callback, scope, [client]);
		}
		else
		{
			// set client ID as session token
			me.setSessionToken(client);
			
			MyRetirementRemote.initializationService.getModuleData(function(clientData) {
				me.setSessionToken(clientData.clientId);
				me.setClientData(clientData);
				Ext.callback(callback, scope, [clientData]);
			});
		}
	}
	
	,updateClientData: function(clientData) {
		
		// use clientId as sessionToken for future calls
		this.setSessionToken(clientData.clientId);
		
		// destroy and clear any existing enumeration stores
		var stores = this.enumerationStores;

		stores.each(function(store) {
			store.destroy();
		});
		
		stores.clear();
		
		// tell the world
		this.fireEvent('clientdatachange', clientData);
		
		// update hasincome
		this.setHasIncome(clientData.hasIncome);
		
		this.setPrintEnable(clientData.printEnable);
	}
	
	,updateHasIncome: function(hasIncome) {
		this.fireEvent('hasincomechange', hasIncome);
	}
	
	,getEnumerationStore: function(storeKey) {
		var me = this
			,store = me.enumerationStores.get(storeKey);

		if(store)
		{
			return store;
		}
		else if(me.clientData && me.clientData.enumerations && storeKey in me.clientData.enumerations)
		{
			return me.enumerationStores.add(storeKey, Ext.create('MyRetirement.store.Enumeration', {
				data: me.clientData.enumerations[storeKey]
			}));
		}
		else
		{
			return false;
		}
	}
	,getAssetColor: function(assetName) {
		var assetColors = this.getClientData().assetColors;
		if (assetName in assetColors) {
			return '#' + assetColors[assetName];
		}
		else {
			return '#4c6d06'; //green
		}
	}
	
	,getClientMarried: function() {
		var clientData = this.getClientData();
		
		if('maritalStatusTypeCode' in clientData)
		{
			return clientData.maritalStatusTypeCode == 2;
		}
		else
		{
			return false;
		}
	}
	,getValidationInfo: function(fieldName) {
//		var validations = clientData = this.getClientData().validations;
		var validations = this.getClientData().validations;
		if (fieldName in validations) {
			return validations[fieldName];
		}
		else {
			return null;
		}
	}
	
});