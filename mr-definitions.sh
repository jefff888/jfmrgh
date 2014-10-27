#!/bin/bash

cd ~/src

#mkdir mret42-workspace
#cd mret42-workspace
#git init
#echo <<HERE_DOC
#/build/temp/
#/build/.sass-cache/
#/resources/sass/.sass-cache/
#/build/production/MyRetirement/resources/sass/.sass-cache
#HERE_DOC > .gitignore

#cp -v ../mret422_bkup/.gitignore .gitignore
#echo Displaying gitignore contents:
#cat .gitignore
#
#cd ..
#
#echo Generating mret42-workspace with ExtJS 4.2.3.1477 framework.
#sencha -sdk /c/Users/jeff.furgal/src/ext-4.2.3.1477 generate workspace mret42-workspace
#
#cd mret42-workspace
#git add -A
#git commit -m "Initial commit of the workspace for the MyRetirement 4.2 conversion."
#
#echo sencha -sdk ext generate app MyRetirement mret42
#sencha -sdk ext generate app MyRetirement mret42

cd mret42
git add -A
git commit -m "Initial commit of the application for the MyRetirement 4.2 conversion."

sencha app build
git add -A
git commit -m "Commit of the initial build of the application for the MyRetirement 4.2 conversion."

# Generate Models
echo Generating Models...

echo sencha generate model Enumeration label:string,sortOrder:int,value:int
sencha generate model Enumeration label:string,sortOrder:int,value:int

echo sencha generate model asset.Growth assetsToRetirement
sencha generate model asset.Growth assetsToRetirement
echo sencha generate model asset.Investment id,name
sencha generate model asset.Investment id,name
echo sencha generate model asset.Retirement id,name
sencha generate model asset.Retirement id,name
echo sencha generate model asset.RetirementComposition id,name
sencha generate model asset.RetirementComposition id,name

echo sencha generate model comparison.Budget id,name
sencha generate model comparison.Budget id,name
echo sencha generate model comparison.Data id,name
sencha generate model comparison.Data id,name
echo sencha generate model comparison.TakeHomePay id,name
sencha generate model comparison.TakeHomePay id,name

echo sencha generate model income.Annuity id,name
sencha generate model income.Annuity id,name
echo sencha generate model income.Retirement id,name
sencha generate model income.Retirement id,name
echo sencha generate model income.RetirementAverage id,name
sencha generate model income.RetirementAverage id,name
echo sencha generate model income.SocialSecurity id,name
sencha generate model income.SocialSecurity id,name

echo sencha generate model relius.AboutYou id,name
sencha generate model relius.AboutYou id,name

echo sencha generate model setup.AssetAllocation id,name
sencha generate model setup.AssetAllocation id,name
echo sencha generate model setup.SetupInfo id,name
sencha generate model setup.SetupInfo id,name

echo sencha generate model whatif.AdditionalInvestment id,name
sencha generate model whatif.AdditionalInvestment id,name
echo sencha generate model whatif.SavingMore id,name
sencha generate model whatif.SavingMore id,name

echo sencha generate model withdrawal.AssetAllocation id,name
sencha generate model withdrawal.AssetAllocation id,name
echo sencha generate model withdrawal.RateData id,name
sencha generate model withdrawal.RateData id,name

# Generate Controllers
echo Generating Controllers...

echo sencha generate controller Assets
sencha generate controller Assets
echo sencha generate controller Comparison
sencha generate controller Comparison
echo sencha generate controller Development
sencha generate controller Development
echo sencha generate controller Help
sencha generate controller Help
echo sencha generate controller Income
sencha generate controller Income
echo sencha generate controller Setup
sencha generate controller Setup
echo sencha generate controller Viewport
sencha generate controller Viewport
echo sencha generate controller WhatIfParticipant
sencha generate controller WhatIfParticipant
echo sencha generate controller Withdrawal
sencha generate controller Withdrawal
echo sencha generate controller relius.AboutYou
sencha generate controller relius.AboutYou
echo sencha generate controller relius.DisclaimerTab
sencha generate controller relius.DisclaimerTab

# Generate Views
echo Generating Views...

echo sencha generate view assets.ChartPanel
sencha generate view assets.ChartPanel
echo sencha generate view assets.GrowthChart
sencha generate view assets.GrowthChart
echo sencha generate view assets.InvestmentAccounts
sencha generate view assets.InvestmentAccounts
echo sencha generate view assets.InvestmentAccountSegment
sencha generate view assets.InvestmentAccountSegment
echo sencha generate view assets.InvestmentAccountTable
sencha generate view assets.InvestmentAccountTable
echo sencha generate view assets.Panel
sencha generate view assets.Panel
echo sencha generate view assets.RetirementAccounts
sencha generate view assets.RetirementAccounts
echo sencha generate view assets.RetirementAccountSegment
sencha generate view assets.RetirementAccountSegment
echo sencha generate view assets.RetirementAccountTable
sencha generate view assets.RetirementAccountTable
echo sencha generate view comparison.Chart
sencha generate view comparison.Chart
echo sencha generate view comparison.MyBudgetRow
sencha generate view comparison.MyBudgetRow
echo sencha generate view comparison.MyBudgetTable
sencha generate view comparison.MyBudgetTable
echo sencha generate view comparison.MyBudgetTotalsRow
sencha generate view comparison.MyBudgetTotalsRow
echo sencha generate view comparison.Panel
sencha generate view comparison.Panel
echo sencha generate view comparison.TakeHomeTable
sencha generate view comparison.TakeHomeTable
echo sencha generate view income.ChartPanel
sencha generate view income.ChartPanel
echo sencha generate view income.MonthlyChart
sencha generate view income.MonthlyChart
echo sencha generate view income.NoteAnnuitySegment
sencha generate view income.NoteAnnuitySegment
echo sencha generate view income.NoteAnnuityTable
sencha generate view income.NoteAnnuityTable
echo sencha generate view income.OtherIncomeSegment
sencha generate view income.OtherIncomeSegment
echo sencha generate view income.OtherIncomeTable
sencha generate view income.OtherIncomeTable
echo sencha generate view income.Panel
sencha generate view income.Panel
echo sencha generate view income.SocialSecurityTable
sencha generate view income.SocialSecurityTable
echo sencha generate view setup.AssumptionTable
sencha generate view setup.AssumptionTable
echo sencha generate view setup.ChartPanel
sencha generate view setup.ChartPanel
echo sencha generate view setup.MyInformationTable
sencha generate view setup.MyInformationTable
echo sencha generate view setup.Panel
sencha generate view setup.Panel
echo sencha generate view setup.RetirementYearsChart
sencha generate view setup.RetirementYearsChart
echo sencha generate view whatIf.ChartParticipant
sencha generate view whatIf.ChartParticipant
echo sencha generate view whatIf.FooterParticipant
sencha generate view whatIf.FooterParticipant
echo sencha generate view whatIf.PanelParticipant
sencha generate view whatIf.PanelParticipant
echo sencha generate view whatIf.TableParticipant
sencha generate view whatIf.TableParticipant
echo sencha generate view withdrawal.ChartPanel
sencha generate view withdrawal.ChartPanel
echo sencha generate view withdrawal.Panel
sencha generate view withdrawal.Panel
echo sencha generate view withdrawal.RateTable
sencha generate view withdrawal.RateTable
echo sencha generate view relius.AboutYouTab
sencha generate view relius.AboutYouTab
echo sencha generate view relius.DisclaimerTab
sencha generate view relius.DisclaimerTab
echo sencha generate view relius.ModuleToolsRelius
sencha generate view relius.ModuleToolsRelius
echo sencha generate view relius.PersonalInfoForm
sencha generate view relius.PersonalInfoForm
echo sencha generate view AppPanel
sencha generate view AppPanel
echo sencha generate view ChartPanel
sencha generate view ChartPanel
echo sencha generate view DataHeader
sencha generate view DataHeader
echo sencha generate view DataPanel
sencha generate view DataPanel
echo sencha generate view HelpPanel
sencha generate view HelpPanel
echo sencha generate view LegendFooter
sencha generate view LegendFooter
echo sencha generate view ModuleTools
sencha generate view ModuleTools
echo sencha generate view Viewport
sencha generate view Viewport

sencha app refresh
git add -A
git commit -m "Commit of model, controller, and view class templates for MyRetirement."

sencha app build
git add -A
git commit -m "Commit of build of model, controller, and view class templates were added for MyRetirement."
