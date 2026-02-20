import {useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {
    Box,
    Fab,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {useStore} from '../context/StoreContext';
import {DeleteConfirmDialog} from './DeleteConfirmDialog';
import {CustomerFormDialog} from './CustomerFormDialog';
import {CustomerCard} from './CustomerCard';

export const CustomerList = observer(() => {
    const {customerStore} = useStore();
    const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    useEffect(() => {
        customerStore.fetchCustomers();
    }, []);

    const handleDelete = async (id: number) => {
        setDeletingId(id);
        try {
            await customerStore.deleteCustomer(id);
            setDeleteConfirmId(null);
        } finally {
            setDeletingId(null);
        }
    };

    const handleSave = async (customer: any) => {
        if (customerStore.editingCustomer?.id) {
            await customerStore.updateCustomer(customerStore.editingCustomer.id, customer);
        } else {
            await customerStore.createCustomer(customer);
        }
    };

    console.log(customerStore.customers.map((customer) => customer.firstName));
    return (
        <>
            <Fab
                size={"small"}
                color={"primary"}
                onClick={() => customerStore.openForm()}
                sx={{
                    position: 'fixed',
                    bottom: 24,
                    left: 24,
                    zIndex: 1000,
                }}
            >
                <AddIcon/>
            </Fab>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                }}
            >
                {customerStore.customers.map((customer) => (
                    <CustomerCard
                        key={customer.id}
                        id={customer.id!}
                        firstName={customer.firstName}
                        lastName={customer.lastName}
                        phoneNumber={customer.phoneNumber}
                        active={customer.active}
                        onEdit={(id) => customerStore.openForm(customerStore.customers.find(c => c.id === id))}
                        onDelete={(id) => setDeleteConfirmId(id)}
                    />
                ))}
            </Box>

            <DeleteConfirmDialog
                open={deleteConfirmId !== null}
                onClose={() => setDeleteConfirmId(null)}
                onConfirm={() => deleteConfirmId && handleDelete(deleteConfirmId)}
                deleting={deletingId !== null}
            />

            <CustomerFormDialog
                open={customerStore.showForm}
                onClose={() => customerStore.closeForm()}
                onSave={handleSave}
                customer={customerStore.editingCustomer}
            />
        </>
    );
});

export default CustomerList;

