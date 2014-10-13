/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext*/
Ext.define('Jarvus.layout.container.Raw', {
    extend: 'Ext.layout.container.Auto'
    ,alias: 'layout.raw'
    
    ,type: 'raw'
    ,renderTpl: '{%this.renderBody(out,values)%}' // like auto, but no clearEl
});