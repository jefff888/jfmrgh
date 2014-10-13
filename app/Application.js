Ext.define('MyRetirement.Application', {
    name: 'MyRetirement',

    extend: 'Ext.app.Application',

    views: [
        'Setup'
        ,'Viewport'
    ],

    controllers: [
        'Setup'
        ,'Viewport'
    ],

    stores: [
        // TODO: add stores here
    ]
});
