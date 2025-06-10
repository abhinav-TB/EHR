import api from './api';

export const getPatient = (id) => api.get(`/patients/${id}`);
export const createPatient = (data) => api.post(`/patients`, data);
export const updatePatient = (id, data) => api.put(`/patients/${id}`, data);
