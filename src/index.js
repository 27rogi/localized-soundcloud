// ==UserScript==
// @name         Localized SoundCloud
// @namespace    *://soundcloud.com/*
// @version      1.2.0
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

(function () {
  ("use strict");

  // List of all translations in format <selector>:<translation>.
  // For more info about translations see: https://github.com/Voknehzyr/localized-soundcloud/blob/master/README.md
  const translations = {
    ru: require("../src/locale/ru.json"),
  };

  let locale = "ru";
  if (translations[(navigator.language || navigator.userLanguage).split("_")[0].toLowerCase()]) {
    locale = (navigator.language || navigator.userLanguage).split("_")[0].toLowerCase();
  }

  const languageUtils = {
    /**
     * Translates targets inside provided element using strings defined in JSON.
     *
     * @param {*} elem - Element where function will be searching for targets.
     * @param {*} target - Target that being passed to querySelector function.
     * @returns
     */
    translate(elem, target) {
      // Without having a outerHTML element won't be accepted by querySelector.
      if (!elem.outerHTML) return;

      observer.disconnect();

      // Select all elements that match the target and
      // find translations for each from `translations` variable.
      elem.querySelectorAll(target).forEach((node) => {
        // As of the new feature with regular expression translations
        // we check if target's JSON contains a `regexp` object.
        if (translations[locale][target][0].regexp == undefined) {
          node.textContent = translations[locale][target];
        } else {
          translations[locale][target].forEach((object) => {
            // We create regular expression based on expression described in JSON.
            // It allows us to modify parts of the string without big problems.
            node.innerHTML = node.innerHTML.replace(new RegExp(object.regexp), object.translation);
          });
        }
      });

      observer.observe();
    },
  };

  // Small observer Object to make it easier to control.
  const observer = {
    observer: new MutationObserver((mutationRecords) => {
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
    },
  };

  observer.observe();
})();
