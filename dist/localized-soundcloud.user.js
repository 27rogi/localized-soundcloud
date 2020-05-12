!function e(r,t,o){function n(i,s){if(!t[i]){if(!r[i]){var u="function"==typeof require&&require;if(!s&&u)return u(i,!0);if(a)return a(i,!0);throw new Error("Cannot find module '"+i+"'")}var l=t[i]={exports:{}};r[i][0].call(l.exports,function(e){var t=r[i][1][e];return n(t||e)},l,l.exports,e,r,t,o)}return t[i].exports}for(var a="function"==typeof require&&require,i=0;i<o.length;i++)n(o[i]);return n}({1:[function(e,r,t){
// ==UserScript==
// @name         Localized SoundCloud
// @namespace    *://soundcloud.com/*
// @version      1.1.0
// @description  Userscript that allows you to translate SoundCloud using MutationObserver API.
// @author       Voknehzyr
// @run-at       document-start
// @match        *://soundcloud.com/*
// @grant        none
// @icon         https://img.icons8.com/cotton/64/000000/soundcloud.png
// @updateURL    https://github.com/Voknehzyr/localized-soundcloud/raw/master/dist/localized-soundcloud.user.js
// @downloadURL  https://github.com/Voknehzyr/localized-soundcloud/raw/master/dist/localized-soundcloud.user.js
// @homepageURL  https://github.com/Voknehzyr/localized-soundcloud
// ==/UserScript==
!function(){"use strict";
// List of all translations in format <selector>:<translation>.
const r={ru:e("../src/locale/ru.json")};let t="ru";r[(navigator.language||navigator.userLanguage).split("_")[0].toLowerCase()]&&(t=(navigator.language||navigator.userLanguage).split("_")[0].toLowerCase());const o={
// Translates found targets in provided element.
translate(e,o){
// Without having a outerHTML element won't be accepted by querySelector.
e.outerHTML&&(n.disconnect(),
// Select all elements that match the target and
// find translations for each from `translations` variable.
e.querySelectorAll(o).forEach(e=>{e.textContent=r[t][o]}),n.observe())}},n={observer:new MutationObserver(e=>{e.forEach(e=>{
// Search for translation for every selector in `translations`.
Object.keys(r[t]).forEach(r=>{o.translate(e.target,r)})})}),observe(){this.observer.observe(document.body,{childList:!0,subtree:!0})},disconnect(){this.observer.disconnect()}};
// Small observer Object to make it easier to control.
n.observe()}()},{"../src/locale/ru.json":2}],2:[function(e,r,t){r.exports={".userInfoBar__tabs .profileTabs .g-tabs-item:nth-child(1) a":"Все",".userInfoBar__tabs .profileTabs .g-tabs-item:nth-child(2) a":"Популярные треки",".userInfoBar__tabs .profileTabs .g-tabs-item:nth-child(3) a":"Треки",".userInfoBar__tabs .profileTabs .g-tabs-item:nth-child(4) a":"Альбомы",".userInfoBar__tabs .profileTabs .g-tabs-item:nth-child(5) a":"Плейлисты",".userInfoBar__tabs .profileTabs .g-tabs-item:nth-child(6) a":"Репосты",".sc-button-follow":"Подписаться",".profileMenu__likes":"Лайки",".profileMenu__profile":"Профиль",".profileMenu__stations":"Станции",".profileMenu__following":"Подписки",".profileMenu__friends":"Рекомендации",".profileMenu__premium":"Стать Про",".profileMenu__trackManager":"Треки",".uploadButton__title":"Загрузить",".header__navMenuItem[href='/discover']":"Главная",".header__navMenuItem[href='/stream']":"Стрим",".header__navMenuItem[href='/you/library']":"Библиотека",".moreMenu__link[href='/terms-of-use']":"shit",".profileHeader__headerImageEditChooser":"Загрузить изображение",".headerImageEditDropdown__button":"Заменить изображение",".headerImageEditDropdown__button[name='delete']":"Удалить изображение"}},{}]},{},[1]);