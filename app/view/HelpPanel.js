/*jslint sloppy: true, undef: true, plusplus: true */
/*global window, Ext, MyRetirement, MyRetirementRemote */
Ext.define('MyRetirement.view.HelpPanel', {
    extend: 'MyRetirement.view.DataPanel',
    requires: 'MyRetirement.view.DataHeader',
    xtype: 'help',

    // title: '&#160',
    minWidth: 100,
    width: 500,
    maxWidth: 800,
    minHeight: 50,
    draggable: true,
    floating: true,
    closable: true,
    closeAction: 'hide',
    resizable:true,
    style: {
        zIndex: 10000
    },

    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'dataheader',
            html: '<h2>' + me.appName + ' Help</h2>'
        }, {
            xtype: 'component',
            itemId: 'helpMsg'
        }];
        me.callParent();
    },

    afterRender: function () {
        var me = this;
        me.callParent();
        me.setInitialText();
    },

    beforeShow: function () {
        this.setInitialText();
    },

    // @private
    setInitialText: function () {
        this.updateText('Please mouse over a field or a tab to see help.<br/><br/>Help panel can be '
		        + '<b>moved</b> around by dragging sides or corners.');
    },

    updateText: function (html) {
        this.child('#helpMsg').update(html);
    }
});