import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Star, Crown, Gem, Shield, TrendingUp, Globe, Phone } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { useLanguage } from '../context/LanguageContext';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=1920',
      title: 'Luxury Living Redefined',
      subtitle: 'Exclusive off-plan properties in Israel\'s most prestigious locations'
    },
    {
      image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=1920',
      title: 'Investment Excellence',
      subtitle: 'Premium real estate opportunities with guaranteed returns'
    },
    {
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1920',
      title: 'Architectural Masterpieces',
      subtitle: 'Where modern design meets timeless elegance'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const features = [
    {
      icon: Crown,
      title: 'נכסים בלעדיים',
      description: 'פרויקטי יוקרה נבחרים במיקומים היוקרתיים ביותר בישראל',
      color: 'from-gold-400 to-gold-600'
    },
    {
      icon: Gem,
      title: 'מיקומים מובחרים',
      description: 'נדל״ן יוקרתי בירושלים, תל אביב, חיפה ואזורי יוקרה מתפתחים',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: Shield,
      title: 'השקעה בטוחה',
      description: 'תשואה מובטחת עם הגנה משפטית ופיננסית מקיפה',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: TrendingUp,
      title: 'מובילות בשוק',
      description: 'מעל 15 שנות מצוינות בפיתוח נדל״ן יוקרה',
      color: 'from-green-400 to-green-600'
    }
  ];

  const stats = [
    { number: '500+', label: 'נכסי יוקרה נמכרו', icon: Building2 },
    { number: '98%', label: 'שביעות רצון לקוחות', icon: Star },
    { number: '15+', label: 'שנות מצוינות', icon: 'Award' },
    { number: '50+', label: 'מדינות בשירות', icon: Globe }
  ];

  const testimonials = [
    {
      name: 'דוד גולדשטיין',
      role: 'משקיע נדל״ן',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      quote: 'בן לוקסורי אג׳נסי עברו את כל הציפיות. התשואות על ההשקעה היו יוצאות דופן.',
      rating: 5
    },
    {
      name: 'שרה כהן',
      role: 'בעלת נכס',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      quote: 'שירות מקצועי מתחילת הדרך ועד הסוף. הם הפכו את בית החלומות שלנו למציאות.',
      rating: 5
    },
    {
      name: 'מיכאל לוי',
      role: 'קונה בינלאומי',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
      quote: 'התמיכה הרב-לשונית והמומחיות הפכו את כל התהליך לחלק ופשוט.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-luxury-dark">
      {/* Hero Section with Slider */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
            </div>
          ))}
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-gold-gradient rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-40 left-10 w-24 h-24 bg-gold-gradient rounded-full opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-4xl animate-fade-in-up">
              <div className="mb-6">
                <span className="inline-block px-6 py-2 bg-gold-gradient text-luxury-dark font-semibold rounded-full text-sm uppercase tracking-wider animate-glow">
                  Luxury Real Estate Excellence
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-luxury font-bold text-white mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white via-gold-300 to-white bg-clip-text text-transparent">
                  {heroSlides[currentSlide].title}
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl leading-relaxed">
                {heroSlides[currentSlide].subtitle}
              </p>
              
              <p className="text-lg mb-10 text-gray-300 max-w-3xl leading-relaxed">
                {t('home_description')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Link
                  to="/projects"
                  className="group relative inline-flex items-center px-8 py-4 bg-gold-gradient text-luxury-dark rounded-lg font-bold text-lg hover:shadow-gold transition-all duration-300 transform hover:scale-105 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 animate-shimmer"></div>
                  {t('see_projects')}
                  <ArrowRight className={`h-5 w-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'} group-hover:translate-x-1 transition-transform`} />
                </Link>
                
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 border-2 border-gold-500 text-gold-400 rounded-lg font-bold text-lg hover:bg-gold-500 hover:text-luxury-dark transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
                >
                  <Phone className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {t('contact_us')}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-gold-500 w-8' : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-luxury-charcoal to-luxury-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group animate-scale-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full mb-4 group-hover:shadow-gold transition-all duration-300 transform group-hover:scale-110">
                  {/* @ts-expect-error icon union */}
                  <stat.icon className="h-10 w-10 text-luxury-dark" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gold-400 mb-2 font-luxury">
                  {stat.number}
                </div>
                <div className="text-gray-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-luxury-dark relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="text-4xl md:text-6xl font-luxury font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300 bg-clip-text text-transparent">
                Why Choose Excellence?
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Experience unparalleled luxury and investment opportunities with Israel's premier real estate agency
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-luxury-charcoal to-luxury-dark rounded-2xl p-8 hover:shadow-luxury transition-all duration-500 transform hover:-translate-y-2 animate-scale-in border border-gold-500/20 hover:border-gold-500/40"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl mb-6 group-hover:shadow-gold transition-all duration-300 transform group-hover:scale-110 relative z-10`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4 relative z-10 group-hover:text-gold-300 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed relative z-10 group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-luxury-charcoal via-luxury-dark to-luxury-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-luxury font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300 bg-clip-text text-transparent">
                Client Excellence Stories
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover why discerning clients choose BenLuxuryAgency for their luxury real estate investments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-luxury-charcoal to-luxury-dark rounded-2xl p-8 hover:shadow-luxury transition-all duration-500 transform hover:-translate-y-2 border border-gold-500/20 hover:border-gold-500/40 animate-scale-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gold-500 mr-4"
                  />
                  <div>
                    <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-gold-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-gold-500 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-300 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-10"></div>
        <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-luxury font-bold text-luxury-dark mb-6 animate-fade-in-up">
            Ready to Own Luxury?
          </h2>
          <p className="text-xl mb-10 text-luxury-dark/80 max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
            Discover our exclusive collection of off-plan luxury properties in Israel's most prestigious locations
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-scale-in">
            <Link
              to="/projects"
              className="group inline-flex items-center px-10 py-4 bg-luxury-dark text-gold-400 rounded-lg font-bold text-lg hover:bg-luxury-charcoal transition-all duration-300 transform hover:scale-105 shadow-3d hover:shadow-luxury"
            >
              <Building2 className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t('see_projects')}
              <ArrowRight className={`h-5 w-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'} group-hover:translate-x-1 transition-transform`} />
            </Link>
            
            <Link
              to="/contact"
              className="inline-flex items-center px-10 py-4 border-2 border-luxury-dark text-luxury-dark rounded-lg font-bold text-lg hover:bg-luxury-dark hover:text-gold-400 transition-all duration-300 transform hover:scale-105"
            >
              <Phone className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;