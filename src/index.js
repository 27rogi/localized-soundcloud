// ==UserScript==
// @name         Russian Localized SoundCloud
// @namespace    *://soundcloud.com/*
// @version      0.1
// @description  Translates SoundCloud elements on Russian language using MutationObserver technology.
// @author       Voknehzyr
// @run-at       document-start
// @match        *://soundcloud.com/*
// @grant        none
// @icon         https://img.icons8.com/cotton/64/000000/soundcloud.png
// ==/UserScript==

(function() {
    'use strict';

    // List of all translations in format <selector>:<translation>.
    let translations = require('../src/locale/ru.json');

    const languageUtils = {
        // Translates found targets in provided element.
        translate(elem, target) {
            // Without having a outerHTML element won't be accepted by querySelector.
            if(!elem.outerHTML) return;

            observer.disconnect();

            // Select all elements that match the target and
            // find translations for each from `translations` variable.
            elem.querySelectorAll(target).forEach((node) => {
                node.textContent = translations[target];
            });

            observer.observe();
        }
    };

    // Small observer Object to make it easier to control.
    const observer = {
        observer: new MutationObserver(mutationRecords => {
          mutationRecords.forEach((record) => {
              // Search for translation for every selector in `translations`.
              Object.keys(translations).forEach((target) => {
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
