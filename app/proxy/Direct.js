/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('MyRetirement.proxy.Direct', {
	extend: 'Ext.data.proxy.Direct'
	,alias: 'proxy.apidirect'
	,requires: [
		'MyRetirement.API'
		//'MyRetirement.direct.RemotingProvider'
	]

	,paramsAsHash: false
});