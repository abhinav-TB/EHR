'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

export default function PatientProfile() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/patients/${id}`).then(res => {
        setPatient(res.data);
      });
    }
  }, [id]);

  if (!patient) return <p>Loading...</p>;

  const name = `${patient.name?.[0]?.given?.join(' ')} ${patient.name?.[0]?.family || ''}`;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow text-gray-900">
      <h2 className="text-2xl font-bold mb-4">Patient Profile</h2>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Gender:</strong> {patient.gender}</p>
      <p><strong>Birth Date:</strong> {patient.birthDate}</p>
      <p><strong>ID:</strong> {patient.id}</p>
    </div>
  );
}
