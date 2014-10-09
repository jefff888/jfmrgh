/*jslint sloppy: true, undef: true, plusplus: true */
/*global window, Ext, MyRetirement, MyRetirementRemote */

// 'My Information'.clientRetirementProfileRetired is the field's name key
// 'ClientRetirementProfile.isRetired' is the window.help key for the field's help
Ext.define('MyRetirement.help.HelpMap', {
    singleton: true,
    // tabs
    // tab.setup is the tab's itemId,
    // 'Setup' is the window.help key for the Setup tab help
    tab: {
	    aboutYou: 'AboutYou',
        setup: 'Setup',
        income: 'Income',
        assets: 'Assets',
        withdrawal: 'WithdrawalRate',
        comparison: 'Comparison',
        whatif: 'WhatIf'
    },
	// About You tab
	'About You Panel': {
		clientPersonMaritalStatusTypeCode: 'ClientPerson.maritalStatusTypeCode',
		clientPersonGenderTypeCode: 'ClientPerson.genderTypeCode',
		spousePersonFirstName: 'SpousePerson.firstName',
		spousePersonLastName: 'SpousePerson.lastName',
		spousePersonBirthDate: 'SpousePerson.birthDate',
		spousePersonGenderTypeCode: 'SpousePerson.genderTypeCode'
	},
    // Setup tab
    'My Information': {
        clientRetirementProfileRetired: 'ClientRetirementProfile.isRetired',
        spouseRetirementProfileRetired: 'SpouseRetirementProfile.isRetired',
        clientRetirementProfileRetirementAge: 'ClientRetirementProfile.retirementAge',
        spouseRetirementProfileRetirementAge: 'SpouseRetirementProfile.retirementAge',
        clientRetirementProfileRetirementAgeMonths: 'ClientRetirementProfile.retirementAgeMonths',
        spouseRetirementProfileRetirementAgeMonths: 'SpouseRetirementProfile.retirementAgeMonths',
        clientFinancialProfileAnalysisEndingAge: 'ClientFinancialProfile.analysisEndingAge',
        spouseFinancialProfileAnalysisEndingAge: 'SpouseFinancialProfile.analysisEndingAge',
        clientFinancialProfileAnnualEarnedIncome: 'ClientFinancialProfile.annualEarnedIncome',
        spouseFinancialProfileAnnualEarnedIncome: 'SpouseFinancialProfile.annualEarnedIncome'
    },
    Assumptions: {
        clientRetirementProfilePreRetirementRiskTolerance: 'MyRetirementProfile.preRetirementRiskTolerance',
        clientFinancialProfileAverageTaxRate: 'ClientFinancialProfile.averageTaxRate',
        retirementJointProfileDuringRetirementAverageTaxRate: 'RetirementJointProfile.duringRetirementAverageTaxRate',
        clientFinancialProfileAnnualInflationRate: 'ClientFinancialProfile.annualInflationRate'
    },
    // Income tab
    'Social Security': {
        clientFinancialProfileSocialSecurityCovered: 'ClientFinancialProfile.socialSecurityCovered',
        spouseFinancialProfileSocialSecurityCovered: 'SpouseFinancialProfile.socialSecurityCovered',
        clientRetirementProfileIsReceivingSocSecurityBenefits: 'ClientRetirementProfile.isReceivingSocSecurityBenefits',
        spouseRetirementProfileIsReceivingSocSecurityBenefits: 'SpouseRetirementProfile.isReceivingSocSecurityBenefits',
        clientRetirementProfileSocialSecurityFullMonthlyBenefit: 'ClientRetirementProfile.socialSecurityFullMonthlyBenefit',
        spouseRetirementProfileSocialSecurityFullMonthlyBenefit: 'SpouseRetirementProfile.socialSecurityFullMonthlyBenefit',
        clientRetirementProfileSocialSecurityPVMonthlyBenefit: 'ClientRetirementProfile.socialSecurityPVMonthlyBenefit',
        currentRetirementProfileSocialSecurityPVMonthlyBenefit: 'SpouseRetirementProfile.socialSecurityPVMonthlyBenefit',
        clientRetirementProfileSocialSecurityBeginAge: 'ClientRetirementProfile.socialSecurityBeginAge',
        spouseRetirementProfileSocialSecurityBeginAge: 'SpouseRetirementProfile.socialSecurityBeginAge',
        clientRetirementProfileSocialSecurityBeginAgeMonths: 'ClientRetirementProfile.socialSecurityBeginAgeMonths',
        spouseRetirementProfileSocialSecurityBeginAgeMonths: 'SpouseRetirementProfile.socialSecurityBeginAgeMonths',
        spouseFinancialProfileSpousalBenefitAvailable: 'FinancialJointProfile.qualifySSForSpouseBenefit'
    },
    'Pensions and Annuities': {
        name: 'NoteAnnuityIncome.name',
        type: 'NoteAnnuityIncome.type',
        owner: 'NoteAnnuityIncome.owner',
        monthlyAmount: 'NoteAnnuityIncome.monthlyAmount',
        survivorBenefitRate: 'NoteAnnuityIncome.survivorBenefitRate',
        portionTaxableRate: 'NoteAnnuityIncome.portionTaxableRate',
        beginAge: 'NoteAnnuityIncome.beginAge',
        beginType: 'NoteAnnuityIncome.beginType',
        beginMonth: 'NoteAnnuityIncome.beginMonth',
        beginYear: 'NoteAnnuityIncome.beginYear',
        durationType: 'NoteAnnuityIncome.durationType',
        duration: 'NoteAnnuityIncome.duration',
		durationMonths: 'NoteAnnuityIncome.durationMonths',
        endMonth: 'NoteAnnuityIncome.endMonth',
        endYear: 'NoteAnnuityIncome.endYear',
        beforePeriodAnnualIncreaseRate: 'NoteAnnuityIncome.beforePeriodAnnualIncreaseRate',
        annualIncreaseRate: 'NoteAnnuityIncome.annualIncreaseRate'
    },
    'Other Retirement Income': {
        name: 'RetirementIncome.name',
        owner: 'RetirementIncome.owner',
        annualAmount: 'RetirementIncome.annualAmount/12',
        beforePeriodAnnualIncreaseRate: 'RetirementIncome.beforePeriodAnnualIncreaseRate',
        annualIncreaseRate: 'NoteAnnuityIncome.annualIncreaseRate',
        portionTaxableRate: 'RetirementIncome.portionTaxableRate',
        beginType: 'RetirementIncome.beginType',
        beginMonth: 'RetirementIncome.beginMonth',
        beginYear: 'RetirementIncome.beginYear',
        durationType: 'RetirementIncome.durationType',
        durationMonths: 'RetirementIncome.durationMonths',
        duration: 'RetirementIncome.duration',
        endMonth: 'RetirementIncome.endMonth',
        endYear: 'RetirementIncome.endYear'
    },
    // Assets tab
    'Retirement Accounts': {
        name: 'RetirementAsset.name',
        owner: 'RetirementAsset.owner',
        type: 'RetirementAsset.type',
        currentBalance: 'RetirementAsset.currentBalance',
        annualContribution: 'RetirementAsset.annualContribution',
        employerContribution: 'RetirementAsset.employerContribution',
        contributionGrowthRate: 'RetirementAsset.contributionGrowthRate',
        contributionBeginType: 'RetirementAsset.contributionBeginType',
        contributionBeginMonth: 'RetirementAsset.contributionBeginMonth',
        contributionBeginYear: 'RetirementAsset.contributionBeginYear',
        contributionEndType: 'RetirementAsset.contributionEndType',
        contributionEndMonth: 'RetirementAsset.contributionMonthEnds',
        contributionEndYear: 'RetirementAsset.contributionYearEnds',
        contributionMonthsUntilBegin: 'RetirementAsset.contributionMonthsUntilBegin',
        contributionYearsUntilBegin: 'RetirementAsset.contributionYearsUntilBegin',
        contributionDuration: 'RetirementAsset.contributionDuration',
        contributionDurationMonths: 'RetirementAsset.contributionDurationMonths',
        contributionMonthEnds: 'RetirementAsset.contributionMonthEnds',
        contributionYearEnds: 'RetirementAsset.contributionYearEnds'
    },
    'Investment Accounts': {
        name: 'InvestmentAsset.name',
        owner: 'InvestmentAsset.owner',
        taxTypeCode: 'InvestmentAsset.taxTypeCode',
        currentBalance: 'InvestmentAsset.currentBalance',
        retirementAvailabilityRate: 'InvestmentAsset.retirementAvailabilityRate'
    },
    // Comparison tab
    'Take Home Pay': {
        clientFinancialProfileSocialSecurityTaxRate: 'MyRetirementJointProfile.socialSecurityTaxClientRate',
        spouseFinancialProfileSocialSecurityTaxRate: 'MyRetirementJointProfile.socialSecurityTaxSpouseRate',
        clientFinancialProfileTakeHomePayOtherRate: 'MyRetirementJointProfile.THPOtherClientRate',
        spouseFinancialProfileTakeHomePayOtherRate: 'MyRetirementJointProfile.THPOtherSpouseRate'
    },
    'My Monthly Budget': {
        'amountNow.food': 'MyRetirementJointProfile.foodNow',
        'amountAtRetirement.food': 'MyRetirementJointProfile.foodRet',
        'needRate.food': 'MyRetirementJointProfile.foodNeedRate',

        'amountNow.housing': 'MyRetirementJointProfile.housingNow',
        'amountAtRetirement.housing': 'MyRetirementJointProfile.housingRet',
        'needRate.housing': 'MyRetirementJointProfile.housingNeedRate',

        'amountNow.transportation': 'MyRetirementJointProfile.transportationNow',
        'amountAtRetirement.transportation': 'MyRetirementJointProfile.transportationRet',
        'needRate.transportation': 'MyRetirementJointProfile.transportationNeedRate',

        'amountNow.healthcare': 'MyRetirementJointProfile.healthcareNow',
        'amountAtRetirement.healthcare': 'MyRetirementJointProfile.healthcareRet',
        'needRate.healthcare': 'MyRetirementJointProfile.healthcareNeedRate',

        'amountNow.entertainment': 'MyRetirementJointProfile.entertainmentNow',
        'amountAtRetirement.entertainment': 'MyRetirementJointProfile.entertainmentRet',
        'needRate.entertainment': 'MyRetirementJointProfile.entertainmentNeedRate',

        'amountNow.incomeAndPropertyTaxes': 'MyRetirementJointProfile.taxesNow',
        'amountAtRetirement.incomeAndPropertyTaxes': 'MyRetirementJointProfile.taxesRet',
        'needRate.incomeAndPropertyTaxes': 'MyRetirementJointProfile.taxesNeedRate',

        'amountNow.allOther': 'MyRetirementJointProfile.otherNow',
        'amountAtRetirement.allOther': 'MyRetirementJointProfile.otherRet',
        'needRate.allOther': 'MyRetirementJointProfile.otherNeedRate'
    },
	// What-If tab
	'Additional Investing': {
		'taxTypeCode': 'TaxType.code',
		'monthlyContribution': 'Monthly.contribution'
	}
});