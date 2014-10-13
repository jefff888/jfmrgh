/*jslint sloppy: true, undef: true, plusplus: true */
/*global window, Ext, MyRetirement, MyRetirementRemote */
Ext.define('MyRetirement.controller.Help', {
    extend: 'Ext.app.Controller',

    uses: [
        'MyRetirement.view.HelpPanel',
        'MyRetirement.help.HelpMap'
    ],

    refs: [{
        ref: 'helpButton',
        selector: 'button[action=help]'
    }],

	init: function () {
        var me = this;
        me.control({
            'button[action=help]': {
                click: me.onHelpClick
            },
            'button[action=edit]': {
                click: me.onEditClick
            },
            '[isFormField]': {
                mouseover: me.onFieldMouseOver
	            ,focus: me.onFieldGainFocus
            },
            'myretirement-viewport #primaryTabs': {
                tabchange: me.onTabChange
            },
            'myretirement-viewport #primaryTabs tab': {
                mouseover: me.onTabMouseOver
            },
            'help': {
                close: me.onHelpPanelClose
            }
        });
    },

    // @private
    onHelpPanelClose: function (panel) {
        this.getHelpButton().setIconCls('module-nav-help');
    },

    // @private
    onEditClick: function (button) {
        //var w = window.open('../../questionnaires/MyRetirementQuestionnaire.pdf', 'Questionnaire','width=800,height=800,scrollbars=yes');
        //w.document.title = 'MyRetirement Questionnaire';
        
        
        var w = window.open ('','questionnaire','width=800,height=800,scrollbars=yes,toolbar=no,location=no'); 
        w.document.open (); w.document.write ("<head><title>MyRetirement Questionnaire</title></head><frameset><frame src = '../../questionnaires/MyRetirementQuestionnaire.pdf'/></frameset>"); w.document.close (); w.focus(); 
        
    },

    // @private
    onHelpClick: function (button) {
        var me = this,
            help = me.helpPanel;
        if (!help) {
            // @singleton
            me.helpPanel = new MyRetirement.view.HelpPanel({
                x: 180,
                y: 200,
                appName: me.application.name,
                renderTo: Ext.getBody()
            });
            button.setIconCls('module-nav-help-on');
        } else {
            help.setVisible(help.hidden);
            button.setIconCls(help.hidden ? 'module-nav-help' : 'module-nav-help-on');
        }
    },

    // @private
    getFieldHelp: function (field) {
        var me = this, title,
	        name = field.helpKey || field.name,
            panelObj, theMap,
            key;

	    // Apologizing for the hack! However the marital status and tax type selectors are
	    // standard DOM elements, not ExtJS components.
	    if (field.id === 'marital-status-selector') {
		    title = 'About You Panel';
	    } else if (field.id === 'tax-type-selector') {
		    title = 'Additional Investing';
	    } else {
		    title = field.up('datapanel').title;
	    }
	    theMap = MyRetirement.help.HelpMap;
	    panelObj = theMap[title];
	    key = panelObj ? panelObj[name] : null;
        me.application.log('title: ' + title + ', name: ' + name, ' ');
        return key ? window.help[key] : null;
    },

    // @private
    getTabHelp: function (tab) {
        var key = MyRetirement.help.HelpMap.tab[tab.itemId];
        return window.help[key];
    },

	fieldAttentionGained: function (field) {
		var me = this,
				name = field.name,
				panel = me.helpPanel,
				text;
		if ((field.id === 'marital-status-selector' || field.id === 'tax-type-selector'
				|| !field.xtypesMap.templatefield) && name && panel && !panel.hidden) {
			text = me.getFieldHelp(field);
			if (text) {
				panel.updateText(text);
				panel.doLayout();
			}
		}
	},

    onFieldMouseOver: function (field) {
	    // This adjustment handles calls from plain HTML that can't control the context.
	    var me = this.id === "Help" ? this : MyRetirement.app.getController('Help');
	    me.fieldAttentionGained(field);
    },

	onFieldGainFocus: function (field) {
		// This adjustment handles calls from plain HTML that can't control the context.
		var me = this.id === "Help" ? this : MyRetirement.app.getController('Help');
		me.fieldAttentionGained(field);
	},

    // @private
    onTabChange: function (tabPanel, newCard, oldCard) {
        var me = this,
            panel = me.helpPanel,
            text;
        if (panel && !panel.hidden) {
            text = '<b>' + newCard.title + '</b> - ' + me.getTabHelp(newCard);
            panel.updateText(text);
	        panel.doLayout();
        }
    },

    // @private
    onTabMouseOver: function (tab) {
        var me = this,
            card = tab.card,
            panel = me.helpPanel,
            text;
        if (panel && !panel.hidden) {
            text = '<b>' + card.title + '</b> - ' + me.getTabHelp(card);
            panel.updateText(text);
	        panel.doLayout();
        }
    }
});