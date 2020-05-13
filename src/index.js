// ==UserScript==
// @name         Localized SoundCloud
// @namespace    *://soundcloud.com/*
// @version      1.1.1
// @description  Userscript that allows you to translate SoundCloud using MutationObserver API.
// @author       Voknehzyr
// @run-at       document-start
// @match        *://soundcloud.com/*
// @grant        none
// @icon         https://img.icons8.com/cotton/64/000000/soundcloud.png
// @updateURL    https://github.com/Voknehzyr/localized-soundcloud/raw/master/dist/localized-soundcloud.user.js
// @downloadURL  https://github.com/Voknehzyr/localized-soundcloud/raw/master/dist/localized-soundcloud.user.js
// @homepageURL  https://github.com/Voknehzyr/localized-soundcloud
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    // List of all translations in format <selector>:<translation>.
    const translations = {
        'ru': require('../src/locale/ru.json'),
    };

    let locale = 'ru';
    if (translations[(navigator.language || navigator.userLanguage).split("_")[0].toLowerCase()]) {
        locale = (navigator.language || navigator.userLanguage).split("_")[0].toLowerCase();
    }

    const languageUtils = {
        // Translates found targets in provided element.
        translate(elem, target) {
            // Without having a outerHTML element won't be accepted by querySelector.
            if(!elem.outerHTML) return;

            observer.disconnect();

            // Select all elements that match the target and
            // find translations for each from `translations` variable.
            elem.querySelectorAll(target).forEach((node) => {
                node.textContent = translations[locale][target];
            });

            observer.observe();
        }
    };

    // Small observer Object to make it easier to control.
    const observer = {
        observer: new MutationObserver(mutationRecords => {
          mutationRecords.forEach((record) => {
              // Search for translation for every selector in `translations`.
              Object.keys(translations[locale]).forEach((target) => {
                  languageUtils.translate(record.target, target);
              });
          });
        }),
        observe() {
            this.observer.observe(document.body, {
              childList: true,
              subtree: true,
            });
        },
        disconnect() {
            this.observer.disconnect();
        }
    };

    observer.observe();

})();
