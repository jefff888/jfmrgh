/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext,MyRetirement*/
Ext.define('MyRetirement.direct.RemotingProvider', {
	extend: 'Ext.direct.RemotingProvider'
	,alias: 'direct.apiprovider'

	,url: '../../extdirect/router'
	,namespace: 'window'
	,actions: window.MyRetirement_REMOTEAPI.actions
	,enableBuffer: window.extDirectBuffer
	,configureRequest: function(action, method, args) {
		// prepend session ID to arguments list
		if(method.len)
		{
			args.unshift(MyRetirement.API.getSessionToken());
		}

		this.callParent([action, method, args]);
	}
});