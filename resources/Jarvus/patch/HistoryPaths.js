/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('Jarvus.patch.HistoryPaths', {
	override: 'Ext.util.History'
	
    /**
     * Enable supplying token as an array of path segments to be encoded and concatenated
     */
    ,add: function(token, preventDup) {
        
        if(Ext.isArray(token))
        {
            token = Ext.Array.map(token, this.encodeRouteComponent).join('/');
        }
        
        return this.callParent([token, preventDup]);
    }

    /**
     * URL-encode any characters that would could fail to pass through a hash path segment
     
     * @param {String} string The string to encode
     * @return {String} The encoded string
     */
    ,encodeRouteComponent: function(string) {
        return encodeURIComponent(string||'').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/%20/g, '+');
    }
    
    /**
     * URL-decode any characters that encodeRouteComponent encoded
     
     * @param {String} string The string to decode
     * @return {String} The decoded string
     */
    ,decodeRouteComponent: function(string) {
        return decodeURIComponent((string||'').replace(/\+/g, ' '));
    }
});