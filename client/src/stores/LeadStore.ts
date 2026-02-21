import { makeAutoObservable } from 'mobx';
import { leadApi, LeadDTO, LeadStatus } from '../services/leadApi';

export class LeadStore {
  leads: LeadDTO[] = [];
  loading = false;
  error: string | null = null;
  editingLead: LeadDTO | null = null;
  showForm = false;
  statusFilter: LeadStatus | 'ALL' = 'ALL';

  constructor() {
    makeAutoObservable(this);
  }

  async fetchLeads() {
    this.loading = true;
    this.error = null;
    try {
      const response = await leadApi.getAll();
      this.leads = response.data;
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Failed to fetch leads';
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

  async fetchByStatus(status: LeadStatus) {
    this.loading = true;
    this.error = null;
    try {
      const response = await leadApi.getByStatus(status);
      this.leads = response.data;
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Failed to fetch leads by status';
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

  async fetchOverdue() {
    this.loading = true;
    this.error = null;
    try {
      const response = await leadApi.getOverdue();
      this.leads = response.data;
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Failed to fetch overdue leads';
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

  async createLead(leadData: Omit<LeadDTO, 'id'>) {
    try {
      await leadApi.create(leadData);
      await this.fetchLeads();
      this.closeForm();
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Failed to create lead';
      console.error(err);
      throw err;
    }
  }

  async updateLead(id: number, leadData: LeadDTO) {
    try {
      await leadApi.update(id, leadData);
      await this.fetchLeads();
      this.closeForm();
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Failed to update lead';
      console.error(err);
      throw err;
    }
  }

  async deleteLead(id: number) {
    try {
      await leadApi.delete(id);
      await this.fetchLeads();
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Failed to delete lead';
      console.error(err);
      throw err;
    }
  }

  openForm(lead?: LeadDTO) {
    this.editingLead = lead || null;
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.editingLead = null;
  }

  setStatusFilter(filter: LeadStatus | 'ALL') {
    this.statusFilter = filter;
  }

  clearError() {
    this.error = null;
  }

  get isEditing(): boolean {
    return this.editingLead !== null;
  }
}

export const leadStore = new LeadStore();
