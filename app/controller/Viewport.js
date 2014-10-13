/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext, MyRetirement, MyRetirementRemote*/
Ext.define('MyRetirement.controller.Viewport', {
	extend: 'Ext.app.Controller'
	,requires: [
        'Ext.util.History'
		,'MyRetirement.VARS'
    ]
    ,views: ['Viewport']

	,refs: [{
		ref: 'viewport'
		,selector: 'myretirement-viewport'
		,autoCreate: true
		
		,xtype: 'myretirement-viewport'
	},{
		ref: 'tabPanel'
		,selector: 'myretirement-viewport #primaryTabs'
    },{
		ref: 'whatIfPanel'
		,selector: 'whatif-panel'
	}]

	, clientProfileId : null
	, presSelectFrame : null
	, mainFrame : null
	, tpaKeepAliveTask: undefined

	,init: function() {
		var me = this;

		me.control({
			'myretirement-viewport #primaryTabs': {
				tabchange: me.onTabChange
				,afterrender: me.hideTabs
			}
			,'myretirement-viewport': {
				beforerender: me.onBeforeViewportRender
                ,beforedestroy: me.onBeforeDestroy
			}
			,'myretirement-viewport #moduleNavSelect': {
				change: me.onModuleNavSelectChange
			}
			,'myretirement-viewport button[action=print]': {
				click: me.onPrintClick
			}
			,'[isFormField]': {
                focus: me.onFieldGainFocus
            }
			,'apppanel': {
				beforedeactivate: me.onBeforeTabDeactivate
				,activate: { fn: me.onTabActivate, delay: 10 } // slight delay to allow rendering to flush				
			}
			,'apppanel button[action=next]': {
				click: me.onNextClick
			}
			,'apppanel button[action=back]': {
				click: me.onBackClick
			}
			,'apppanel button[action=update]': {
				click: me.onUpdateClick
			},'apppanel button[action=done]': {
				click: me.onPrintClick
			}
		});
		
	}

	,constructor: function(config) {
		var me = this;

		// TODO -- Bug Workaround!!! See Sencha Forum thread http://www.sencha.com/forum/showthread.php?250267-Ext.Element.getAttribute-not-working-in-IE10.
		// The bug is that IE9 in standards mode and IE10+ handle element attributes like other
		// real-world browsers, and not older version of IE. Unfortunately the Sencha code was not
		// checking for anything over basic IE9.
		//
		// As IE9 also can do attribute retrieval the right way it is safe just to check for earlier
		// versions if IE.
		Ext.override(Ext.dom.Element, {
			getAttribute: (Ext.isIE6 || Ext.isIE7 || Ext.isIE8)
				? function (name, ns) {
                    var d = this.dom,
			            type;
		            if (ns) {
			            type = typeof d[ns + ":" + name];
			            if (type != 'undefined' && type != 'unknown') {
				            return d[ns + ":" + name] || null;
			            }
			            return null;
		            }
		            if (name === "for") {
			            name = "htmlFor";
		            }
		            return d[name] || null;
	            }
				: function (name, ns) {
					var d = this.dom;
					if (ns) {
						return d.getAttributeNS(ns, name) || d.getAttribute(ns + ":" + name);
					}
					return d.getAttribute(name) || d[name] || null;
				}
		});

		// call parent routines
		me.initConfig(config);
		me.callParent(arguments);
	}

	,onLaunch: function() {
		var me = this
			,body = Ext.getBody()
			,helpController;

		Ext.data.Connection.override({ timeout: 90000 });//Timeout set to 90 seconds
		Ext.Ajax.timeout = 90000;//Timeout set to 90 seconds

		me.currentAdminId = window.sgAdminId || '1';
		me.companyId = window.sgCompanyId || '1';
		me.clientProfileId = window.sgClientProfileId;

		MyRetirement.VARS.setAdminId(me.currentAdminId);
		MyRetirement.VARS.setCompanyId(me.companyId);
		MyRetirement.VARS.setClientProfileId(me.clientProfileId);
		MyRetirement.VARS.setIsStandardMR(window.isStandardMR);
		MyRetirement.VARS.setIsDisclosureRequired(window.isDisclosureRequired);
		MyRetirement.VARS.setDisclaimerText(me.cleanString(window.disclaimerText));
		MyRetirement.VARS.setCaKeepAliveUrl(me.cleanString(window.caKeepAliveUrl).replace(/&amp;/g, '&'));
		MyRetirement.VARS.setCaKeepAliveValue(window.caKeepAliveValue);
		MyRetirement.VARS.setCfReturnRedirectUrl(me.cleanString(window.cfReturnRedirectUrl).replace(/&amp;/g, '&'));
		MyRetirement.VARS.setContributionLinkUrl(me.cleanString(window.contributionLinkUrl).replace(/&amp;/g, '&'));
		MyRetirement.VARS.setShowContributionLink(window.showContributionLink);

		if (MyRetirement.VARS.getIsDisclosureRequired()
			&& MyRetirement.VARS.getDisclaimerText().length > 0) {
			MyRetirement.VARS.setDisclosureDisplayable(true);
		} else {
			MyRetirement.VARS.setDisclosureDisplayable(false);
		}
		// Initialize Help events
		helpController = me.getController('Help');
		MyRetirement.helpFieldMouseOver = helpController.onFieldMouseOver;
		MyRetirement.helpFieldGainFocus = helpController.onFieldGainFocus;

		// remove loading class
		body.removeCls('loading');
		
		// load enumerations from API
		body.unmask();
		body.mask('Loading server information&hellip;');

		// load initial client
		MyRetirement.API.loadClient(me.clientProfileId, function(clientData) {
			var printButton;
			// initialize history
			Ext.util.History.on('change', me.loadNavPath, me);
			Ext.util.History.init(function() {
				var token = Ext.util.History.getToken()
					,viewport;
				
				// call viewport getter for the first time, synchronizing rendering with knowing what tab is to be loaded
				viewport = me.getViewport({
					renderTo: body
					,activeTab: token
				});
				
				// sync history to current tab's id, in case token was missing or invalid
				//Ext.util.History.add(me.getTabPanel().getLayout().getActiveItem().getItemId());
				
				me.updateHasIncome(MyRetirement.API.getHasIncome());

				body.unmask();

				// tell the world
				me.application.fireEvent('viewportready', viewport);

				// listen to any future data changes
				MyRetirement.API.on('clientdatachange', me.onClientDataChange, me);
				MyRetirement.API.on('hasincomechange', me.updateHasIncome, me);

			});

			printButton = Ext.ComponentQuery.query('myretirement-viewport #print-button')[0];
			if (MyRetirement.VARS.getIsStandardMR() && MyRetirement.API.getPrintEnable()
					&& printButton) {
				printButton.show();
			}

			if (!MyRetirement.VARS.getIsStandardMR()) {
				//noinspection EqualityComparisonWithCoercionJS
				if ((MyRetirement.VARS.getCaKeepAliveUrl()
						&& MyRetirement.VARS.getCaKeepAliveUrl() != '')
					&& (MyRetirement.VARS.getCaKeepAliveValue()
						&& MyRetirement.VARS.getCaKeepAliveValue() > 0)) {
					me.tpaKeepAliveTask = Ext.TaskManager.start(Ext.TaskManager.newTask({
						// Check on activity a little more frequently than the maximum.
						interval: (MyRetirement.VARS.getCaKeepAliveValue() > 240000)
							? MyRetirement.VARS.getCaKeepAliveValue() / 4 : 62000
						,run: function() {
							me.pingTpaServer(MyRetirement.VARS.getCaKeepAliveUrl());
						}
					}));

					MyRetirement.VARS.setCaKeepAliveTask(me.tpaKeepAliveTask);
				}
			}
		});

	}

	,onBeforeViewportRender: function () {
		var editButton, printButton, helpButton;

		if (Ext.isIE8) {
			editButton = Ext.ComponentQuery.query('myretirement-viewport #edit-button')[0];
			printButton = Ext.ComponentQuery.query('myretirement-viewport #print-button')[0];
			helpButton = Ext.ComponentQuery.query('myretirement-viewport #help-button')[0];

			if (editButton) {
				editButton.setHeight(25, false);
				editButton.setWidth(21, false);
			}

			if (printButton) {
				printButton.setHeight(25, false);
				printButton.setWidth(21, false);
			}

			if (helpButton) {
				helpButton.setHeight(25, false);
				helpButton.setWidth(21, false);
			}
		}
	}

	,cleanString: function(str) {
		var cleanedString;

		if (str === undefined) {
			cleanedString = '';
		} else if (str === null) {
			cleanedString = '';
		} else if (str === '') {
			cleanedString = '';
		} else if (str === 'null') {
			cleanedString = '';
		} else {
			cleanedString = Ext.String.trim(str);
		}

		return cleanedString;
	}

	// controller routines
	,loadNavPath: function(navPath) {
		var tabPanel = this.getTabPanel()
			,targetTab;
		
		if(navPath && (targetTab = tabPanel.getComponent(navPath)))
		{
			tabPanel.setActiveTab(targetTab);
			return true;
		}
		else
		{
			return false;
		}
	}
	
	,updateHasIncome: function(hasIncome) {
//		this.getWhatIfPanel().tab.setVisible(hasIncome);
	}
	
	// event handlers
	,onClientDataChange: function(clientData) {
		// reload current tab
		this.getTabPanel().getActiveTab().load();
	}
	
	,onBeforeTabDeactivate: function(appPanel) {
		this.application.log(appPanel.getItemId()+'.onBeforeTabDeactivate');
		return appPanel.save();
	}
	
	,onTabActivate: function(appPanel) {
		var tabPanel, activeTab;
		this.application.log(appPanel.getItemId()+'.onTabActivate');
		appPanel.load();
		if (!MyRetirement.VARS.getIsStandardMR()) {
			tabPanel = this.getTabPanel();
			activeTab = tabPanel.getActiveTab();
			if (activeTab.getItemId() === 'disclaimer') {
				activeTab.tab.addCls('x-tab-invisible');
			}
		}
	}
	
	,onTabChange: function(tabPanel, newCard, oldCard) {
		//Ext.util.History.backToUrl(newCard.getItemId());
		this.onUserActivity();
	}
	
	,onNextClick: function(btn) {
		var tabPanel = this.getTabPanel()
			,nextPanel = tabPanel.getLayout().getNext();
		
		if (nextPanel) {
			tabPanel.setActiveTab(nextPanel);
			Ext.getBody().scrollTo('top', 0, true);
		}
	}
	
	,onBackClick: function(btn) {
		var tabPanel = this.getTabPanel()
			,prevPanel = tabPanel.getLayout().getPrev();
		
		if (prevPanel) {
			// Ignore the Disclaimer tab once we have left it the first time.
			if (prevPanel.getItemId() != 'disclaimer') {
				tabPanel.setActiveTab(prevPanel);
				Ext.getBody().scrollTo('top', 0, true);
			}
		}
	}
	
	,onUpdateClick: function(btn) {
		var panel = btn.up('apppanel');
		this.onUserActivity();
		panel.save();
	}

	,onDoneClick: function(btn) {
		var me = this;
		me.mainFrame = parent.frames.main;
		me.onUserActivity();

		// Save
		var panel = btn.up('apppanel');		
		panel.save();
		
		// Return to client snapshot
		me.mainFrame.document.swForm.action = '../clientManagementServer/snapShot.jsp?sesStartModule=True';
		me.mainFrame.document.swForm.submit();
//		window.location.replace('../clientManagementServer/snapShot.jsp?sesStartModule=True');
	}

	,onModuleNavSelectChange: function(field, value, three) {
		var me = this
			,clientData = MyRetirement.API.getClientData()
			,moduleBean
			,swModuleName = '';
		me.mainFrame = parent.frames.main;

		if (clientData && clientData.validModules) {
			moduleBean = clientData.validModules[value.toString()];
			if (moduleBean && moduleBean.moduleSwName) {
				swModuleName = moduleBean.moduleSwName;
			}
		}

		if ((swModuleName && swModuleName !== 'selectNeed') && (value && value !== -1)) {
            // Make sure everything gets saved before redirecting.
            me.onBeforeDestroy();
			if (swModuleName === 'compAct' && Ext.isIE) {
				if (typeof sungard === 'object') {
					sungard.myRetirementCompActLauncher();
				}
			} else {
				me.mainFrame.document.swForm.action = '../workflow/launchModule.jsp?moduleName='
						+ swModuleName + '&profileId=' + me.clientProfileId;
				me.mainFrame.document.swForm.submit();
			}
		}
	}

    ,onPrintClick: function(btn) {
        var me = this
	        ,typeStr = "?printFinal=true"
	        ,mainFrame = parent.frames.main
	        ,panel = me.getTabPanel().getActiveTab()
			,oldAction = mainFrame.document.swForm.action;

		me.onUserActivity();
		panel.save();

        if (mainFrame && mainFrame.document.swForm) {
            mainFrame.document.swForm.action = "../myRetirement/print/myRetirementPrint.jsp" + typeStr;
            mainFrame.document.swForm.target = "_window";
            mainFrame.document.swForm.submit();
            mainFrame.document.swForm.target = "";
            mainFrame.document.swForm.action = oldAction;
        }
        else {
        	me.application.log("printClick3 - mainFrame not defined");
	        Ext.MessageBox.alert('Print Error',
		        'Print button link location is not defined.');
        }
    }

	,onTabDeactivate: function(appPanel) {
		var me = this
			,panel = this.getTabPanel().getActiveTab();

		me.onUserActivity();
		panel.save();
		this.application.log(appPanel.getItemId()+'.onTabDeactivate');
	}
	
	,onFieldGainFocus: function (field) {
		var me = this;
		me.onUserActivity();
	}
	,onUserActivity: function() {
		if (!MyRetirement.VARS.getIsStandardMR()) {
			// If this is the consumer-facing version, indicate user activity for TPA
			// keep-alive function.
			this.updateUserActivity();
		}

		// Reset WPS session activity time to prevent getting logged out of the WPS server.
		if (parent) {
			if (parent.resetTime) {
			    parent.resetTime();
		    }
		}
	}

	,userActive: true
	,tpaActivityObject: undefined
	,pingTpaServer: function(tpaUrl) {
		var me = this, nonCachingUrl = tpaUrl + '&anticache='
			+ ((Ext.isIE && !Ext.isIE9) ? new Date().getTime() : Date.now());

		top.tpaActivityObject = new Image();
/*
		me.tpaActivityObject.onerror = function() {
			var me = this;
			Ext.MessageBox.alert('Keep-Alive Ping Failure',
				'Keep-alive function was unable to load URL:\n'
					+ nonCachingUrl + '\nActivity image value = '
					+ me.toString());
		};
*/

		if (me.userActive) {

			try {
				top.tpaActivityObject.src = nonCachingUrl;
				me.userActive = false;
			} catch (ex) {
/*
				Ext.MessageBox.alert('Keep-Alive Ping Exception',
					'Keep-alive function was unable to load URL:\n'
						+ nonCachingUrl + '\nException = ' + ex.toString());
*/
			}
		}
	}

	,updateUserActivity: function() {
		this.userActive = true;
	}

    ,onBeforeDestroy: function() {
        var me = this , tabPanel = me.getTabPanel();

        tabPanel.items.each(function (aTab) {
            aTab.save();
        });
    }

	,hideTabs: function(tabPanel, eOpts) {
		if (!MyRetirement.VARS.getIsStandardMR()) {
			if (MyRetirement.VARS.getDisclosureDisplayable()) {
				// If disclosure is needed, turn all other tabs off for now.
				tabPanel.items.each(function (aTab, index, listSize) {
					if (aTab.getItemId() === 'disclaimer') {
						aTab.tab.show();
						tabPanel.setActiveTab(aTab);
					} else {
						aTab.tab.hide();
					}
				});
			} else {
				// If disclosure is not needed, show all other tabs except for disclosure.
				tabPanel.items.each(function (aTab, index, listSize) {
					switch (aTab.getItemId()) {
						case 'disclaimer':
							aTab.tab.hide();
							break;
						case 'aboutYou':
							aTab.tab.show();
							tabPanel.setActiveTab(aTab);
							break;
						default:
							break;
					}
				});
			}
		}
	}
});