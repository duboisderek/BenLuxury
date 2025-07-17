import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTranslation } from '../../hooks/useTranslation';
import type { Language } from '../../types';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  const languages = [
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' },
    { code: 'he' as Language, name: 'עברית', flag: '🇮🇱' },
    { code: 'ru' as Language, name: 'Русский', flag: '🇷🇺' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div className="relative group">
      <button className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gradient-to-br from-luxury-charcoal to-luxury-dark border border-gold-500/30 hover:border-gold-500/60 transition-all duration-300 hover:shadow-gold backdrop-blur-sm">
        <div className="w-6 h-6 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center">
          <Globe className="h-3 w-3 text-luxury-dark" />
        </div>
        <span className="text-sm font-medium text-gray-300 group-hover:text-gold-400 transition-colors">
          {currentLanguage?.flag} {currentLanguage?.name}
        </span>
      </button>

      <div className="absolute right-0 top-full mt-2 w-56 bg-gradient-to-br from-luxury-charcoal to-luxury-dark rounded-xl shadow-luxury border border-gold-500/20 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 backdrop-blur-luxury">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`w-full px-4 py-3 text-left hover:bg-gold-500/10 transition-all duration-200 flex items-center gap-3 group/item ${
              language === lang.code ? 'bg-gold-500/20 text-gold-400' : 'text-gray-300 hover:text-gold-400'
            }`}
          >
            <span className="text-xl">{lang.flag}</span>
            <span className="font-medium group-hover/item:translate-x-1 transition-transform duration-200">{lang.name}</span>
            {language === lang.code && (
              <div className="ml-auto w-2 h-2 bg-gold-gradient rounded-full"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;