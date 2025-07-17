import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { supabase } from '../../utils/supabase';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import type { Client } from '../../types';

const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [languageFilter, setLanguageFilter] = useState('all');

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    filterClients();
  }, [clients, searchTerm, statusFilter, languageFilter]);

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching clients:', error);
        // Use mock data
        setClients(getMockClients());
      } else {
        setClients(data || []);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
      // Use mock data
      setClients(getMockClients());
    } finally {
      setLoading(false);
    }
  };

  const getMockClients = (): Client[] => [
    {
      id: '1',
      full_name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      language: 'en',
      project_selected: 'david-residence',
      message: 'Interested in a 3-bedroom apartment with good views. Looking for move-in ready property.',
      status: 'new',
      created_at: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      full_name: 'Marie Dupont',
      email: 'marie@example.com',
      phone: '+33123456789',
      language: 'fr',
      project_selected: 'tel-aviv-riviera',
      message: 'Looking for beachfront property for investment purposes. Budget up to 2M.',
      status: 'contacted',
      created_at: '2024-01-14T14:20:00Z'
    },
    {
      id: '3',
      full_name: 'David Cohen',
      email: 'david@example.com',
      phone: '+972501234567',
      language: 'he',
      project_selected: 'haifa-bay-tower',
      message: 'Interested in investment opportunity. Please send detailed financial projections.',
      status: 'in_progress',
      created_at: '2024-01-13T09:15:00Z'
    },
    {
      id: '4',
      full_name: 'Anna Volkov',
      email: 'anna@example.com',
      phone: '+79123456789',
      language: 'ru',
      project_selected: 'ashdod-luxe-garden',
      message: 'Looking for family home with garden. Need 4 bedrooms minimum.',
      status: 'new',
      created_at: '2024-01-12T16:45:00Z'
    },
    {
      id: '5',
      full_name: 'Michael Brown',
      email: 'michael@example.com',
      phone: '+44123456789',
      language: 'en',
      project_selected: 'david-residence',
      message: 'Interested in luxury apartment in central location. Cash buyer.',
      status: 'sold',
      created_at: '2024-01-11T11:30:00Z'
    },
    {
      id: '6',
      full_name: 'Sophie Martin',
      email: 'sophie@example.com',
      phone: '+33987654321',
      language: 'fr',
      project_selected: 'tel-aviv-riviera',
      message: 'Looking for vacation home by the sea. Flexible on timing.',
      status: 'contacted',
      created_at: '2024-01-10T13:20:00Z'
    },
    {
      id: '7',
      full_name: 'Ahmed Hassan',
      email: 'ahmed@example.com',
      phone: '+971501234567',
      language: 'en',
      project_selected: 'haifa-bay-tower',
      message: 'Business investor seeking high-yield properties. Open to multiple units.',
      status: 'in_progress',
      created_at: '2024-01-09T08:45:00Z'
    },
    {
      id: '8',
      full_name: 'Elena Petrov',
      email: 'elena@example.com',
      phone: '+79876543210',
      language: 'ru',
      project_selected: 'ashdod-luxe-garden',
      message: 'Relocating to Israel for work. Need family-friendly neighborhood.',
      status: 'not_interested',
      created_at: '2024-01-08T15:30:00Z'
    }
  ];

  const filterClients = () => {
    let filtered = clients;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(client =>
        client.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.includes(searchTerm)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(client => client.status === statusFilter);
    }

    // Language filter
    if (languageFilter !== 'all') {
      filtered = filtered.filter(client => client.language === languageFilter);
    }

    setFilteredClients(filtered);
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Language', 'Project', 'Status', 'Message', 'Created'];
    const csvData = filteredClients.map(client => [
      client.full_name,
      client.email,
      client.phone,
      client.language,
      client.project_selected || '',
      client.status,
      client.message,
      new Date(client.created_at).toLocaleString()
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `clients_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-purple-100 text-purple-800';
      case 'sold': return 'bg-green-100 text-green-800';
      case 'not_interested': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'New';
      case 'contacted': return 'Contacted';
      case 'in_progress': return 'In Progress';
      case 'sold': return 'Sold';
      case 'not_interested': return 'Not Interested';
      default: return status;
    }
  };

  const getLanguageFlag = (language: string) => {
    switch (language) {
      case 'en': return '🇺🇸';
      case 'fr': return '🇫🇷';
      case 'he': return '🇮🇱';
      case 'ru': return '🇷🇺';
      default: return '🌐';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner text="Loading clients..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600 mt-2">Manage your client leads and inquiries</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={exportToCSV}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="in_progress">In Progress</option>
              <option value="sold">Sold</option>
              <option value="not_interested">Not Interested</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Languages</option>
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="he">Hebrew</option>
              <option value="ru">Russian</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setLanguageFilter('all');
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="bg-white rounded-lg shadow p-4">
        <p className="text-sm text-gray-600">
          Showing {filteredClients.length} of {clients.length} clients
        </p>
      </div>

      {/* Clients Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-medium text-gray-900">
                            {client.full_name}
                          </div>
                          <span className="text-lg">
                            {getLanguageFlag(client.language)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div>{client.email}</div>
                      <div className="text-gray-500">{client.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.project_selected || 'Not specified'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(client.status)}`}>
                      {getStatusText(client.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(client.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-900 p-1 rounded">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 p-1 rounded">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 p-1 rounded">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              No clients found matching your criteria.
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setLanguageFilter('all');
              }}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Clients;