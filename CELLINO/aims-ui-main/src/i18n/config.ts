import i18n from "i18next";
import loginPage from "./en/loginPage.json";
import colonyAccordion from "./en/colonyAccordion.json";
import platesAccordion from "./en/platesAccordion.json";
import runAccordion from "./en/runAccordion.json";
import { initReactI18next } from "react-i18next";
import wellAccordion from "./en/wellAccordion.json";
import clusterAccordion from "./en/clusterAccordion.json";
import inferenceAccordion from "./en/inferenceAccordion.json";
import brightFieldAccordion from "./en/brightFieldAccordion.json";
import runDetails from "./en/runDetails.json";
import workflowDetails from "./en/workflowDetails.json";

export const resources = {
  en: {
    loginPage,
    colonyAccordion,
    platesAccordion,
    runAccordion,
    runDetails,
    wellAccordion,
    clusterAccordion,
    inferenceAccordion,
    brightFieldAccordion,
    workflowDetails,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: "en",
  ns: [
    "loginPage",
    "colonyAccordion",
    "platesAccordion",
    "wellAccordion",
    "runAccordion",
    "clusterAccordion",
    "inferenceAccordion",
    "brightFieldAccordion",
    "runDetails",
    "workflowDetails",
  ],
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources,
});
