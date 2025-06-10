import axios from 'axios';

export async function fetchPatients(name) {
  const response = await axios.get(`http://localhost:8000/patients`, {
    params: { name }
  });
  return response.data;
}
