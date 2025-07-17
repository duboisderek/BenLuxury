import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, Check, Crown, Clock, Globe, Shield } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../utils/supabase';
import LoadingSpinner from '../components/common/LoadingSpinner';
import type { Project } from '../types';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();
  const [searchParams] = useSearchParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    language: language,
    project_selected: searchParams.get('project') || '',
    message: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('id, project_name, slug')
        .order('project_name');

      if (error) {
        console.error('Error fetching projects:', error);
        setProjects(getMockProjects());
      } else {
        setProjects(data || []);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects(getMockProjects());
    }
  };

  const getMockProjects = () => [
    { id: '1', project_name: 'David Residence', slug: 'david-residence' },
    { id: '2', project_name: 'Tel Aviv Riviera', slug: 'tel-aviv-riviera' },
    { id: '3', project_name: 'Haifa Bay Tower', slug: 'haifa-bay-tower' },
    { id: '4', project_name: 'Ashdod Luxe Garden', slug: 'ashdod-luxe-garden' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase
        .from('clients')
        .insert([{
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          language: formData.language,
          project_selected: formData.project_selected,
          message: formData.message,
          status: 'new'
        }]);

      if (error) {
        throw error;
      }

      setSuccess(true);
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        language: language,
        project_selected: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(t('form_error'));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      primary: 'info@benluxuryagency.com',
      secondary: 'sales@benluxuryagency.com',
      description: 'Get detailed information about our luxury properties'
    },
    {
      icon: Phone,
      title: 'Call Us',
      primary: '+972 3 123 4567',
      secondary: '+972 50 123 4567',
      description: '24/7 luxury concierge service available'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      primary: '123 Rothschild Boulevard',
      secondary: 'Tel Aviv, Israel 6578901',
      description: 'Private showroom by appointment only'
    }
  ];

  const services = [
    {
      icon: Crown,
      title: 'VIP Service',
      description: 'Exclusive access to off-market properties'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'International client support in 4 languages'
    },
    {
      icon: Shield,
      title: 'Secure Investment',
      description: 'Full legal and financial protection'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock luxury concierge'
    }
  ];

  if (success) {
    return (
      <div className="min-h-screen bg-luxury-dark flex items-center justify-center">
        <div className="max-w-md w-full mx-auto">
          <div className="bg-gradient-to-br from-luxury-charcoal to-luxury-dark rounded-2xl shadow-luxury p-8 text-center border border-gold-500/20">
            <div className="w-20 h-20 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-6 animate-glow">
              <Check className="h-10 w-10 text-luxury-dark" />
            </div>
            <h2 className="text-3xl font-luxury font-bold text-white mb-4">Thank You!</h2>
            <p className="text-gray-300 mb-8 leading-relaxed">{t('form_success')}</p>
            <button
              onClick={() => setSuccess(false)}
              className="w-full bg-gold-gradient text-luxury-dark rounded-lg py-3 px-4 font-bold hover:shadow-gold transition-all transform hover:scale-105"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-dark">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-luxury-dark via-luxury-charcoal to-luxury-dark overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-5"></div>
        <div className="absolute top-20 right-20 w-40 h-40 bg-gold-gradient rounded-full opacity-10 animate-float"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-gold-gradient rounded-full opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center animate-fade-in-up">
            <div className="mb-6">
              <span className="inline-block px-6 py-2 bg-gold-gradient text-luxury-dark font-semibold rounded-full text-sm uppercase tracking-wider animate-glow">
                Luxury Consultation
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-luxury font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300 bg-clip-text text-transparent">
                {t('contact_us')}
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Connect with our team of luxury real estate experts for personalized service and exclusive property access
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-12">
            <div className="animate-fade-in-up">
              <h2 className="text-3xl font-luxury font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
                  Luxury Real Estate Excellence
                </span>
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                Whether you're seeking your dream luxury residence or exploring premium investment opportunities, 
                our dedicated team provides unparalleled expertise in Israel's most exclusive real estate markets.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-luxury-charcoal to-luxury-dark rounded-2xl p-6 hover:shadow-luxury transition-all duration-500 border border-gold-500/20 hover:border-gold-500/40 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gold-gradient rounded-xl flex items-center justify-center flex-shrink-0 group-hover:shadow-gold transition-all">
                      <method.icon className="h-7 w-7 text-luxury-dark" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white mb-2 text-lg group-hover:text-gold-300 transition-colors">
                        {method.title}
                      </h3>
                      <p className="text-gold-400 font-medium mb-1">{method.primary}</p>
                      <p className="text-gray-400 mb-2">{method.secondary}</p>
                      <p className="text-gray-500 text-sm">{method.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-2 gap-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-luxury-charcoal to-luxury-dark rounded-xl p-4 border border-gold-500/20 hover:border-gold-500/40 transition-all duration-300 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-10 h-10 bg-gold-gradient rounded-lg flex items-center justify-center mb-3">
                    <service.icon className="h-5 w-5 text-luxury-dark" />
                  </div>
                  <h4 className="font-bold text-white text-sm mb-1">{service.title}</h4>
                  <p className="text-gray-400 text-xs">{service.description}</p>
                </div>
              ))}
            </div>

            {/* Office Hours */}
            <div className="bg-gradient-to-br from-gold-500/10 to-gold-600/5 rounded-2xl p-6 border border-gold-500/30">
              <h3 className="font-luxury font-bold text-gold-400 mb-4 text-xl">Consultation Hours</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Sunday - Thursday:</span>
                  <span className="font-medium text-white">9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Friday:</span>
                  <span className="font-medium text-white">9:00 AM - 3:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Saturday:</span>
                  <span className="font-medium text-white">By Appointment</span>
                </div>
                <div className="pt-2 border-t border-gold-500/20">
                  <span className="text-gold-400 text-xs">24/7 Emergency Concierge Available</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gradient-to-br from-luxury-charcoal to-luxury-dark rounded-3xl shadow-luxury p-8 border border-gold-500/20 animate-scale-in">
            <div className="mb-8">
              <h2 className="text-3xl font-luxury font-bold text-white mb-4">
                <span className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
                  Private Consultation
                </span>
              </h2>
              <p className="text-gray-400">
                Schedule your exclusive consultation with our luxury real estate specialists
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="full_name" className="block text-sm font-medium text-gold-400 mb-2">
                    {t('form_name')} *
                  </label>
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-luxury-dark border border-gold-500/30 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gold-400 mb-2">
                    {t('form_email')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-luxury-dark border border-gold-500/30 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gold-400 mb-2">
                    {t('form_phone')} *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-luxury-dark border border-gold-500/30 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="language" className="block text-sm font-medium text-gold-400 mb-2">
                    {t('form_language')}
                  </label>
                  <select
                    id="language"
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-luxury-dark border border-gold-500/30 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-white transition-all"
                  >
                    <option value="en">{t('english')}</option>
                    <option value="fr">{t('french')}</option>
                    <option value="he">{t('hebrew')}</option>
                    <option value="ru">{t('russian')}</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="project_selected" className="block text-sm font-medium text-gold-400 mb-2">
                  {t('form_project')}
                </label>
                <select
                  id="project_selected"
                  name="project_selected"
                  value={formData.project_selected}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-luxury-dark border border-gold-500/30 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-white transition-all"
                >
                  <option value="">Select a luxury project</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.slug}>
                      {project.project_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gold-400 mb-2">
                  {t('form_message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-luxury-dark border border-gold-500/30 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-white placeholder-gray-500 transition-all resize-none"
                  placeholder="Tell us about your luxury property requirements..."
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gold-gradient text-luxury-dark py-4 px-6 rounded-lg font-bold text-lg hover:shadow-gold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <>
                    <Send className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {t('form_submit')}
                  </>
                )}
              </button>

              <p className="text-center text-gray-500 text-sm">
                By submitting this form, you agree to our privacy policy and terms of service.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;