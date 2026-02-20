import { makeAutoObservable } from 'mobx';
import { appointmentApi, AppointmentDTO } from '../services/appointmentApi';

export class AppointmentStore {
  appointments: AppointmentDTO[] = [];
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchAll() {
    this.loading = true;
    this.error = null;
    try {
      const res = await appointmentApi.getAll();
      this.appointments = res.data;
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Failed to fetch appointments';
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

  async fetchForCustomer(customerId: number) {
    this.loading = true;
    this.error = null;
    try {
      const res = await appointmentApi.getForCustomer(customerId);
      this.appointments = res.data;
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Failed to fetch appointments';
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

  async createAppointment(payload: Omit<AppointmentDTO, 'id'>) {
    try {
      await appointmentApi.create(payload);
      await this.fetchAll();
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Failed to create appointment';
      console.error(err);
      throw err;
    }
  }

  async updateAppointment(id: number, payload: AppointmentDTO) {
    try {
      await appointmentApi.update(id, payload);
      await this.fetchAll();
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Failed to update appointment';
      console.error(err);
      throw err;
    }
  }

  async deleteAppointment(id: number) {
    try {
      await appointmentApi.delete(id);
      await this.fetchAll();
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Failed to delete appointment';
      console.error(err);
      throw err;
    }
  }
}

export const appointmentStore = new AppointmentStore();

