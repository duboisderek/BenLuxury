import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Building2, Star, Eye, Calendar, Filter } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../utils/supabase';
import LoadingSpinner from '../components/common/LoadingSpinner';
import type { Project } from '../types';

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      // Try to fetch from Supabase, but fallback to mock data if database isn't set up
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          // If table doesn't exist or other database error, use mock data
          console.warn('Database not available, using mock data:', error.message);
          setProjects(getMockProjects());
        } else {
          setProjects(data || getMockProjects());
        }
      } catch (dbError) {
        // Network or connection error, use mock data
        console.warn('Database connection failed, using mock data');
        setProjects(getMockProjects());
      }
    } catch (error) {
      console.warn('Fallback to mock data due to error:', error);
      setProjects(getMockProjects());
    } finally {
      setLoading(false);
    }
  };

  const getMockProjects = (): Project[] => [
    {
      id: '1',
      project_name: 'David Residence',
      city: 'Jerusalem',
      slug: 'david-residence',
      short_description_en: 'Luxury residential complex in the heart of Jerusalem with modern amenities and stunning city views.',
      long_description_en: 'David Residence offers an exceptional living experience in Jerusalem\'s most prestigious neighborhood. This luxury development features modern architecture, premium finishes, and world-class amenities including a rooftop pool, fitness center, and 24/7 concierge service.',
      images: [
        'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200'
      ],
      map_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3381.3!2d35.2137!3d31.7683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDQ2JzA2LjAiTiAzNcKwMTInNDkuMyJF!5e0!3m2!1sen!2sil!4v1234567890123!5m2!1sen!2sil',
      pdf_url: '#',
      units: [],
      created_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      project_name: 'Tel Aviv Riviera',
      city: 'Tel Aviv',
      slug: 'tel-aviv-riviera',
      short_description_en: 'Beachfront luxury apartments with panoramic sea views and direct beach access.',
      long_description_en: 'Tel Aviv Riviera represents the pinnacle of coastal living. Located on Tel Aviv\'s prestigious coastline, this development offers unparalleled luxury with breathtaking Mediterranean views, private beach access, and world-class amenities.',
      images: [
        'https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1200'
      ],
      map_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3379.4!2d34.7818!3d32.0853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDA1JzA3LjEiTiAzNMKwNDYnNTQuNSJF!5e0!3m2!1sen!2sil!4v1234567890123!5m2!1sen!2sil',
      pdf_url: '#',
      units: [],
      created_at: '2024-01-02T00:00:00Z'
    },
    {
      id: '3',
      project_name: 'Haifa Bay Tower',
      city: 'Haifa',
      slug: 'haifa-bay-tower',
      short_description_en: 'Modern high-rise tower with spectacular bay views and premium facilities.',
      long_description_en: 'Haifa Bay Tower stands as a beacon of modern luxury in Israel\'s northern capital. This architectural marvel offers residents unprecedented views of the Mediterranean and Mount Carmel, with premium amenities and sophisticated design.',
      images: [
        'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1200'
      ],
      map_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3353.2!2d34.9896!3d32.7940!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDQ3JzM4LjQiTiAzNMKwNTknMjIuNiJF!5e0!3m2!1sen!2sil!4v1234567890123!5m2!1sen!2sil',
      pdf_url: '#',
      units: [],
      created_at: '2024-01-03T00:00:00Z'
    },
    {
      id: '4',
      project_name: 'Ashdod Luxe Garden',
      city: 'Ashdod',
      slug: 'ashdod-luxe-garden',
      short_description_en: 'Exclusive garden apartments with private outdoor spaces and modern design.',
      long_description_en: 'Ashdod Luxe Garden offers a unique residential experience combining urban convenience with natural tranquility. Each apartment features private gardens and premium amenities in a beautifully landscaped setting.',
      images: [
        'https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/1396118/pexels-photo-1396118.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/1396118/pexels-photo-1396118.jpeg?auto=compress&cs=tinysrgb&w=1200'
      ],
      map_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3392.8!2d34.6496!3d31.7943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDQ3JzM5LjUiTiAzNMKwMzgnNTguNiJF!5e0!3m2!1sen!2sil!4v1234567890123!5m2!1sen!2sil',
      pdf_url: '#',
      units: [],
      created_at: '2024-01-04T00:00:00Z'
    }
  ];

  const cities = ['all', ...Array.from(new Set(projects.map(p => p.city)))];
  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.city === filter);

  if (loading) {
    return (
      <div className="min-h-screen bg-luxury-dark flex items-center justify-center">
        <LoadingSpinner text={t('loading')} />
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
                Exclusive Portfolio
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-luxury font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300 bg-clip-text text-transparent">
                Luxury {t('projects')}
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover our exclusive collection of off-plan luxury properties in Israel's most prestigious locations. Each project represents the pinnacle of architectural excellence and investment opportunity.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-gradient-to-r from-luxury-charcoal to-luxury-dark border-y border-gold-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Filter className="h-5 w-5 text-gold-400" />
              <span className="text-gray-300 font-medium">Filter by Location:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => setFilter(city)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                    filter === city
                      ? 'bg-gold-gradient text-luxury-dark shadow-gold'
                      : 'bg-luxury-charcoal text-gray-300 border border-gold-500/30 hover:border-gold-500/60 hover:text-gold-400'
                  }`}
                >
                  {city === 'all' ? 'All Cities' : city}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="group relative bg-gradient-to-br from-luxury-charcoal to-luxury-dark rounded-3xl overflow-hidden hover:shadow-luxury transition-all duration-700 transform hover:-translate-y-2 animate-scale-in border border-gold-500/20 hover:border-gold-500/40"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Image Container */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={project.images[0]}
                    alt={project.project_name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark/80 via-transparent to-transparent"></div>
                  
                  {/* Floating Badge */}
                  <div className="absolute top-6 left-6">
                    <span className="inline-block px-4 py-2 bg-gold-gradient text-luxury-dark font-bold rounded-full text-sm uppercase tracking-wider animate-glow">
                      Off-Plan Exclusive
                    </span>
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="w-10 h-10 bg-luxury-dark/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gold-400 hover:bg-gold-500 hover:text-luxury-dark transition-all">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="w-10 h-10 bg-luxury-dark/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gold-400 hover:bg-gold-500 hover:text-luxury-dark transition-all">
                      <Calendar className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-gold-400">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm font-medium">{project.city}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-gold-500 fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-luxury font-bold text-white mb-4 group-hover:text-gold-300 transition-colors">
                    {project.project_name}
                  </h3>
                  
                  <p className="text-gray-400 mb-6 leading-relaxed line-clamp-3 group-hover:text-gray-300 transition-colors">
                    {project.short_description_en}
                  </p>

                  {/* Features */}
                  <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      Luxury Units
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      Premium Location
                    </span>
                  </div>
                  
                  <Link
                    to={`/projects/${project.slug}`}
                    className="group/link inline-flex items-center text-gold-400 hover:text-gold-300 font-medium text-lg transition-all duration-300"
                  >
                    <span className="relative">
                      {t('learn_more')}
                      <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold-gradient opacity-0 group-hover/link:opacity-100 transition-opacity"></div>
                    </span>
                    <ArrowRight className={`h-5 w-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'} group-hover/link:translate-x-1 transition-transform`} />
                  </Link>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building2 className="h-12 w-12 text-luxury-dark" />
              </div>
              <h3 className="text-2xl font-luxury font-bold text-white mb-4">
                No projects found
              </h3>
              <p className="text-gray-400 mb-6">
                Check back soon for new luxury developments in this location.
              </p>
              <button
                onClick={() => setFilter('all')}
                className="px-6 py-3 bg-gold-gradient text-luxury-dark rounded-lg font-bold hover:shadow-gold transition-all transform hover:scale-105"
              >
                View All Projects
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-luxury font-bold text-luxury-dark mb-6">
            Ready to Invest in Luxury?
          </h2>
          <p className="text-xl mb-8 text-luxury-dark/80 max-w-2xl mx-auto">
            Schedule a private consultation with our luxury real estate experts
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 bg-luxury-dark text-gold-400 rounded-lg font-bold text-lg hover:bg-luxury-charcoal transition-all duration-300 transform hover:scale-105 shadow-3d"
          >
            Schedule Consultation
            <ArrowRight className={`h-5 w-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Projects;