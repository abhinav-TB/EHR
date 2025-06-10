'use client';

import { useState } from 'react';
import PatientList from '../components/PatientList';
import axios from 'axios';

export default function HomePage() {
  const [patients, setPatients] = useState([]);
  const [query, setQuery] = useState('');

  const searchPatients = async () => {
    const res = await axios.get(`http://localhost:8000/patients`, {
      params: { name: query },
    });
    setPatients(res.data.entry || []);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg text-gray-900">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">🔍</span>
          <h1 className="text-2xl font-bold text-gray-800">Search Patients</h1>
        </div>

        <div className="flex gap-2 mb-6 text-gray-900">
          <input
            className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Enter patient name"
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={searchPatients}
          >
            Search
          </button>
        </div>

        <PatientList patients={patients} />
      </div>
    </div>
  );
}
