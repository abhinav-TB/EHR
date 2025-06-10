'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import PatientForm from '../../../../components/PatientForm';

export default function EditPatientPage() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/patients/${id}`).then(res => {
      setPatient(res.data);
    });
  }, [id]);

  if (!patient) return <p className="text-center mt-10">Loading...</p>;

  return <PatientForm existingPatient={patient} />;
}
