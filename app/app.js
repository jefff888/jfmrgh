Ext.USE_NATIVE_JSON = true;

Ext.application({
    requires: [
        'Ext.direct.*'
        ,'Ext.DomHelper'
        ,'MyRetirement.API'
        ,'Jarvus.patch.HistoryTrail'
        ,'Jarvus.patch.HistoryPaths'
        ,'Jarvus.patch.ConditionalValidation'
    ]

    ,name: 'MyRetirement'
    ,appFolder: './app'
    ,autoCreateViewport: false

    ,controllers: [
        'Viewport'
//        ,'relius.DisclaimerTab'
//        ,'relius.AboutYouTab'
//        ,'Assets'
//        ,'Comparison'
//        ,'Income'
        ,'Setup'
//        ,'WhatIfParticipant'
//        ,'Withdrawal'
//        ,'Help'
    ]

    ,init: function() {
        // activate Development controller
        if(window.MyRetirement_Development)
        {
            this.getController('Development').init();
        }
    }

    ,launch: function() {
        MyRetirement.app = this;

        // preload tab throbber
        Ext.DomHelper.createDom({ tag: 'img', src: './resources/images/default/tab-saving.gif' });

        // Load the CompAct launch and listener class.
        if (typeof sungard === 'object') {
            sungard.myRetirementLoadLightBoxAndListeners();
        }
    }


    /* Global utility methods */
    ,confirm: function(title, msg, callback, scope) {
        return Ext.callback(callback, scope, [window.confirm(title+":\n\n"+msg)]);
    }

    ,alert: function(title, message) {

        if(window.console)
            window.console.info('App alert - %s: %s', title, message);

        return window.alert(title+":\n\n"+message);
    }

    ,error: function() {

        var title = 'Error'
                ,message = 'There was an unknown problem, please try again later'
                ,data = {};

        if (arguments.length == 1) {
            message = arguments[0];
        }
        else if (arguments.length == 2) {
            if (Ext.isString(arguments[1]) && arguments[1] !== '') {
                title = arguments[0] || 'MyRetirement Error';
                message = arguments[1] || 'No error information is available.';
            }
            else {
                message = arguments[0] || 'No error information is available.';
                data = arguments[1] || '';
            }
        }
        else if (arguments.length >= 3) {
            title = arguments[0] || 'MyRetirement Error';
            message = arguments[1] || 'No specific error information is available.';
            if (arguments[2]) {
                if (typeof arguments[2] === 'string') {
                    data = arguments[2];
                } else {
                    data = arguments[2].action ? 'Failed server operation: ' + arguments[2].action
                            : arguments[2].toString();
                    if (arguments[2].error) {
                        data += ' Error message: ' + arguments[2].error;
                    }
                }
            } else {
                data = '';
            }
        }

        if (window.console) {
            window.console.error('App error: ' + message, data);
        }

        return window.alert(title + ":\n\n" + message + "\n\n" + data);
    }, log: function (message, url) {
        var historyUrl = url || '#' + Ext.util.History.getToken();

        this.fireEvent('log', message, historyUrl);
    }, showTip: function (el, message, title) {
        var tip = Ext.QuickTips.getQuickTip();

        if (title) {
            tip.setTitle(title);
            tip.header.show();
        }
        else {
            tip.header.hide();
        }

        tip.update(message);
        tip.showBy(el);
    }
});