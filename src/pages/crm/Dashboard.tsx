import React, { useState, useEffect } from 'react';
import { Users, Calendar, TrendingUp, Building2, Phone, Mail, Clock, CheckCircle } from 'lucide-react';
import { supabase } from '../../utils/supabase';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import type { Client } from '../../types';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalClients: 0,
    newClients: 0,
    totalAppointments: 0,
    upcomingAppointments: 0
  });
  const [recentClients, setRecentClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch clients
      const { data: clients, error: clientsError } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (clientsError) {
        console.error('Error fetching clients:', clientsError);
        // Use mock data
        const mockClients = getMockClients();
        setRecentClients(mockClients.slice(0, 5));
        setStats({
          totalClients: mockClients.length,
          newClients: mockClients.filter(c => c.status === 'new').length,
          totalAppointments: 8,
          upcomingAppointments: 3
        });
      } else {
        const clientData = clients || [];
        setRecentClients(clientData.slice(0, 5));
        
        // Calculate stats
        const today = new Date();
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        
        setStats({
          totalClients: clientData.length,
          newClients: clientData.filter(c => c.status === 'new').length,
          totalAppointments: 8, // Would fetch from appointments table
          upcomingAppointments: 3 // Would fetch from appointments table
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Use mock data
      const mockClients = getMockClients();
      setRecentClients(mockClients.slice(0, 5));
      setStats({
        totalClients: mockClients.length,
        newClients: mockClients.filter(c => c.status === 'new').length,
        totalAppointments: 8,
        upcomingAppointments: 3
      });
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
      message: 'Interested in a 3-bedroom apartment',
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
      message: 'Looking for beachfront property',
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
      message: 'Interested in investment opportunity',
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
      message: 'Looking for family home',
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
      message: 'Interested in luxury apartment',
      status: 'sold',
      created_at: '2024-01-11T11:30:00Z'
    }
  ];

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
        <LoadingSpinner text="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your leads.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Clients</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalClients}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">New Leads</p>
              <p className="text-2xl font-bold text-gray-900">{stats.newClients}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Appointments</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalAppointments}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming Appointments</p>
              <p className="text-2xl font-bold text-gray-900">{stats.upcomingAppointments}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Clients */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Clients</h2>
        </div>
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
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">
                        {client.full_name}
                      </div>
                      <span className="ml-2 text-lg">
                        {getLanguageFlag(client.language)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {client.email}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Phone className="h-4 w-4" />
                        {client.phone}
                      </div>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="font-medium">View All Clients</span>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-green-600" />
                <span className="font-medium">Schedule Appointment</span>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-purple-600" />
                <span className="font-medium">Manage Projects</span>
              </div>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">New client inquiry</p>
                <p className="text-xs text-gray-500">John Doe interested in David Residence</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Appointment completed</p>
                <p className="text-xs text-gray-500">Meeting with Marie Dupont finished</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Appointment scheduled</p>
                <p className="text-xs text-gray-500">Tomorrow at 2:00 PM with David Cohen</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;