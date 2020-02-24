import { createContext } from 'react';
import en from './en';
import de from './de';
import { languageItems } from '../utilities/constants';

export const dictionaryList: any = {
  en,
  de,
};

// create the language context with default selected language
export const LanguageContext = createContext({
  language: languageItems[0],
  dictionary: dictionaryList[languageItems[0].value],
});
