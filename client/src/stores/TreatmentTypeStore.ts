import { makeAutoObservable } from 'mobx';
import { treatmentTypeApi, TreatmentTypeDTO } from '../services/treatmentTypeApi';

export class TreatmentTypeStore {
  treatmentTypes: TreatmentTypeDTO[] = [];
  loading = false;
  error: string | null = null;
  editingTreatmentType: TreatmentTypeDTO | null = null;
  showForm = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchTreatmentTypes() {
    this.loading = true;
    this.error = null;
    try {
      const response = await treatmentTypeApi.getAll();
      this.treatmentTypes = response.data;
    } catch (err: any) {
      this.error = err.response?.data ? String(err.response.data) : (err instanceof Error ? err.message : 'Failed to fetch treatment types');
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

  async createTreatmentType(data: Omit<TreatmentTypeDTO, 'id'>) {
    try {
      await treatmentTypeApi.create(data);
      await this.fetchTreatmentTypes();
      this.closeForm();
    } catch (err: any) {
      this.error = err.response?.data ? String(err.response.data) : (err instanceof Error ? err.message : 'Failed to create treatment type');
      console.error(err);
      throw err;
    }
  }

  async updateTreatmentType(id: number, data: TreatmentTypeDTO) {
    try {
      await treatmentTypeApi.update(id, data);
      await this.fetchTreatmentTypes();
      this.closeForm();
    } catch (err: any) {
      this.error = err.response?.data ? String(err.response.data) : (err instanceof Error ? err.message : 'Failed to update treatment type');
      console.error(err);
      throw err;
    }
  }

  async deleteTreatmentType(id: number) {
    try {
      await treatmentTypeApi.delete(id);
      await this.fetchTreatmentTypes();
    } catch (err: any) {
      this.error = err.response?.data ? String(err.response.data) : (err instanceof Error ? err.message : 'Failed to delete treatment type');
      console.error(err);
      throw err;
    }
  }

  openForm(treatmentType?: TreatmentTypeDTO) {
    this.editingTreatmentType = treatmentType || null;
    this.showForm = true;
    this.error = null;
  }

  closeForm() {
    this.showForm = false;
    this.editingTreatmentType = null;
    this.error = null;
  }

  clearError() {
    this.error = null;
  }

  get isEditing(): boolean {
    return this.editingTreatmentType !== null;
  }
}

export const treatmentTypeStore = new TreatmentTypeStore();
