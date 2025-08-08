import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Download, Eye, ArrowLeft, Phone, Mail } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../utils/supabase';
import LoadingSpinner from '../components/common/LoadingSpinner';
import type { Project, Unit } from '../types';

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (slug) {
      fetchProject();
    }
  }, [slug]);

  const fetchProject = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        console.error('Error fetching project:', error);
        // Fallback to mock data
        setProject(getMockProject());
      } else {
        setProject(data);
      }
    } catch (error) {
      console.error('Error fetching project:', error);
      // Fallback to mock data
      setProject(getMockProject());
    } finally {
      setLoading(false);
    }
  };

  const getMockProject = (): Project => {
    const mockProjects = {
      'david-residence': {
        id: '1',
        project_name: 'David Residence',
        city: 'Jerusalem',
        slug: 'david-residence',
        short_description_en: 'Luxury residential complex in the heart of Jerusalem with modern amenities and stunning city views.',
        long_description_en: 'David Residence offers an exceptional living experience in Jerusalem\'s most prestigious neighborhood. This luxury development features modern architecture, premium finishes, and world-class amenities including a rooftop pool, fitness center, and 24/7 concierge service. Located in the prestigious Talbiya neighborhood, walking distance from Mamilla and the Old City.',
        images: [
          'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200',
          'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200',
          'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200',
          'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
          'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=1200',
          'https://images.pexels.com/photos/1396118/pexels-photo-1396118.jpeg?auto=compress&cs=tinysrgb&w=1200'
        ],
        map_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3381.3!2d35.2137!3d31.7683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDQ2JzA2LjAiTiAzNcKwMTInNDkuMyJF!5e0!3m2!1sen!2sil!4v1234567890123!5m2!1sen!2sil',
        pdf_url: '#',
        units: generateMockUnits(12),
        created_at: '2024-01-01T00:00:00Z'
      },
      'tel-aviv-riviera': {
        id: '2',
        project_name: 'Tel Aviv Riviera',
        city: 'Tel Aviv',
        slug: 'tel-aviv-riviera',
        short_description_en: 'Beachfront luxury apartments with panoramic sea views and direct beach access.',
        long_description_en: 'Tel Aviv Riviera represents the pinnacle of coastal living. Located on Tel Aviv\'s prestigious coastline, this development offers unparalleled luxury with breathtaking Mediterranean views, private beach access, and world-class amenities including a private beach club, infinity pool, advanced fitness center, and luxury spa.',
        images: [
          'https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=1200',
          'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1200',
          'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1200',
          'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=1200',
          'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=1200',
          'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1200'
        ],
        map_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3379.4!2d34.7818!3d32.0853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDA1JzA3LjEiTiAzNMKwNDYnNTQuNSJF!5e0!3m2!1sen!2sil!4v1234567890123!5m2!1sen!2sil',
        pdf_url: '#',
        units: generateMockUnits(20),
        created_at: '2024-01-02T00:00:00Z'
      },
      'haifa-bay-tower': {
        id: '3',
        project_name: 'Haifa Bay Tower',
        city: 'Haifa',
        slug: 'haifa-bay-tower',
        short_description_en: 'Modern high-rise tower with spectacular bay views and premium facilities.',
        long_description_en: 'Haifa Bay Tower stands as a beacon of modern luxury in Israel\'s northern capital. This architectural marvel offers residents unprecedented views of the Mediterranean and Mount Carmel, with premium amenities and sophisticated design including an elegant Italian-designed lobby, rooftop pool with 360-degree views, advanced fitness center, and underground parking with automated system.',
        images: [
          'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=1200',
          'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1200',
          'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1200',
          'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1200',
          'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=1200',
          'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200'
        ],
        map_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3353.2!2d34.9896!3d32.7940!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDQ3JzM4LjQiTiAzNMKwNTknMjIuNiJF!5e0!3m2!1sen!2sil!4v1234567890123!5m2!1sen!2sil',
        pdf_url: '#',
        units: generateMockUnits(15),
        created_at: '2024-01-03T00:00:00Z'
      },
      'ashdod-luxe-garden': {
        id: '4',
        project_name: 'Ashdod Luxe Garden',
        city: 'Ashdod',
        slug: 'ashdod-luxe-garden',
        short_description_en: 'Exclusive garden apartments with private outdoor spaces and modern design.',
        long_description_en: 'Ashdod Luxe Garden offers a unique residential experience combining urban convenience with natural tranquility. Each apartment features private gardens and premium amenities in a beautifully landscaped setting including a central park spanning 5 dunams, Olympic swimming pool, professional tennis courts, and luxury residents\' club with library and meeting rooms.',
        images: [
          'https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=1200',
          'https://images.pexels.com/photos/1396118/pexels-photo-1396118.jpeg?auto=compress&cs=tinysrgb&w=1200',
          'https://images.pexels.com/photos/1396118/pexels-photo-1396118.jpeg?auto=compress&cs=tinysrgb&w=1200',
          'https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg?auto=compress&cs=tinysrgb&w=1200',
          'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=1200',
          'https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=1200'
        ],
        map_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3392.8!2d34.6496!3d31.7943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDQ3JzM5LjUiTiAzNMKwMzgnNTguNiJF!5e0!3m2!1sen!2sil!4v1234567890123!5m2!1sen!2sil',
        pdf_url: '#',
        units: generateMockUnits(18),
        created_at: '2024-01-04T00:00:00Z'
      }
    };

    return mockProjects[slug as keyof typeof mockProjects] || mockProjects['david-residence'];
  };

  const generateMockUnits = (count: number): Unit[] => {
    const units: Unit[] = [];
    const statuses: ('available' | 'reserved' | 'sold')[] = ['available', 'reserved', 'sold'];
    
    for (let i = 1; i <= count; i++) {
      units.push({
        id: `unit-${i}`,
        unit_number: `${i}`,
        floor: Math.floor((i - 1) / 4) + 1,
        surface: Math.floor(Math.random() * 100) + 50,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        price: Math.floor(Math.random() * 1000000) + 500000
      });
    }
    
    return units;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'reserved': return 'bg-yellow-100 text-yellow-800';
      case 'sold': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner text={t('loading')} />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Project not found</h2>
          <Link to="/projects" className="text-blue-600 hover:text-blue-700">
            Back to projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/projects"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className={`h-4 w-4 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
            {t('back_to_projects')}
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img
                src={project.images[selectedImage]}
                alt={project.project_name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-6 gap-2">
              {project.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${project.project_name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Project Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <MapPin className="h-5 w-5" />
                <span className="font-medium">{project.city}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {project.project_name}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {project.long_description_en}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4">
              <a
                href={project.pdf_url}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t('download_brochure')}
              </a>
              <button className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Eye className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t('virtual_tour')}
              </button>
            </div>

            {/* Contact CTA */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('interested_project')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('contact_cta')}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to={`/contact?project=${project.slug}`}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Mail className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {t('contact_us')}
                </Link>
                <a
                  href="tel:+972312345678"
                  className="inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <Phone className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {t('call_now')}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('location')}</h2>
          <div className="h-96 rounded-lg overflow-hidden">
            <iframe
              src={project.map_embed_url}
              className="w-full h-full"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Units Table */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t('unit_table_title')}
          </h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('unit_number')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('floor')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('surface')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('status')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('price')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {project.units.map((unit) => (
                    <tr key={unit.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {unit.unit_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {unit.floor}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {unit.surface}m²
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(unit.status)}`}>
                          {t(unit.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {unit.price ? `$${unit.price.toLocaleString()}` : 'Contact us'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;