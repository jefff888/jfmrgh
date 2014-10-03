#!/bin/bash

#sencha generate workspace "C:\Users\jeff.furgal\Workspaces\Planning01\PlanningStation\ext5"

#sencha -sdk /c/Users/jeff.furgal/src/ext-5.0.1 generate app MyRetirement "C:\Users\jeff.furgal\Workspaces\Planning01\PlanningStation\ext5\myRetirement"

#pushd /c/Users/jeff.furgal/Workspaces/Planning01/PlanningStation/ext5

# Generate Models
echo Generating Models...

sencha generate model Enumeration label:string,sortOrder:int,value:int

sencha generate model asset.Growth assetsToRetirement
sencha generate model asset.Retirement id,name
sencha generate model asset.RetirementComposition id,name

sencha generate model comparison.Budget id,name
sencha generate model comparison.Data id,name
sencha generate model comparison.TakeHomePay id,name

sencha generate model income.Annuity id,name
sencha generate model income.Retirement id,name
sencha generate model income.RetirementAverage id,name
sencha generate model income.SocialSecurity id,name

sencha generate model relius.AboutYou id,name

sencha generate model setup.AssetAllocation id,name
sencha generate model setup.SetupInfo id,name

sencha generate model whatif.AdditionalInvestment id,name
sencha generate model whatif.SavingMore id,name

sencha generate model withdrawal.AssetAllocation id,name
sencha generate model withdrawal.RateData id,name

# Generate Controllers
echo Generating Controllers...

sencha generate controller Assets
sencha generate controller Comparison
sencha generate controller Development
sencha generate controller Help
sencha generate controller Income
sencha generate controller Setup
sencha generate controller Viewport
sencha generate controller WhatIfParticipant
sencha generate controller Withdrawal
sencha generate controller relius.AboutYou
sencha generate controller relius.DisclaimerTab

# Generate Views
echo Generating Views...

sencha generate view assets.ChartPanel
sencha generate view assets.GrowthChart
sencha generate view assets.InvestmentAccounts
sencha generate view assets.InvestmentAccountSegment
sencha generate view assets.InvestmentAccountTable
sencha generate view assets.Panel
sencha generate view assets.RetirementAccounts
sencha generate view assets.RetirementAccountSegment
sencha generate view assets.RetirementAccountTable
sencha generate view comparison.Chart
sencha generate view comparison.MyBudgetRow
sencha generate view comparison.MyBudgetTable
sencha generate view comparison.MyBudgetTotalsRow
sencha generate view comparison.Panel
sencha generate view comparison.TakeHomeTable
sencha generate view income.ChartPanel
sencha generate view income.MonthlyChart
sencha generate view income.NoteAnnuitySegment
sencha generate view income.NoteAnnuityTable
sencha generate view income.OtherIncomeSegment
sencha generate view income.OtherIncomeTable
sencha generate view income.Panel
sencha generate view income.SocialSecurityTable
sencha generate view setup.AssumptionTable
sencha generate view setup.ChartPanel
sencha generate view setup.MyInformationTable
sencha generate view setup.Panel
sencha generate view setup.RetirementYearsChart
sencha generate view whatIf.ChartParticipant
sencha generate view whatIf.FooterParticipant
sencha generate view whatIf.PanelParticipant
sencha generate view whatIf.TableParticipant
sencha generate view withdrawal.ChartPanel
sencha generate view withdrawal.Panel
sencha generate view withdrawal.RateTable
sencha generate view relius.AboutYouTab
sencha generate view relius.DisclaimerTab
sencha generate view relius.ModuleToolsRelius
sencha generate view relius.PersonalInfoForm
sencha generate view AppPanel
sencha generate view ChartPanel
sencha generate view DataHeader
sencha generate view DataPanel
sencha generate view HelpPanel
sencha generate view LegendFooter
sencha generate view ModuleTools
sencha generate view Viewport

