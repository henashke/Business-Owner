import React, { createContext, useContext } from 'react';
import { CustomerStore, customerStore } from '../stores/CustomerStore';
import { AppointmentStore, appointmentStore } from '../stores/AppointmentStore';
import { LeadStore, leadStore } from '../stores/LeadStore';

type Stores = {
  customerStore: CustomerStore;
  appointmentStore: AppointmentStore;
  leadStore: LeadStore;
};

const defaultStores: Stores = {
  customerStore,
  appointmentStore,
  leadStore,
};

const StoreContext = createContext<Stores>(defaultStores);

export const StoreProvider: React.FC<{ children: React.ReactNode; stores?: Partial<Stores> }> = ({
  children,
  stores,
}) => {
  const value = { ...defaultStores, ...(stores || {}) };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = (): Stores => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return store;
};
