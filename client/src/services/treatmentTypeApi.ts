import {AxiosInstance} from 'axios';
import {getApi} from './apiConfig';

export interface TreatmentTypeDTO {
  id?: number;
  name: string;
  price: number;
  durationMinutes: number;
}

const api: AxiosInstance = getApi('/treatment-types');

export const treatmentTypeApi = {
  getAll: () => api.get<TreatmentTypeDTO[]>('/'),
  getById: (id: number) => api.get<TreatmentTypeDTO>(`/${id}`),
  create: (treatmentType: Omit<TreatmentTypeDTO, 'id'>) => api.post<TreatmentTypeDTO>('/', treatmentType),
  update: (id: number, treatmentType: TreatmentTypeDTO) => api.put<TreatmentTypeDTO>(`/${id}`, treatmentType),
  delete: (id: number) => api.delete(`/${id}`),
};

export default api;
