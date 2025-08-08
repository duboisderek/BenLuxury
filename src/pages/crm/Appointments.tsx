import React, { useState } from 'react';
import { Calendar, Plus, Search } from 'lucide-react';

interface AppointmentItem {
  id: string;
  title: string;
  date: string; // ISO date
  time: string; // HH:mm
  client: string;
  location: string;
}

const Appointments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Placeholder data; backend integration can replace this
  const appointments: AppointmentItem[] = [
    { id: '1', title: 'Consultation - David Residence', date: '2024-08-10', time: '14:00', client: 'John Doe', location: 'Tel Aviv Office' },
    { id: '2', title: 'Site Visit - Tel Aviv Riviera', date: '2024-08-12', time: '10:30', client: 'Marie Dupont', location: 'Beachfront Lobby' },
    { id: '3', title: 'Zoom Call - Investment Review', date: '2024-08-13', time: '18:00', client: 'David Cohen', location: 'Zoom' },
  ];

  const filtered = appointments.filter((a) =>
    [a.title, a.client, a.location].some((v) => v.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.map((a) => (
              <tr key={a.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded">
                      <Calendar className="h-4 w-4" />
                    </span>
                    {a.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{a.client}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{new Date(a.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{a.time}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{a.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="p-6 text-center text-gray-500">No appointments found.</div>
        )}
      </div>
    </div>
  );
};

export default Appointments;