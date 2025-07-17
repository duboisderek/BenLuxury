import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, MapPin, Award, Users } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { useLanguage } from '../context/LanguageContext';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const features = [
    {
      icon: Building2,
      title: 'Premium Projects',
      description: 'Exclusive off-plan properties in prime locations across Israel'
    },
    {
      icon: MapPin,
      title: 'Prime Locations',
      description: 'Strategic locations in Jerusalem, Tel Aviv, Haifa, and Ashdod'
    },
    {
      icon: Award,
      title: 'Expert Service',
      description: 'Professional guidance throughout your real estate journey'
    },
    {
      icon: Users,
      title: 'Trusted Partner',
      description: 'Years of experience in luxury real estate market'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t('home_title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              {t('home_subtitle')}
            </p>
            <p className="text-lg mb-8 text-blue-50 max-w-2xl">
              {t('home_description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors group"
              >
                {t('see_projects')}
                <ArrowRight className={`h-5 w-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'} group-hover:translate-x-1 transition-transform`} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                {t('contact_us')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose BenLuxuryAgency?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your trusted partner in luxury real estate investments across Israel
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-lg mb-4 group-hover:bg-blue-600 transition-colors">
                  <feature.icon className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Explore our exclusive collection of luxury properties in Israel
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors group"
          >
            {t('see_projects')}
            <ArrowRight className={`h-5 w-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'} group-hover:translate-x-1 transition-transform`} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;