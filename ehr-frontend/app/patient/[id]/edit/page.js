'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import PatientForm from '../../../../components/PatientForm';
import Loading from '../../../../components/Loading';

export default function EditPatientPage() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/patients/${id}`).then(res => {
      setPatient(res.data);
    });
  }, [id]);

  if (!patient) return <Loading />;

  return <PatientForm existingPatient={patient} />;
}
