import React, { useState, useContext, createContext } from 'react';
import { dictionaryList } from '../lang/translator';
import { languageItems } from '../utilities/constants';

export const LanguageContext = createContext({
  language: languageItems[0],
  dictionary: dictionaryList[languageItems[0].value],
});

export function LanguageProvider({ children }: any) {
  const languageContext = useContext(LanguageContext);
  const [language, setLanguage] = useState(languageContext.language);
  const [dictionary, setDictionary] = useState(languageContext.dictionary);

  const provider = {
    language,
    dictionary,
    setLanguage: (selectedLanguage: any) => {
      if (!selectedLanguage) return;
      setLanguage(selectedLanguage); // it will update the language in state
      setDictionary(dictionaryList[selectedLanguage.value]);
    },
    t: (tid: string) => dictionary[tid],
  };

  return (
    <LanguageContext.Provider value={provider}>
      {children}
    </LanguageContext.Provider>
  );
}
