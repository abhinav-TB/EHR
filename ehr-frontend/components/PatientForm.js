'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function PatientForm({ existingPatient = null }) {
  const [firstName, setFirstName] = useState(existingPatient?.name?.[0]?.given?.[0] || '');
  const [lastName, setLastName] = useState(existingPatient?.name?.[0]?.family || '');
  const [gender, setGender] = useState(existingPatient?.gender || '');
  const [birthDate, setBirthDate] = useState(existingPatient?.birthDate || '');
  const router = useRouter();

  const handleSubmit = async () => {
    const patientData = {
      resourceType: "Patient",
      name: [{ given: [firstName], family: lastName }],
      gender,
      birthDate
    };

 if (existingPatient?.id) {
  await axios.put(`http://localhost:8000/patients/${existingPatient.id}`, {
    ...patientData,
    id: existingPatient.id, // Ensure id is present
  });
} else {
  await axios.post("http://localhost:8000/patients", patientData);
}

    router.push('/');
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow text-black">
      <h2 className="text-2xl font-bold mb-4">{existingPatient ? 'Edit' : 'Add'} Patient</h2>
      <div className="space-y-4">
        <input className="w-full p-2 border rounded" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
        <input className="w-full p-2 border rounded" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
        <input className="w-full p-2 border rounded" type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} />
        <select className="w-full p-2 border rounded" value={gender} onChange={e => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
}
