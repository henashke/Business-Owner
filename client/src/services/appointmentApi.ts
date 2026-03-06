import axios, { AxiosInstance } from 'axios';

export interface AppointmentDTO {
  id?: number;
  customerId: number;
  treatmentTypeId: number | null;
  treatmentTypeName?: string;
  treatmentPrice?: number;
  treatmentDurationMinutes?: number;
  startTime: string; // ISO
  endTime: string; // ISO
  notes?: string;
}

const API_BASE_URL = 'http://localhost:8080/api/appointments';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const appointmentApi = {
  getAll: () => api.get<AppointmentDTO[]>('/'),
  getForCustomer: (customerId: number) => api.get<AppointmentDTO[]>(`/customer/${customerId}`),
  create: (appointment: Omit<AppointmentDTO, 'id'>) => api.post<AppointmentDTO>('/', appointment),
  update: (id: number, appointment: AppointmentDTO) => api.put<AppointmentDTO>(`/${id}`, appointment),
  delete: (id: number) => api.delete(`/${id}`),
};

export default api;

