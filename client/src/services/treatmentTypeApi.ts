import axios, { AxiosInstance } from 'axios';

export interface TreatmentTypeDTO {
  id?: number;
  name: string;
  price: number;
  durationMinutes: number;
}

const API_BASE_URL = 'http://localhost:8080/api/treatment-types';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const treatmentTypeApi = {
  getAll: () => api.get<TreatmentTypeDTO[]>('/'),
  getById: (id: number) => api.get<TreatmentTypeDTO>(`/${id}`),
  create: (treatmentType: Omit<TreatmentTypeDTO, 'id'>) => api.post<TreatmentTypeDTO>('/', treatmentType),
  update: (id: number, treatmentType: TreatmentTypeDTO) => api.put<TreatmentTypeDTO>(`/${id}`, treatmentType),
  delete: (id: number) => api.delete(`/${id}`),
};

export default api;
