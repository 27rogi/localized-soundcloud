# Localized SoundCloud UserScript
By using this userscript you accept that website may work slower and some errors may appear.  
**If you're facing some errors, feel free to create detailed Issue and I will try to fix the problem.**

# Locales
This plugin was developed to translate SoundCloud only on Russian language, but then I decided to make it more flexible by adding ability to bundle many json locale files. So, everything you need to do is just simply create a new locale file **that uses 2 letters from language code** in `locale` folder (like `ua.json`) and after **approval** I will add it to the userscript import.

Locale file structure is very primitive, it has key wich represents query selector and translation that should be applied to **all** elements that will be found using that selector: `<selector>:<translation>`

# [Install latest version](https://github.com/Voknehzyr/localized-soundcloud/raw/master/dist/localized-soundcloud.user.js)
