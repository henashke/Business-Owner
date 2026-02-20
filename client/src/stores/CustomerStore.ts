import { makeAutoObservable } from 'mobx';
import { customerApi, CustomerDTO } from '../services/customerApi';

export class CustomerStore {
  customers: CustomerDTO[] = [];
  loading = false;
  error: string | null = null;
  editingCustomer: CustomerDTO | null = null;
  showForm = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchCustomers() {
    this.loading = true;
    this.error = null;
    try {
      const response = await customerApi.getAllCustomers();
      this.customers = response.data;
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Failed to fetch customers';
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

  async fetchActiveCustomers() {
    this.loading = true;
    this.error = null;
    try {
      const response = await customerApi.getActiveCustomers();
      this.customers = response.data;
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Failed to fetch active customers';
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

  async createCustomer(customerData: CustomerDTO) {
    try {
      await customerApi.createCustomer(customerData);
      await this.fetchCustomers();
      this.closeForm();
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Failed to create customer';
      console.error(err);
      throw err;
    }
  }

  async updateCustomer(id: number, customerData: CustomerDTO) {
    try {
      await customerApi.updateCustomer(id, customerData);
      await this.fetchCustomers();
      this.closeForm();
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Failed to update customer';
      console.error(err);
      throw err;
    }
  }

  async deleteCustomer(id: number) {
    try {
      await customerApi.deleteCustomer(id);
      await this.fetchCustomers();
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Failed to delete customer';
      console.error(err);
      throw err;
    }
  }

  openForm(customer?: CustomerDTO) {
    this.editingCustomer = customer || null;
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.editingCustomer = null;
  }

  clearError() {
    this.error = null;
  }

  get isEditing(): boolean {
    return this.editingCustomer !== null;
  }
}

export const customerStore = new CustomerStore();

