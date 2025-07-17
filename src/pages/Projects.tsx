import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Building2 } from 'lucide-react';
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

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
        // Fallback to mock data
        setProjects(getMockProjects());
      } else {
        setProjects(data || []);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Fallback to mock data
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
      long_description_en: 'David Residence offers an exceptional living experience in Jerusalem\'s most prestigious neighborhood. This luxury development features modern architecture, premium finishes, and world-class amenities.',
      images: [
        'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'
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
      long_description_en: 'Tel Aviv Riviera represents the pinnacle of coastal living. Located on Tel Aviv\'s prestigious coastline, this development offers unparalleled luxury with breathtaking Mediterranean views.',
      images: [
        'https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800'
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
      long_description_en: 'Haifa Bay Tower stands as a beacon of modern luxury in Israel\'s northern capital. This architectural marvel offers residents unprecedented views of the Mediterranean and Mount Carmel.',
      images: [
        'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800'
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
      long_description_en: 'Ashdod Luxe Garden offers a unique residential experience combining urban convenience with natural tranquility. Each apartment features private gardens and premium amenities.',
      images: [
        'https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1396118/pexels-photo-1396118.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      map_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3392.8!2d34.6496!3d31.7943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDQ3JzM5LjUiTiAzNMKwMzgnNTguNiJF!5e0!3m2!1sen!2sil!4v1234567890123!5m2!1sen!2sil',
      pdf_url: '#',
      units: [],
      created_at: '2024-01-04T00:00:00Z'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner text={t('loading')} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('projects')}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our exclusive collection of luxury off-plan properties across Israel
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.images[0]}
                    alt={project.project_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 text-blue-600 mb-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm font-medium">{project.city}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {project.project_name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {project.short_description_en}
                  </p>
                  
                  <Link
                    to={`/projects/${project.slug}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group-hover:gap-2 transition-all"
                  >
                    {t('learn_more')}
                    <ArrowRight className={`h-4 w-4 ${isRTL ? 'mr-1 rotate-180' : 'ml-1'} transition-transform`} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {projects.length === 0 && (
            <div className="text-center py-16">
              <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No projects found
              </h3>
              <p className="text-gray-600">
                Check back soon for new luxury developments.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;