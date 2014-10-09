/*jslint browser: true, undef: true, white: false, laxbreak: true *//*global Ext,MyRetirement*/
Ext.define('MyRetirement.validation.Enumeration', {
	override: 'Ext.data.validations'
	,requires: [
	    'Jarvus.validation.Number'	            
		,'MyRetirement.API'
	]

    ,enumerationMessage: 'is not an acceptable value'
	
	,enumeration: function(config, value) {
		var store;
		return config.store && (store = MyRetirement.API.getEnumerationStore(config.store)) && store.getById(value);
	}
	// see Jarvus.validation.Number
	,integer: function(config, value) {
		
		// convert type
		if(!Ext.isNumber(value))
		{
			if(value === null || value === undefined)
				return !!config.allowNull;
			else if(this.integerRe.test(value))
				value = parseInt(value, 10);
			else
				return false;
		}
		else if(value%1 !== 0)
		{
			return false;
		}
		
		// enforce min/max
		if(Ext.isNumber(config.min) && value < config.min)
			return false;
		
		if(Ext.isNumber(config.max) && value > config.max)
			return false;
			
		return true;
	}
	,retirementAgeYearSpouseMessage: 'is not an acceptable value'	
	,retirementAgeYearSpouse: function(config, value, model) {
		var isMarried = MyRetirement.API.getClientMarried();
		if (!isMarried) {
			return true;
		}
		else {
			// Check with integer validation
		 	//var validator = this.integer;
		 	var validFieldNm = config.validfn;
			var validator = this.wsfpIntegerRange;
			var isIntegerValid = validator(config, value, this);
			if (!isIntegerValid) {
				var validationInfo = MyRetirement.API.getValidationInfo(validFieldNm);
				if (validationInfo != null) {
					this.retirementAgeYearSpouseMessage = validationInfo.errorMessage;
				}
			}
			return isIntegerValid;	
		}		
	}
	,retirementAgeMonthClientMessage: 'Months may be 0-11'		
	,retirementAgeMonthClient: function(config, value, model) {
		// Special case, if years is 70, max month = 0
		var maxAge = 70;
		var ageInfo = MyRetirement.API.getValidationInfo('RetirementProfile.retirementAge');
		if (ageInfo != null) {
			maxAge = parseInt(ageInfo.dataValues[1]);	
		}
		var retirementAge = model.get('clientRetirementProfileRetirementAge');
		if (retirementAge == maxAge) {
			if (value == 0) {						
				return true
			}
			else {
				Ext.data.validations.retirementAgeMonthClientMessage = 'Maximum retirement age is ' + maxAge + ' years and 0 months';
				return false;
			}
		}
		else {
			// Check with integer validation
		 	//var validator = this.integer;
			var validator = this.wsfpIntegerRange;
			var isIntegerValid = validator(config, value, this);
			if (!isIntegerValid) {
				var monthInfo = MyRetirement.API.getValidationInfo(config.validfn);
				if (monthInfo != null) {
					this.retirementAgeMonthClientMessage = monthInfo.errorMessage;
				}
			}
			return isIntegerValid;
		}
	}
	
	,retirementAgeMonthSpouseMessage: 'Months may be 0-11'		
	,retirementAgeMonthSpouse: function(config, value, model) {
		var isMarried = MyRetirement.API.getClientMarried();
		if (!isMarried) {
			return true;
		}
		else {
			// Special case, if years is = years max, max month = 0, default is 70
			var maxAge = 70; 
			var ageInfo = MyRetirement.API.getValidationInfo('RetirementProfile.retirementAge');
			if (ageInfo != null) {
				maxAge = parseInt(ageInfo.dataValues[1]);	
			}
			if (model.get('spouseRetirementProfileRetirementAge') == maxAge) {
				if (value == 0) {						
					return true
				}
				else {
					this.retirementAgeMonthSpouseMessage = 'Maximum retirement age is ' + maxAge + ' years and 0 months';
					return false;
				}
			}
			else {
				// Check with integer validation
			 	//var validator = this.integer;
			 	var validator = this.wsfpIntegerRange;
				var isIntegerValid = validator(config, value, this);
				if (!isIntegerValid) {
					var monthInfo = MyRetirement.API.getValidationInfo(config.validfn);
					if (monthInfo != null) {
						this.retirementAgeMonthSpouseMessage = monthInfo.errorMessage;
					}
				}
				return isIntegerValid;	
			}
		}
	}
	
	,clientRetirementProfileSocialSecurityBeginAgeMonthsMessage: 'Months may be 0-11'
	,clientRetirementProfileSocialSecurityBeginAgeMonths: function(config, value, model) {
		// Special case, if years is 70, max month = 0
		var maxAge = 70; 
		var ageInfo = MyRetirement.API.getValidationInfo('RetirementProfile.socialSecurityBeginAge');
		if (ageInfo != null) {
			maxAge = parseInt(ageInfo.dataValues[1]);	
		}
		var ssAge = model.get('clientRetirementProfileSocialSecurityBeginAge');
		if (ssAge == maxAge) {
			if (value == 0) {						
				return true
			}
			else {
				this.clientRetirementProfileSocialSecurityBeginAgeMonthsMessage = 'Maximum age is ' + maxAge + ' years and 0 months';
				return false;
			}
		}
		else {
			// Check with integer validation
		 	var validator = this.integer;
			var isIntegerValid = validator(config, value, this);
			if (!isIntegerValid) {
				var monthInfo = MyRetirement.API.getValidationInfo(config.validfn);
				if (monthInfo != null) {
					this.clientRetirementProfileSocialSecurityBeginAgeMonthsMessage = monthInfo.errorMessage;
				}
			}
			return isIntegerValid;	
		}
	}
	,spouseRetirementProfileSocialSecurityBeginAgeMessage: 'is not an acceptable value'
	,spouseRetirementProfileSocialSecurityBeginAge: function(config, value, model) {
		var isMarried = MyRetirement.API.getClientMarried();
		if (!isMarried) {
			return true;
		}
		else {
			// Check with integer validation
			var validFieldNm = config.validfn;
			var validator = this.wsfpIntegerRange;
			var isIntegerValid = validator(config, value, this);
			if (!isIntegerValid) {
				var validationInfo = MyRetirement.API.getValidationInfo(validFieldNm);
				if (validationInfo != null) {
					this.spouseRetirementProfileSocialSecurityBeginAgeMessage = validationInfo.errorMessage;
				}
			}
			
			return isIntegerValid;	
		}		
	}
	
	
	,spouseRetirementProfileSocialSecurityBeginAgeMonthsMessage: 'Months may be 0-11'
	,spouseRetirementProfileSocialSecurityBeginAgeMonths: function(config, value, model) {
		var isMarried = MyRetirement.API.getClientMarried();
		if (!isMarried) {
			return true;
		}
		else {
			// Special case, if years = maxAge, max month = 0
			var maxAge = 70; 
			var ageInfo = MyRetirement.API.getValidationInfo('RetirementProfile.socialSecurityBeginAge');
			if (ageInfo != null) {
				maxAge = parseInt(ageInfo.dataValues[1]);	
			}
			var ssAge = model.get('spouseRetirementProfileSocialSecurityBeginAge');
			if (ssAge == maxAge) {
				if (value == 0) {						
					return true
				}
				else {
					this.spouseRetirementProfileSocialSecurityBeginAgeMonthsMessage = 'Maximum retirement age is ' + maxAge + ' years and 0 months';
					return false;
				}
			}
			else {
				// Check with integer validation
				var validFieldNm = config.validfn;
			 	var validator = this.wsfpIntegerRange;
				var isIntegerValid = validator(config, value, this);
				if (!isIntegerValid) {
					var validationInfo = MyRetirement.API.getValidationInfo(validFieldNm);
					if (validationInfo != null) {
						this.spouseRetirementProfileSocialSecurityBeginAgeMonthsMessage = validationInfo.errorMessage;
					}
				}
				return isIntegerValid;	
			}
		}
		
	}
	, wsfpIntValues: function(config, value) {
		var validFieldNm = config.validfn;
		
		// convert type
		if(!Ext.isNumber(value))
		{
			if(value === null || value === undefined)
				return !!config.allowNull;
			else if(this.integerRe.test(value))
				value = parseInt(value, 10);
			else
				return false;
		}
		else if(value%1 !== 0)
		{
			return false;
		}
		
		var validationInfo = MyRetirement.API.getValidationInfo(validFieldNm);
		if (validationInfo != null) {
			var valS = value.toString();
			// enforce valid values
			if (!this.contains(validationInfo.dataValues, valS)) {
				this.wsfpIntValuesMessage = validationInfo.errorMessage;
				return false;
			}
		}
			
		return true;
		
		
	}
	// see Jarvus.validation.Number
	,wsfpIntegerRange: function(config, value) {
		var validFieldNm = config.validfn;
		
		// convert type
		if(!Ext.isNumber(value))
		{
			if(value === null || value === undefined)
				return !!config.allowNull;
			else if(this.integerRe.test(value))
				value = parseInt(value, 10);
			else
				return false;
		}
		else if(value%1 !== 0)
		{
			return false;
		}
		
		var validationInfo = MyRetirement.API.getValidationInfo(validFieldNm);
		var min = config.min;
		var max = config.max;
		
		if (validationInfo != null) {
			min = parseInt(validationInfo.dataValues[0]);
			max = parseInt(validationInfo.dataValues[1]);		
			this.wsfpIntegerRangeMessage = validationInfo.errorMessage;
		}
		
		// enforce min/max
		if(Ext.isNumber(min) && value < min)
			return false;
		
		if(Ext.isNumber(max) && value > max)
			return false;
			
		return true;
				
	}

	
	// see Jarvus.validation.Number
	,wsfpFloatRange: function(config, value) {
		var validFieldNm = config.validfn;
			
		// convert type
		if(!Ext.isNumber(value))
		{
			if(value === null || value === undefined)
				return !!config.allowNull;
			else if(this.floatRe.test(value))
				value = parseFloat(value);
			else
				return false;
		}
		
		var validationInfo = MyRetirement.API.getValidationInfo(validFieldNm);
		var min = config.min;
		var max = config.max;
		
		if (validationInfo != null) {
			min = parseFloat(validationInfo.dataValues[0]);
			max = parseFloat(validationInfo.dataValues[1]);		
			this.wsfpFloatRangeMessage = validationInfo.errorMessage;
		}
		
		// enforce min/max
		if(Ext.isNumber(min) && value < min)
			return false;
		
		if(Ext.isNumber(max) && value > max)
			return false;
			
		return true;
				
	}
	,contains: function (arr,obj) {
		if(!Array.prototype.indexOf) {
		    Array.prototype.indexOf = function(needle) {
		        for(var i = 0; i < this.length; i++) {
		            if(this[i] === needle) {
		                return i;
		            }
		        }
		        return -1;
		    };
		}
	    return (arr.indexOf(obj) != -1);
	}
});