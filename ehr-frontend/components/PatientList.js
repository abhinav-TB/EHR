'use client';

import { useRouter } from 'next/navigation';

export default function PatientList({ patients }) {
  const router = useRouter();

  return (
    <ul className="space-y-2">
      {patients.map((entry, i) => {
        const patient = entry.resource;
        const name = patient.name?.[0]?.given?.join(' ') + ' ' + (patient.name?.[0]?.family || '');

        return (
          <li key={i} className="p-4 border rounded bg-gray-50 shadow-sm">
            <div className="font-bold">{name}</div>
            <div className="text-sm text-gray-600">Gender: {patient.gender}</div>
            <div className="text-sm text-gray-600">DOB: {patient.birthDate}</div>
            <div className="mt-2 flex gap-2">
              <button onClick={() => router.push(`/patient/${patient.id}`)} className="text-blue-600">View</button>
              <button onClick={() => router.push(`/patient/${patient.id}/edit`)} className="text-yellow-600">Edit</button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
