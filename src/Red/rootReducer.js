import { combineReducers } from 'redux'

import authReducer from './auth/authReducer';
import customerAuthReducer from './customerAuth/customerAuthReducer';

import alertReducer from './alert/alertReducer';
import refreshPageReducer from './refreshPage/refreshPageReducer';

import economicCalendarDataReducer from './economicCalendarData/economicCalendarDataReducer';
import fundamentalDataDataReducer from './fundamentalDataData/fundamentalDataDataReducer';
import marketOverviewDataReducer from './marketOverviewData/marketOverviewDataReducer';
import symbolProfileDataReducer from './symbolProfileData/symbolProfileDataReducer';
import technicalAnalysisDataReducer from './technicalAnalysisData/technicalAnalysisDataReducer';

import historyDataReducer from './historyData/historyDataReducer';
import orderDataReducer from './orderData/orderDataReducer';
import orderAdtnlDataReducer from './orderAdtnlData/orderAdtnlDataReducer';
import positionDataReducer from './positionData/positionDataReducer';
import historySettingsReducer from './historySettings/historySettingsReducer';
import positionSettingsReducer from './positionSettings/positionSettingsReducer';
import orderSettingsReducer from './orderSettings/orderSettingsReducer';
import chartHistoryDataReducer from './chartHistoryData/chartHistoryDataReducer';
import ticksReducer from './ticks/ticksReducer';

import layoutDataReducer from './layoutData/layoutDataReducer';
import leftSideDataReducer from './leftSideData/leftSideDataReducer';
import leftSideSettingsReducer from './leftSideSettings/leftSideSettingsReducer';
import headerDataReducer from './headerData/headerDataReducer';
import totalFigureDataReducer from './totalFigureData/totalFigureDataReducer';
import totalFigureSettingsReducer from './totalFigureSettings/totalFigureSettingsReducer';
import settingsReducer from './settings/settingsReducer';

import siteLoaderCountReducer from './siteLoaderCount/siteLoaderCountReducer';
import siteLoaderReducer from './siteLoader/siteLoaderReducer';

import siteThemeReducer from './siteTheme/siteThemeReducer';
import oneClickTradingReducer from './oneClickTrading/oneClickTradingReducer';

import chartSymbolReducer from './chartSymbol/chartSymbolReducer';
import activeSymbolReducer from './activeSymbol/activeSymbolReducer';

import positionTableActiveSymbolReducer from './positionTableActiveSymbol/positionTableActiveSymbolReducer';
import orderTableActiveSymbolReducer from './orderTableActiveSymbol/orderTableActiveSymbolReducer';


import showSymbolInfoReducer from './showSymbolInfo/showSymbolInfoReducer';
import showSymbolPopupReducer from './showSymbolPopup/showSymbolPopupReducer';
import showPositionPopupReducer from './showPositionPopup/showPositionPopupReducer';
import showOrderPopupReducer from './showOrderPopup/showOrderPopupReducer';
import symbolFilterReducer from './symbolFilter/symbolFilterReducer';

import activeLanguageReducer from './activeLanguage/activeLanguageReducer';
import languagesReducer from './languages/languagesReducer';
import activeCategoriesReducer from './activeCategories/activeCategoriesReducer';

import positionSlTpReducer from './positionSlTp/positionSlTpReducer';
import orderSlTpReducer from './orderSlTp/orderSlTpReducer';
import favoriteSymbolsReducer from './favoriteSymbols/favoriteSymbolsReducer';
import activeInfoCategoriesReducer from './activeInfoCategories/activeInfoCategoriesReducer';
import infoSymbolReducer from './infoSymbol/infoSymbolReducer';
import allSymbolsReducer from './allSymbols/allSymbolsReducer';

import simpleTradeReducer from './simpleTrade/simpleTradeReducer';
import simpleTradePercentReducer from './simpleTradePercent/simpleTradePercentReducer';

import currencyReducer from './currency/currencyReducer';
import estimateDataReducer from './estimateData/estimateDataReducer';

import chatWithBrokerReducer from './chatWithBroker/chatWithBrokerReducer';

import newsSettingsReducer from './newsSettings/newsSettingsReducer';
import newsDataReducer from './newsData/newsDataReducer';

const rootReducer = combineReducers({
    auth:authReducer,
    customerAuth: customerAuthReducer,
    alert:alertReducer,
    refreshPage:refreshPageReducer,
    economicCalendarData:economicCalendarDataReducer,
    fundamentalDataData:fundamentalDataDataReducer,
    marketOverviewData:marketOverviewDataReducer,
    symbolProfileData:symbolProfileDataReducer,
    technicalAnalysisData:technicalAnalysisDataReducer,
    historyData:historyDataReducer,
    orderData:orderDataReducer,
    orderAdtnlData:orderAdtnlDataReducer,
    positionData:positionDataReducer,
    historySettings:historySettingsReducer,
    positionSettings:positionSettingsReducer,
    orderSettings:orderSettingsReducer,
    layoutData:layoutDataReducer,
    leftSideData:leftSideDataReducer,
    leftSideSettings:leftSideSettingsReducer,
    headerData:headerDataReducer,
    settings:settingsReducer,
    totalFigureData:totalFigureDataReducer,
    totalFigureSettings:totalFigureSettingsReducer,
    siteLoaderCount:siteLoaderCountReducer,
    siteLoader:siteLoaderReducer,
    chartHistoryData:chartHistoryDataReducer,
    ticks: ticksReducer,
    siteTheme: siteThemeReducer,
    oneClickTrading: oneClickTradingReducer,
    activeSymbol: activeSymbolReducer,
    chartSymbol:chartSymbolReducer,
    positionTableActiveSymbol: positionTableActiveSymbolReducer,
    orderTableActiveSymbol: orderTableActiveSymbolReducer,
    showSymbolPopup: showSymbolPopupReducer,
    showSymbolInfo: showSymbolInfoReducer,
    showPositionPopup: showPositionPopupReducer,
    showOrderPopup: showOrderPopupReducer,
    symbolFilter: symbolFilterReducer,
    activeLanguage:activeLanguageReducer,
    languages:languagesReducer,
    activeCategories: activeCategoriesReducer,
    positionSlTp:positionSlTpReducer,
    orderSlTp:orderSlTpReducer,
    favoriteSymbols:favoriteSymbolsReducer,
    activeInfoCategories:activeInfoCategoriesReducer,
    infoSymbol:infoSymbolReducer,
    allSymbols: allSymbolsReducer,
    simpleTrade: simpleTradeReducer,
    simpleTradePercent: simpleTradePercentReducer,
    currency: currencyReducer,
    estimateData: estimateDataReducer,
    newsSettings: newsSettingsReducer,
    newsData: newsDataReducer,
    chatWithBroker: chatWithBrokerReducer
  })
  
  export default rootReducer