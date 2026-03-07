import {AxiosInstance} from 'axios';
import {getApi} from './apiConfig';

export interface CustomerDTO {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  notes: string;
  active: boolean;
}

const api: AxiosInstance = getApi('/customers');


export const customerApi = {
  getAllCustomers: () => api.get<CustomerDTO[]>('/'),
  getActiveCustomers: () => api.get<CustomerDTO[]>('/active'),
  getCustomer: (id: number) => api.get<CustomerDTO>(`/${id}`),
  createCustomer: (customer: Omit<CustomerDTO, 'id'>) => api.post<CustomerDTO>('/', customer),
  updateCustomer: (id: number, customer: CustomerDTO) => api.put<CustomerDTO>(`/${id}`, customer),
  deleteCustomer: (id: number) => api.delete(`/${id}`),
};

export default api;
