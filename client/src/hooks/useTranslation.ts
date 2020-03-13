import { useContext } from 'react';

import { LanguageContext } from '../context/LanguageProvider';

export default function useTranslation() {
  const { t, language, setLanguage, dictionary }: any = useContext(LanguageContext);

  return {
    t,
    language,
    setLanguage,
    dictionary
  };
}
