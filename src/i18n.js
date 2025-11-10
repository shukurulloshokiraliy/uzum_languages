import i18n from "i18next";
import { initReactI18next } from "react-i18next";


const resources = {
  uz: {
    translation: {
      welcome: " Xush kelibsiz react-i18next"
    }
  },
  ru: {
    translation: {
     welcome: "Dobro pojalovat na rus react-i18next"
    }
  },
  en: {
    translation: {
      welcome: "Welcome to React and react-i18next"
    }
  },
};

i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: "en", 
    interpolation: {
      escapeValue: false 
    }
  });

  export default i18n;