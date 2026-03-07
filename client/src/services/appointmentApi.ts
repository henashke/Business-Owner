import { AxiosInstance } from 'axios';
import { getApi } from './apiConfig';

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

const api: AxiosInstance = getApi('/appointments');

export const appointmentApi = {
  getAll: () => api.get<AppointmentDTO[]>('/'),
  getForCustomer: (customerId: number) => api.get<AppointmentDTO[]>(`/customer/${customerId}`),
  create: (appointment: Omit<AppointmentDTO, 'id'>) => api.post<AppointmentDTO>('/', appointment),
  update: (id: number, appointment: AppointmentDTO) => api.put<AppointmentDTO>(`/${id}`, appointment),
  delete: (id: number) => api.delete(`/${id}`),
};

export default api;

