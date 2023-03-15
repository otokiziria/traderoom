import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import json from './lang.json';

let data = {
  resources: {
    en: {
      translations: {
        'Test Key':'Test Row'
      }
    }
  }
}
if(json.data !== undefined){
  data = json.data;
}
console.log('LAGUAGE = ',data);
i18n.use(LanguageDetector).init({
  // we init with resources
  resources: data.resources,
  fallbackLng: "en",
  debug: false,

  // have a common namespace used around the full app
  ns: ["translations"],
  defaultNS: "translations",

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ","
  },

  react: {
    wait: true
  }
});

export default i18n;