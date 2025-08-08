import React from 'react';
import { Mail, Phone, MapPin, Crown, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <footer className="bg-gradient-to-br from-luxury-dark via-luxury-charcoal to-luxury-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-pattern opacity-5"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient"></div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-gold-gradient rounded-full opacity-10 animate-float"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-gold-gradient rounded-full opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gold-gradient rounded-lg blur-sm opacity-50"></div>
                <div className="relative bg-gradient-to-br from-gold-400 to-gold-600 p-3 rounded-lg">
                  <Crown className="h-10 w-10 text-luxury-dark" />
                </div>
              </div>
              <div>
                <span className="text-3xl font-luxury font-bold bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300 bg-clip-text text-transparent">
                  BenLuxury
                </span>
                <div className="text-sm text-gold-400/80 font-elegant tracking-wider">
                  AGENCY
                </div>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              {t('home_subtitle')} - Your gateway to exclusive luxury real estate investments in Israel's most prestigious locations.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center group-hover:shadow-gold transition-all">
                  <Mail className="h-5 w-5 text-luxury-dark" />
                </div>
                <div>
                  <span className="text-gray-300 hover:text-gold-400 transition-colors">info@benluxuryagency.com</span>
                  <div className="text-sm text-gray-500">General Inquiries</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center group-hover:shadow-gold transition-all">
                  <Phone className="h-5 w-5 text-luxury-dark" />
                </div>
                <div>
                  <span className="text-gray-300 hover:text-gold-400 transition-colors">+972 3 123 4567</span>
                  <div className="text-sm text-gray-500">24/7 Luxury Concierge</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center group-hover:shadow-gold transition-all">
                  <MapPin className="h-5 w-5 text-luxury-dark" />
                </div>
                <div>
                  <span className="text-gray-300">123 Rothschild Boulevard</span>
                  <div className="text-sm text-gray-500">Tel Aviv, Israel 6578901</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-luxury font-bold text-gold-400 mb-6 relative">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gold-gradient"></div>
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-300 hover:text-gold-400 transition-colors hover:translate-x-1 transform duration-200 inline-block">
                  {t('home')}
                </a>
              </li>
              <li>
                <a href="/projects" className="text-gray-300 hover:text-gold-400 transition-colors hover:translate-x-1 transform duration-200 inline-block">
                  {t('projects')}
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-gold-400 transition-colors hover:translate-x-1 transform duration-200 inline-block">
                  {t('contact')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gold-400 transition-colors hover:translate-x-1 transform duration-200 inline-block">
                  Investment Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gold-400 transition-colors hover:translate-x-1 transform duration-200 inline-block">
                  Market Reports
                </a>
              </li>
            </ul>
          </div>

          {/* Services & Legal */}
          <div>
            <h3 className="text-xl font-luxury font-bold text-gold-400 mb-6 relative">
              Services
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gold-gradient"></div>
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-gold-400 transition-colors hover:translate-x-1 transform duration-200 inline-block">
                  Luxury Sales
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gold-400 transition-colors hover:translate-x-1 transform duration-200 inline-block">
                  Investment Consulting
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gold-400 transition-colors hover:translate-x-1 transform duration-200 inline-block">
                  Property Management
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gold-400 transition-colors hover:translate-x-1 transform duration-200 inline-block">
                  Legal Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gold-400 transition-colors hover:translate-x-1 transform duration-200 inline-block">
                  {t('footer_privacy')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Newsletter */}
        <div className="border-t border-gold-500/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6">
              <span className="text-gray-400 font-medium">Follow Our Luxury Journey:</span>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-gradient-to-br from-luxury-charcoal to-luxury-dark border border-gold-500/30 rounded-lg flex items-center justify-center text-gray-400 hover:text-gold-400 hover:border-gold-500/60 hover:shadow-gold transition-all duration-300 transform hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">Luxury Real Estate License: #LRE-2024-IL</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gold-500/20 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 BenLuxuryAgency. {t('footer_rights')}. | Crafted with excellence for discerning clients.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;