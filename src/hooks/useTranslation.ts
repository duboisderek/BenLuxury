import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../utils/translations';

export const useTranslation = () => {
  const { language } = useLanguage();
  
  const t = (key: string): string => {
    return getTranslation(key, language);
  };
  
  return { t };
};