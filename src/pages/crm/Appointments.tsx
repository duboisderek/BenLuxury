import React, { useEffect, useMemo, useState } from 'react';
import { Calendar, Plus, Search } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../utils/supabase';

interface AppointmentItem {
  id: string;
  client_id: string;
  title?: string; // not in DB; derived from client/project context
  date: string; // ISO date
  time: string; // HH:mm:ss or HH:mm
  type: string;
  client: string;
  location: string;
  notes?: string;
}

const Appointments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<AppointmentItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!isSupabaseConfigured) {
          setItems(getMockAppointments());
          return;
        }

        const { data: appts, error } = await supabase
          .from('appointments')
          .select('*')
          .order('date', { ascending: true });
        if (error) throw error;

        const clientIds = Array.from(new Set((appts || []).map(a => a.client_id)));
        let clientMap: Record<string, string> = {};
        if (clientIds.length > 0) {
          const { data: clients, error: clientsError } = await supabase
            .from('clients')
            .select('id, full_name')
            .in('id', clientIds);
          if (clientsError) throw clientsError;
          clientMap = Object.fromEntries((clients || []).map(c => [c.id, c.full_name]));
        }

        const normalized: AppointmentItem[] = (appts || []).map(a => ({
          id: a.id,
          client_id: a.client_id,
          date: a.date,
          time: a.time,
          type: a.type,
          client: clientMap[a.client_id] || 'Unknown',
          location: a.location || '',
          notes: a.notes || '',
          title: `${a.type === 'in_person' ? 'Meeting' : a.type === 'zoom' ? 'Zoom' : 'Call'} with ${clientMap[a.client_id] || 'Client'}`,
        }));
        setItems(normalized);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Failed to load appointments, using mock', e);
        setItems(getMockAppointments());
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    const t = searchTerm.toLowerCase();
    return items.filter((a) =>
      [a.title || '', a.client, a.location, a.type].some((v) => v.toLowerCase().includes(t))
    );
  }, [items, searchTerm]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600 mt-2">Manage upcoming client meetings and visits</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          New Appointment
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr><td className="px-6 py-6" colSpan={6}>Loading...</td></tr>
            ) : filtered.length > 0 ? (
              filtered.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded">
                        <Calendar className="h-4 w-4" />
                      </span>
                      {a.title || `${a.type} with ${a.client}`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{a.client}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">{a.type.replace('_', ' ')}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{new Date(a.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{a.time?.slice(0,5)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{a.location}</td>
                </tr>
              ))
            ) : (
              <tr><td className="px-6 py-6 text-center text-gray-500" colSpan={6}>No appointments found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function getMockAppointments(): AppointmentItem[] {
  return [
    { id: '1', client_id: 'c1', title: 'Consultation - David Residence', date: '2024-08-10', time: '14:00', type: 'in_person', client: 'John Doe', location: 'Tel Aviv Office' },
    { id: '2', client_id: 'c2', title: 'Site Visit - Tel Aviv Riviera', date: '2024-08-12', time: '10:30', type: 'in_person', client: 'Marie Dupont', location: 'Beachfront Lobby' },
    { id: '3', client_id: 'c3', title: 'Zoom Call - Investment Review', date: '2024-08-13', time: '18:00', type: 'zoom', client: 'David Cohen', location: 'Online' },
  ];
}

export default Appointments;