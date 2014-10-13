/*
 * Property of SunGard© Data Systems Inc. or its affiliates, all rights reserved.
 * SunGard Confidential.
 *
 * Copyright (c) 1993-2013 Sungard Wealth Management All Rights Reserved.
 *
 * This software is the confidential and proprietary information of Sungard
 * Expert Solutions ("Confidential Information"). You shall not disclose such
 * Confidential Information and shall use it only in accordance with the terms
 * of the license agreement you entered into with Sungard Expert Solutions.
 *
 * SUNGARD WEALTH MANAGEMENT MAKES NO REPRESENTATIONS OR WARRANTIES ABOUT THE
 * SUITABILITY OF THE SOFTWARE OR ASSOCIATED DOCUMENTATION, EITHER
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR
 * NON-INFRINGEMENT. SUNGARD WEALTH MANAGEMENT SHALL NOT BE LIABLE FOR ANY
 * DAMAGES SUFFERED BY LICENSEE AS A RESULT OF USING, MODIFYING OR
 * DISTRIBUTING THIS SOFTWARE OR ITS DERIVATIVES.
 */

/**
 * File description here...
 *
 * User: Jeff.Furgal
 * Date: 6/14/13
 * Time: 1:40 PM
 */

Ext.define('MyRetirement.view.relius.PersonalInfoForm', {
	extend: 'Jarvus.container.table.FieldTable'
	,xtype: 'relius-personalinfo'
	,requires: [
		'Jarvus.container.Raw'
		,'Jarvus.container.table.Header'
		,'Jarvus.field.Template'
		,'Jarvus.field.Input'
		,'Ext.form.field.ComboBox'
		,'MyRetirement.field.FieldDatePicker'
	]

	,items: [{
		xtype: 'tableheader'
		,columns: [
			{ colCls: 'clientLabel'		    ,title: '' }
			,{ colCls: 'clientFirstName'	,title: 'First Name' }
			,{ colCls: 'clientLastName'		,title: 'Last Name' }
			,{ colCls: 'clientBirthDate'	,title: 'Birth Date' }
			,{ colCls: 'clientGender'		,title: 'Gender' }
		]
	},{
		// Table Body
		items: [{
			// tr
			cls: 'client'
			,title: 'Personal Information'
			,rowPerson: 'client'
			,items: [{
				xtype: 'component'
				,html: '<h2>Client</h2>'
				,cls: 'col-clientLabel'
				,name: 'clientPersonLabel'
				,colName: 'rowLabel'
			},{
				xtype: 'templatefield'
				,cls: 'col-clientFirstName clientNameLeftAlign'
				,name: 'clientPersonFirstName'
				,colName: 'firstName'
			},{
				xtype: 'templatefield'
				,cls: 'col-clientLastName clientNameLeftAlign'
				,name: 'clientPersonLastName'
				,colName: 'lastName'
			},{
				xtype: 'templatefield'
				,id: 'clientBirthDate'
				,tpl: '{value:date("m/d/Y")}'
				,name: 'clientPersonBirthDate'
				,cls: 'col-clientBirthDate clientBirthDateLeftAlign'
				,colName: 'birthDate'
			},{
				xtype: 'enumerationfield'
				,monitorChange: true
				,enumerationsStore: 'genderTypes'
				,cls: 'col-clientGender'
				,name: 'clientPersonGenderTypeCode'
			}]
		},{
			cls: 'co-client'
			,rowPerson: 'co-client'
			,items: [{
				xtype: 'component'
				,html: '<h2>Co-Client</h2>'
				,cls: 'col-clientLabel'
				,name: 'co-clientPersonLabel'
				,colName: 'rowLabel'
			},{
				xtype: 'inputfield'
				,cls: 'col-clientFirstName'
				,name: 'spousePersonFirstName'
				,colName: 'firstName'
			},{
				xtype: 'inputfield'
				,cls: 'col-clientLastName'
				,name: 'spousePersonLastName'
				,colName: 'lastName'
			},{
				xtype: 'container'
				,items: [{
					xtype: 'fielddatepicker'
					,id: 'spouseBirthDate'
				    ,editable: true
					,format: 'm/d/Y'
					,showToday: false
					,name: 'spousePersonBirthDate'
				}]
				,cls: 'col-clientBirthDate'
				,colName: 'birthDate'
			},{
				xtype: 'enumerationfield'
				,monitorChange: true
				,enumerationsStore: 'genderTypes'
				,cls: 'col-clientGender'
				,name: 'spousePersonGenderTypeCode'
			}]
		}]
	}]

	,initEvents: function() {
		var me = this;
		me.callParent();

		me.mon(me.el, 'click', function(ev, t) {
			var row = ev.getTarget('tr', me.el, true)
				,isSpouse = row.hasCls('spouse')
				,resetBoth = Ext.fly(t).hasCls('reset-both');

			me.fireEvent('ageresetclick', me, isSpouse, resetBoth, row, t, ev);
		}, me, {delegate: '.reset-button'});
	}
});
