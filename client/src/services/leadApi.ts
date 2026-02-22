import axios, { AxiosInstance } from 'axios';

export type LeadStatus =
  | 'HOT'
  | 'COLD'
  | 'WAITING_FOR_DEPOSIT'
  | 'CANCELED'
  | 'NOT_RELEVANT'
  | 'SUCCESSFULLY_BOOKED';

export interface LeadDTO {
  id?: number;
  name: string;
  initialInterestDate: string; // ISO date string: 'YYYY-MM-DD'
  contactInfo: string;
  treatmentType: string;
  status: LeadStatus;
  followUpDate?: string | null; // ISO date string or null
}

const API_BASE_URL = 'http://localhost:8080/api/leads';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const leadApi = {
  getAll: () => api.get<LeadDTO[]>('/'),
  getById: (id: number) => api.get<LeadDTO>(`/${id}`),
  getByStatus: (status: LeadStatus) => api.get<LeadDTO[]>(`/status/${status}`),
  getOverdue: () => api.get<LeadDTO[]>('/overdue'),
  create: (lead: Omit<LeadDTO, 'id'>) => api.post<LeadDTO>('/', lead),
  update: (id: number, lead: LeadDTO) => api.put<LeadDTO>(`/${id}`, lead),
  delete: (id: number) => api.delete(`/${id}`),
};

export default api;
