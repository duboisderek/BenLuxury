import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Crown } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import LanguageSwitcher from './LanguageSwitcher';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navigation = [
    { name: t('home'), href: '/' },
    { name: t('projects'), href: '/projects' },
    { name: t('contact'), href: '/contact' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-gradient-to-r from-luxury-dark via-luxury-charcoal to-luxury-dark backdrop-blur-luxury sticky top-0 z-50 border-b border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 text-gold-400 hover:text-gold-300 transition-colors group">
            <div className="relative">
              <div className="absolute inset-0 bg-gold-gradient rounded-lg blur-sm opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-gold-400 to-gold-600 p-2 rounded-lg">
                <Crown className="h-8 w-8 text-luxury-dark" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-luxury font-bold bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300 bg-clip-text text-transparent">
                BenLuxury
              </span>
              <div className="text-xs text-gold-400/80 font-elegant tracking-wider">
                AGENCY
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative text-sm font-medium transition-all duration-300 hover:text-gold-400 group ${
                  isActive(item.href) ? 'text-gold-400' : 'text-gray-300'
                }`}
              >
                {item.name}
                <div className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-gold-gradient transition-all duration-300 ${
                  isActive(item.href) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}></div>
              </Link>
            ))}
          </nav>

          {/* Desktop Language Switcher */}
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-300 hover:text-gold-400 hover:bg-luxury-charcoal/50 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-gold-500/20 bg-gradient-to-br from-luxury-charcoal to-luxury-dark rounded-b-lg">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-base font-medium transition-colors hover:text-gold-400 px-4 py-2 rounded-lg ${
                    isActive(item.href) ? 'text-gold-400 bg-gold-500/10' : 'text-gray-300'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gold-500/20 px-4">
                <LanguageSwitcher />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;